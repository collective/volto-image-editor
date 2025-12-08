import type { ConfigType } from '@plone/registry';
import installSettings from './config/settings';
import { registerWidgets } from './config/widgets';

function applyConfig(config: ConfigType) {
  installSettings(config);
  registerWidgets(config);

  return config;
}

export default applyConfig;
