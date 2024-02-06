/**
 * Authorize the SSE stream to be owned by a certain user/front.
 *
 * @implements TeqFw_Web_Api_Back_Api_Service
 */
export default class Fl32_Portal_Back_Web_Api_Stream_Auth {
    /**
     * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
     * @param {Fl32_Portal_Shared_Web_Api_Stream_Auth} endpoint
     * @param {TeqFw_Db_Back_RDb_IConnect} conn
     * @param {Fl32_Auth_Shared_Api_Crypto_Scrambler} modScrambler
     * @param {Fl32_Portal_Shared_Mod_Stream_Signature} modSignature
     * @param {Fl32_Portal_Back_Mod_Events_Stream_Registry} modRegistry
     * @param {Fl32_Auth_Back_Act_User_Read} actUserRead
     * @param {Fl32_Auth_Back_Act_Session_Register} actSessReg
     * @param {Fl32_Portal_Back_Web_Api_Stream_Auth_A_Queue} aQueue
     */
    constructor(
        {
            TeqFw_Core_Shared_Api_Logger$$: logger,
            Fl32_Portal_Shared_Web_Api_Stream_Auth$: endpoint,
            TeqFw_Db_Back_RDb_IConnect$: conn,
            Fl32_Auth_Shared_Api_Crypto_Scrambler$: modScrambler,
            Fl32_Portal_Shared_Mod_Stream_Signature$: modSignature,
            Fl32_Portal_Back_Mod_Events_Stream_Registry$: modRegistry,
            Fl32_Auth_Back_Act_User_Read$: actUserRead,
            Fl32_Auth_Back_Act_Session_Register$: actSessReg,
            Fl32_Portal_Back_Web_Api_Stream_Auth_A_Queue$: aQueue,
        }
    ) {
        // VARS

        // INSTANCE METHODS

        this.getEndpoint = () => endpoint;

        this.init = async function () { };

        /**
         * @param {Fl32_Portal_Shared_Web_Api_Stream_Auth.Request|Object} req
         * @param {Fl32_Portal_Shared_Web_Api_Stream_Auth.Response|Object} res
         * @param {TeqFw_Web_Api_Back_Api_Service_Context} context
         * @returns {Promise<void>}
         */
        this.process = async function (req, res, context) {
            const trx = await conn.startTransaction();
            try {
                const front = req.frontUuid;
                const signed = req.message;
                const uuid = req.userUuid;
                logger.info(`Authorize opened SSE stream for user ${uuid}, front ${front}.`);
                /** @type {Fl32_Auth_Back_RDb_Schema_User.Dto} */
                const found = await actUserRead.act({trx, uuid});
                if (found) {
                    const pub = found.key_verify;
                    const signature = modScrambler.verify(signed, pub);
                    const {userUuid, frontUuid, tabUuid, streamUuid} = modSignature.decompose(signature);
                    // TODO: should we use `tabUuid` in the authorization process?
                    modRegistry.authorize(userUuid, frontUuid, streamUuid);
                    await actSessReg.act({trx, userUuid, frontUuid});
                    res.success = true;
                    aQueue.processDelayed(userUuid).catch(logger.error);
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
