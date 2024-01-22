/**
 * Receive the message from the sender and save it in the queue to transmit to the receiver.
 *
 * @implements TeqFw_Web_Api_Back_Api_Service
 */
export default class Fl32_Portal_Back_Web_Api_Msg_Transmit {
    /**
     * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
     * @param {Fl32_Portal_Shared_Web_Api_Msg_Transmit} endpoint
     * @param {TeqFw_Db_Back_RDb_IConnect} conn
     * @param {TeqFw_Db_Back_Api_RDb_CrudEngine} crud
     * @param {Fl32_Portal_Back_RDb_Schema_Msg_Queue} rdbQueue
     * @param {Fl32_Portal_Back_Mod_Events_Stream_Registry} modRegistry
     * @param {Fl32_Portal_Shared_Dto_Event_Cover} dtoCover
     * @param {typeof Fl32_Portal_Shared_Enum_Event_Type} TYPE
     */
    constructor(
        {
            TeqFw_Core_Shared_Api_Logger$$: logger,
            Fl32_Portal_Shared_Web_Api_Msg_Transmit$: endpoint,
            TeqFw_Db_Back_RDb_IConnect$: conn,
            TeqFw_Db_Back_Api_RDb_CrudEngine$: crud,
            Fl32_Portal_Back_RDb_Schema_Msg_Queue$: rdbQueue,
            Fl32_Portal_Back_Mod_Events_Stream_Registry$: modRegistry,
            Fl32_Portal_Shared_Dto_Event_Cover$: dtoCover,
            Fl32_Portal_Shared_Enum_Event_Type$: TYPE,
        }
    ) {
        // VARS
        const A_QUEUE = rdbQueue.getAttributes();

        // INSTANCE METHODS

        this.getEndpoint = () => endpoint;

        this.init = async function () { };

        /**
         * @param {Fl32_Portal_Shared_Web_Api_Msg_Transmit.Request|Object} req
         * @param {Fl32_Portal_Shared_Web_Api_Msg_Transmit.Response|Object} res
         * @param {TeqFw_Web_Api_Back_Api_Service_Context} context
         * @returns {Promise<void>}
         */
        this.process = async function (req, res, context) {
            const trx = await conn.startTransaction();
            try {
                logger.info(`Request: ${JSON.stringify(req)}`);
                const dto = rdbQueue.createDto();
                dto.body = req.body;
                dto.date_expire = req.dateExpire;
                dto.from_host = req.from.host;
                dto.from_user = req.from.user;
                dto.to_host = req.to.host;
                dto.to_user = req.to.user;
                dto.uuid = req.uuid;
                const {[A_QUEUE.BID]: bid} = await crud.create(trx, rdbQueue, dto);
                await trx.commit();
                logger.info(`New message is registered as #${bid}.`);
                // TODO: validate host to receive the message
                const userUuid = req.to.user;
                const stream = modRegistry.getStream({userUuid});
                if (stream) {
                    logger.info(`The stream '${stream.getStreamUuid()}' is found for user '${userUuid}'.`);
                    const payload = dtoCover.createDto();
                    payload.type = TYPE.MESSAGE;
                    payload.data = dto;
                    stream.write(payload);
                    res.success = true;
                }
                logger.info(`Response: ${JSON.stringify(res)}`);
            } catch (error) {
                logger.error(error);
                await trx.rollback();
            }
        };
    }
}
