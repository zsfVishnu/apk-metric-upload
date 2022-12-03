# Apk-metric-upload


This action uploads your debug app metrics to a workflow artifact which can be used by our [app-size-tracker](https://github.com/zsfVishnu/apk-size-tracker) action to help you track your app metrics like size, build time etc

# Usage
The action can be used to track both native and react native app sizes. Given below are examples of how to use the app for the two platforms.

## Native

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
        uses: zsfVishnu/apk-metric-upload@v1.0.0
        with:
          flavor: debug
          
```

## React Native

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
          
      - name: Install dependencies
        run: yarn install
          
      - name: Upload action step
        id: apkSize
        uses: zsfVishnu/apk-metric-upload@v1.0.0
        with:
          flavor: debug
          is-react-native: true
          
```

# Inputs
For your native project, this action only needs the debug flavor name to upload your metrics. For a react native project, you have to provide an additional
flag `is-react-native` to let the action know that it is an RN project.

## flavor
This specifies which debug flavor of your app would you like to track. The action only creates debug builds since release builds might require keys and/or confidential information.

# Where does the upload go?
The artifact is uploaded to the workflow in which the action is run.
<img width="1784" alt="Screenshot 2022-11-20 at 11 07 41 PM" src="https://user-images.githubusercontent.com/34836841/202917191-4458a24a-1e06-4feb-9577-59aa82d5ee9e.png">




