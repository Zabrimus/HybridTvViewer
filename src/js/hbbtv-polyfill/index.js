import { keyEventInit } from "./keyevent-init.js";
import { hbbtvFn } from "./hbbtv.js";
import { VideoHandler } from "./hbb-video-handler.js";

function init() {
    console.log("hbbtv-polyfill: load");
    // global helper namespace to simplify testing
    window.HBBTV_POLYFILL_NS = window.HBBTV_POLYFILL_NS || {
    };
    window.HBBTV_POLYFILL_NS = {
        ...window.HBBTV_POLYFILL_NS, ...{
            keysetSetValueCount: 0,
            streamEventListeners: [],
        }
    };
    window.HBBTV_POLYFILL_NS.currentChannel = window.HBBTV_POLYFILL_NS.currentChannel || {
        'TYPE_TV': 12,
        'channelType': 12,
        'sid': 1,
        'onid': 1,
        'tsid': 1,
        'name': 'test',
        'ccid': 'ccid:dvbt.0',
        'dsd': ''
    };

    // set body position
    document.body.style.width = "1920px";
    document.body.style.height = "1080px";

    keyEventInit();
    hbbtvFn();

    new VideoHandler().initialize();

    // convenience method: Javascript to VDR wrapper method, one-way
    window.signalVdr = function(command) {
        window.cefQuery({
            request: 'VDR:' + command,
            persistent: false,
            onSuccess: function(response) {},
            onFailure: function(error_code, error_message) {}
        });
    };

    console.log("hbbtv-polyfill: loaded");
}
if (!document.body) {
    document.addEventListener("DOMContentLoaded", init);
} else {
    init();
}
