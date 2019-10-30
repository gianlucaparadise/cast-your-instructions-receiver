/**
 * Awaitable delay function
 * @param {Number} milliseconds
 */
function delay(milliseconds) {
    return new Promise((resolve, reject) => {
        try {
            setTimeout(() => {
                resolve();
            }, milliseconds);
        } catch (err) {
            reject();
        }
    });
}

export {
    delay
}