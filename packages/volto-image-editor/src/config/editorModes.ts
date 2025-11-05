import React from 'react';
import {
  CropIcon,
  RotateLeftIcon,
  RotateRightIcon,
  FlipHorizontalIcon,
  FlipVerticalIcon,
  SaturationIcon,
  BrightnessIcon,
  ContrastIcon,
  HueIcon,
} from '../icons/index';

export interface EditorMode {
  id: string;
  icon: React.ComponentType;
  label?: string;
  tooltip?: string;
  type: 'mode' | 'action';
  group?: 'transform' | 'adjust' | 'filter' | 'custom';
}

export const defaultEditorModes: EditorMode[] = [
  {
    id: 'crop',
    icon: CropIcon,
    label: 'Crop',
    tooltip: 'Crop image',
    type: 'mode',
    group: 'transform',
  },
  {
    id: 'rotate-left',
    icon: RotateLeftIcon,
    label: 'Rotate Left',
    tooltip: 'Rotate 90° counter-clockwise',
    type: 'action',
    group: 'transform',
  },
  {
    id: 'rotate-right',
    icon: RotateRightIcon,
    label: 'Rotate Right',
    tooltip: 'Rotate 90° clockwise',
    type: 'action',
    group: 'transform',
  },
  {
    id: 'flip-horizontal',
    icon: FlipHorizontalIcon,
    label: 'Flip Horizontal',
    tooltip: 'Flip horizontally',
    type: 'action',
    group: 'transform',
  },
  {
    id: 'flip-vertical',
    icon: FlipVerticalIcon,
    label: 'Flip Vertical',
    tooltip: 'Flip vertically',
    type: 'action',
    group: 'transform',
  },
  {
    id: 'saturation',
    icon: SaturationIcon,
    label: 'Saturation',
    tooltip: 'Adjust saturation',
    type: 'mode',
    group: 'adjust',
  },
  {
    id: 'brightness',
    icon: BrightnessIcon,
    label: 'Brightness',
    tooltip: 'Adjust brightness',
    type: 'mode',
    group: 'adjust',
  },
  {
    id: 'contrast',
    icon: ContrastIcon,
    label: 'Contrast',
    tooltip: 'Adjust contrast',
    type: 'mode',
    group: 'adjust',
  },
  {
    id: 'hue',
    icon: HueIcon,
    label: 'Hue',
    tooltip: 'Adjust hue',
    type: 'mode',
    group: 'adjust',
  },
];

export const editorModeGroups = {
  transform: {
    id: 'transform',
    label: 'Transform',
    order: 1,
  },
  adjust: {
    id: 'adjust',
    label: 'Adjust',
    order: 2,
  },
  filter: {
    id: 'filter',
    label: 'Filters',
    order: 3,
  },
  custom: {
    id: 'custom',
    label: 'Custom',
    order: 4,
  },
};

export const getEditorModesByType = (
  modes: EditorMode[],
  type: 'mode' | 'action',
): EditorMode[] => {
  return modes.filter((mode) => mode.type === type);
};

export const getEditorModesByGroup = (
  modes: EditorMode[],
  group: string,
): EditorMode[] => {
  return modes.filter((mode) => mode.group === group);
};

export const getEditorModeById = (
  modes: EditorMode[],
  id: string,
): EditorMode | undefined => {
  return modes.find((mode) => mode.id === id);
};
