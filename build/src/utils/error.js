"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apkNameError = exports.buildPathError = void 0;
const core_1 = require("@actions/core");
function buildPathError() {
    (0, core_1.setFailed)("Build Path error. Make sure the flavor provided is correct");
}
exports.buildPathError = buildPathError;
function apkNameError() {
    (0, core_1.setFailed)("Apk name error. Make sure the flavor provided is correct");
}
exports.apkNameError = apkNameError;
