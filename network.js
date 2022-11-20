const artifact = require("@actions/artifact");

export async function uploadArtifact(s0) {
  const artifactClient = artifact.create();
  const artifactName = "apk-metric-artifact";
  const files = [`apk-metric.json`];
  const rootDirectory = `.`;
  const options = {
    continueOnError: true,
  };
  const uploadResult = await artifactClient.uploadArtifact(
    artifactName,
    files,
    rootDirectory,
    options
  );
}
