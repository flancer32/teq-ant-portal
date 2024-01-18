/**
 * The endpoint ID to transmit a message through the portal.
 */
// MODULE'S VARS
const NS = 'Fl32_Portal_Shared_Dto_Id';

// MODULE'S CLASSES
/**
 * @memberOf Fl32_Portal_Shared_Dto_Id
 */
class Dto {
    static namespace = NS;
    /**
     * The UUID for the user's host.
     * @type {string}
     */
    host;
    /**
     * The UUID for the user.
     * @type {string}
     */
    user;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_Dto
 */
export default class Fl32_Portal_Shared_Dto_Id {
    /**
     * @param {TeqFw_Core_Shared_Util_Cast} cast
     */
    constructor(
        {
            TeqFw_Core_Shared_Util_Cast$: cast,
        }
    ) {
        /**
         * @param {Fl32_Portal_Shared_Dto_Id.Dto} [data]
         * @return {Fl32_Portal_Shared_Dto_Id.Dto}
         */
        this.createDto = function (data) {
            // create new DTO
            const res = new Dto();
            // cast known attributes
            res.host = cast.string(data?.host);
            res.user = cast.string(data?.user);
            return res;
        };
    }
}
