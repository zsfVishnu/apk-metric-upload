"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRNBundleMasterSize = exports.getMasterBranchSize = void 0;
const utils_1 = require("../utils");
const pascal_case_1 = require("pascal-case");
const child_process_1 = require("child_process");
function getMasterBranchSize(flavor, buildPath) {
    var _a;
    const apkName = (_a = (0, utils_1.getApkName)(flavor)) !== null && _a !== void 0 ? _a : "";
    const flavorToBuild = (0, pascal_case_1.pascalCase)(flavor);
    return getMasterSize(apkName, flavorToBuild, buildPath);
}
exports.getMasterBranchSize = getMasterBranchSize;
function getMasterSize(apkName, flavorToBuild, buildPath) {
    (0, child_process_1.execSync)(`./gradlew assemble${flavorToBuild}`, { encoding: "utf-8" });
    const sizeOp = (0, child_process_1.execSync)(`cd ${buildPath} && du -k ${apkName}`, {
        encoding: "utf-8",
    });
    const apkSize = typeof sizeOp === `string` ? sizeOp.trim().split(/\s+/)[0] : 0;
    return Number(apkSize);
}
function getRNBundleMasterSize(bundleCommand, bundlePath) {
    (0, child_process_1.execSync)(`${bundleCommand}`, { encoding: "utf-8" });
    const sizeOp = (0, child_process_1.execSync)(`cd ${bundlePath} && du -k ${utils_1.BUNDLE_NAME}`, {
        encoding: "utf-8",
    });
    console.log(sizeOp);
    const bundleSize = typeof sizeOp === `string` ? sizeOp.trim().split(/\s+/)[0] : 0;
    return Number(bundleSize);
}
exports.getRNBundleMasterSize = getRNBundleMasterSize;
