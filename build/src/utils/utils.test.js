"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
test(`construct build path from two step debug flavor`, () => {
    expect((0, utils_1.getBuildPath)("proStagingdebug")).toBe("app/build/outputs/apk/proStaging/debug/");
});
test(`construct build path from simple debug flavor`, () => {
    expect((0, utils_1.getBuildPath)("debug")).toBe("app/build/outputs/apk/debug/");
});
