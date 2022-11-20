# Apk-metric-upload

This action uploads your debug app metrics to a workflow artifact which can be used by our app-size-tracker action to help you track your app metrics like size, build time etc

# Usage

```
on:
  push:
      branches:
        - master

jobs:
  ApkSizeTracker:
    runs-on: ubuntu-latest
    name: Apk size tracker
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 16
          
      - name: Upload action step
        id: apkSize
        uses: zsfVishnu/apk-metric-upload@main
        with:
          flavor: 'debug'
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          
```

# Inputs
The action takes two inputs to upload your metrics - flavor and GITHUB_TOKEN.

## flavor
This specifies which debug flavor of your app would you like to track. The action only creates debug builds since release builds might require keys and/or confidential information. Even though we make debug apk's it gives you an indicative measure of your app metrics.

## GITHUB_TOKEN
Since all metric information are stored within the user's github repository itself, we require this token to upload artifacts into the workflow. Please note that you won't have to create any new token and this works with github's {{ secrets.GITHUB_TOKEN }}. At the start of each workflow run, GitHub automatically creates a unique GITHUB_TOKEN secret to use in your workflow. You can use the GITHUB_TOKEN to authenticate the workflow run. 
``` 
GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```
