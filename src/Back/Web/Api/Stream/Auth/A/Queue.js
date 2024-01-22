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
     * @param {Fl32_Portal_Shared_Dto_Event_Cover} dtoCover
     * @param {typeof Fl32_Portal_Shared_Enum_Event_Type} TYPE
     */
    constructor(
        {
            TeqFw_Core_Shared_Api_Logger$$: logger,
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
                    const stream = modRegistry.getStream({userUuid});
                    logger.info(`Start the sending of '${all.length}' delayed messages to the user '${userUuid}'.`);
                    for (const one of all) {
                        const payload = dtoCover.createDto();
                        payload.type = TYPE.MESSAGE;
                        payload.data = one;
                        stream.write(payload);
                        logger.info(`The message '${one.uuid}' is sent to the user '${userUuid}'.`);
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