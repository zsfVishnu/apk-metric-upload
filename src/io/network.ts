import artifact from "@actions/artifact";
import {
  ARTIFACT_FILE_NAME,
  ARTIFACT_NAME,
  ROOT_DIRECTORY,
} from "../utils/constants";

export function uploadArtifact() {
  const artifactClient = artifact.create();
  const artifactName = ARTIFACT_NAME;
  const files = [ARTIFACT_FILE_NAME];
  const rootDirectory = ROOT_DIRECTORY;
  const options = {
    continueOnError: false,
  };
  artifactClient.uploadArtifact(artifactName, files, rootDirectory, options);
}
