"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@actions/core");
const constants_1 = require("./utils/constants");
const evaluator_1 = require("./evaluator");
const input_1 = require("./input");
const io_1 = require("./io");
const network_1 = require("./io/network");
const utils_1 = require("./utils");
try {
    const input = (0, input_1.fetchInputs)();
    const buildPath = (_a = (0, utils_1.getBuildPath)(input.flavor, input.isReactNative)) !== null && _a !== void 0 ? _a : "";
    console.log("Building flavor:  ${input.flavor}!");
    const apkSize = (0, evaluator_1.getMasterBranchSize)(input.flavor, buildPath);
    console.log("APK size", apkSize);
    const bundleSize = input.isReactNative
        ? (0, evaluator_1.getRNBundleMasterSize)(input.bundleCommand, constants_1.BUNDLE_PATH)
        : 0;
    console.log("Bundle Size", bundleSize);
    const p = async () => await (0, io_1.writeMetricsToFile)(apkSize, bundleSize);
    (0, network_1.uploadArtifact)();
}
catch (error) {
    (0, core_1.setFailed)(JSON.stringify(error));
}
