# Volto Image Editor (@plone-collective/volto-image-editor)

An image editor, based on [React Advanced Image Cropper](https://www.npmjs.com/package/react-advanced-cropper), to be used with Plone and Volto.

[![npm](https://img.shields.io/npm/v/@plone-collective/volto-image-editor)](https://www.npmjs.com/package/@plone-collective/volto-image-editor)
[![](https://img.shields.io/badge/-Storybook-ff4785?logo=Storybook&logoColor=white&style=flat-square)](https://collective.github.io/volto-image-editor/)
[![Code analysis checks](https://github.com/collective/volto-image-editor/actions/workflows/main.yml/badge.svg)](https://github.com/collective/volto-image-editor/actions/workflows/main.yml)

## ✨ Features

![Demo](https://raw.githubusercontent.com/collective/volto-image-editor/refs/heads/main/docs/docs/_static/volto-image-editor.gif)


This add-on modifies Volto's File widget, providing an image editor with the following actions:

- Crops the image. Supports many aspect ratios
- Rotates the image in 90-degree increments
- Flips the image horizontally or vertically
- Adjusts the image saturation
- Adjusts the image brightness
- Adjusts the image contrast
- Adjusts the image hue



## 🚀 Installation

> **Note:** This add-on requires Volto 18 or newer. Follow your project's official workflow for dependency management.


To install this add-on, edit the `package.json` of your policy package (usually located in `packages/<policy-package>/package.json`):

```json
"addons": [
    "@plone-collective/volto-image-editor"
],
"dependencies": {
    "@plone-collective/volto-image-editor": "*"
}
```

After editing, follow your project's standard process to update dependencies and rebuild.

## ⚙️ Configure Default Settings

This add-on allows you to customize the image editor's behavior by modifying default settings. All settings are optional and can be configured in your Volto project's add-on configuration.

### Available Settings

The following table describes all available settings for the image editor:

| Setting | Description | Type | Default Value |
|---------|-------------|------|----------------|
| aspectRatio | The aspect ratio constraint for cropping (width:height format) | `string` | `'16:9'` |
| imageRestriction | How the image should be restricted within the crop area | `string` | `'fit-area'` |
| stencilType | The shape of the crop stencil/box | `string` | `'rectangle'` |
| minWidth | Minimum width for the crop area in pixels | `number` | `50` |
| minHeight | Minimum height for the crop area in pixels | `number` | `50` |
| maxCropWidth | Maximum width for the crop area in pixels | `undefined \| number` | `undefined` |
| maxCropHeight | Maximum height for the crop area in pixels | `undefined \| number` | `undefined` |
| scalable | Whether the image can be scaled/zoomed | `boolean` | `true` |
| stencilGrid | Whether to display a grid overlay on the crop stencil | `boolean` | `true` |
| minScale | Minimum scale factor for zooming | `number` | `0.1` |
| maxScale | Maximum scale factor for zooming | `number` | `3` |

### Configuration Examples

#### Single Setting Modification

To modify a single setting, update `config.settings.imageEditor` in your add-on's configuration file:

```typescript
import type { ConfigType } from '@plone/registry';

function applyConfig(config: ConfigType) {
  // Modify the default aspect ratio to 1:1
  config.settings.imageEditor.aspectRatio = '1:1';

  return config;
}

export default applyConfig;
```

#### Multiple Settings Modification

If you need to modify multiple settings, we recommend using the `ImageSettings` type definition for type safety and better code documentation:

```typescript
import type { ConfigType } from '@plone/registry';
import type { ImageSettings } from '@plone-collective/volto-image-editor/types/ImageSettings';

function applyConfig(config: ConfigType) {
  // Define your custom image editor settings
  const imageEditorSettings: ImageSettings = {
    aspectRatio: '1:1',
    imageRestriction: 'fit-area',
    stencilType: 'rectangle',
    minWidth: 100,
    minHeight: 100,
    maxCropWidth: undefined,
    maxCropHeight: undefined,
    scalable: true,
    stencilGrid: true,
    minScale: 0.1,
    maxScale: 3,
  };

  // Apply the custom settings
  config.settings.imageEditor = imageEditorSettings;

  return config;
}

export default applyConfig;
```

## 🧪 Test Installation

Visit http://localhost:3000/ in a browser, log in, and verify that the image editor features are available in the File widget.

## 🌍 Internationalization (i18n)

All UI strings in this add-on are translatable. Use the provided `make i18n` command to extract and sync translation messages.

## 🛠️ Development


Development for this add-on uses pnpm workspaces, the latest `mrs-developer`, and Volto core improvements. It is compatible only with pnpm and Volto 18.


### 📋 Prerequisites

-   An [operating system](https://6.docs.plone.org/install/create-project-cookieplone.html#prerequisites-for-installation) that runs all the requirements mentioned.
-   [nvm](https://6.docs.plone.org/install/create-project-cookieplone.html#nvm)
-   [Node.js and pnpm](https://6.docs.plone.org/install/create-project.html#node-js) 22
-   [Make](https://6.docs.plone.org/install/create-project-cookieplone.html#make)
-   [Git](https://6.docs.plone.org/install/create-project-cookieplone.html#git)
-   [Docker](https://docs.docker.com/get-started/get-docker/) (optional)


### 📦 Installation

1.  Clone this repository, then change your working directory.

    ```shell
    git clone git@github.com:collective/volto-image-editor.git
    cd volto-image-editor
    ```

2.  Install this code base.

    ```shell
    make install
    ```


### 🧰 Make Convenience Commands

Run `make help` to list the available commands.

```text
help                             Show this help
install                          Installs the add-on in a development environment
start                            Starts Volto, allowing reloading of the add-on during development
build                            Build a production bundle for distribution of the project with the add-on
i18n                             Sync i18n
ci-i18n                          Check if i18n is not synced
format                           Format codebase
lint                             Lint, or catch and remove problems, in code base
release                          Release the add-on on npmjs.org
release-dry-run                  Dry-run the release of the add-on on npmjs.org
test                             Run unit tests
ci-test                          Run unit tests in CI
backend-docker-start             Starts a Docker-based backend for development
storybook-start                  Start Storybook server on port 6006
storybook-build                  Build Storybook
acceptance-frontend-dev-start    Start acceptance frontend in development mode
acceptance-frontend-prod-start   Start acceptance frontend in production mode
acceptance-backend-start         Start backend acceptance server
ci-acceptance-backend-start      Start backend acceptance server in headless mode for CI
acceptance-test                  Start Cypress in interactive mode
ci-acceptance-test               Run cypress tests in headless mode for CI
```

### 🏗️ Development Environment Setup

Install package requirements:

```shell
make install
```

### 🚦 Start Developing

Start the backend:

```shell
make backend-docker-start
```

In a separate terminal session, start the frontend:

```shell
make start
```

### 🧹 Lint Code

Run ESLint, Prettier, and Stylelint in analyze mode:

```shell
make lint
```

### 🎨 Format Code

Run ESLint, Prettier, and Stylelint in fix mode:

```shell
make format
```

### 🌍 Internationalization (i18n)

Extract the i18n messages to locales:

```shell
make i18n
```

### 🧪 Unit Tests

Run unit tests:

```shell
make test
```

### 🧪 Run Cypress Tests

Run each of these steps in separate terminal sessions:

In the first session, start the frontend in development mode:

```shell
make acceptance-frontend-dev-start
```

In the second session, start the backend acceptance server:

```shell
make acceptance-backend-start
```

In the third session, start the Cypress interactive test runner:

```shell
make acceptance-test
```


## 📄 License

This project is licensed under the MIT license.


## 🙏 Credits and Acknowledgements

The development of this add-on was supported by:

<div style="text-align:center;">
    <div>
        <img src="https://raw.githubusercontent.com/collective/volto-image-editor/refs/heads/main/docs/docs/_static/ifpb-icon.svg" height="50px" style="max-height:50px">
        <h3>Instituto Federal da Paraíba</h3>
    </a>
    </div>
    <div>
        <img src="https://raw.githubusercontent.com/collective/volto-image-editor/refs/heads/main/docs/docs/_static/logo-simples.svg"  height="50px" style="max-height:50px">
        <h3>Simples Consultoria</h3>
        </a>
    </div>
</div>

Generated using [Cookieplone (0.9.9)](https://github.com/plone/cookieplone) and [cookieplone-templates (62683ae)](https://github.com/plone/cookieplone-templates/commit/62683aec96c2b6454cc32e06e57910fab3d52425) on 2025-10-14 23:13:02.127574. A special thanks to all contributors and supporters!
