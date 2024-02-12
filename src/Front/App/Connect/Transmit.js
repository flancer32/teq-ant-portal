/**
 * The connector sends messages to the host to transmit them to addressees.
 */
export default class Fl32_Portal_Front_App_Connect_Transmit {
    /**
     * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
     * @param {TeqFw_Core_Shared_Util_Date.addDays|function} addDays
     * @param {TeqFw_Web_Api_Front_Web_Connect} api
     * @param {Fl32_Portal_Shared_Web_Api_Msg_Transmit} endTrans
     * @param {Fl32_Portal_Shared_Dto_Msg_Type_Letter} dtoLetter
     */
    constructor(
        {
            TeqFw_Core_Shared_Api_Logger$$: logger,
            'TeqFw_Core_Shared_Util_Date.addDays': addDays,
            TeqFw_Web_Api_Front_Web_Connect$: api,
            Fl32_Portal_Shared_Web_Api_Msg_Transmit$: endTrans,
            Fl32_Portal_Shared_Dto_Msg_Type_Letter$: dtoLetter,
        }
    ) {

        // INSTANCE METHODS
        /**
         * @param {Object} msg
         * @param {Fl32_Portal_Shared_Dto_Msg_Address.Dto} from
         * @param {Fl32_Portal_Shared_Dto_Msg_Address.Dto} to
         * @param {string} type
         * @return {Promise<void>}
         */
        this.send = async function (msg, from, to, type) {
            logger.info(`Sending the '${type}' message to the host.`);
            const dto = dtoLetter.createDto();
            dto.body = JSON.stringify(msg);
            dto.dateExpire = addDays(7);
            dto.from = from;
            dto.to = to;
            dto.type = type;
            dto.uuid = self.crypto.randomUUID();
            const req = endTrans.createReq();
            req.letter = dto;
            const res = await api.send(req, endTrans);
            logger.info(`The '${type}' message to the host is sent: ${JSON.stringify(res)}`);
        };
    }
}