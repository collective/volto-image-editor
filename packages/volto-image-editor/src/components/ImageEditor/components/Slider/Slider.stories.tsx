import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Slider } from './Slider';

const meta: Meta = {
  title: 'ImageEditor/Primitives/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Accessible slider used for adjustments (brightness, contrast, etc.). Includes keyboard support (arrow keys, page up/down, home/end) and snapping to step increments.',
      },
    },
  },
  argTypes: {
    onChange: { control: false },
    value: { control: false },
    className: { control: false },
    showValue: { control: 'boolean' },
    min: { control: { type: 'number', min: -2, max: 0, step: 0.1 } },
    max: { control: { type: 'number', min: 0, max: 2, step: 0.1 } },
    step: { control: { type: 'number', min: 0.001, max: 0.1, step: 0.001 } },
    disabled: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj;

const Wrapper: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div style={{ width: 360, padding: 16 }}>{children}</div>
);

export const Interactive: Story = {
  render: (args) => {
    function InteractiveStory() {
      const [value, setValue] = React.useState(0);
      return (
        <Wrapper>
          <Slider {...args} value={value} onChange={setValue} />
          <div style={{ marginTop: 8, textAlign: 'center', fontSize: 14 }}>
            Value: {value.toFixed(2)}
          </div>
        </Wrapper>
      );
    }
    return <InteractiveStory />;
  },
  args: {
    min: -1,
    max: 1,
    step: 0.01,
    showValue: true,
  },
};

export const Disabled: Story = {
  render: (args) => {
    function DisabledStory() {
      const [value] = React.useState(0.5);
      return (
        <Wrapper>
          <Slider {...args} value={value} />
        </Wrapper>
      );
    }
    return <DisabledStory />;
  },
  args: {
    disabled: true,
    showValue: true,
  },
};

export const CustomRange: Story = {
  render: (args) => {
    function CustomRangeStory() {
      const [value, setValue] = React.useState(50);
      return (
        <Wrapper>
          <Slider {...args} value={value} onChange={setValue} />
          <div style={{ marginTop: 8, textAlign: 'center', fontSize: 14 }}>
            Value: {value.toFixed(0)}
          </div>
        </Wrapper>
      );
    }
    return <CustomRangeStory />;
  },
  args: {
    min: 0,
    max: 100,
    step: 1,
    showValue: true,
  },
};

export const HiddenValue: Story = {
  render: (args) => {
    function HiddenValueStory() {
      const [value, setValue] = React.useState(0);
      return (
        <Wrapper>
          <Slider {...args} value={value} onChange={setValue} />
          <div style={{ marginTop: 8, textAlign: 'center', fontSize: 14 }}>
            External display: {value.toFixed(2)}
          </div>
        </Wrapper>
      );
    }
    return <HiddenValueStory />;
  },
  args: {
    min: -1,
    max: 1,
    step: 0.01,
    showValue: false,
  },
};
