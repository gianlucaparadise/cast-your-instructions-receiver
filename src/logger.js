/* eslint-disable no-console */
const DEBUG = true;

const log = (getLogContent) => {
    if (DEBUG) {
        console.log('[Cast-Your-Instructions]', getLogContent());
    }
}

const error = (getErrorLogContent) => {
    console.error(getErrorLogContent());
}

export {
    log,
    error
}