/**
 * A 'model' part of the widget that reflects the state of backend connection(s) as a LED indicator.
 *
 * @implements TeqFw_Web_Front_Api_Mod_Server_Connect_IState
 * @extends TeqFw_Ui_Quasar_Front_Mod_Server_Connect_State
 */
export default class Fl32_Portal_Front_Widget_Led_Connect_Model {
    /**
     * @param {TeqFw_Vue_Front_Ext_Vue} extVue
     * @param {TeqFw_Web_Front_Api_Mod_Server_Connect_IState} modState
     */
    constructor(
        {
            TeqFw_Vue_Front_Ext_Vue: extVue,
            TeqFw_Web_Front_Api_Mod_Server_Connect_IState$: modState,
        }
    ) {
        // VARS
        const {ref} = extVue.Vue;
        let _sse = ref(false); // the SSE connection is established


        // INSTANCE METHODS
        this.__proto__ = modState;

        this.getRefSse = () => _sse;

        this.setOffline = () => {
            this.__proto__.setOffline();
            _sse.value = false;
        };

        this.setSseOff = () => _sse.value = false;

        this.setSseOn = () => _sse.value = true;

    }
}
