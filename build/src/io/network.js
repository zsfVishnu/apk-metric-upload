"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadArtifact = void 0;
const artifact_1 = __importDefault(require("@actions/artifact"));
const constants_1 = require("../utils/constants");
function uploadArtifact() {
    const artifactClient = artifact_1.default.create();
    const artifactName = constants_1.ARTIFACT_NAME;
    const files = [constants_1.ARTIFACT_FILE_NAME];
    const rootDirectory = constants_1.ROOT_DIRECTORY;
    const options = {
        continueOnError: false,
    };
    artifactClient.uploadArtifact(artifactName, files, rootDirectory, options);
}
exports.uploadArtifact = uploadArtifact;
