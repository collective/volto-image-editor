import React from 'react';
import {
  TbAspectRatio,
  TbSquare,
  TbRectangleVertical,
  TbRectangle,
  TbPhoto,
  TbDeviceDesktop,
  TbDeviceTv,
  TbDeviceMobile,
  TbRectangleFilled,
} from 'react-icons/tb';

// Free aspect ratio icon
export const FreeIcon = () => <TbAspectRatio />;

// Square 1:1
export const SquareIcon = () => <TbSquare />;

// Portrait 1:2
export const PortraitIcon = () => <TbRectangleVertical />;

// Landscape 2:1
export const LandscapeIcon = () => <TbRectangle />;

// Photo 3:4
export const PhotoIcon = () => <TbPhoto />;

// Monitor 4:3
export const MonitorIcon = () => <TbDeviceDesktop />;

// Widescreen 16:9
export const WidescreenIcon = () => <TbDeviceTv />;

// Mobile 9:16
export const MobileIcon = () => <TbDeviceMobile />;

// Ultra-wide 21:9
export const UltraWideIcon = () => <TbRectangleFilled />;
