import { getInput, setFailed } from '@actions/core';
import github from '@actions/github';
const GITHUB_TOKEN = getInput('GITHUB_TOKEN');
import { getMasterBranchSize } from './evaluator';
import { uploadSizetoArtifact } from './network';
import { getBuildPath } from './utils';

try {
    const flavorToBuild = getInput('flavor');
    const pascalFlavour = getPascalCase(flavorToBuild)
    if(pascalFlavour === 0 ) {
        let err = new Error('No such flavor');
        err.description = "Please check flavor guidelines";
        throw err;
    }

    const bp = getBuildPath(flavorToBuild)
    console.log(`Building flavor:  ${flavorToBuild}!`);
    const s0 = getMasterBranchSize(pascalFlavour, bp)
    // uploadSizetoArtifact(s0)
    console.log("***************")
    console.log(`pascalFlavor : ${pascalFlavour}`)
    console.log(`build path : { ${bp}}`)
    console.log(`size of apk : ${s0}`)

} catch (error) {
    setFailed(error.message);
}


