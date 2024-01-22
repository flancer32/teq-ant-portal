/**
 * Authorize the SSE stream to be owned by a certain user/front.
 */
// MODULE'S VARS
const NS = 'Fl32_Portal_Shared_Web_Api_Stream_Auth';

// MODULE'S CLASSES
/**
 * @memberOf Fl32_Portal_Shared_Web_Api_Stream_Auth
 */
class Request {
    static namespace = NS;
    /**
     * The signed message.
     * @type {string}
     */
    message;
    /**
     * The user UUID.
     * @type {string}
     */
    userUuid;
}

/**
 * @memberOf Fl32_Portal_Shared_Web_Api_Stream_Auth
 */
class Response {
    static namespace = NS;
    /** @type {boolean} */
    success;
}

/**
 * @implements TeqFw_Web_Api_Shared_Api_Endpoint
 */
export default class Fl32_Portal_Shared_Web_Api_Stream_Auth {
    /**
     * @param {TeqFw_Core_Shared_Util_Cast} cast
     */
    constructor(
        {
            TeqFw_Core_Shared_Util_Cast$: cast,
        }
    ) {
        // INSTANCE METHODS

        /**
         * @param {Fl32_Portal_Shared_Web_Api_Stream_Auth.Request} [data]
         * @return {Fl32_Portal_Shared_Web_Api_Stream_Auth.Request}
         */
        this.createReq = function (data) {
            // create new DTO
            const res = new Request();
            // cast known attributes
            res.message = cast.string(data?.message);
            res.userUuid = cast.string(data?.userUuid);
            return res;
        };

        /**
         * @param {Fl32_Portal_Shared_Web_Api_Stream_Auth.Response} [data]
         * @returns {Fl32_Portal_Shared_Web_Api_Stream_Auth.Response}
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
