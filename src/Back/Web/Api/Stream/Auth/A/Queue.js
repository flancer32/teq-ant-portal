/**
 * The local helper (AZ-order) to perform operations with the messages queue in RDB.
 */
export default class Fl32_Portal_Back_Web_Api_Stream_Auth_A_Queue {
    /**
     * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
     * @param {TeqFw_Db_Back_RDb_IConnect} conn
     * @param {TeqFw_Db_Back_Api_RDb_CrudEngine} crud
     * @param {Fl32_Portal_Back_RDb_Schema_Msg_Queue} rdbQueue
     * @param {Fl32_Portal_Back_Mod_Events_Stream_Registry} modRegistry
     * @param {Fl32_Portal_Shared_Dto_Msg_Cover} dtoCover
     * @param {Fl32_Portal_Shared_Dto_Msg_Type_Letter} dtoLetter
     * @param {typeof Fl32_Portal_Shared_Enum_Msg_Type} TYPE
     */
    constructor(
        {
            TeqFw_Core_Shared_Api_Logger$$: logger,
            TeqFw_Db_Back_RDb_IConnect$: conn,
            TeqFw_Db_Back_Api_RDb_CrudEngine$: crud,
            Fl32_Portal_Back_RDb_Schema_Msg_Queue$: rdbQueue,
            Fl32_Portal_Back_Mod_Events_Stream_Registry$: modRegistry,
            Fl32_Portal_Shared_Dto_Msg_Cover$: dtoCover,
            Fl32_Portal_Shared_Dto_Msg_Type_Letter$: dtoLetter,
            Fl32_Portal_Shared_Enum_Msg_Type$: TYPE,
        }
    ) {
        // VARS
        const A_QUEUE = rdbQueue.getAttributes();

        // INSTANCE'S METHODS
        /**
         * Send all delayed messages from the queue to the given user.
         * @param {string} userUuid
         * @return {Promise<void>}
         */
        this.processDelayed = async function (userUuid) {
            const trx = await conn.startTransaction();
            try {
                const where = {[A_QUEUE.TO_USER]: userUuid};
                /** @type {Fl32_Portal_Back_RDb_Schema_Msg_Queue.Dto[]} */
                const all = await crud.readSet(trx, rdbQueue, where);
                if (all.length) {
                    logger.info(`Start the sending of '${all.length}' delayed messages to the user '${userUuid}'.`);
                    const streams = modRegistry.getStreams(userUuid);
                    for (const one of all) {
                        const letter = dtoLetter.createDto();
                        letter.body = one.body;
                        letter.dateExpire = one.date_expire;
                        letter.from.host = one.from_host;
                        letter.from.user = one.from_user;
                        letter.to.host = one.to_host;
                        letter.to.user = one.to_user;
                        letter.type = one.type;
                        letter.uuid = one.uuid;
                        const cover = dtoCover.createDto();
                        cover.payload = letter;
                        cover.type = TYPE.LETTER;
                        for (const stream of streams) {
                            stream.write(cover);
                            logger.info(`The message '${one.uuid}' is sent to the user '${userUuid}', stream ${stream.getStreamUuid()}.`);
                        }
                    }
                }
                await trx.commit();
            } catch (error) {
                logger.error(error);
                await trx.rollback();
            }
        };
    }

}