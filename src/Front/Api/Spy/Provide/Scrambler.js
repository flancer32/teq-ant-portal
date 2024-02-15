/**
 * The interface for the Scrambler Provider should be implemented by the caller plugin (on the app level).
 *
 * @interface
 */
export default class Fl32_Portal_Front_Api_Spy_Provide_Scrambler {

    /**
     * Provide the scrambler to encrypt/decrypt messages.
     *
     * @param {Fl32_Portal_Shared_Dto_Msg_Address.Dto} from
     * @param {Fl32_Portal_Shared_Dto_Msg_Address.Dto} to
     * @param {string} type type of the letter (some messages cannot be encrypted - for example, keys sharing on contact addition)
     *
     * @return {Promise<Fl32_Portal_Shared_Api_Crypto_Scrambler>}
     */
    async provide(from, to, type) {}

}
