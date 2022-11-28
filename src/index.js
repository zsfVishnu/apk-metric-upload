import { getInput, setFailed } from "@actions/core";
import { getMasterBranchSize } from "./evaluator/evaluator";
import { uploadArtifact } from "./network";
import { getBuildPath, getPascalCase, writeMetricsToFile } from "./utils/utils";

try {
  const flavorToBuild = getInput("flavor");
  console.log(flavorToBuild);
  const isRN = getInput("is-react-native");
  console.log(isRN);
  const bp = getBuildPath(flavorToBuild);
  console.log(bp);
  console.log(`Building flavor:  ${flavorToBuild}!`);
  const s0 = getMasterBranchSize(flavorToBuild, bp, isRN);
  await writeMetricsToFile(s0);
  uploadArtifact();
} catch (error) {
  setFailed(error.message);
}
