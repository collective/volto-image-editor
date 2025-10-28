import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { SettingsModal } from './SettingsModal';
import type { ImageSettings } from '../../types/ImageSettings';

const meta: Meta = {
  title: 'ImageEditor/Controls/SettingsModal',
  component: SettingsModal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Editor settings panel for aspect ratio, image restriction, stencil type, and dimension constraints. Click the settings icon to toggle the modal.',
      },
    },
  },
  argTypes: {
    isOpen: { control: false },
    onToggle: { control: false },
    settings: { control: false },
    onChange: { control: false },
    className: { control: false },
  },
};
export default meta;

type Story = StoryObj;

const defaultSettings: ImageSettings = {
  aspectRatio: 'free',
  imageRestriction: 'fit-area',
  stencilType: 'rectangle',
  minWidth: 50,
  minHeight: 50,
  maxCropWidth: undefined,
  maxCropHeight: undefined,
  scalable: true,
  stencilGrid: false,
  minScale: 0.1,
  maxScale: 3,
};

export const Default: Story = {
  render: () => {
    function DefaultStory() {
      const [open, setOpen] = React.useState(true);
      const [settings, setSettings] =
        React.useState<ImageSettings>(defaultSettings);

      return (
        <div style={{ width: 700 }}>
          <div
            style={{
              marginBottom: 12,
              padding: 12,
              background: '#f0f9ff',
              borderRadius: 6,
              fontSize: 14,
            }}
          >
            Click the settings icon to {open ? 'close' : 'open'} the modal
          </div>
          <SettingsModal
            isOpen={open}
            onToggle={() => setOpen((o) => !o)}
            settings={settings}
            onChange={setSettings}
          />
          <pre
            style={{
              marginTop: 12,
              padding: 12,
              background: '#f9fafb',
              borderRadius: 8,
              fontSize: 12,
              overflow: 'auto',
              maxHeight: 300,
            }}
          >
            {JSON.stringify(settings, null, 2)}
          </pre>
        </div>
      );
    }
    return <DefaultStory />;
  },
};

export const WithSquareAspect: Story = {
  render: () => {
    function SquareStory() {
      const [open, setOpen] = React.useState(true);
      const [settings, setSettings] = React.useState<ImageSettings>({
        ...defaultSettings,
        aspectRatio: '1:1',
        stencilGrid: true,
      });

      return (
        <div style={{ width: 700 }}>
          <SettingsModal
            isOpen={open}
            onToggle={() => setOpen((o) => !o)}
            settings={settings}
            onChange={setSettings}
          />
          <pre
            style={{
              marginTop: 12,
              padding: 12,
              background: '#f9fafb',
              borderRadius: 8,
              fontSize: 12,
            }}
          >
            {JSON.stringify(settings, null, 2)}
          </pre>
        </div>
      );
    }
    return <SquareStory />;
  },
};

export const WithCircleStencil: Story = {
  render: () => {
    function CircleStory() {
      const [open, setOpen] = React.useState(true);
      const [settings, setSettings] = React.useState<ImageSettings>({
        ...defaultSettings,
        stencilType: 'circle',
        aspectRatio: '1:1',
      });

      return (
        <div style={{ width: 700 }}>
          <SettingsModal
            isOpen={open}
            onToggle={() => setOpen((o) => !o)}
            settings={settings}
            onChange={setSettings}
          />
        </div>
      );
    }
    return <CircleStory />;
  },
};
