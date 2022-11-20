import { getInput, setFailed } from "@actions/core";
import { getMasterBranchSize } from "./evaluator";
import { uploadArtifact } from "./network";
import { getBuildPath, getPascalCase, writeMetricsToFile } from "./utils";

try {
  const flavorToBuild = getInput("flavor");
  const pascalFlavour = getPascalCase(flavorToBuild);
  if (pascalFlavour === 0) {
    let err = new Error("Error with building flavor");
    err.description =
      "Only debug flavors are allowed. Please check flavor guidelines";
    throw err;
  }

  const bp = getBuildPath(flavorToBuild);
  console.log(`Building flavor:  ${flavorToBuild}!`);
  const s0 = getMasterBranchSize(pascalFlavour, bp);
  await writeMetricsToFile(s0);
  uploadArtifact();
} catch (error) {
  setFailed(error.message);
}
