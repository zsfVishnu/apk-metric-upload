import { execSync } from "child_process";
import { getApkName, getPascalCase } from "../utils/utils";

export function getMasterBranchSize(fb, buildPath, isRN) {
  const apkName = getApkName(fb);
  const flavorToBuild = getPascalCase(fb);
  isRN
    ? getRNMasterSize(apkName, flavorToBuild, buildPath)
    : getNativeMasterSize(apkName, flavorToBuild, buildPath);
}

function getRNMasterSize(apkName, flavorToBuild, buildPath) {
  execSync(`ls yarn.lock &> /dev/null && yarn install || npm install`, {
    encoding: "utf-8",
  });

  execSync(`cd android && ./gradlew assemble${flavorToBuild}`, {
    encoding: "utf-8",
  });

  const sizeOp = execSync(`cd android/${buildPath} && du -k ${apkName}`, {
    encoding: "utf-8",
  });

  const apkSize =
    typeof sizeOp === `string` ? sizeOp.trim().split(/\s+/)[0] : 0;

  return apkSize;
}

function getNativeMasterSize(apkName, flavorToBuild, buildPath) {
  execSync(`./gradlew assemble${flavorToBuild}`, { encoding: "utf-8" });
  const sizeOp = execSync(`cd ${buildPath} && du -k app-${apkSuffix}.apk`, {
    encoding: "utf-8",
  });
  const apkSize =
    typeof sizeOp === `string` ? sizeOp.trim().split(/\s+/)[0] : 0;
  return apkSize;
}
