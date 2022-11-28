import { getBuildPath } from "./utils";

test(`construct build path from two step debug flavor`, () => {
  expect(getBuildPath("proStagingdebug")).toBe(
    "app/build/outputs/apk/proStaging/debug/"
  );
});

test(`construct build path from simple debug flavor`, () => {
  expect(getBuildPath("debug")).toBe("app/build/outputs/apk/debug/");
});
