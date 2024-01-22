/**
 * Plugin constants (hardcoded configuration) for shared code.
 */
export default class Fl32_Portal_Shared_Defaults {
    // should be the same as `name` property in `./package.json`
    NAME = '@flancer32/teq-ant-portal';

    SPACE_STREAM_OPEN = 'ant-portal-events-open'; // open the SSE stream

    constructor() {
        // DEPS
        // MAIN
        Object.freeze(this);
    }
}
