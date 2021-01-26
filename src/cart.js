const logger = require("./log");
const requestIntercept = require("./requestIntercept");
const delay = require("../app");

// Find object with the name found on Supreme Community droplist
// Add it to basket and go to checkout page

async function addToCart(pageSupreme, credentials) {
    try {
        await pageSupreme.waitForSelector("#container", {
            timeout: 2000,
        });
        logger.logger.info("#container found");
    } catch {
        logger.logger.error("#container not found");
    }

    let chooseProduct = await pageSupreme.$x(
        "//div[@class='inner-article']/h1/a[contains(., '" +
        credentials["supreme"]["product"] +
        "')]"
    );

    try {
        await chooseProduct[0].click();
        logger.logger.info("Click chooseProduct done");
    } catch {
        logger.logger.error("Click chooseProduct error");
    }

    await delay.delay(50);

    let chooseColor;

    try {
        chooseColor = await pageSupreme.$x(
            "//*[@id='details']/ul/li/a[@data-style-name='" +
            credentials["supreme"]["color"] +
            "']"
        );
        logger.logger.info("Color found");
    } catch {
        logger.logger.error("Color not found");
    }
    //  Refresh until found object

    await delay.delay(50);

    if (chooseColor && chooseColor[0]) {
        await chooseColor[0].click();
    } else {
        while (!chooseColor || chooseColor.length <= 0) {
            await pageSupreme.reload();
            chooseColor = await pageSupreme.$x(
                "//*[@id='details']/ul/li/a[@data-style-name='" +
                credentials["supreme"]["color"] +
                "']"
            );
            await delay.delay(200);
        }
        try {
            await chooseColor[0].click();
        } catch {
            logger.logger.error("Aucun article trouvé BAD");
            exit(84);
        }
    }

    logger.logger.info("Affichage page produit OK");

    // Choose and add to basket | 1300ms

    await delay.delay(50);

    try {
        await pageSupreme.waitForSelector("#add-remove-buttons > input", {
            timeout: 2000,
        });
        await pageSupreme.click("#add-remove-buttons > input");
    } catch {
        logger.logger.error("Article SOLD OUT");
        exit(84);
    }
    logger.logger.info("Click sur ajouter au panier");

    await delay.delay(50);

    pageSupreme.off("request", await requestIntercept.requestIntercept);

    pageSupreme.on("request", async (request) => {
        if (
            ["image"].indexOf(
                request.resourceType()
            ) !== -1 || request.url() == "https://connect.facebook.net/en_US/fp.js") {
            request.abort();
        } else {
            request.continue();
        }
    });

    try {
        await pageSupreme.waitForSelector("#cart > a.button.checkout", {
            timeout: 1000,
        });
        await pageSupreme.click("#cart > a.button.checkout");
    } catch {
        logger.logger.error("Checkout page KO");
        exit(84);
    }
    logger.logger.info("Checkout page OK");
}

module.exports.addToCart = addToCart;