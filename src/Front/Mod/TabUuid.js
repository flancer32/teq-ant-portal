/**
 * The identity for a tab identity in a browser.
 * The model saves data in the browser's sessionStorage.
 */
export default class Fl32_Portal_Front_Mod_TabUuid {
    /**
     * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
     * @param {Fl32_Portal_Front_Store_Session_TabUuid} storeTabUuid
     */
    constructor(
        {
            TeqFw_Core_Shared_Api_Logger$$: logger,
            Fl32_Portal_Front_Store_Session_TabUuid$: storeTabUuid,
        }) {
        // VARS
        /** @type {string} */
        let _cache = init();

        // FUNCS
        /**
         * Load the existing tab ID from the session store or generate a new one.
         * @returns {string}
         */
        function init() {
            let res = storeTabUuid.get();
            if (!res) {
                res = self.crypto.randomUUID();
                storeTabUuid.set(res);
                logger.info(`New tab ID is created: '${res}'.`);
            }
            return res;
        }

        // INSTANCE METHODS

        /**
         * Get tab ID.
         * @return {string}
         */
        this.get = () => _cache;
    }
}
