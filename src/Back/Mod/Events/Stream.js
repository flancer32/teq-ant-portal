/**
 * The model contains all the necessary stuff to handle the SSE streams in the registry.
 */
export default class Fl32_Portal_Back_Mod_Events_Stream {
    /**
     * @param {string} streamUuid
     * @param {module:http.ServerResponse|module:http2.Http2ServerResponse} httpResp
     * @param {string} tabUuid
     */
    constructor(streamUuid, httpResp, tabUuid) {
        // VARS
        const _httpResp = httpResp;
        const _streamUuid = streamUuid;
        const _tabUuid = tabUuid;
        let _frontUuid;
        let _messageId = 1; // the first message is the start streaming message
        let _userUuid;

        // INSTANCE METHODS

        /**
         * Set UUIDs for authorized user & front.
         * @param {string} userUuid
         * @param {string} frontUuid
         */
        this.authorize = function (userUuid, frontUuid) {
            _frontUuid = frontUuid;
            _userUuid = userUuid;
        };

        this.getFrontUuid = () => _frontUuid;

        this.getStreamUuid = () => _streamUuid;

        this.getTabUuid = () => _tabUuid;

        this.getUserUuid = () => _userUuid;

        this.write = function (cover) {
            if (_httpResp.writable) {
                const json = JSON.stringify(cover);
                _httpResp.write(`data: ${json}\n\n`);
                _httpResp.write(`id: ${_messageId++}\n`);
                return true;
            } else {
                return false;
            }
        };
    }

}