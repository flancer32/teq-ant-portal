/**
 * A 'view' part of the widget that reflects the state of backend connection(s) as a LED indicator.
 *
 * @namespace Fl32_Portal_Front_Widget_Led_Connect_View
 */
// MODULE'S VARS
const NS = 'Fl32_Portal_Front_Widget_Led_Connect_View';
// Quasar codes for colors
const Q_COLOR_AJAX = 'lime';
const Q_COLOR_OFF = 'grey';
const Q_COLOR_ON = 'yellow';
const Q_COLOR_SSE = 'light-green';

// MODULE'S FUNCTIONS
/**
 * TeqFW DI factory function to get dependencies for the object.
 *
 * @param {Fl32_Portal_Front_Defaults} DEF
 * @param {Fl32_Portal_Front_Widget_Led_Connect_Model} modState
 *
 * @returns {Fl32_Portal_Front_Widget_Led_Connect_View.vueCompTmpl}
 */
export default function (
    {
        Fl32_Portal_Front_Defaults$: DEF,
        Fl32_Portal_Front_Widget_Led_Connect_Model$: modState,
    }) {
    // VARS
    const _refActive = modState.getRefActive();
    const _refOnline = modState.getRefOnline();
    const _refSse = modState.getRefSse();
    const template = `
<div>
    <q-btn dense flat round icon="lens" :size="uiSize" :color="uiColor" />
</div>
`;
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Portal_Front_Widget_Led_Connect_View
     */
    return {
        teq: {package: DEF.SHARED.NAME},
        name: NS,
        template,
        props: {
            size: null,
        },
        computed: {
            uiColor() {
                if (_refOnline.value)
                    if (_refActive.value) return Q_COLOR_AJAX;
                    else if (_refSse.value) return Q_COLOR_SSE;
                    else return Q_COLOR_ON;
                else return Q_COLOR_OFF;
            },
            uiSize() {
                return this.size ?? 'sm';
            },
        },
    };
}
