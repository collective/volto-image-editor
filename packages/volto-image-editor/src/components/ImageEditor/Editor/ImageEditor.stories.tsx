import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import ImageEditor from './ImageEditor';
import { DemoContainer, createDemoImageDataURL } from '../../../stories/utils';

// Generate demo images once to avoid recreation
const demoImageSrc = createDemoImageDataURL(960, 640);
const portraitImageSrc = createDemoImageDataURL(640, 960);

const meta: Meta = {
  title: 'ImageEditor/ImageEditor',
  component: ImageEditor as any,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Full image editor with cropper, adjustments, and settings. Provides complete editing capabilities including crop, rotate, flip, and color adjustments.',
      },
    },
  },
  argTypes: {
    src: { control: false },
    onImageSave: { control: false },
    onCancel: { control: false },
  },
};
export default meta;

type Story = StoryObj;

export const Landscape: Story = {
  render: () => {
    function LandscapeStory() {
      const handleSave = (_dataUrl: string) => {
        /* no-op in story */
      };

      return (
        <DemoContainer width={960} height={640}>
          <ImageEditor
            src={demoImageSrc}
            onImageSave={handleSave}
            onCancel={() => {
              /* no-op */
            }}
          />
        </DemoContainer>
      );
    }
    return <LandscapeStory />;
  },
};

export const Portrait: Story = {
  render: () => {
    function PortraitStory() {
      const handleSave = (_dataUrl: string) => {
        /* no-op in story */
      };

      return (
        <DemoContainer width={640} height={960}>
          <ImageEditor
            src={portraitImageSrc}
            onImageSave={handleSave}
            onCancel={() => {
              /* no-op */
            }}
          />
        </DemoContainer>
      );
    }
    return <PortraitStory />;
  },
};

export const Compact: Story = {
  render: () => {
    function CompactStory() {
      const compactImageSrc = createDemoImageDataURL(480, 320);

      const handleSave = (_dataUrl: string) => {
        /* no-op in story */
      };

      return (
        <DemoContainer width={640} height={480}>
          <ImageEditor
            src={compactImageSrc}
            onImageSave={handleSave}
            onCancel={() => {
              /* no-op */
            }}
          />
        </DemoContainer>
      );
    }
    return <CompactStory />;
  },
};
