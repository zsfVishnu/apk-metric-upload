import { BUNDLE_NAME, getApkName } from "../utils";
import { pascalCase } from "pascal-case";
import { execSync } from "child_process";

export function getMasterBranchSize(flavor: string, buildPath: string): number {
  const apkName = getApkName(flavor) ?? "";
  const flavorToBuild = pascalCase(flavor);
  return getMasterSize(apkName, flavorToBuild, buildPath);
}

function getMasterSize(
  apkName: string,
  flavorToBuild: string,
  buildPath: string
): number {
  execSync(`./gradlew assemble${flavorToBuild}`, { encoding: "utf-8" });
  const sizeOp = execSync(`cd ${buildPath} && du -k ${apkName}`, {
    encoding: "utf-8",
  });
  const apkSize =
    typeof sizeOp === `string` ? sizeOp.trim().split(/\s+/)[0] : 0;
  return Number(apkSize);
}

export function getRNBundleMasterSize(
  bundleCommand: string,
  bundlePath: string
) {
  execSync(`${bundleCommand}`, { encoding: "utf-8" });
  const sizeOp = execSync(`cd ${bundlePath} && du -k ${BUNDLE_NAME}`, {
    encoding: "utf-8",
  });
  console.log(sizeOp);
  const bundleSize =
    typeof sizeOp === `string` ? sizeOp.trim().split(/\s+/)[0] : 0;
  return Number(bundleSize);
}
