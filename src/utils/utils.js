import { execSync } from "child_process";
import fs from "fs";
import { apkNameError, buildPathError } from "./error";

export function getPascalCase(s) {
  s = s.trim();
  if (s.toLowerCase() === "debug") {
    return "Debug";
  }

  if (s.includes("Debug")) {
    const fl = s.split("Debug")[0];
    return fl.charAt(0).toUpperCase() + fl.slice(1) + "Debug";
  }
  return 0;
}

export function getBuildPath(s) {
  let outputPath = "app/build/outputs/apk/";
  s = s.trim();
  if (s.toLowerCase() === "debug") {
    return outputPath + "debug/";
  }

  if (s.includes("Debug")) {
    const fl = s.split("Debug")[0];
    return outputPath + fl + "/debug/";
  }
  buildPathError();
}

export function getApkName(s) {
  s = s.trim();
  if (s.toLowerCase() === "debug") {
    return "app-debug.apk";
  }

  if (s.includes("Debug")) {
    const fl = s.split("Debug")[0];
    return "app-" + fl + "-debug.apk";
  }
  apkNameError();
}

export async function writeMetricsToFile(apkSize, bundleSize) {
    var dict = {
        apk_size: apkSize,
        bundle_size: bundleSize
    };
    var dstring = JSON.stringify(dict);
    var fileName = 'metric.json'
    fs.writeFileSync(`${fileName}`, dstring, function (err, result) {
        if (err) console.log("writing error", err);
    });
}