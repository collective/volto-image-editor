import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Button } from './Button';
import { CropIcon } from '@plone-collective/volto-image-editor/icons/CropIcon';
import { BrightnessIcon } from '@plone-collective/volto-image-editor/icons/BrightnessIcon';

const meta: Meta = {
  title: 'ImageEditor/Primitives/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Small utility button used throughout the editor. Supports active and disabled states.',
      },
    },
  },
  argTypes: {
    onClick: { action: 'clicked' },
    active: { control: 'boolean' },
    disabled: { control: 'boolean' },
    className: { control: false },
    children: { control: false },
  },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  args: {
    children: 'Button',
  },
};

export const Active: Story = {
  args: {
    children: 'Active Button',
    active: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
};

export const WithIcon: Story = {
  args: {
    children: <CropIcon />,
  },
};

export const WithIconActive: Story = {
  args: {
    children: <BrightnessIcon />,
    active: true,
  },
};

export const WithIconDisabled: Story = {
  args: {
    children: <CropIcon />,
    disabled: true,
  },
};
