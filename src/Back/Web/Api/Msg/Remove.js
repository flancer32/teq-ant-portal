/**
 * Remove the message being processed on the front from the backend's queue.
 *
 * @implements TeqFw_Web_Api_Back_Api_Service
 */
export default class Fl32_Portal_Back_Web_Api_Msg_Remove {
    /**
     * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
     * @param {Fl32_Portal_Shared_Web_Api_Msg_Remove} endpoint
     * @param {TeqFw_Db_Back_RDb_IConnect} conn
     * @param {TeqFw_Db_Back_Api_RDb_CrudEngine} crud
     * @param {Fl32_Portal_Back_RDb_Schema_Msg_Queue} rdbQueue
     * @param {Fl32_Portal_Back_Mod_Events_Stream_Registry} modRegistry
     * @param {Fl32_Portal_Shared_Dto_Msg_Cover} dtoCover
     * @param {typeof Fl32_Portal_Shared_Enum_Msg_Type} TYPE
     */
    constructor(
        {
            TeqFw_Core_Shared_Api_Logger$$: logger,
            Fl32_Portal_Shared_Web_Api_Msg_Remove$: endpoint,
            TeqFw_Db_Back_RDb_IConnect$: conn,
            TeqFw_Db_Back_Api_RDb_CrudEngine$: crud,
            Fl32_Portal_Back_RDb_Schema_Msg_Queue$: rdbQueue,
            Fl32_Portal_Back_Mod_Events_Stream_Registry$: modRegistry,
            Fl32_Portal_Shared_Dto_Msg_Cover$: dtoCover,
            Fl32_Portal_Shared_Enum_Msg_Type$: TYPE,
        }
    ) {
        // VARS
        const A_QUEUE = rdbQueue.getAttributes();

        // INSTANCE METHODS

        this.getEndpoint = () => endpoint;

        this.init = async function () { };

        /**
         * @param {Fl32_Portal_Shared_Web_Api_Msg_Remove.Request|Object} req
         * @param {Fl32_Portal_Shared_Web_Api_Msg_Remove.Response|Object} res
         * @param {TeqFw_Web_Api_Back_Api_Service_Context} context
         * @returns {Promise<void>}
         */
        this.process = async function (req, res, context) {
            const trx = await conn.startTransaction();
            try {
                // TODO: add request authorization here (by user UUID)
                if (req.messageUuid) {
                    const key = {[A_QUEUE.UUID]: req.messageUuid};
                    const removed = await crud.deleteOne(trx, rdbQueue, key);
                    if (removed) res.success = true;
                }
                await trx.commit();
                logger.info(`Response: ${JSON.stringify(res)}`);
            } catch (error) {
                logger.error(error);
                await trx.rollback();
            }
        };
    }
}
