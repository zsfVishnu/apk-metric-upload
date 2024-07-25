import { execSync } from "child_process";
import {getApkName, getPascalCase} from "../utils/utils";
import fs from 'fs'
import path from 'path'

export function getMasterBranchSize(fb, buildPath, isRN) {
  const apkName = getApkName(fb);
  const flavorToBuild = getPascalCase(fb);
  return isRN === "true"
    ? getRNMasterSize(apkName, flavorToBuild, buildPath)
    : getNativeMasterSize(apkName, flavorToBuild, buildPath);
}

function getRNMasterSize(apkName, flavorToBuild, buildPath) {
  console.log(
    execSync(`cd android && ./gradlew assemble${flavorToBuild}`, {
      encoding: "utf-8",
    })
  );
  const apkPath = path.join(buildPath, apkName)
  const stats = fs.statSync(apkPath)
  const apkSize = stats.size / 1024
  return apkSize
}

function getNativeMasterSize(apkName, flavorToBuild, buildPath) {
  execSync(`./gradlew assemble${flavorToBuild}`, { encoding: "utf-8" });
  const apkPath = path.join(buildPath, apkName)
  const stats = fs.statSync(apkPath)
  const apkSize = stats.size / 1024
  return apkSize
}

export function getRNBundleMasterSize(bundleCommand, bundlePath) {
  const bundleName = "index.android.bundle"
  execSync(`${bundleCommand}`, { encoding: "utf-8" });

  const bundlePath = path.join(bundlePath, bundleName)
  const stats = fs.statSync(bundlePath)
  const bundleSize = stats.size / 1024
  return bundleSize
}
