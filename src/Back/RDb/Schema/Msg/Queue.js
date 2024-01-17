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
     * Universal ID among all hosts.
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
     * @param {TeqFw_Core_Shared_Util_Cast} util
     */
    constructor(
        {
            Fl32_Portal_Back_Defaults$: DEF,
            TeqFw_Db_Back_RDb_Schema_EntityBase$: base,
            TeqFw_Core_Shared_Util_Cast$: util,
        }
    ) {
        // INSTANCE METHODS
        /**
         * @param {Fl32_Portal_Back_RDb_Schema_Msg_Queue.Dto} [data]
         * @return {Fl32_Portal_Back_RDb_Schema_Msg_Queue.Dto}
         */
        this.createDto = function (data) {
            const res = new Dto();
            res.bid = util.castInt(data?.bid);
            res.uuid = util.castString(data?.uuid);
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

