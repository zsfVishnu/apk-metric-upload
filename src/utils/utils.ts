import { DEBUG, DEBUG_LOWER, OUTPUT_PATH, RN_OUTPUT_PATH } from "./constants";
import { apkNameError, buildPathError } from "../io/error";

export function getBuildPath(flavor: string, isReactNative: boolean) {
  flavor = flavor.trim();
  const PATH = isReactNative ? RN_OUTPUT_PATH : OUTPUT_PATH;
  if (flavor.toLowerCase() === DEBUG_LOWER) {
    return PATH + DEBUG_LOWER + "/";
  } else if (flavor.includes(DEBUG)) {
    const fl = flavor.split(DEBUG)[0];
    return PATH + fl + "/" + DEBUG_LOWER + "/";
  }
  buildPathError();
}

export function getApkName(flavor: string) {
  flavor = flavor.trim();
  if (flavor.toLowerCase() === DEBUG_LOWER) {
    return "app-debug.apk";
  }

  if (flavor.includes(DEBUG)) {
    const fl = flavor.split(DEBUG)[0];
    return "app-" + fl + "-debug.apk";
  }
  apkNameError();
}

export function getPascalCase(flavor: string) {
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
