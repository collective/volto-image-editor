import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { AdjustableImage } from './AdjustableImage';
import {
  createDemoImageDataURL,
  DemoContainer,
} from '../../../../stories/utils';

const meta: Meta = {
  title: 'ImageEditor/Primitives/AdjustableImage',
  component: AdjustableImage,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Canvas-based image renderer that applies CSS-like filters (brightness, contrast, saturation, hue). Values range from -1 to 1 for all adjustments.',
      },
    },
  },
  argTypes: {
    brightness: { control: { type: 'range', min: -1, max: 1, step: 0.01 } },
    contrast: { control: { type: 'range', min: -1, max: 1, step: 0.01 } },
    saturation: { control: { type: 'range', min: -1, max: 1, step: 0.01 } },
    hue: { control: { type: 'range', min: -1, max: 1, step: 0.01 } },
    src: { control: false },
    className: { control: false },
    crossOrigin: { control: false },
    style: { control: false },
  },
};
export default meta;

type Story = StoryObj;

// Generate image once outside component to avoid recreating on every render
const demoImageSrc = createDemoImageDataURL(640, 426);

export const Interactive: Story = {
  render: (args) => (
    <DemoContainer width={680} height={460}>
      <AdjustableImage
        {...args}
        src={demoImageSrc}
        style={{ width: '100%', height: '100%' }}
      />
    </DemoContainer>
  ),
  args: {
    brightness: 0,
    contrast: 0,
    saturation: 0,
    hue: 0,
  },
};

export const BrightnessAdjusted: Story = {
  render: (args) => (
    <DemoContainer width={680} height={460}>
      <AdjustableImage
        {...args}
        src={demoImageSrc}
        style={{ width: '100%', height: '100%' }}
      />
    </DemoContainer>
  ),
  args: {
    brightness: 0.5,
    contrast: 0,
    saturation: 0,
    hue: 0,
  },
};

export const HighContrast: Story = {
  render: (args) => (
    <DemoContainer width={680} height={460}>
      <AdjustableImage
        {...args}
        src={demoImageSrc}
        style={{ width: '100%', height: '100%' }}
      />
    </DemoContainer>
  ),
  args: {
    brightness: 0,
    contrast: 0.7,
    saturation: 0,
    hue: 0,
  },
};

export const Saturated: Story = {
  render: (args) => (
    <DemoContainer width={680} height={460}>
      <AdjustableImage
        {...args}
        src={demoImageSrc}
        style={{ width: '100%', height: '100%' }}
      />
    </DemoContainer>
  ),
  args: {
    brightness: 0,
    contrast: 0,
    saturation: 0.8,
    hue: 0,
  },
};
