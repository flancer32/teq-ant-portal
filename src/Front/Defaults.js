/**
 * Plugin constants (hardcoded configuration) for frontend code.
 */
export default class Fl32_Portal_Front_Defaults {
    /** @type {Fl32_Portal_Shared_Defaults} */
    SHARED;

    /** @deprecated */
    A_DATA = 'portal.msg'; // the name of the event's attribute with message payload to use with Event() objects
    A_LETTER = 'portal.letter'; // the name of the event's attribute with letter data to use with Event() objects
    A_MSG = 'portal.msg'; // the name of the event's attribute with decrypted letter body to use with Event() objects

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
