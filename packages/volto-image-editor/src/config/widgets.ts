import type { ConfigType } from '@plone/registry';
import FileWidget from '../components/Widgets/FileWidget';

export const registerWidgets = (config: ConfigType) => {
  config.widgets.widget.file = FileWidget;
  config.widgets.type.object = FileWidget;

  return config;
};
