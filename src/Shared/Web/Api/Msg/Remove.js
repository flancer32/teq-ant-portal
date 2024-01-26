/**
 * Remove the message being processed on the front from the backend's queue.
 */
// MODULE'S VARS
const NS = 'Fl32_Portal_Shared_Web_Api_Msg_Remove';

// MODULE'S CLASSES
/**
 * @memberOf Fl32_Portal_Shared_Web_Api_Msg_Remove
 */
class Request {
    static namespace = NS;
    /**
     * The UUID of the message to be removed.
     * @type {string}
     */
    messageUuid;
    /**
     * The UUID of the user that requested the removal.
     * @type {string}
     */
    userUuid;
}

/**
 * @memberOf Fl32_Portal_Shared_Web_Api_Msg_Remove
 */
class Response {
    static namespace = NS;
    /** @type {boolean} */
    success;
}

/**
 * @implements TeqFw_Web_Api_Shared_Api_Endpoint
 */
export default class Fl32_Portal_Shared_Web_Api_Msg_Remove {
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
         * @param {Fl32_Portal_Shared_Web_Api_Msg_Remove.Request} [data]
         * @return {Fl32_Portal_Shared_Web_Api_Msg_Remove.Request}
         */
        this.createReq = function (data) {
            // create new DTO
            const res = new Request();
            // cast known attributes
            res.messageUuid = cast.string(data?.messageUuid);
            res.userUuid = cast.string(data?.userUuid);
            return res;
        };

        /**
         * @param {Fl32_Portal_Shared_Web_Api_Msg_Remove.Response} [data]
         * @returns {Fl32_Portal_Shared_Web_Api_Msg_Remove.Response}
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
