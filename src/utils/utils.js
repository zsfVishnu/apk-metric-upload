import fs from "fs";
import { apkNameError, buildPathError } from "./error";

export function getPascalCase(s) {
  s = s.trim().toLowerCase();
  if (s === "debug") {
    return "Debug";
  }

  if (s.includes("debug")) {
    const prefix = s.split("debug")[0];
    return `${capitalizeFirstLetter(prefix)}Debug`;
  }
  return null;
}

export function getBuildPath(s) {
  const outputPath = "app/build/outputs/apk/";
  s = s.trim().toLowerCase();

  if (s === "debug") {
    return `${outputPath}debug/`;
  }

  if (s.includes("debug")) {
    const prefix = s.split("debug")[0];
    return `${outputPath}${prefix}/debug/`;
  }

  buildPathError();
}

export function getApkName(s) {
  s = s.trim().toLowerCase();

  if (s === "debug") {
    return "app-debug.apk";
  }

  if (s.includes("debug")) {
    const prefix = s.split("debug")[0];
    return `app-${prefix}-debug.apk`;
  }

  apkNameError();
}

export async function writeMetricsToFile(apkSize, bundleSize) {
  const metrics = {
    apk_size: apkSize,
    bundle_size: bundleSize
  };

  const fileName = 'metric.json';
  const dataString = JSON.stringify(metrics);

  try {
    fs.writeFileSync(fileName, dataString);
  } catch (err) {
    console.error("Error writing to file", err);
  }
}

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
