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
     * @param {Fl32_Auth_Back_Act_User_GetAllFronts} actGetAllFronts
     * @param {TeqFw_Web_Push_Back_Act_Subscript_SendMsg.act|function} actSend
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
            Fl32_Auth_Back_Act_User_GetAllFronts$: actGetAllFronts,
            TeqFw_Web_Push_Back_Act_Subscript_SendMsg$: actSend,
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
            // FUNCS

            /**
             * Save new message to the queue.
             * @param { TeqFw_Db_Back_RDb_ITrans} trx
             * @param {Fl32_Portal_Shared_Dto_Msg_Type_Letter.Dto} letter
             * @return {Promise<number>}
             */
            async function pushNotification(trx, letter) {
                let res = 0;
                const uuid = letter.to.user;
                const fronts = await actGetAllFronts.act({trx, uuid});
                const title = `New message in PerCom.`;
                const body = `You have a new '${letter.type}' message from '${letter.from.user}'.`;
                for (const front of fronts) {
                    const {code} = await actSend({trx, title, body, frontId: front.bid});
                    if (code) {
                        res++;
                        logger.info(`The WebPush notification is sent to the front '${front.uuid}' for user '${uuid}'.`);
                    }
                }
                return res;
            }

            /**
             * Save new message to the queue.
             * @param { TeqFw_Db_Back_RDb_ITrans} trx
             * @param {Fl32_Portal_Shared_Dto_Msg_Type_Letter.Dto} letter
             * @return {Promise<number>}
             */
            async function registerMessage(trx, letter) {
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
                return bid;
            }

            /**
             * Send message to receiver with SSE.
             * @param {Fl32_Portal_Back_Mod_Events_Stream[]} streams
             * @param {Fl32_Portal_Shared_Dto_Msg_Type_Letter.Dto} letter
             */
            function writeStreams(streams, letter) {
                let res = 0;
                const userUuid = letter.to.user;
                for (const stream of streams) {
                    if (stream) {
                        logger.info(`The stream '${stream.getStreamUuid()}' is found for user '${userUuid}'.`);
                        const cover = dtoCover.createDto();
                        cover.payload = letter;
                        cover.type = TYPE.LETTER;
                        stream.write(cover);
                        res++;
                    }
                }
                return res;
            }

            // MAIN
            const trx = await conn.startTransaction();
            try {
                const letter = req.letter;
                logger.info(`Request '${JSON.stringify(letter.type)}' from '${JSON.stringify(letter.from)}' to '${JSON.stringify(letter.to)}'.`);
                if (!letter.immediate) {
                    const bid = await registerMessage(trx, letter);
                    logger.info(`New message is registered as #${bid}.`);
                    res.isStored = true;
                }
                // TODO: validate host to receive the message
                const streams = modRegistry.getStreams(letter.to.user);
                if (streams.length) {
                    const sent = writeStreams(streams, letter);
                    res.isTransmitted = (sent > 0);
                } else {
                    // there is no opened SSE streams to the receiver, use Push API
                    if (!letter.immediate) {
                        const sent = await pushNotification(trx, letter);
                        res.isNotified = (sent > 0);
                    }
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
