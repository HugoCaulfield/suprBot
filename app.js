const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const puppeteerextra = require("puppeteer-extra");
const puppeteer = require("puppeteer");
const credentials = require("./credentials.json");
const logger = require("./src/log");
const requestIntercept = require("./src/requestIntercept");
const cart = require("./src/cart");
const checkout = require("./src/checkout");
const google = require("./src/google");
const delay = require("./src/delay");

startBot();

async function startBot() {
    // Initialize bot
    puppeteerextra.use(StealthPlugin());
    puppeteerextra.use(require("puppeteer-extra-plugin-anonymize-ua")());
    puppeteerextra.use(
        require("puppeteer-extra-plugin-user-preferences")({
            userPrefs: {
                webkit: {
                    webprefs: {
                        default_font_size: 16,
                    },
                },
            },
        })
    );
    let browserr = await puppeteerextra.launch({
        headless: false,
        defaultViewport: null,
        ignoreDefaultArgs: ["--disable-extensions"],
        args: [
            '--no-sandbox'
        ],
    });
    const browser = await puppeteer.connect({
        browserWSEndpoint: browserr.wsEndpoint(),
    });
    const browserCtx = await browser.createIncognitoBrowserContext();

    // Connection to a Google account
    await google.googleAccount(credentials, browserCtx);

    // Open a new tab
    const pageSupreme = await browserCtx.newPage();
    await pageSupreme.evaluateOnNewDocument(() => {
        Object.defineProperty(window, "navigator", {
            value: new Proxy(navigator, {
                has: (target, key) => (key === "webdriver" ? false : key in target),
                get: (target, key) =>
                    key === "webdriver" ?
                    undefined : typeof target[key] === "function" ?
                    target[key].bind(target) : target[key],
            }),
        });
    });

    await delay.delay(100);

    // Activate request interception
    await pageSupreme.setRequestInterception(true);
    logger.logger.info("Request interception OK");
    pageSupreme.on("request", await requestIntercept.requestIntercept);

    pageSupreme.setDefaultTimeout(0);
    logger.logger.info("Timeout set to 0");

    // TIMER
    // Wait until Thu Dec 03 2020 00:01:30

    let dateTime = new Date();
    logger.logger.info("Wait until Thu Dec 03 2020 00:01:30");
    while (
        dateTime.toString() !==
        "Thu Dec 03 2020 00:12:00 GMT+0100 (Central European Standard Time)"
    ) {
        dateTime = new Date();
        await delay.delay(100);
    }
    logger.logger.info("BOT GO");
    console.time("time");

    // Refresh the page until the product is found
    async function reconnectHome() {
        try {
            await pageSupreme.goto(credentials["supreme"]["link"], {
                waitUntil: "networkidle2",
            });
        } catch {
            logger.logger.error("Supreme shop response BAD");
            await delay.delay(200);
            reconnectHome();
        }
    }
    await reconnectHome();

    logger.logger.info("Supreme shop response OK");

    // Find the product and add it to the basket

    await cart.addToCart(pageSupreme, credentials);

    // CHECKOUT

    await checkout.checkout(pageSupreme, credentials);

    console.timeEnd("time");
}