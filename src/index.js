import { getInput, setFailed, setOutput } from "@actions/core";
import { getMasterBranchSize, getRNBundleMasterSize } from "./evaluator/evaluator";
import { uploadArtifact } from "./network";
import { getBuildPath, writeMetricsToFile } from "./utils/utils";

async function main() {
  try {
    const flavorToBuild = getInput("flavor");
    const isRN = getInput("is_react-native");
    const bundleCommand = getInput("bundle_command");
    const workingDirectory = getInput("working_directory");
    const streamOutputMaxBuffer = Number.parseInt(getInput("stream_output_max_buffer"));

    logInputs({flavorToBuild, isRN, bundleCommand, workingDirectory, streamOutputMaxBuffer});

    const buildPath = getBuildPath(flavorToBuild);
    const apkSize = calculateApkSize(workingDirectory, flavorToBuild, buildPath, isRN, streamOutputMaxBuffer);
    const bundleSize = calculateBundleSize(bundleCommand, streamOutputMaxBuffer);

    await handleMetrics(apkSize, bundleSize);

    setOutput("size", { apk: apkSize, bundle: bundleSize });
  } catch (error) {
    setFailed(error.message);
  }
}

function logInputs(inputs) {
  console.log("Inputs:", JSON.stringify(inputs, null, 2));
}

function calculateApkSize(wdir, flavorToBuild, buildPath, isRN, streamOutputMaxBuffer) {
  const apkSize = getMasterBranchSize(wdir, flavorToBuild, buildPath, isRN, streamOutputMaxBuffer);
  console.log("APK size:", apkSize);
  return apkSize;
}

function calculateBundleSize(bundleCommand, streamOutputMaxBuffer) {
  const bundlePath = "android/infra/react/src/main/assets/";
  const bundleSize = getRNBundleMasterSize(bundleCommand, bundlePath, streamOutputMaxBuffer);
  console.log("Bundle size:", bundleSize);
  return bundleSize;
}

async function handleMetrics(apkSize, bundleSize) {
  await writeMetricsToFile(apkSize, bundleSize);
  await uploadArtifact();
}

main();
