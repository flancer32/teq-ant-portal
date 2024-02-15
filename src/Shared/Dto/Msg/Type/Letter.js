/**
 * The letter structure is public and can be used by this external handlers (app level).
 */
// MODULE'S VARS
const NS = 'Fl32_Portal_Shared_Dto_Msg_Type_Letter';

// MODULE'S CLASSES
/**
 * @memberOf Fl32_Portal_Shared_Dto_Msg_Type_Letter
 */
class Dto {
    static namespace = NS;
    /**
     * The payload (any text, encrypted or not).
     * @type {string}
     */
    body;
    /**
     * The message must be removed if it is not transmitted after this date.
     * @type {Date}
     */
    dateExpire;
    /** @type {Fl32_Portal_Shared_Dto_Msg_Address.Dto} */
    from;
    /** @type {Fl32_Portal_Shared_Dto_Msg_Address.Dto} */
    to;
    /**
     * The type of the message - any string that is known to the sender and receiver.
     * @type {string}
     */
    type;
    /**
     * The message UUID.
     * TODO: should we place this UUID on a level upper - to the Cover?
     * @type {string}
     */
    uuid;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_Dto
 */
export default class Fl32_Portal_Shared_Dto_Msg_Type_Letter {
    /**
     * @param {TeqFw_Core_Shared_Util_Cast} cast
     * @param {Fl32_Portal_Shared_Dto_Msg_Address} dtoAddr
     */
    constructor(
        {
            TeqFw_Core_Shared_Util_Cast$: cast,
            Fl32_Portal_Shared_Dto_Msg_Address$: dtoAddr,
        }
    ) {
        /**
         * @param {Fl32_Portal_Shared_Dto_Msg_Type_Letter.Dto|Object} [data]
         * @return {Fl32_Portal_Shared_Dto_Msg_Type_Letter.Dto}
         */
        this.createDto = function (data) {
            // create new DTO
            const res = new Dto();
            // cast known attributes
            res.body = cast.string(data?.body);
            res.dateExpire = cast.date(data?.dateExpire);
            res.from = dtoAddr.createDto(data?.from);
            res.to = dtoAddr.createDto(data?.to);
            res.type = cast.string(data?.type);
            res.uuid = cast.string(data?.uuid);
            return res;
        };
    }
}
