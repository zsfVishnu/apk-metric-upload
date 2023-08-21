"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchInputs = void 0;
const core_1 = require("@actions/core");
function fetchInputs() {
    return {
        flavor: (0, core_1.getInput)("flavor"),
        isReactNative: (0, core_1.getInput)("is-react-native") === "true",
        bundleCommand: (0, core_1.getInput)("bundle-command"),
    };
}
exports.fetchInputs = fetchInputs;
