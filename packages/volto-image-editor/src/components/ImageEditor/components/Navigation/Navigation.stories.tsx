import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Navigation } from './Navigation';

const meta: Meta = {
  title: 'ImageEditor/Controls/Navigation',
  component: Navigation,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Toolbar with crop, rotate, flip, and adjustment mode buttons, plus Cancel/Save actions. Handles mode switching and transformation tracking.',
      },
    },
  },
  argTypes: {
    mode: { control: false },
    onChange: { control: false },
    onSave: { control: false },
    onCancel: { control: false },
    onAction: { control: false },
    onResetRotation: { control: false },
    hasRotationChanges: { control: false },
    className: { control: false },
  },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => {
    function DefaultStory() {
      const [mode, setMode] = React.useState('crop');
      const [hasRotationChanges, setHasRotationChanges] = React.useState(false);

      return (
        <div style={{ width: 720 }}>
          <Navigation
            mode={mode}
            onChange={(m) => setMode(m)}
            onSave={() => {}}
            onCancel={() => {}}
            onAction={(a) => {
              if (a.startsWith('rotate') || a.startsWith('flip')) {
                setHasRotationChanges(true);
              }
            }}
            onResetRotation={() => setHasRotationChanges(false)}
            hasRotationChanges={hasRotationChanges}
          />
          <div
            style={{
              marginTop: 12,
              padding: 8,
              textAlign: 'center',
              background: '#f9fafb',
              borderRadius: 4,
              fontSize: 14,
            }}
          >
            <strong>Active mode:</strong> {mode}
            {hasRotationChanges && (
              <span style={{ marginLeft: 8, color: '#ea580c' }}>
                • Rotation changes detected
              </span>
            )}
          </div>
        </div>
      );
    }
    return <DefaultStory />;
  },
};

export const BrightnessMode: Story = {
  render: () => {
    function BrightnessModeStory() {
      const [mode, setMode] = React.useState('brightness');
      const [hasRotationChanges, setHasRotationChanges] = React.useState(false);

      return (
        <div style={{ width: 720 }}>
          <Navigation
            mode={mode}
            onChange={(m) => setMode(m)}
            onSave={() => {}}
            onCancel={() => {}}
            onAction={(a) => {
              if (a.startsWith('rotate') || a.startsWith('flip')) {
                setHasRotationChanges(true);
              }
            }}
            onResetRotation={() => setHasRotationChanges(false)}
            hasRotationChanges={hasRotationChanges}
          />
        </div>
      );
    }
    return <BrightnessModeStory />;
  },
};
