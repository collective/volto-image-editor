import type { ConfigType } from '@plone/registry';
import installSettings from './config/settings';

function applyConfig(config: ConfigType) {
  installSettings(config);

  return config;
}

export default applyConfig;

export {
  defaultEditorModes,
  editorModeGroups,
  getEditorModesByType,
  getEditorModesByGroup,
  getEditorModeById,
  type EditorMode,
} from './config/editorModes';

export * from './icons';

export { default as ImageEditor } from './components/ImageEditor/Editor/ImageEditor';
export { Navigation } from './components/ImageEditor/components/Navigation/Navigation';
export { SettingsModal } from './components/ImageEditor/components/SettingsModal/SettingsModal';
export { Button } from './components/ImageEditor/components/Button/Button';

export type { ImageSettings } from './components/ImageEditor/types/ImageSettings';
