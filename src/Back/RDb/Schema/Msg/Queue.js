/**
 *  Metadata for RDB entity: the messages queue.
 *  @namespace Fl32_Portal_Back_RDb_Schema_Msg_Queue
 */
// MODULE'S VARS
const NS = 'Fl32_Portal_Back_RDb_Schema_Msg_Queue';
/**
 * Path to the entity in plugin's DEM.
 * @type {string}
 */
const ENTITY = '/fl32/portal/msg/queue';

/**
 * @memberOf Fl32_Portal_Back_RDb_Schema_Msg_Queue
 * @type {Object}
 */
const ATTR = {
    BID: 'bid',
    BODY: 'body',
    DATE_EXPIRE: 'date_expire',
    FROM_HOST: 'from_host',
    FROM_USER: 'from_user',
    TO_HOST: 'to_host',
    TO_USER: 'to_user',
    UUID: 'uuid',
};
Object.freeze(ATTR);

// MODULE'S CLASSES
/**
 * @memberOf Fl32_Portal_Back_RDb_Schema_Msg_Queue
 */
class Dto {
    static namespace = NS;
    /**
     * Backend ID for the object.
     * @type {number}
     */
    bid;
    /**
     * The message body (encrypted).
     * @type {string}
     */
    body;
    /**
     * The message must be removed if it is not transmitted after this date.
     * @type {Date}
     */
    date_expire;
    /**
     * The UUID for the host of the sender.
     * @type {string}
     */
    from_host;
    /**
     * The UUID for the message sender.
     * @type {string}
     */
    from_user;
    /**
     * The UUID for the host of the receiver.
     * @type {string}
     */
    to_host;
    /**
     * The UUID for the message receiver.
     * @type {string}
     */
    to_user;
    /**
     * Universal ID for the message.
     * @type {string}
     */
    uuid;
}

// noinspection JSClosureCompilerSyntax
/**
 * @implements TeqFw_Db_Back_RDb_Meta_IEntity
 */
export default class Fl32_Portal_Back_RDb_Schema_Msg_Queue {
    /**
     * @param {Fl32_Portal_Back_Defaults} DEF
     * @param {TeqFw_Db_Back_RDb_Schema_EntityBase} base
     * @param {TeqFw_Core_Shared_Util_Cast} cast
     */
    constructor(
        {
            Fl32_Portal_Back_Defaults$: DEF,
            TeqFw_Db_Back_RDb_Schema_EntityBase$: base,
            TeqFw_Core_Shared_Util_Cast$: cast,
        }
    ) {
        // INSTANCE METHODS
        /**
         * @param {Fl32_Portal_Back_RDb_Schema_Msg_Queue.Dto} [data]
         * @return {Fl32_Portal_Back_RDb_Schema_Msg_Queue.Dto}
         */
        this.createDto = function (data) {
            const res = new Dto();
            res.bid = cast.int(data?.bid);
            res.body = cast.string(data?.body);
            res.date_expire = cast.date(data?.date_expire);
            res.from_host = cast.string(data?.from_host);
            res.from_user = cast.string(data?.from_user);
            res.to_host = cast.string(data?.to_host);
            res.to_user = cast.string(data?.to_user);
            res.uuid = cast.string(data?.uuid);
            return res;
        };

        /**
         * Set JSDoc return type, real code is in `TeqFw_Db_Back_RDb_Schema_EntityBase`.
         * @return {typeof Fl32_Portal_Back_RDb_Schema_Msg_Queue.ATTR}
         */
        this.getAttributes = function () {};

        // MAIN
        return base.create(this,
            `${DEF.SHARED.NAME}${ENTITY}`,
            ATTR,
            [ATTR.BID],
            Dto
        );
    }
}

