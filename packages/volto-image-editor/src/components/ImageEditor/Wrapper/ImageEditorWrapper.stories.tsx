import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import ImageEditorWrapper from './ImageEditorWrapper';
import { DemoContainer, createDemoImageDataURL } from '../../../stories/utils';

const demoImageSrc = createDemoImageDataURL(960, 640);
const portraitImageSrc = createDemoImageDataURL(640, 960);

const meta: Meta = {
  title: 'ImageEditor/ImageEditorWrapper',
  component: ImageEditorWrapper as any,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Wrapper that integrates the image editor with Plone/Volto widgets. Opens editor in a modal and handles data format conversion between Plone format and data URLs. Click "Edit image" to open the modal editor.',
      },
    },
  },
  argTypes: {
    value: {
      control: false,
      description:
        'Plone-style image value with download URL, filename, and content-type',
    },
    setData: {
      control: false,
      description: 'Callback function to update the widget value after editing',
    },
    buttonText: {
      control: 'text',
      description: 'Custom text for the edit button',
    },
  },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  name: 'With Image Preview',
  parameters: {
    docs: {
      description: {
        story:
          'Complete integration showing the edit button, modal editor, and preview of saved results. After editing and saving, the new image is shown with metadata.',
      },
    },
  },
  render: () => {
    function DefaultStory() {
      const [value, setValue] = React.useState<any>({
        download: demoImageSrc,
        filename: 'demo.jpg',
        'content-type': 'image/jpeg',
      });

      const handleSetData = (newValue: any) => {
        setValue(newValue);
      };

      return (
        <div style={{ width: 980 }}>
          <div
            style={{
              marginBottom: 12,
              padding: 12,
              background: '#f0f9ff',
              borderRadius: 6,
              fontSize: 14,
            }}
          >
            Click the "Edit image" button to open the editor modal
          </div>
          <ImageEditorWrapper value={value} setData={handleSetData} />
          {value?.data && (
            <div style={{ marginTop: 16 }}>
              <div
                style={{
                  marginBottom: 8,
                  fontWeight: 600,
                  fontSize: 14,
                }}
              >
                Saved preview:
              </div>
              <DemoContainer width={640} height={426}>
                <img
                  src={`data:${value['content-type']};base64,${value.data}`}
                  alt="Saved"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }}
                />
              </DemoContainer>
              <div
                style={{
                  marginTop: 8,
                  padding: 8,
                  background: '#f9fafb',
                  borderRadius: 4,
                  fontSize: 12,
                }}
              >
                <strong>Filename:</strong> {value.filename}
                <br />
                <strong>Content-Type:</strong> {value['content-type']}
                <br />
                <strong>Data size:</strong> {value.data.length} bytes (base64)
              </div>
            </div>
          )}
        </div>
      );
    }
    return <DefaultStory />;
  },
};

export const WithoutInitialImage: Story = {
  name: 'Async Image Loading',
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates loading an image asynchronously after component mount. This is common when fetching content from an API or waiting for image upload.',
      },
    },
  },
  render: () => {
    function WithoutImageStory() {
      const [value, setValue] = React.useState<any>(null);

      React.useEffect(() => {
        // Simulate loading image after mount
        const timer = setTimeout(() => {
          setValue({
            download: demoImageSrc,
            filename: 'loaded-demo.jpg',
            'content-type': 'image/jpeg',
          });
        }, 500);
        return () => clearTimeout(timer);
      }, []);

      const handleSetData = (newValue: any) => {
        setValue(newValue);
      };

      if (!value) {
        return (
          <div style={{ padding: 24, textAlign: 'center' }}>
            Loading image...
          </div>
        );
      }

      return (
        <div style={{ width: 980 }}>
          <ImageEditorWrapper value={value} setData={handleSetData} />
        </div>
      );
    }
    return <WithoutImageStory />;
  },
};

