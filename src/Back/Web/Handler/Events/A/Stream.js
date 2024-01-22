/**
 * The factory converts the given HTTP response into an SSE stream and adds events handlers to the stream.
 */
// MODULE'S IMPORT
import {constants as H2} from 'node:http2';
import {randomUUID} from 'node:crypto';
// MODULE'S VARS
const {
    HTTP2_HEADER_CACHE_CONTROL,
    HTTP2_HEADER_CONTENT_TYPE,
    HTTP_STATUS_OK,
} = H2;

// MODULE'S CLASSES
export default class Fl32_Portal_Back_Web_Handler_Events_A_Stream {
    /**
     * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
     * @param {Fl32_Portal_Back_Mod_Events_Stream_Registry} modRegistry
     * @param {typeof Fl32_Portal_Back_Mod_Events_Stream} Stream
     */
    constructor(
        {
            TeqFw_Core_Shared_Api_Logger$$: logger,
            Fl32_Portal_Back_Mod_Events_Stream_Registry$: modRegistry,
            Fl32_Portal_Back_Mod_Events_Stream: Stream, // as a class
        }
    ) {
        this.create = function (httpResp, tabId) {
            // FUNCS
            /**
             * Write headers to SSE stream to start streaming.
             * @param {module:http.ServerResponse|module:http2.Http2ServerResponse} resp
             */
            function startStreaming(resp) {
                resp.writeHead(HTTP_STATUS_OK, {
                    [HTTP2_HEADER_CONTENT_TYPE]: 'text/event-stream',
                    [HTTP2_HEADER_CACHE_CONTROL]: 'no-cache',
                });
            }

            // MAIN
            const streamUuid = randomUUID();
            // add event listeners to the HTTP response
            httpResp.addListener('close', () => {
                modRegistry.delete(streamUuid);
                logger.info(`The SSE stream '${streamUuid}' for tab '${tabId}' is closed.`);
            });
            httpResp.addListener('error', (e) => {
                logger.error(`The stream '${streamUuid}' for tab '${tabId}' has an error: ${e}`);
            });
            //
            startStreaming(httpResp);
            logger.info(`The HTTP response for tab '${tabId}' is used as an SSE stream '${streamUuid}'.`);
            return new Stream(streamUuid, httpResp, tabId);
        };
    }

}