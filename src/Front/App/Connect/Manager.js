/**
 * This manager opens the SSE connection, monitors its state, and re-opens it if it is closed by the server
 * or due to network errors.
 */
export default class Fl32_Portal_Front_App_Connect_Manager {
    /**
     * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
     * @param {Fl32_Portal_Front_App_Connect_Receive} portIn
     * @param {Fl32_Portal_Front_Widget_Led_Connect_Model} modConnect
     */
    constructor(
        {
            TeqFw_Core_Shared_Api_Logger$$: logger,
            Fl32_Portal_Front_App_Connect_Receive$: portIn,
            Fl32_Portal_Front_Widget_Led_Connect_Model$: modConnect,
        }
    ) {
        // VARS
        const INTERVAL_CHECK_OPENED = 5000; // 5 sec
        const INTERVAL_TO_SWITCH = 120000; // 2 min
        const TIMEOUT_FAST = 5000; // 5 sec
        const TIMEOUT_NORM = 60000; // 1 min
        let _frequent = true; // retry every 5 sec or every 1 min
        let _idOpened; // save ID for running opened state watchdog
        let _idReopen; // save ID for running re-open watchdog
        let _isOpened = false; // 'true' if reverse stream is opened
        /** @type {Date} */
        let _timeStarted; // save watchdog starting time to select wait interval (5 sec or 1 min)

        // FUNCS

        function stopWatchOpened() {
            if (_idOpened) { // stop the opened state watcher
                clearInterval(_idOpened);
                _idOpened = null;
                logger.info(`The opened state watcher is stopped.`);
            }
        }

        function stopWatchReopen() {
            if (_idReopen) {
                clearInterval(_idReopen);
                _idReopen = null;
                logger.info(`The re-opening watcher is stopped.`);
            }
        }

        /**
         * Watch the opened connection to see if it is still opened and start the reopen watchdog if it is closed.
         */
        function watchOpened() {
            // clean up existing watchdog function on SSE opening
            _isOpened = true;
            modConnect.setSseOn();
            stopWatchOpened();
            // start new watchdog function to monitor the state of the SSE
            _idOpened = setInterval(() => {
                if (portIn.isClosed()) {
                    // we need to start the process to re-open the connection (frequently)
                    _isOpened = false;
                    modConnect.setSseOff();
                    if (!_idReopen) {
                        logger.info(`The SSE connection is closed. Start the re-opening watcher.`);
                        _frequent = true;
                        _timeStarted = new Date();
                        _idReopen = setInterval(watchReopen, TIMEOUT_FAST);
                        logger.info(`The re-opening watcher is started in frequent watch mode.`);
                        watchReopen(); // try to reopen SSE in the first time
                    } else {
                        logger.info(`The SSE connection is closed but the re-opening watcher is already running.`);
                    }
                }
            }, INTERVAL_CHECK_OPENED);
            logger.info(`The opened state watcher is started.`);
        }

        /**
         * Watchdog function to re-open the connection if it is closed.
         */
        function watchReopen() {
            if (_isOpened) stopWatchReopen(); // stop re-open watchdog if stream is opened
            else {
                if (_frequent) {
                    // frequent retries
                    const now = new Date();
                    if ((now.getTime() - _timeStarted.getTime()) > INTERVAL_TO_SWITCH) {
                        // switch to normal retries
                        clearInterval(_idReopen);
                        _idReopen = setInterval(watchReopen, TIMEOUT_NORM);
                        _frequent = false;
                        logger.info(`The re-opening watcher is switched into rare watch mode.`);
                    }
                }
                if (window.navigator.onLine) {
                    portIn.open({onOpen: watchOpened}).catch(logger.error);
                    logger.info(`Try to open the SSE connection`);
                }
            }
        }

        // INSTANCE'S METHODS

        /**
         * Open the SSE connection and start the state monitoring.
         */
        this.start = function () {
            portIn.open({onOpen: watchOpened}).catch(logger.error);
        };

    }
}