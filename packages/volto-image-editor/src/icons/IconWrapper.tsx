import React, { FC } from 'react';
import { Icon as VoltoIcon } from '@plone/volto/components';

export const ICON_SIZE = '30px';

interface VoltoIconWrapperProps {
  svg: any;
  size?: string;
  fill?: string;
}

export const VoltoIconWrapper: FC<VoltoIconWrapperProps> = ({
  svg,
  size = ICON_SIZE,
  fill = 'currentColor',
}) => {
  return <VoltoIcon name={svg} size={size} style={{ fill: fill }} />;
};
