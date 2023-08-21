import { getInput, setFailed } from "@actions/core";
import { BUNDLE_PATH } from "./utils/constants";
import { getMasterBranchSize, getRNBundleMasterSize } from "./evaluator";
import { fetchInputs } from "./input";
import { writeMetricsToFile } from "./io";
import { uploadArtifact } from "./io/network";
import { getBuildPath } from "./utils";

try {
  const input = fetchInputs();
  const buildPath = getBuildPath(input.flavor, input.isReactNative) ?? "";

  console.log("Building flavor:  ${input.flavor}!");

  const apkSize = getMasterBranchSize(input.flavor, buildPath);

  console.log("APK size", apkSize);
  const bundleSize = input.isReactNative
    ? getRNBundleMasterSize(input.bundleCommand, BUNDLE_PATH)
    : 0;
  console.log("Bundle Size", bundleSize);
  const p = async () => await writeMetricsToFile(apkSize, bundleSize);
  uploadArtifact();
} catch (error) {
  setFailed(JSON.stringify(error));
}
