import { execSync } from "child_process";
import { getApkName, getPascalCase } from "../utils/utils";

export function getMasterBranchSize(fb, buildPath, isRN) {
  const apkName = getApkName(flavorToBuild);
  const flavorToBuild = getPascalCase(fb);
  console.log(execSync(`ls`, { encoding: "utf-8" }));
  if (isRN === "true") {
    console.log(execSync(`ls`, { encoding: "utf-8" }));
    console.log(
      execSync(`ls yarn.lock &> /dev/null && yarn install || npm install`, {
        encoding: "utf-8",
      })
    );
    console.log(execSync(`cd android && ls`, { encoding: "utf-8" }));
    console.log(execSync(`ls`, { encoding: "utf-8" }));
  }
  console.log(execSync(`ls`, { encoding: "utf-8" }));
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
