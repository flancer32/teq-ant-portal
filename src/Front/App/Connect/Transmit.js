/**
 * The connector sends messages to the host to transmit them to addressees.
 */
export default class Fl32_Portal_Front_App_Connect_Transmit {
    /**
     * @param {Fl32_Portal_Front_Defaults} DEF
     * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
     * @param {TeqFw_Core_Shared_Util_Date.addDays|function} addDays
     * @param {TeqFw_Web_Api_Front_Web_Connect} api
     * @param {Fl32_Portal_Shared_Web_Api_Msg_Transmit} endTrans
     */
    constructor(
        {
            Fl32_Portal_Front_Defaults$: DEF,
            TeqFw_Core_Shared_Api_Logger$$: logger,
            'TeqFw_Core_Shared_Util_Date.addDays': addDays,
            TeqFw_Web_Api_Front_Web_Connect$: api,
            Fl32_Portal_Shared_Web_Api_Msg_Transmit$: endTrans,
        }
    ) {

        // INSTANCE'S METHODS
        this.send = async function (msg, to, from) {
            logger.info(`Sending the message to the host.`);
            const req = endTrans.createReq();
            req.body = msg;
            req.dateExpire = addDays(7);
            req.from = from;
            req.to = to;
            req.uuid = self.crypto.randomUUID();
            const res = await api.send(req, endTrans);
            logger.info(`The message to the host is sent: ${JSON.stringify(res)}`);
        };
    }
}