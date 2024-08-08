import { execSync } from "child_process";
import {getApkName, getPascalCase} from "../utils/utils";
import fs from 'fs'
import path from 'path'

export function getMasterBranchSize(wdir,fb, buildPath, isRN) {
  const apkName = getApkName(fb);
  const flavorToBuild = getPascalCase(fb);
  return isRN === "true"
    ? getRNMasterSize(wdir,apkName, flavorToBuild, buildPath)
    : getNativeMasterSize(wdir,apkName, flavorToBuild, buildPath);
}

function getRNMasterSize(wdir,apkName, flavorToBuild, buildPath) {
  console.log(
    execSync(`cd android && ./gradlew assemble${flavorToBuild}`, {
      encoding: "utf-8",
    })
  );
  const apkPath = path.join(wdir,buildPath, apkName)
  const stats = fs.statSync(apkPath)
  const apkSize = stats.size / 1024
  return apkSize
}

function getNativeMasterSize(wdir,apkName, flavorToBuild, buildPath) {
  execSync(`./gradlew assemble${flavorToBuild}`, { encoding: "utf-8" });
  const apkPath = path.join(wdir,buildPath, apkName)
  const stats = fs.statSync(apkPath)
  const apkSize = stats.size / 1024
  return apkSize
}

export function getRNBundleMasterSize(bundleCommand, bundlePath) {
  const bundleName = "index.android.bundle"
  execSync(`${bundleCommand}`, { encoding: "utf-8" });

  const bp = path.join(bundlePath, bundleName)
  const stats = fs.statSync(bp)
  const bundleSize = stats.size / 1024
  return bundleSize
}
