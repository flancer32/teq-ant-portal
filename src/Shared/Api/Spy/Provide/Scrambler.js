/**
 * The interface for the Scrambler Provider should be implemented by the caller plugin (on the app level).
 *
 * @interface
 */
export default class Fl32_Portal_Shared_Api_Spy_Provide_Scrambler {

    /**
     * Provide the scrambler to encrypt/decrypt messages.
     *
     * @param {Fl32_Portal_Shared_Dto_Msg_Address.Dto} from
     * @param {Fl32_Portal_Shared_Dto_Msg_Address.Dto} to
     * @param {Object} [opts]
     *
     * @return {Promise<Fl32_Portal_Shared_Api_Crypto_Scrambler>}
     */
    async provide(from, to, opts) {}

}
