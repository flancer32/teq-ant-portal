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
     * @param {Fl32_Portal_Shared_Dto_Msg_Cover} dtoCover
     * @param {typeof Fl32_Portal_Shared_Enum_Msg_Type} TYPE
     */
    constructor(
        {
            TeqFw_Core_Shared_Api_Logger$$: logger,
            Fl32_Portal_Shared_Web_Api_Msg_Transmit$: endpoint,
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
         * @param {Fl32_Portal_Shared_Web_Api_Msg_Transmit.Request|Object} req
         * @param {Fl32_Portal_Shared_Web_Api_Msg_Transmit.Response|Object} res
         * @param {TeqFw_Web_Api_Back_Api_Service_Context} context
         * @returns {Promise<void>}
         */
        this.process = async function (req, res, context) {
            const trx = await conn.startTransaction();
            try {
                const letter = req.letter;
                logger.info(`Request '${JSON.stringify(letter.type)}' from '${JSON.stringify(letter.from)}' to '${JSON.stringify(letter.to)}'.`);
                const dto = rdbQueue.createDto();
                dto.body = letter.body;
                dto.date_expire = letter.dateExpire;
                dto.from_host = letter.from.host;
                dto.from_user = letter.from.user;
                dto.to_host = letter.to.host;
                dto.to_user = letter.to.user;
                dto.type = letter.type;
                dto.uuid = letter.uuid;
                const {[A_QUEUE.BID]: bid} = await crud.create(trx, rdbQueue, dto);
                await trx.commit();
                logger.info(`New message is registered as #${bid}.`);
                // TODO: validate host to receive the message
                const userUuid = letter.to.user;
                const streams = modRegistry.getStreams(userUuid);
                for (const stream of streams) {
                    if (stream) {
                        logger.info(`The stream '${stream.getStreamUuid()}' is found for user '${userUuid}'.`);
                        const cover = dtoCover.createDto();
                        cover.payload = letter;
                        cover.type = TYPE.LETTER;
                        stream.write(cover);
                        res.success = true;
                    }
                }
                logger.info(`Response: ${JSON.stringify(res)}`);
            } catch (error) {
                logger.error(error);
                await trx.rollback();
            }
        };
    }
}
