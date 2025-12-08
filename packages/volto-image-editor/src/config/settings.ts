import type { ConfigType } from '@plone/registry';
import type { ImageSettings } from '@plone-collective/volto-image-editor/types/ImageSettings';

export const install = (config: ConfigType) => {
  const imageEditorSettings: ImageSettings = {
    aspectRatio: '16:9',
    imageRestriction: 'fit-area',
    stencilType: 'rectangle',
    minWidth: 50,
    minHeight: 50,
    maxCropWidth: undefined,
    maxCropHeight: undefined,
    scalable: true,
    stencilGrid: true,
    minScale: 0.1,
    maxScale: 3,
  };

  // Default settings for the image editor
  config.settings.imageEditor = imageEditorSettings;

  return config;
};

export default install;
