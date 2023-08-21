"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeMetricsToFile = void 0;
const fs_1 = __importDefault(require("fs"));
const utils_1 = require("../utils");
async function writeMetricsToFile(apkSize, bundleSize) {
    var dict = {
        apk_size: apkSize,
        bundle_size: bundleSize,
    };
    var dstring = JSON.stringify(dict);
    var fileName = utils_1.ARTIFACT_FILE_NAME;
    try {
        fs_1.default.writeFileSync(`${fileName}`, dstring);
    }
    catch (err) {
        console.error(err);
    }
}
exports.writeMetricsToFile = writeMetricsToFile;
