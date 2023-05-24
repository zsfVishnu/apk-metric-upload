import { getInput, setFailed } from "@actions/core";
import {getMasterBranchSize, getRNBundleMasterSize} from "./evaluator/evaluator";
import { uploadArtifact } from "./network";
import {getBuildPath, getPascalCase, writeApkMetricsToFile, writeBunleMetricsToFile} from "./utils/utils";

try {
  const flavorToBuild = getInput("flavor");
  const isRN = getInput("is-react-native");
  const bp = getBuildPath(flavorToBuild);
  const bundlePath = "android/infra/react/src/main/assets/"
  console.log(`Building flavor:  ${flavorToBuild}!`);
  const s0 = getMasterBranchSize(flavorToBuild, bp, isRN);
  const s1 = getRNBundleMasterSize(flavorToBuild, bundlePath)
  console.log("bundle size", s1)
  await writeApkMetricsToFile(s0);
  await writeBunleMetricsToFile(s1)
  uploadArtifact();
} catch (error) {
  setFailed(error.message);
}
