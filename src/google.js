const logger = require("./log");
const delay = require("../app");

// Connect to a google account to try to avoid the captcha

async function googleAccount(credentials, browserCtx) {
    logger.logger.info("Google account connexion");

    const pageGoogle = await browserCtx.newPage();

    //some tricks i found  to make puppeteer undetectable in this link ttps://intoli.com/blog/making-chrome-headless-undetectable/
    await pageGoogle.evaluateOnNewDocument(() => {
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

    await pageGoogle.goto("https://mail.google.com/mail/", {
        waitUntil: "networkidle2",
    });
    await pageGoogle.type('input[type="email"]', credentials["gmail"]["email"]);

    try {
        await pageGoogle.waitForSelector("#identifierNext", {
            timeout: 1000,
        });
        await pageGoogle.click("#identifierNext");
        logger.logger.info("Email done");
    } catch {
        logger.logger.error("#identifierNext not found");
    }

    await delay.delay(5000);

    logger.logger.info("Password done");

    await pageGoogle.type(
        'input[type="password"]',
        credentials["gmail"]["password"]
    );

    try {
        await pageGoogle.waitForSelector("#passwordNext", {
            timeout: 1000,
        });
        await pageGoogle.click("#passwordNext");
        logger.logger.info("Password done");
    } catch {
        logger.logger.error("#passwordNext not found");
    }

    logger.logger.info("Connexion OK");
}

module.exports.googleAccount = googleAccount;