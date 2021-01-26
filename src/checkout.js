const logger = require("./log");

// Filling checkout page

async function checkout(pageSupreme, credentials) {
    try {
        await pageSupreme.waitForSelector(
            "#cart-address > fieldset > div.input.string.required.order_billing_name", {
                timeout: 5000,
            }
        );
        await pageSupreme.click(
            "#cart-address > fieldset > div.input.string.required.order_billing_name"
        );
        await pageSupreme.type(
            "#order_billing_name",
            credentials["supreme"]["name"]
        );
        logger.logger.info("order_billing_name: OK");
    } catch {
        logger.logger.error("order_billing_name: KO");
    }

    try {
        await pageSupreme.waitForSelector(
            "#cart-address > fieldset > div.input.email.optional.order_email", {
                timeout: 2000,
            }
        );
        await pageSupreme.click(
            "#cart-address > fieldset > div.input.email.optional.order_email"
        );
        await pageSupreme.type("#order_email", credentials["supreme"]["mail"]);
        logger.logger.info("order_email: OK");
    } catch {
        logger.logger.error("order_email: KO");
    }

    try {
        await pageSupreme.waitForSelector(
            "#cart-address > fieldset > div.input.string.required.order_tel", {
                timeout: 2000,
            }
        );
        await pageSupreme.click(
            "#cart-address > fieldset > div.input.string.required.order_tel"
        );
        await pageSupreme.type("#order_tel", credentials["supreme"]["phone"]);
        logger.logger.info("order_tel: OK");
    } catch {
        logger.logger.error("order_tel: KO");
    }

    try {
        await pageSupreme.waitForSelector(
            "#address_row > div.input.string.required.order_billing_address", {
                timeout: 2000,
            }
        );
        await pageSupreme.click(
            "#address_row > div.input.string.required.order_billing_address"
        );
        await pageSupreme.type("#bo", credentials["supreme"]["address"]);
        logger.logger.info("bo: OK");
    } catch {
        logger.logger.error("bo: KO");
    }

    try {
        await pageSupreme.waitForSelector(
            "#address_row > div.input.string.optional.order_billing_address_2", {
                timeout: 2000,
            }
        );
        await pageSupreme.click(
            "#address_row > div.input.string.optional.order_billing_address_2"
        );
        await pageSupreme.type("#oba3", credentials["supreme"]["address2"]);
        logger.logger.info("oba3: OK");
    } catch {
        logger.logger.error("oba3: KO");
    }

    try {
        await pageSupreme.waitForSelector(
            "#cart-address > fieldset > div.input.string.optional.order_billing_address_3", {
                timeout: 2000,
            }
        );
        await pageSupreme.click(
            "#cart-address > fieldset > div.input.string.optional.order_billing_address_3"
        );
        await pageSupreme.type(
            "#order_billing_address_3",
            credentials["supreme"]["address3"]
        );
        logger.logger.info("order_billing_address_3: OK");
    } catch {
        logger.logger.error("order_billing_address_3: KO");
    }

    try {
        await pageSupreme.waitForSelector(
            "#cart-address > fieldset > div.input.string.required.order_billing_city", {
                timeout: 2000,
            }
        );
        await pageSupreme.click(
            "#cart-address > fieldset > div.input.string.required.order_billing_city"
        );
        await pageSupreme.type(
            "#order_billing_city",
            credentials["supreme"]["city"]
        );
        logger.logger.info("order_billing_city: OK");
    } catch {
        logger.logger.error("order_billing_city: KO");
    }

    try {
        await pageSupreme.waitForSelector(
            "#eu_zip_country_row > div.input.string.required.order_billing_zip", {
                timeout: 2000,
            }
        );
        await pageSupreme.click(
            "#eu_zip_country_row > div.input.string.required.order_billing_zip"
        );
        await pageSupreme.type("#order_billing_zip", credentials["supreme"]["zip"]);
        logger.logger.info("order_billing_zip: OK");
    } catch {
        logger.logger.error("order_billing_zip: KO");
    }

    try {
        await pageSupreme.waitForSelector(
            "#card_details > div.input.string.required.credit_card_number", {
                timeout: 2000,
            }
        );
        await pageSupreme.click(
            "#card_details > div.input.string.required.credit_card_number"
        );
        await pageSupreme.type("#cnb", credentials["supreme"]["card_number"]);
        logger.logger.info("cnb: OK");
    } catch {
        logger.logger.error("cnb: KO");
    }

    try {
        await pageSupreme.waitForSelector("#cart-vval", {
            timeout: 2000,
        });
        await pageSupreme.click("#cart-vval");
        await pageSupreme.type("#vval", credentials["supreme"]["cvv"]);
        logger.logger.info("vval: OK");
    } catch {
        logger.logger.error("vval: KO");
    }

    try {
        await pageSupreme.select(
            "#order_billing_country",
            credentials["supreme"]["country"]
        );
        logger.logger.info("order_billing_country: OK");
    } catch {
        logger.logger.error("order_billing_country: KO");
    }

    try {
        await pageSupreme.select(
            "#credit_card_type",
            credentials["supreme"]["card_type"]
        );
        logger.logger.info("credit_card_type: OK");
    } catch {
        logger.logger.error("credit_card_type: KO");
    }

    try {
        await pageSupreme.select(
            "#credit_card_month",
            credentials["supreme"]["card_month"]
        );
        logger.logger.info("credit_card_month: OK");
    } catch {
        logger.logger.error("credit_card_month: KO");
    }

    try {
        await pageSupreme.select(
            "#credit_card_year",
            credentials["supreme"]["card_year"]
        );
        logger.logger.info("credit_card_year: OK");
    } catch {
        logger.logger.error("credit_card_year: KO");
    }

    try {
        await pageSupreme.waitForSelector("#cart-cc > fieldset > p > label", {
            timeout: 2000,
        });
        await pageSupreme.click("#order_terms");
        logger.logger.info("click order_terms done");
    } catch {
        logger.logger.error("click order_terms error");
    }
}

module.exports.checkout = checkout;