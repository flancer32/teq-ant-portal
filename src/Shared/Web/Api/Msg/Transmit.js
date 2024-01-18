/**
 * Transmit the message to an addressee.
 * TODO: extract the message DTO
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
     * The message body (encrypted).
     * @type {string}
     */
    body;
    /**
     * The message must be removed if it is not transmitted after this date.
     * @type {Date}
     */
    dateExpire;
    /** @type {Fl32_Portal_Shared_Dto_Id.Dto} */
    from;
    /** @type {Fl32_Portal_Shared_Dto_Id.Dto} */
    to;
    /**
     * The message UUID.
     * @type {string}
     */
    uuid;
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
     * @param {Fl32_Portal_Shared_Dto_Id} dtoId
     */
    constructor(
        {
            TeqFw_Core_Shared_Util_Cast$: cast,
            Fl32_Portal_Shared_Dto_Id$: dtoId,
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
            res.body = cast.string(data?.body);
            res.dateExpire = cast.date(data?.dateExpire);
            res.from = dtoId.createDto(data?.from);
            res.to = dtoId.createDto(data?.to);
            res.uuid = cast.string(data?.uuid);
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
