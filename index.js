import { getInput, setFailed } from "@actions/core";
import { getMasterBranchSize } from "./evaluator";
import { uploadArtifact } from "./network";
import { getBuildPath, getPascalCase, writeMetricsToFile } from "./utils";

try {
  const flavorToBuild = getInput("flavor");
  const pascalFlavour = getPascalCase(flavorToBuild);
  if (pascalFlavour === 0) {
    let err = new Error("No such flavor");
    err.description = "Please check flavor guidelines";
    throw err;
  }

  const bp = getBuildPath(flavorToBuild);
  console.log(`Building flavor:  ${flavorToBuild}!`);
  const s0 = getMasterBranchSize(pascalFlavour, bp);
  writeMetricsToFile(s0);
  await uploadArtifact();
} catch (error) {
  setFailed(error.message);
}
