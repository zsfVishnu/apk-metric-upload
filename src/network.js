const artifact = require("@actions/artifact");

export function uploadArtifact(s0) {
  const artifactClient = artifact.create();
  const artifactName = "metric-artifact";
  const files = [`apk-metric.json`, `bundle-metric.json`];
  const rootDirectory = `.`;
  const options = {
    continueOnError: false,
  };
  artifactClient.uploadArtifact(artifactName, files, rootDirectory, options);
}