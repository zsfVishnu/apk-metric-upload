export function getPascalCase(s) {
  s = s.toLowerCase();
  s = s.trim();
  if (s === "debug") {
    return "Debug";
  }

  if (s.includes("debug")) {
    const fl = s.split("debug")[0];
    return fl.charAt(0).toUpperCase() + fl.slice(1) + "Debug";
  }
  return 0;
}

export function getBuildPath(s) {
  let outputPath = "app/build/outputs/apk/";
  s = s.toLowerCase();
  s = s.trim();
  if (s === "debug") {
    return outputPath + "debug/";
  }

  if (s.includes("debug")) {
    const fl = s.split("debug")[0];
    return outputPath + fl + "/debug/";
  }
  return 0;
}

export function writeMetricsToFile(s0) {
  var dict = { "master size": s0 };
  var dstring = JSON.stringify(dict);
  fs.writeFile("apk-metric.json", dstring, function (err, result) {
    if (err) console.log("error", err);
  });
}
