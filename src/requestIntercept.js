// Intercept request, abort all useless request

async function requestIntercept(request) {
    if (
        ["image", "stylesheet", "font", "script"].indexOf(
            request.resourceType()
        ) !== -1 &&
        request.url().includes("cardinal") == false
    ) {
        request.abort();
    } else {
        request.continue();
    }
}

module.exports.requestIntercept = requestIntercept;