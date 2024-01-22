/**
 * The cover structure for the event message.
 */
// MODULE'S VARS
const NS = 'Fl32_Portal_Shared_Dto_Event_Cover';

// MODULE'S CLASSES
/**
 * @memberOf Fl32_Portal_Shared_Dto_Event_Cover
 */
class Dto {
    static namespace = NS;
    /**
     * The payload.
     * @type {*}
     */
    data;
    /**
     * The type of the data.
     * @type {string}
     */
    type;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_Dto
 */
export default class Fl32_Portal_Shared_Dto_Event_Cover {
    /**
     * @param {TeqFw_Core_Shared_Util_Cast} cast
     */
    constructor(
        {
            TeqFw_Core_Shared_Util_Cast$: cast,
        }
    ) {
        /**
         * @param {Fl32_Portal_Shared_Dto_Event_Cover.Dto} [data]
         * @return {Fl32_Portal_Shared_Dto_Event_Cover.Dto}
         */
        this.createDto = function (data) {
            // create new DTO
            const res = new Dto();
            // cast known attributes
            res.data = cast.object(data?.data);
            res.type = cast.string(data?.type);
            return res;
        };
    }
}
