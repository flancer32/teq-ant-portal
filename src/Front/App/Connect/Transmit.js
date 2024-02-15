/**
 * The connector sends messages to the host to transmit them to addressees.
 */
export default class Fl32_Portal_Front_App_Connect_Transmit {
    /**
     * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
     * @param {TeqFw_Core_Shared_Util_Date.addDays|function} addDays
     * @param {TeqFw_Web_Api_Front_Web_Connect} api
     * @param {Fl32_Portal_Shared_Web_Api_Msg_Transmit} endTrans
     * @param {Fl32_Portal_Shared_Api_Spy_Provide_Scrambler} provider
     * @param {Fl32_Portal_Shared_Dto_Msg_Type_Letter} dtoLetter
     */
    constructor(
        {
            TeqFw_Core_Shared_Api_Logger$$: logger,
            'TeqFw_Core_Shared_Util_Date.addDays': addDays,
            TeqFw_Web_Api_Front_Web_Connect$: api,
            Fl32_Portal_Shared_Web_Api_Msg_Transmit$: endTrans,
            Fl32_Portal_Shared_Api_Spy_Provide_Scrambler$: provider,
            Fl32_Portal_Shared_Dto_Msg_Type_Letter$: dtoLetter,
        }
    ) {

        // INSTANCE METHODS
        /**
         * @param {Object} msg
         * @param {Fl32_Portal_Shared_Dto_Msg_Address.Dto} from
         * @param {Fl32_Portal_Shared_Dto_Msg_Address.Dto} to
         * @param {string} type
         * @return {Promise<Fl32_Portal_Shared_Web_Api_Msg_Transmit.Response>}
         */
        this.send = async function (msg, from, to, type) {
            const uuid = self.crypto.randomUUID();
            logger.info(`Sending the ${uuid} message of type ${type} to the server.`);
            const dto = dtoLetter.createDto();
            const plain = JSON.stringify(msg);
            const scrambler = await provider.provide(from, to);
            debugger
            if (scrambler) dto.body = scrambler.encrypt(plain);
            else dto.body = plain;
            dto.dateExpire = addDays(7);
            dto.from = from;
            dto.to = to;
            dto.type = type;
            dto.uuid = uuid;
            const req = endTrans.createReq();
            req.letter = dto;
            const res = await api.send(req, endTrans);
            logger.info(`The message of type '${type}' has been transmitted to the server: ${JSON.stringify(res)}`);
            return res;
        };
    }
}