import fs from "fs";
import { ARTIFACT_FILE_NAME } from "../utils";

export async function writeMetricsToFile(apkSize: number, bundleSize: number) {
  var dict = {
    apk_size: apkSize,
    bundle_size: bundleSize,
  };
  var dstring = JSON.stringify(dict);
  var fileName = ARTIFACT_FILE_NAME;
  try {
    fs.writeFileSync(`${fileName}`, dstring);
  } catch (err) {
    console.error(err);
  }
}
