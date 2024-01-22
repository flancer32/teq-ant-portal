/**
 * The frontend storage for the browser tab identity.
 */
export default class Fl32_Portal_Front_Store_Session_TabUuid {
    /**
     * @param {Fl32_Portal_Front_Defaults} DEF
     */
    constructor(
        {
            Fl32_Portal_Front_Defaults$: DEF,
        }
    ) {
        // VARS
        const KEY = `${DEF.SHARED.NAME}/tabUuid`;

        // INSTANCE METHODS

        this.clear = function () {
            self.window.sessionStorage.removeItem(KEY);
        };

        /**
         * Get current data from the session storage.
         * @return {string}
         */
        this.get = function () {
            return self.window.sessionStorage.getItem(KEY);
        };

        /**
         * Get the key for the `sessionStorage`.
         * @return {string}
         */
        this.key = () => KEY;

        /**
         * Save current value into the session storage.
         * @param {string} data
         */
        this.set = function (data) {
            self.window.sessionStorage.setItem(KEY, data);
        };

    }
}
