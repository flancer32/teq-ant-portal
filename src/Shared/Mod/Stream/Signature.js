/**
 * The model composes/decomposes the text to sign the SSE stream authentication.
 */
export default class Fl32_Portal_Shared_Mod_Stream_Signature {
    constructor() {
        // VARS
        const PS = '/'; // the parts separator

        // INSTANCE METHODS

        /**
         * Compose the text to sign.
         * @return {string}
         */
        this.compose = function (userUuid, frontUuid, tabUuid, streamUuid) {
            return `${userUuid}${PS}${frontUuid}${PS}${tabUuid}${PS}${streamUuid}`;
        };

        /**
         * Decompose the signature and return the parts.
         * @param {string} sign
         * @return {{streamUuid: string, tabUuid: string, userUuid: string, frontUuid: string}}
         */
        this.decompose = function (sign) {
            const [userUuid, frontUuid, tabUuid, streamUuid] = sign.split(PS);
            return {userUuid, frontUuid, tabUuid, streamUuid};
        };
    }
}
