# capacitor_filesystem_rmdir_bug_issue

[a capacitor filesystem github issue 5823](https://github.com/ionic-team/capacitor/issues/5823)

env: archlinux, angular

## Using

### Project setup

```
npm install
```

### Compiles

```
ionic serve
```

## Capacitor Version
<!--
Paste the output from the `npx cap doctor` command into the code block below. This will provide the versions of Capacitor packages and related dependencies.
-->

```
💊   Capacitor Doctor  💊 

Latest Dependencies:

  @capacitor/cli: 4.0.1
  @capacitor/core: 4.0.1
  @capacitor/android: 4.0.1
  @capacitor/ios: 4.0.1

Installed Dependencies:

  @capacitor/ios: not installed
  @capacitor/cli: 4.0.1
  @capacitor/core: 4.0.1
  @capacitor/android: 4.0.1

[success] Android looking great! 👌
```
## Other Technical Details
<!--
Please provide the following information with your request and any other relevant technical details (versions of IDEs, local environment info, plugin information or links, etc).
-->

`npm --version` output:

```zsh
$ npm version                                          
{
  npm: '8.13.2',
  node: '18.7.0',
  v8: '10.2.154.13-node.9',
  uv: '1.43.0',
  zlib: '1.2.12',
  brotli: '1.0.9',
  ares: '1.18.1',
  modules: '108',
  nghttp2: '1.48.0',
  napi: '8',
  llhttp: '6.0.7',
  openssl: '1.1.1q',
  cldr: '41.0',
  icu: '71.1',
  tz: '2022a',
  unicode: '14.0'
}
```

`node --version` output:

```zsh
$ node --version
Node.js v18.7.0
```

## Current Behavior
<!--
Describe how the bug manifests. Be specific.
-->

When I run `Filesystem.rmdir()` to delete a folder and run `Filesystem.mkdir()` to recreate a new folder. It's not worked.

## Expected Behavior
<!--
Describe what the behavior should be.
-->

It should remove the folder named `IMAGE_DIR`, and it recreates a new folder which is empty.

Storage:

![](https://i.ibb.co/SR1BtrN/Screenshot-20220804-131540.png)

Console:

![](https://i.ibb.co/HC3pQMY/Screenshot-20220804-131630.png)
