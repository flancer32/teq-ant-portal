/**
 * Plugin constants (hardcoded configuration) for backend code.
 */
export default class Fl32_Portal_Back_Defaults {
    /** @type {Fl32_Portal_Shared_Defaults} */
    SHARED;

    /**
     * @param {Fl32_Portal_Shared_Defaults} SHARED
     */
    constructor(
        {
            Fl32_Portal_Shared_Defaults$: SHARED,
        }
    ) {
        // DEPS
        this.SHARED = SHARED;
        // MAIN
        Object.freeze(this);
    }
}
