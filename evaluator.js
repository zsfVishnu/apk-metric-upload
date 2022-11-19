import { execSync } from 'child_process';

export function getMasterBranchSize(flavorToBuild, buildPath) {
    const apkSuffix = flavorToBuild.toLowerCase()
    execSync(`./gradlew assemble${flavorToBuild}`, { encoding: 'utf-8' }); //handle flavor casing
    const apkSize = execSync(`cd ${buildPath} && du -k app-${apkSuffix}.apk`, { encoding: 'utf-8' }).trim().split(/\s+/)[0];
    return apkSize
}