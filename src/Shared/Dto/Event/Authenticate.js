/**
 * The backend request for front authentication.
 */
// MODULE'S VARS
const NS = 'Fl32_Portal_Shared_Dto_Event_Authenticate';

// MODULE'S CLASSES
/**
 * @memberOf Fl32_Portal_Shared_Dto_Event_Authenticate
 */
class Dto {
    static namespace = NS;
    /**
     * The UUID for the SSE stream.
     * @type {string}
     */
    streamUuid;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_Dto
 */
export default class Fl32_Portal_Shared_Dto_Event_Authenticate {
    /**
     * @param {TeqFw_Core_Shared_Util_Cast} cast
     */
    constructor(
        {
            TeqFw_Core_Shared_Util_Cast$: cast,
        }
    ) {
        /**
         * @param {Fl32_Portal_Shared_Dto_Event_Authenticate.Dto} [data]
         * @return {Fl32_Portal_Shared_Dto_Event_Authenticate.Dto}
         */
        this.createDto = function (data) {
            // create new DTO
            const res = new Dto();
            // cast known attributes
            res.streamUuid = cast.string(data?.streamUuid);
            return res;
        };
    }
}
