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

export function getBundleFlavor(buildFlavor) {
  buildFlavor = buildFlavor.trim()
  if (buildFlavor.toLowerCase() === "debug") {
    return "debug"
  }

  if (buildFlavor.toLowerCase() === "release") {
    return "release"
  }

  if (buildFlavor.includes("Debug")) {
    const fl = buildFlavor.split("Debug")[0];
    return "debug"
  }

  if (buildFlavor.includes("Release")) {
    const fl = buildFlavor.split("Release")[0];
    return "release"
  }
  noFlavorFoundError()
}

export async function writeApkMetricsToFile(s0) {
  var dict = { master_size: s0 };
  var dstring = JSON.stringify(dict);
  fs.writeFileSync(`apk-metric.json`, dstring, function (err, result) {
    if (err) console.log("writing error", err);
  });
}

export async function writeBunleMetricsToFile(bundleSize) {
  var dict = { master_size: bundleSize };
  var dstring = JSON.stringify(dict);
  fs.writeFileSync(`bundle-metric.json`, dstring, function (err, result) {
    if (err) console.log("writing error", err);
  });
}
