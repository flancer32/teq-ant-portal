/**
 * The registry to store opened SSE streams.
 */
export default class Fl32_Portal_Back_Mod_Events_Stream_Registry {
    /**
     * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
     */
    constructor(
        {
            TeqFw_Core_Shared_Api_Logger$$: logger,
        }
    ) {
        // VARS
        /**
         * The user-to-streams mapping.
         * @type {Object<string, string[]>}
         */
        const _byFront = {};
        /**
         * The front-to-streams mapping.
         * @type {Object<string, string[]>}
         */
        const _byUser = {};
        /**
         * The main store for the streams.
         * @type {Object<string, Fl32_Portal_Back_Mod_Events_Stream>}
         * @private
         */
        const _store = {};

        // INSTANCE METHODS

        /**
         * Register just opened SSE stream.
         * @param {Fl32_Portal_Back_Mod_Events_Stream} stream
         */
        this.addStream = function (stream) {
            const streamUuid = stream.getStreamUuid();
            if (streamUuid) {
                if (!_store[streamUuid]) {
                    _store[streamUuid] = stream;
                } else {
                    logger.error(`Cannot register SSE stream '${streamUuid}', there is the stream with the same UUID in the registry.`);
                }
            }
        };

        this.authorize = function (userUuid, frontUuid, streamUuid) {
            const stream = _store[streamUuid];
            if (stream) {
                stream.authorize(userUuid, frontUuid);
                if (!_byUser[userUuid]) _byUser[userUuid] = [];
                _byUser[userUuid].push(streamUuid); // multiple streams per user
                if (!_byFront[frontUuid]) _byFront[frontUuid] = [];
                _byFront[frontUuid].push(streamUuid); // multiple streams per front
                logger.info(`The stream '${streamUuid}' is authorized for user '${userUuid}' and front '${frontUuid}'.`);
            } else logger.info(`The stream '${streamUuid}' is not found and cannot be authorized.`);
        };

        this.delete = function (streamUuid) {
            const stream = _store[streamUuid];
            if (stream) {
                // remove from `byUser` map
                logger.info('USER: ' + JSON.stringify(_byUser));
                const userUuid = stream.getUserUuid();
                if (Array.isArray(_byUser[userUuid])) {
                    const items = _byUser[userUuid];
                    const index = items.indexOf(streamUuid);
                    if (index !== -1) {
                        if (items.length === 1) delete _byUser[userUuid];
                        else items.splice(index, 1);
                        logger.info(`The user-to-stream mapping is deleted for user '${userUuid}' and stream '${streamUuid}'.`);
                    }
                }
                // remove from `byFront` map
                logger.info('FRONT: ' + JSON.stringify(_byFront));
                const frontUuid = stream.getFrontUuid();
                if (Array.isArray(_byFront[frontUuid])) {
                    const items = _byFront[frontUuid];
                    const index = items.indexOf(streamUuid);
                    if (index !== -1) {
                        if (items.length === 1) delete _byFront[frontUuid];
                        else items.splice(index, 1);
                        logger.info(`The front-to-stream mapping is deleted for front '${frontUuid}' and stream '${streamUuid}'.`);
                    }
                }
                // remove stream from the _store
                delete _store[streamUuid];
                logger.info(`The stream '${streamUuid}' is deleted.`);
            }
        };

        /**
         * Get one stream for the given identifier.
         * @param {string} streamUuid
         * @return {Fl32_Portal_Back_Mod_Events_Stream}
         */
        this.getStream = function (streamUuid) {
            return _store[streamUuid];
        };

        /**
         * Get al opened streams by user UUID.
         * @param {string} userUuid
         * @return {Fl32_Portal_Back_Mod_Events_Stream[]}
         */
        this.getStreams = function (userUuid) {
            const res = [];
            if (userUuid) {
                const ids = _byUser[userUuid];
                if (Array.isArray(ids))
                    for (const id of ids)
                        res.push(_store[id]);
            }
            return res;
        };

    }

}