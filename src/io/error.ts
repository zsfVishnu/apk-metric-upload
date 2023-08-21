import { setFailed } from "@actions/core";

export function buildPathError() {
  setFailed("Build Path error. Make sure the flavor provided is correct");
}

export function apkNameError() {
  setFailed("Apk name error. Make sure the flavor provided is correct");
}