export const PortraitImage: Story = {
  name: 'Portrait Image',
  parameters: {
    docs: {
      description: {
        story:
          'Editor with a portrait-oriented image (640x960). Shows how the editor adapts to different aspect ratios.',
      },
    },
  },
  render: () => {
    function PortraitStory() {
      const [value, setValue] = React.useState<any>({
        download: portraitImageSrc,
        filename: 'portrait.jpg',
        'content-type': 'image/jpeg',
      });

      return (
        <div style={{ width: 980 }}>
          <div
            style={{
              marginBottom: 12,
              padding: 12,
              background: '#f0f9ff',
              borderRadius: 6,
              fontSize: 14,
            }}
          >
            Try editing this portrait-oriented image
          </div>
          <ImageEditorWrapper value={value} setData={setValue} />
        </div>
      );
    }
    return <PortraitStory />;
  },
};

export const CustomButtonText: Story = {
  name: 'Custom Button Text',
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates using custom text for the edit button. Useful for internationalization or specific use cases.',
      },
    },
  },
  render: () => {
    function CustomButtonStory() {
      const [value, setValue] = React.useState<any>({
        download: demoImageSrc,
        filename: 'demo.jpg',
        'content-type': 'image/jpeg',
      });

      return (
        <div style={{ width: 980 }}>
          <ImageEditorWrapper
            value={value}
            setData={setValue}
            buttonText="🎨 Crop and Enhance"
          />
        </div>
      );
    }
    return <CustomButtonStory />;
  },
};

export const InFormContext: Story = {
  name: 'In Form Context',
  parameters: {
    docs: {
      description: {
        story:
          'Simulates usage within a form with multiple fields. Shows how the editor integrates with other form elements.',
      },
    },
  },
  render: () => {
    function FormContextStory() {
      const [formData, setFormData] = React.useState<any>({
        title: 'My Article',
        description: 'This is a great article with an image',
        image: {
          download: demoImageSrc,
          filename: 'article-image.jpg',
          'content-type': 'image/jpeg',
        },
      });

      const handleImageChange = (newImage: any) => {
        setFormData({
          ...formData,
          image: newImage,
        });
      };

      return (
        <div style={{ width: 980 }}>
          <div
            style={{
              padding: 24,
              background: '#f9fafb',
              borderRadius: 8,
              border: '1px solid #e5e7eb',
            }}
          >
            <div style={{ marginBottom: 16 }}>
              <label
                htmlFor="title"
                style={{
                  display: 'block',
                  marginBottom: 4,
                  fontWeight: 600,
                  fontSize: 14,
                }}
              >
                Title
              </label>
              <input
                id="title"
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                style={{
                  width: '100%',
                  padding: 8,
                  border: '1px solid #d1d5db',
                  borderRadius: 4,
                }}
              />
            </div>

            <div style={{ marginBottom: 16 }}>
              <label
                htmlFor="description"
                style={{
                  display: 'block',
                  marginBottom: 4,
                  fontWeight: 600,
                  fontSize: 14,
                }}
              >
                Description
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                style={{
                  width: '100%',
                  padding: 8,
                  border: '1px solid #d1d5db',
                  borderRadius: 4,
                  minHeight: 80,
                }}
              />
            </div>

            <div style={{ marginBottom: 16 }}>
              <label
                htmlFor="featured-image"
                style={{
                  display: 'block',
                  marginBottom: 8,
                  fontWeight: 600,
                  fontSize: 14,
                }}
              >
                Featured Image
              </label>
              {formData.image?.download && (
                <div style={{ marginBottom: 12 }}>
                  <img
                    id="featured-image"
                    src={
                      formData.image.data
                        ? `data:${formData.image['content-type']};base64,${formData.image.data}`
                        : formData.image.download
                    }
                    alt="Featured"
                  />
                </div>
              )}
              <ImageEditorWrapper
                value={formData.image}
                setData={handleImageChange}
              />
            </div>

            <div
              style={{
                marginTop: 24,
                padding: 12,
                background: '#eff6ff',
                borderRadius: 4,
                fontSize: 13,
              }}
            >
              <strong>Form Data Preview:</strong>
              <pre style={{ marginTop: 8, fontSize: 11, overflow: 'auto' }}>
                {JSON.stringify(
                  {
                    ...formData,
                    image: formData.image?.data
                      ? {
                          ...formData.image,
                          data: `${formData.image.data.substring(0, 50)}... (${formData.image.data.length} chars)`,
                        }
                      : formData.image,
                  },
                  null,
                  2,
                )}
              </pre>
            </div>
          </div>
        </div>
      );
    }
    return <FormContextStory />;
  },
};
