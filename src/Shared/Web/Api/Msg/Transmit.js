/**
 * Transmit the message to an addressee.
 */
// MODULE'S VARS
const NS = 'Fl32_Portal_Shared_Web_Api_Msg_Transmit';

// MODULE'S CLASSES
/**
 * @memberOf Fl32_Portal_Shared_Web_Api_Msg_Transmit
 */
class Request {
    static namespace = NS;
    /**
     * The message cover with message data inside.
     * @type {Fl32_Portal_Shared_Dto_Msg_Type_Letter.Dto}
     */
    letter;
}

/**
 * @memberOf Fl32_Portal_Shared_Web_Api_Msg_Transmit
 */
class Response {
    static namespace = NS;
    /** @type {boolean} */
    success;
}

/**
 * @implements TeqFw_Web_Api_Shared_Api_Endpoint
 */
export default class Fl32_Portal_Shared_Web_Api_Msg_Transmit {
    /**
     * @param {TeqFw_Core_Shared_Util_Cast} cast
     * @param {Fl32_Portal_Shared_Dto_Msg_Type_Letter} dtoLetter
     */
    constructor(
        {
            TeqFw_Core_Shared_Util_Cast$: cast,
            Fl32_Portal_Shared_Dto_Msg_Type_Letter$: dtoLetter,
        }
    ) {
        // INSTANCE METHODS

        /**
         * @param {Fl32_Portal_Shared_Web_Api_Msg_Transmit.Request} [data]
         * @return {Fl32_Portal_Shared_Web_Api_Msg_Transmit.Request}
         */
        this.createReq = function (data) {
            // create new DTO
            const res = new Request();
            // cast known attributes
            res.letter = dtoLetter.createDto(data?.letter);
            return res;
        };

        /**
         * @param {Fl32_Portal_Shared_Web_Api_Msg_Transmit.Response} [data]
         * @returns {Fl32_Portal_Shared_Web_Api_Msg_Transmit.Response}
         */
        this.createRes = function (data) {
            // create new DTO
            const res = new Response();
            // cast known attributes
            res.success = cast.boolean(data?.success);
            return res;
        };
    }

}
