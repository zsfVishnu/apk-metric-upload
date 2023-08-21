"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadArtifact = void 0;
const artifact = require("@actions/artifact");
function uploadArtifact(s0) {
    const artifactClient = artifact.create();
    const artifactName = "metric-artifact-new";
    const files = [`metric.json`];
    const rootDirectory = `.`;
    const options = {
        continueOnError: false,
    };
    artifactClient.uploadArtifact(artifactName, files, rootDirectory, options);
}
exports.uploadArtifact = uploadArtifact;
