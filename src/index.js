import { getInput, setFailed } from "@actions/core";
import {getMasterBranchSize, getRNBundleMasterSize} from "./evaluator/evaluator";
import { uploadArtifact } from "./network";
import {getBuildPath, getPascalCase, writeMetricsToFile, writeBunleMetricsToFile} from "./utils/utils";

try {
  const flavorToBuild = getInput("flavor");
  const isRN = getInput("is-react-native");
  const bp = getBuildPath(flavorToBuild);
  const bundleCommand = getInput("bundle-command")
  const bundlePath = "android/infra/react/src/main/assets/"
  console.log(`Building flavor:  ${flavorToBuild}!`);
  const s0 = getMasterBranchSize(flavorToBuild, bp, isRN);
  console.log("apk size", s0)
  const s1 = getRNBundleMasterSize(bundleCommand, bundlePath)
  console.log("bundle size", s1)
  await writeMetricsToFile(s0, "apk");
  await writeMetricsToFile(s1, "bundle");
  uploadArtifact();
} catch (error) {
  setFailed(error.message);
}
