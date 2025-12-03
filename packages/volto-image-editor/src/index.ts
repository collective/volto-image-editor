import type { ConfigType } from '@plone/registry';
import { registerWidgets } from './config/widgets';

function applyConfig(config: ConfigType) {
  registerWidgets(config);

  return config;
}

export default applyConfig;
