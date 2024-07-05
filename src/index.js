import { getInput, setFailed } from "@actions/core";
import { getMasterBranchSize, getRNBundleMasterSize } from "./evaluator/evaluator";
import { uploadArtifact } from "./network";
import { getBuildPath, writeMetricsToFile } from "./utils/utils";

try {
  const flavorToBuild = getInput("flavor");
  const isRN = getInput("is-react-native");
  const bp = getBuildPath(flavorToBuild);
  const bundleCommand = getInput("bundle-command")
  const bundlePath = "android/infra/react/src/main/assets/"
  console.log(`Building flavor:  ${flavorToBuild}!`);
  const apkSize = getMasterBranchSize(flavorToBuild, bp, isRN);
  console.log("APK size", apkSize)
  const bundleSize = getRNBundleMasterSize(bundleCommand, bundlePath)
  console.log("Bundle Size", bundleSize)
  await writeMetricsToFile(apkSize, bundleSize);
  uploadArtifact();

  const metrics = {
    apk: apkSize,
    bundle: bundleSize
  }

  return {
    size: metrics
  }
} catch (error) {
  setFailed(error.message);
}
