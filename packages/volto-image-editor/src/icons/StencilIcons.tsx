import React from 'react';
import { VoltoIconWrapper } from './IconWrapper';
import SquareSVG from '@plone/volto/icons/checkbox-unchecked.svg';
import CircleSVG from '@plone/volto/icons/radio-unchecked.svg';

// Rectangle stencil
export const RectangleStencilIcon = () => <VoltoIconWrapper svg={SquareSVG} />;

// Circle stencil
export const CircleStencilIcon = () => <VoltoIconWrapper svg={CircleSVG} />;
