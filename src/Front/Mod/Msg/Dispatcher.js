/**
 * The dispatcher for (letter) messages received from the back.
 *
 * IMPORTANT: this class extends `EventTarget`.
 */
export default class Fl32_Portal_Front_Mod_Msg_Dispatcher extends EventTarget {
    /**
     * @param {Ssk_Test_Front_Defaults} DEF
     * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
     * @param {Fl32_Portal_Front_Api_Spy_Provide_Scrambler} provider
     */
    constructor(
        {
            Ssk_Test_Front_Defaults$: DEF,
            TeqFw_Core_Shared_Api_Logger$$: logger,
            Fl32_Portal_Front_Api_Spy_Provide_Scrambler$: provider,
        }
    ) {
        super(); // construct the super class
        // then add wrappers to modify the base functionality
        const dispatchEvent = this.dispatchEvent;
        this.dispatchEvent = async function (event) {
            try {
                /** @type {Fl32_Portal_Shared_Dto_Msg_Type_Letter.Dto} */
                const letter = event[DEF.MOD_PORTAL.A_LETTER];
                const from = `${letter.from.user}:${letter.from.host}`;
                logger.info(`The portal message '${letter.uuid}' from '${from}' is received.`);
                /** @type {Fl32_Portal_Shared_Api_Crypto_Scrambler} */
                const scrambler = await provider.provide(letter.from, letter.to, letter.type);
                const plain = (scrambler) ? scrambler.decrypt(letter.body) : letter.body;
                event[DEF.MOD_PORTAL.A_MSG] = JSON.parse(plain);
                return dispatchEvent.apply(this, [event]);
            } catch (e) {
                logger.error(e);
                return false;
            }
        };
    }
}