import { execSync } from "child_process";
import { getApkName } from "../utils/utils";

export function getMasterBranchSize(flavorToBuild, buildPath, isRN) {
  const apkName = getApkName(flavorToBuild);
  console.log(apkName);
  execSync(`ls`, { encoding: "utf-8" });
  if (isRN === "true") {
    execSync(`ls`, { encoding: "utf-8" });
    execSync(
      `alias npm_or_yarn='ls yarn.lock &> /dev/null && echo yarn || echo npm'`,
      { encoding: "utf-8" }
    );
    execSync(`$(npm_or_yarn) install`, { encoding: "utf-8" });
    execSync(`cd android`, { encoding: "utf-8" });
    execSync(`ls`, { encoding: "utf-8" });
  }
  execSync(`ls`, { encoding: "utf-8" });
  execSync(`./gradlew assemble${flavorToBuild}`, { encoding: "utf-8" });
  const sizeOp = execSync(`cd ${buildPath} && du -k ${apkName}`, {
    encoding: "utf-8",
  });

  const apkSize =
    typeof sizeOp === `string` ? sizeOp.trim().split(/\s+/)[0] : 0;

  return apkSize;
}
