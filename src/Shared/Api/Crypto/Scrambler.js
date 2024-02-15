/**
 * The interface for the Scrambler object, which encrypts and decrypts the string data transmitted through the portal.
 *
 * @interface
 */
export default class Fl32_Portal_Shared_Api_Crypto_Scrambler {

    /**
     * @param {string} encrypted
     * @return {string}
     */
    decrypt(encrypted) {}

    /**
     * @param {string} plain
     * @return {string}
     */
    encrypt(plain) {}
}
