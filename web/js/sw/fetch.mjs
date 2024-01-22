/**
 * Module with functions to use in a service worker during the fetch stage.
 */
// MODULE'S IMPORTS

// MODULE'S VARS

// MODULE'S FUNCS
/**
 * Function to detect URLs that always bypass caching for @flancer32/teq-ant-portal plugin.
 * @param {Request} req
 * @return {boolean}
 */
export function bypassCache(req) {
    const API = /(.*)(\/ant-portal-events-open\/)(.*)/; // configuration (DI, front app, cache, ...)
    return Boolean(req.url.match(API));
}