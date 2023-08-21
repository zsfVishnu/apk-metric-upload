import { getInput } from "@actions/core";
import { InputType } from "./input.type";

export function fetchInputs(): InputType {
  return {
    flavor: getInput("flavor"),
    isReactNative: getInput("is-react-native") === "true",
    bundleCommand: getInput("bundle-command"),
  };
}
