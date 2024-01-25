/**
 * The cover structure is used by this portal only.
 */
// MODULE'S VARS
const NS = 'Fl32_Portal_Shared_Dto_Msg_Cover';

// MODULE'S CLASSES
/**
 * @memberOf Fl32_Portal_Shared_Dto_Msg_Cover
 */
class Dto {
    static namespace = NS;
    /**
     * The payload is authentication or letter message.
     * @type {Object}
     */
    payload;
    /**
     * The type of the message - any string that is known to the sender and receiver.
     * @type {string}
     * @see Fl32_Portal_Shared_Enum_Msg_Type
     */
    type;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_Dto
 */
export default class Fl32_Portal_Shared_Dto_Msg_Cover {
    /**
     * @param {TeqFw_Core_Shared_Util_Cast} cast
     * @param {typeof Fl32_Portal_Shared_Enum_Msg_Type} TYPE
     */
    constructor(
        {
            TeqFw_Core_Shared_Util_Cast$: cast,
            Fl32_Portal_Shared_Enum_Msg_Type$: TYPE,
        }
    ) {
        /**
         * @param {Fl32_Portal_Shared_Dto_Msg_Cover.Dto} [data]
         * @return {Fl32_Portal_Shared_Dto_Msg_Cover.Dto}
         */
        this.createDto = function (data) {
            // create new DTO
            const res = new Dto();
            // cast known attributes
            res.payload = cast.object(data?.payload);
            res.type = cast.enum(data?.type, TYPE);
            return res;
        };
    }
}
