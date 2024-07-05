import { getInput, setFailed, setOutput } from "@actions/core";
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

  const size = {
    apk: apkSize,
    bundle: bundleSize
  }

  setOutput('size', size);
} catch (error) {
  setFailed(error.message);
}
