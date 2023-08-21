"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPascalCase = exports.getApkName = exports.getBuildPath = void 0;
const constants_1 = require("./constants");
const error_1 = require("../io/error");
function getBuildPath(flavor, isReactNative) {
    flavor = flavor.trim();
    const PATH = isReactNative ? constants_1.RN_OUTPUT_PATH : constants_1.OUTPUT_PATH;
    if (flavor.toLowerCase() === constants_1.DEBUG_LOWER) {
        return PATH + constants_1.DEBUG_LOWER + "/";
    }
    else if (flavor.includes(constants_1.DEBUG)) {
        const fl = flavor.split(constants_1.DEBUG)[0];
        return PATH + fl + "/" + constants_1.DEBUG_LOWER + "/";
    }
    (0, error_1.buildPathError)();
}
exports.getBuildPath = getBuildPath;
function getApkName(flavor) {
    flavor = flavor.trim();
    if (flavor.toLowerCase() === constants_1.DEBUG_LOWER) {
        return "app-debug.apk";
    }
    if (flavor.includes(constants_1.DEBUG)) {
        const fl = flavor.split(constants_1.DEBUG)[0];
        return "app-" + fl + "-debug.apk";
    }
    (0, error_1.apkNameError)();
}
exports.getApkName = getApkName;
function getPascalCase(flavor) {
    flavor = flavor.trim();
    if (flavor.toLowerCase() === "debug") {
        return "Debug";
    }
    if (flavor.includes("Debug")) {
        const fl = flavor.split("Debug")[0];
        return fl.charAt(0).toUpperCase() + fl.slice(1) + "Debug";
    }
    return 0;
}
exports.getPascalCase = getPascalCase;
