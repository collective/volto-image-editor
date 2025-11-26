import React from 'react';
import ImageFitSVG from '@plone/volto/icons/image-fit.svg';
import ImageFullSVG from '@plone/volto/icons/image-full.svg';
import TargetSVG from '@plone/volto/icons/target.svg';
import UnlinkSVG from '@plone/volto/icons/unlink.svg';
import { VoltoIconWrapper } from './IconWrapper';

// Fit Area - image fits inside boundaries
export const FitAreaIcon = () => <VoltoIconWrapper svg={ImageFitSVG} />;

// Fill Area - image fills the boundaries
export const FillAreaIcon = () => <VoltoIconWrapper svg={ImageFullSVG} />;

// Stencil - image restricted to stencil area
export const StencilIcon = () => <VoltoIconWrapper svg={TargetSVG} />;

// None - no restrictions
export const NoRestrictionIcon = () => <VoltoIconWrapper svg={UnlinkSVG} />;
