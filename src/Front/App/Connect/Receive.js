/**
 * The connector opens the SSE channel to get messages.
 */
export default class Fl32_Portal_Front_App_Connect_Receive {
    /**
     * @param {Fl32_Portal_Front_Defaults} DEF
     * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
     * @param {TeqFw_Web_Api_Front_Web_Connect} api
     * @param {Fl32_Portal_Shared_Web_Api_Stream_Auth} endAuth
     * @param {Fl32_Portal_Shared_Web_Api_Msg_Remove} endRemove
     * @param {Fl32_Auth_Front_Mod_Session} modSession
     * @param {Fl32_Portal_Front_Mod_TabUuid} modTabUuid
     * @param {Fl32_Portal_Front_Mod_Msg_Dispatcher} dispatcher
     * @param {Fl32_Auth_Shared_Api_Crypto_Scrambler} modScrambler
     * @param {Fl32_Portal_Shared_Mod_Stream_Signature} modSignature
     * @param {Fl32_Portal_Shared_Dto_Msg_Type_Authenticate} dtoAuth
     * @param {Fl32_Portal_Shared_Dto_Msg_Type_Letter} dtoLetter
     * @param {typeof Fl32_Portal_Shared_Enum_Msg_Type} TYPE
     */
    constructor(
        {
            Fl32_Portal_Front_Defaults$: DEF,
            TeqFw_Core_Shared_Api_Logger$$: logger,
            TeqFw_Web_Api_Front_Web_Connect$: api,
            Fl32_Portal_Shared_Web_Api_Stream_Auth$: endAuth,
            Fl32_Portal_Shared_Web_Api_Msg_Remove$: endRemove,
            Fl32_Auth_Front_Mod_Session$: modSession,
            Fl32_Portal_Front_Mod_TabUuid$: modTabUuid,
            Fl32_Portal_Front_Mod_Msg_Dispatcher$: dispatcher,
            Fl32_Auth_Shared_Api_Crypto_Scrambler$: modScrambler,
            Fl32_Portal_Shared_Mod_Stream_Signature$: modSignature,
            Fl32_Portal_Shared_Dto_Msg_Type_Authenticate$: dtoAuth,
            Fl32_Portal_Shared_Dto_Msg_Type_Letter$: dtoLetter,
            Fl32_Portal_Shared_Enum_Msg_Type$: TYPE,
        }
    ) {
        // VARS
        /** @type {EventSource} */
        let _source;
        const URL = `./${DEF.SHARED.SPACE_STREAM_OPEN}`;

        // FUNCS

        /**
         * Sign identification data and send the signature to the back.
         * @param {Fl32_Portal_Shared_Dto_Msg_Type_Authenticate.Dto} dto
         * @return {Promise<void>}
         */
        async function hndlMsgAuth(dto) {
            const frontUuid = modSession.getFrontUuid();
            const streamUuid = dto.streamUuid;
            const tabUuid = modTabUuid.get();
            const userUuid = modSession.getUserUuid();
            const textToSign = modSignature.compose(userUuid, frontUuid, tabUuid, streamUuid);
            const keys = modSession.getUser().keysSign;
            const signed = modScrambler.sign(textToSign, keys.secret);
            const req = endAuth.createReq();
            req.frontUuid = frontUuid;
            req.message = signed;
            req.userUuid = userUuid;
            /** @type {Fl32_Portal_Shared_Web_Api_Stream_Auth.Response} */
            const res = await api.send(req, endAuth);
            const info = `user '${userUuid}', front '${frontUuid}', tab '${tabUuid}'`;
            if (res.success) {
                logger.info(`The SSE stream is authorized for ${info}.`);
            } else {
                logger.error(`Cannot authorize the SSE stream  for ${info}.`);
            }
        }

        /**
         * Use the Dispatcher to process incoming message (letter).
         * @param {Fl32_Portal_Shared_Dto_Msg_Type_Letter.Dto}dto
         * @return {Promise<void>}
         */
        async function hndlMsgLetter(dto) {
            // don't trace the body - it is encrypted.
            logger.info(`Message ${dto.uuid} of type ${dto.type} is received from ${JSON.stringify(dto.from)}`);
            const event = new Event(dto.type);
            event[DEF.A_LETTER] = dto;
            dispatcher.dispatchEvent(event);
        }

        // INSTANCE METHODS

        /**
         * @return {boolean}
         */
        this.isClosed = function () {
            return _source.readyState === EventSource.CLOSED;
        };

        /**
         * @param {function} onOpen - callback function to run when SSE connection is opened
         * @return {Promise<void>}
         */
        this.open = async function ({onOpen} = {}) {
            const tabId = modTabUuid.get();
            const url = `${URL}/${tabId}`;
            logger.info(`Open the SSE stream for tab '${tabId}'.`);
            _source = new EventSource(url);
            _source.addEventListener('message', (message) => {
                try {
                    const data = message.data;
                    if (data) {
                        /** @type {Fl32_Portal_Shared_Dto_Msg_Cover.Dto} */
                        const cover = JSON.parse(data);
                        if (cover.type === TYPE.AUTHENTICATE) {
                            const dto = dtoAuth.createDto(cover.payload);
                            hndlMsgAuth(dto);
                        } else if (cover.type === TYPE.LETTER) {
                            const dto = dtoLetter.createDto(cover.payload);
                            hndlMsgLetter(dto);
                        } else logger.error(`Unknown portal message: ${message.data}`);
                    } else {
                        logger.info(`Event: ${JSON.stringify(data)}`);
                    }
                } catch (e) {
                    logger.error(e);
                }
            });
            _source.addEventListener('open', () => {
                if (typeof onOpen === 'function') onOpen();
            });
        };

        /**
         * Send a signal to the backend to remove the processed message from the queue.
         * @param {string} messageUuid
         * @return {Promise<void>}
         */
        this.removeMessage = async function (messageUuid) {
            const req = endRemove.createReq();
            req.messageUuid = messageUuid;
            req.userUuid = modSession.getUserUuid();
            /** @type {Fl32_Portal_Shared_Web_Api_Msg_Remove.Response} */
            const res = await api.send(req, endRemove);
            if (res?.success) {
                logger.info(`The message '${messageUuid}' is removed on the back.`);
            } else {
                logger.error(`The message '${messageUuid}' is not removed on the back.`);
            }
        };
    }
}