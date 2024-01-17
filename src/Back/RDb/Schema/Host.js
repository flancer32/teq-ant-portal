/**
 *  Metadata for RDB entity: the host registry.
 *  @namespace Fl32_Portal_Back_RDb_Schema_Host
 */
// MODULE'S VARS
const NS = 'Fl32_Portal_Back_RDb_Schema_Host';
/**
 * Path to the entity in plugin's DEM.
 * @type {string}
 */
const ENTITY = '/fl32/portal/host';

/**
 * @memberOf Fl32_Portal_Back_RDb_Schema_Host
 * @type {Object}
 */
const ATTR = {
    BID: 'bid',
    DATE_CREATED: 'date_created',
    ENABLED: 'enabled',
    KEY_PUB: 'key_pub',
    UUID: 'uuid',
};
Object.freeze(ATTR);

// MODULE'S CLASSES
/**
 * @memberOf Fl32_Portal_Back_RDb_Schema_Host
 */
class Dto {
    static namespace = NS;
    /**
     * Backend ID for the object.
     * @type {number}
     */
    bid;
    /**
     * UTC date-time for host registration.
     * @type {Date}
     */
    date_created;
    /**
     * @type {boolean}
     */
    enabled;
    /**
     * Public key for encryption and signature verification.
     * @type {string}
     */
    key_pub;
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
export default class Fl32_Portal_Back_RDb_Schema_Host {
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
         * @param {Fl32_Portal_Back_RDb_Schema_Host.Dto} [data]
         * @return {Fl32_Portal_Back_RDb_Schema_Host.Dto}
         */
        this.createDto = function (data) {
            const res = new Dto();
            res.bid = util.castInt(data?.bid);
            res.date_created = util.castDate(data?.date_created);
            res.enabled = util.castBoolean(data?.enabled);
            res.key_pub = util.castString(data?.key_pub);
            res.uuid = util.castString(data?.uuid);
            return res;
        };

        /**
         * Set JSDoc return type, real code is in `TeqFw_Db_Back_RDb_Schema_EntityBase`.
         * @return {typeof Fl32_Portal_Back_RDb_Schema_Host.ATTR}
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

