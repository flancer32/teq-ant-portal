/**
 * The web server handler to open SSE connections.
 */
// MODULE'S IMPORT
import {constants as H2} from 'node:http2';

// MODULE'S VARS
const {
    HTTP2_METHOD_GET,
} = H2;


// MODULE'S CLASSES
// noinspection JSClosureCompilerSyntax
/**
 * @implements TeqFw_Web_Back_Api_Dispatcher_IHandler
 */
export default class Fl32_Portal_Back_Web_Handler_Events {
    /**
     * @param {Fl32_Portal_Back_Defaults} DEF
     * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
     * @param {Fl32_Portal_Back_Mod_Events_Stream_Registry} modRegistry
     * @param {Fl32_Portal_Shared_Dto_Msg_Type_Authenticate} dtoAuth
     * @param {Fl32_Portal_Shared_Dto_Msg_Cover} dtoCover
     * @param {Fl32_Portal_Back_Web_Handler_Events_A_Stream} aStream
     * @param {typeof Fl32_Portal_Shared_Enum_Msg_Type} TYPE
     */
    constructor(
        {
            Fl32_Portal_Back_Defaults$: DEF,
            TeqFw_Core_Shared_Api_Logger$$: logger,
            Fl32_Portal_Back_Mod_Events_Stream_Registry$: modRegistry,
            Fl32_Portal_Shared_Dto_Msg_Type_Authenticate$: dtoAuth,
            Fl32_Portal_Shared_Dto_Msg_Cover$: dtoCover,
            Fl32_Portal_Back_Web_Handler_Events_A_Stream$: aStream,
            Fl32_Portal_Shared_Enum_Msg_Type$: TYPE,
        }
    ) {

        // FUNCS
        /**
         * Process HTTP request if not processed before.
         * @param {module:http.IncomingMessage|module:http2.Http2ServerRequest} req
         * @param {module:http.ServerResponse|module:http2.Http2ServerResponse} res
         * @memberOf Fl32_Portal_Back_Web_Handler_Events
         */
        async function process(req, res) {
            // FUNCS

            /**
             * Extract and return tabID (https://.../tabId).
             * Length of UUID v4 is 36 chars.
             * @param {string} url
             * @return {string}
             */
            function getTabId(url) {
                const parts = url.split('/');
                const sessionRaw = parts.pop();
                return ((typeof sessionRaw === 'string') && sessionRaw.length === 36) ? sessionRaw : null;
            }

            // MAIN
            /** @type {Object} */
            const shares = res[DEF.MOD_WEB.HNDL_SHARE];
            if (!res.headersSent && !shares[DEF.MOD_WEB.SHARE_RES_STATUS]) {
                const tabId = getTabId(req.url);
                logger.info(`SSE request is detected: ${tabId}`);
                const stream = aStream.create(res, tabId);
                modRegistry.addStream(stream);
                const auth = dtoAuth.createDto();
                auth.streamUuid = stream.getStreamUuid();
                const cover = dtoCover.createDto();
                cover.type = TYPE.AUTHENTICATE;
                cover.payload = auth;
                stream.write(cover);
            }
        }

        // INSTANCE METHODS

        this.getProcessor = () => process;

        this.init = async function () { };

        this.canProcess = function ({method, address} = {}) {
            return (
                (method === HTTP2_METHOD_GET)
                && (address?.space === DEF.SHARED.SPACE_STREAM_OPEN)
            );
        };
    }
}
