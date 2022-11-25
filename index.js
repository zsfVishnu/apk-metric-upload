import { getInput, setFailed } from "@actions/core";
import { getMasterBranchSize } from "./evaluator";
import { uploadArtifact } from "./network";
import {
  getBuildPath,
  getPascalCase,
  handleWorkingDir,
  writeMetricsToFile,
} from "./utils";

try {
  const flavorToBuild = getInput("flavor");
  const dir = getInput("working-directory");
  console.log(execSync(`ls`, { encoding: "utf-8" }));

  handleWorkingDir(dir);
  console.log(execSync(`ls`, { encoding: "utf-8" })); //handle flavor casing
  console.log(execSync(`pwd`, { encoding: "utf-8" })); //handle flavor casing
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
