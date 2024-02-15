/**
 * The interface for the handlers to process decrypted messages.
 *
 * @interface
 * TODO: use it or remove it
 */
export default class Fl32_Portal_Front_Api_Dispatcher_Handler {
    /**
     *
     * @param {*} msg - decrypted body of the message
     * @param {Fl32_Portal_Shared_Dto_Msg_Type_Letter.Dto} letter - the whole message with metadata (from, to, ...)
     * @return {Promise<boolean>} - 'true' if the message is processed and should be removed on the back
     */
    async handler(msg, letter) {}
}

