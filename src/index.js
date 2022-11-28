import { getInput, setFailed } from "@actions/core";
import { getMasterBranchSize } from "./evaluator/evaluator";
import { uploadArtifact } from "./network";
import { getBuildPath, getPascalCase, writeMetricsToFile } from "./utils/utils";

try {
  const flavorToBuild = getInput("flavor");
  const isRN = getInput("is-react-native");

  const bp = getBuildPath(flavorToBuild);
  console.log(`Building flavor:  ${flavorToBuild}!`);
  const s0 = getMasterBranchSize(flavorToBuild, bp, isRN);
  await writeMetricsToFile(s0);
  uploadArtifact();
} catch (error) {
  setFailed(error.message);
}
