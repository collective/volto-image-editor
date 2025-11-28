import React from 'react';
import AspectRatioSVG from './svg/aspectRatio.svg';
import SquareSVG from './svg/square.svg';
import RectangleSVG from './svg/rectangle.svg';
import ImageSVG from './svg/image.svg';
import RectangleFilledSVG from './svg/rectangleFilled.svg';
import ScreenSVG from '@plone/volto/icons/screen.svg';
import MobileSVG from '@plone/volto/icons/mobile.svg';
import TabletSVG from '@plone/volto/icons/tablet.svg';
import TelevisionSVG from '@plone/volto/icons/television.svg';
import { VoltoIconWrapper } from './IconWrapper';

// Free aspect ratio icon
export const FreeIcon = () => <VoltoIconWrapper svg={AspectRatioSVG} />;

// Square 1:1
export const SquareIcon = () => (
  <VoltoIconWrapper svg={SquareSVG} fill="none" />
);

// Portrait 1:2
export const PortraitIcon = () => <VoltoIconWrapper svg={TabletSVG} />;

// Landscape 2:1
export const LandscapeIcon = () => (
  <VoltoIconWrapper svg={RectangleSVG} fill="none" />
);

// Photo 3:4
export const PhotoIcon = () => <VoltoIconWrapper svg={ImageSVG} fill="none" />;

// Monitor 4:3
export const MonitorIcon = () => <VoltoIconWrapper svg={ScreenSVG} />;

// Widescreen 16:9
export const WidescreenIcon = () => <VoltoIconWrapper svg={TelevisionSVG} />;

// Mobile 9:16
export const MobileIcon = () => <VoltoIconWrapper svg={MobileSVG} />;

// Ultra-wide 21:9
export const UltraWideIcon = () => (
  <VoltoIconWrapper svg={RectangleFilledSVG} />
);
