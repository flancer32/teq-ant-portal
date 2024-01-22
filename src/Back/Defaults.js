/**
 * Plugin constants (hardcoded configuration) for backend code.
 */
export default class Fl32_Portal_Back_Defaults {
    /** @type {TeqFw_Web_Back_Defaults} */
    MOD_WEB;

    /** @type {Fl32_Portal_Shared_Defaults} */
    SHARED;

    /**
     * @param {TeqFw_Web_Back_Defaults} MOD_WEB
     * @param {Fl32_Portal_Shared_Defaults} SHARED
     */
    constructor(
        {
            TeqFw_Web_Back_Defaults$: MOD_WEB,
            Fl32_Portal_Shared_Defaults$: SHARED,
        }
    ) {
        // DEPS
        this.MOD_WEB = MOD_WEB;
        this.SHARED = SHARED;
        // MAIN
        Object.freeze(this);
    }
}
