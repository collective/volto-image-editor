import React, { FC } from 'react';
import cn from 'classnames';
import { defineMessages, useIntl } from 'react-intl';
import {
  Button,
  Icon,
  NumberField,
  Checkbox,
  RadioGroup,
} from '@plone/components';
import { Radio } from 'react-aria-components';
import { SettingsIcon } from '@plone-collective/volto-image-editor/icons/SettingsIcon';
import type { ImageSettings } from '../../types/ImageSettings';
import {
  FreeIcon,
  SquareIcon,
  PortraitIcon,
  LandscapeIcon,
  PhotoIcon,
  MonitorIcon,
  WidescreenIcon,
  MobileIcon,
  UltraWideIcon,
} from '@plone-collective/volto-image-editor/icons/AspectRatioIcons';
import {
  FitAreaIcon,
  FillAreaIcon,
  StencilIcon,
  NoRestrictionIcon,
} from '@plone-collective/volto-image-editor/icons/RestrictionIcons';
import {
  RectangleStencilIcon,
  CircleStencilIcon,
} from '@plone-collective/volto-image-editor/icons/StencilIcons';
import './SettingsModal.scss';

const messages = defineMessages({
  editorSettings: {
    id: 'Editor Settings',
    defaultMessage: 'Editor Settings',
  },
  aspectRatio: {
    id: 'Aspect Ratio',
    defaultMessage: 'Aspect Ratio',
  },
  freeAspectRatio: {
    id: 'Free aspect ratio',
    defaultMessage: 'Free',
  },
  square: {
    id: 'Square (1:1)',
    defaultMessage: '1:1',
  },
  photo: {
    id: 'Photo (3:4)',
    defaultMessage: '3:4',
  },
  monitor: {
    id: 'Monitor (4:3)',
    defaultMessage: '4:3',
  },
  widescreen: {
    id: 'Widescreen (16:9)',
    defaultMessage: '16:9',
  },
  mobile: {
    id: 'Mobile (9:16)',
    defaultMessage: '9:16',
  },
  landscape: {
    id: 'Landscape (2:1)',
    defaultMessage: '2:1',
  },
  ultraWide: {
    id: 'Ultra Wide (21:9)',
    defaultMessage: '21:9',
  },
  portrait: {
    id: 'Portrait (1:2)',
    defaultMessage: '1:2',
  },
  imageRestriction: {
    id: 'Image Restriction',
    defaultMessage: 'Image Restriction',
  },
  fitArea: {
    id: 'Fit Area',
    defaultMessage: 'Fit',
  },
  fillArea: {
    id: 'Fill Area',
    defaultMessage: 'Fill',
  },
  stencilRestriction: {
    id: 'Stencil',
    defaultMessage: 'Stencil',
  },
  noRestriction: {
    id: 'No Restriction',
    defaultMessage: 'Free',
  },
  stencilType: {
    id: 'Stencil Type',
    defaultMessage: 'Stencil Type',
  },
  rectangle: {
    id: 'Rectangle',
    defaultMessage: 'Rectangle',
  },
  circle: {
    id: 'Circle',
    defaultMessage: 'Circle',
  },
  minDimensions: {
    id: 'Minimum Dimensions',
    defaultMessage: 'Minimum Dimensions',
  },
  minWidth: {
    id: 'Min width',
    defaultMessage: 'Min width',
  },
  minHeight: {
    id: 'Min height',
    defaultMessage: 'Min height',
  },
  maxCropDimensions: {
    id: 'Maximum Crop Dimensions',
    defaultMessage: 'Maximum Crop Dimensions',
  },
  maxWidth: {
    id: 'Max width',
    defaultMessage: 'Max width',
  },
  maxHeight: {
    id: 'Max height',
    defaultMessage: 'Max height',
  },
  stencilGrid: {
    id: 'Stencil Grid',
    defaultMessage: 'Stencil Grid',
  },
});

interface Props {
  className?: string;
  settings: ImageSettings;
  onChange: (settings: ImageSettings) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const SettingsModal: FC<Props> = ({
  className,
  settings,
  onChange,
  isOpen,
  onToggle,
}) => {
  const intl = useIntl();
  const handleSettingChange = (key: keyof ImageSettings, value: any) => {
    onChange({
      ...settings,
      [key]: value,
    });
  };

  return (
    <>
      <Button
        className={cn('image-editor-settings-modal__toggle', className)}
        onClick={onToggle}
      >
        <SettingsIcon />
      </Button>

      {isOpen && (
        <div
          className={cn('image-editor-settings-modal__overlay')}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              onToggle();
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              onToggle();
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="Close settings modal"
        >
          <div
            className="image-editor-settings-modal__content"
            aria-labelledby="settings-modal-title"
          >
            <div className="image-editor-settings-modal__header">
              <h2
                id="settings-modal-title"
                className="image-editor-settings-modal__title"
              >
                {intl.formatMessage(messages.editorSettings)}
              </h2>
              <Button
                className="image-editor-settings-modal__close"
                onClick={onToggle}
              >
                ✕
              </Button>
            </div>

            <div className="image-editor-settings-modal__body">
              <div className="image-editor-settings-modal__section">
                <div className="image-editor-settings-modal__label">
                  {intl.formatMessage(messages.aspectRatio)}
                </div>
                <RadioGroup
                  aria-label={intl.formatMessage(messages.aspectRatio)}
                  value={settings.aspectRatio}
                  onChange={(val) => handleSettingChange('aspectRatio', val)}
                  className="image-editor-settings-modal__icon-scroll"
                >
                  <Radio
                    value="free"
                    className={cn(
                      'image-editor-settings-modal__icon-option',
                      settings.aspectRatio === 'free' && 'active',
                    )}
                  >
                    <Icon
                      aria-label={intl.formatMessage(messages.freeAspectRatio)}
                      size="base"
                    >
                      <FreeIcon />
                    </Icon>
                    <span>{intl.formatMessage(messages.freeAspectRatio)}</span>
                  </Radio>
                  <Radio
                    value="1:1"
                    className={cn(
                      'image-editor-settings-modal__icon-option',
                      settings.aspectRatio === '1:1' && 'active',
                    )}
                  >
                    <Icon
                      aria-label={intl.formatMessage(messages.square)}
                      size="base"
                    >
                      <SquareIcon />
                    </Icon>
                    <span>{intl.formatMessage(messages.square)}</span>
                  </Radio>
                  <Radio
                    value="3:4"
                    className={cn(
                      'image-editor-settings-modal__icon-option',
                      settings.aspectRatio === '3:4' && 'active',
                    )}
                  >
                    <Icon
                      aria-label={intl.formatMessage(messages.photo)}
                      size="base"
                    >
                      <PhotoIcon />
                    </Icon>
                    <span>{intl.formatMessage(messages.photo)}</span>
                  </Radio>
                  <Radio
                    value="4:3"
                    className={cn(
                      'image-editor-settings-modal__icon-option',
                      settings.aspectRatio === '4:3' && 'active',
                    )}
                  >
                    <Icon
                      aria-label={intl.formatMessage(messages.monitor)}
                      size="base"
                    >
                      <MonitorIcon />
                    </Icon>
                    <span>{intl.formatMessage(messages.monitor)}</span>
                  </Radio>
                  <Radio
                    value="16:9"
                    className={cn(
                      'image-editor-settings-modal__icon-option',
                      settings.aspectRatio === '16:9' && 'active',
                    )}
                  >
                    <Icon
                      aria-label={intl.formatMessage(messages.widescreen)}
                      size="base"
                    >
                      <WidescreenIcon />
                    </Icon>
                    <span>{intl.formatMessage(messages.widescreen)}</span>
                  </Radio>
                  <Radio
                    value="9:16"
                    className={cn(
                      'image-editor-settings-modal__icon-option',
                      settings.aspectRatio === '9:16' && 'active',
                    )}
                  >
                    <Icon
                      aria-label={intl.formatMessage(messages.mobile)}
                      size="base"
                    >
                      <MobileIcon />
                    </Icon>
                    <span>{intl.formatMessage(messages.mobile)}</span>
                  </Radio>
                  <Radio
                    value="2:1"
                    className={cn(
                      'image-editor-settings-modal__icon-option',
                      settings.aspectRatio === '2:1' && 'active',
                    )}
                  >
                    <Icon
                      aria-label={intl.formatMessage(messages.landscape)}
                      size="base"
                    >
                      <LandscapeIcon />
                    </Icon>
                    <span>{intl.formatMessage(messages.landscape)}</span>
                  </Radio>
                  <Radio
                    value="21:9"
                    className={cn(
                      'image-editor-settings-modal__icon-option',
                      settings.aspectRatio === '21:9' && 'active',
                    )}
                  >
                    <Icon
                      aria-label={intl.formatMessage(messages.ultraWide)}
                      size="base"
                    >
                      <UltraWideIcon />
                    </Icon>
                    <span>{intl.formatMessage(messages.ultraWide)}</span>
                  </Radio>
                  <Radio
                    value="1:2"
                    className={cn(
                      'image-editor-settings-modal__icon-option',
                      settings.aspectRatio === '1:2' && 'active',
                    )}
                  >
                    <Icon
                      aria-label={intl.formatMessage(messages.portrait)}
                      size="base"
                    >
                      <PortraitIcon />
                    </Icon>
                    <span>{intl.formatMessage(messages.portrait)}</span>
                  </Radio>
                </RadioGroup>
              </div>

              <div className="image-editor-settings-modal__section">
                <div className="image-editor-settings-modal__label">
                  {intl.formatMessage(messages.imageRestriction)}
                </div>
                <RadioGroup
                  aria-label={intl.formatMessage(messages.imageRestriction)}
                  value={settings.imageRestriction}
                  onChange={(val) =>
                    handleSettingChange('imageRestriction', val)
                  }
                  className="image-editor-settings-modal__icon-scroll"
                >
                  <Radio
                    value="fit-area"
                    className={cn(
                      'image-editor-settings-modal__icon-option',
                      settings.imageRestriction === 'fit-area' && 'active',
                    )}
                  >
                    <Icon
                      aria-label={intl.formatMessage(messages.fitArea)}
                      size="base"
                    >
                      <FitAreaIcon />
                    </Icon>
                    <span>{intl.formatMessage(messages.fitArea)}</span>
                  </Radio>
                  <Radio
                    value="fill-area"
                    className={cn(
                      'image-editor-settings-modal__icon-option',
                      settings.imageRestriction === 'fill-area' && 'active',
                    )}
                  >
                    <Icon
                      aria-label={intl.formatMessage(messages.fillArea)}
                      size="base"
                    >
                      <FillAreaIcon />
                    </Icon>
                    <span>{intl.formatMessage(messages.fillArea)}</span>
                  </Radio>
                  <Radio
                    value="stencil"
                    className={cn(
                      'image-editor-settings-modal__icon-option',
                      settings.imageRestriction === 'stencil' && 'active',
                    )}
                  >
                    <Icon
                      aria-label={intl.formatMessage(
                        messages.stencilRestriction,
                      )}
                      size="base"
                    >
                      <StencilIcon />
                    </Icon>
                    <span>
                      {intl.formatMessage(messages.stencilRestriction)}
                    </span>
                  </Radio>
                  <Radio
                    value="none"
                    className={cn(
                      'image-editor-settings-modal__icon-option',
                      settings.imageRestriction === 'none' && 'active',
                    )}
                  >
                    <Icon
                      aria-label={intl.formatMessage(messages.noRestriction)}
                      size="base"
                    >
                      <NoRestrictionIcon />
                    </Icon>
                    <span>{intl.formatMessage(messages.noRestriction)}</span>
                  </Radio>
                </RadioGroup>
              </div>

              <div className="image-editor-settings-modal__section">
                <div className="image-editor-settings-modal__label">
                  {intl.formatMessage(messages.stencilType)}
                </div>
                <RadioGroup
                  aria-label={intl.formatMessage(messages.stencilType)}
                  value={settings.stencilType}
                  onChange={(val) => handleSettingChange('stencilType', val)}
                  className="image-editor-settings-modal__icon-scroll"
                >
                  <Radio
                    value="rectangle"
                    className={cn(
                      'image-editor-settings-modal__icon-option',
                      settings.stencilType === 'rectangle' && 'active',
                    )}
                  >
                    <Icon
                      aria-label={intl.formatMessage(messages.rectangle)}
                      size="base"
                    >
                      <RectangleStencilIcon />
                    </Icon>
                    <span>{intl.formatMessage(messages.rectangle)}</span>
                  </Radio>
                  <Radio
                    value="circle"
                    className={cn(
                      'image-editor-settings-modal__icon-option',
                      settings.stencilType === 'circle' && 'active',
                    )}
                  >
                    <Icon
                      aria-label={intl.formatMessage(messages.circle)}
                      size="base"
                    >
                      <CircleStencilIcon />
                    </Icon>
                    <span>{intl.formatMessage(messages.circle)}</span>
                  </Radio>
                </RadioGroup>
              </div>

              <div className="image-editor-settings-modal__section">
                <div className="image-editor-settings-modal__label">
                  {intl.formatMessage(messages.minDimensions)}
                </div>
                <div className="image-editor-settings-modal__row">
                  <NumberField
                    label={intl.formatMessage(messages.minWidth)}
                    value={settings.minWidth}
                    minValue={0}
                    onChange={(value) => handleSettingChange('minWidth', value)}
                  />
                  <NumberField
                    label={intl.formatMessage(messages.minHeight)}
                    value={settings.minHeight}
                    minValue={0}
                    onChange={(value) =>
                      handleSettingChange('minHeight', value)
                    }
                  />
                </div>
              </div>

              <div className="image-editor-settings-modal__section">
                <div className="image-editor-settings-modal__label">
                  {intl.formatMessage(messages.maxCropDimensions)}
                </div>
                <div className="image-editor-settings-modal__row">
                  <NumberField
                    label={intl.formatMessage(messages.maxWidth)}
                    value={settings.maxCropWidth ?? 0}
                    minValue={0}
                    onChange={(value) =>
                      handleSettingChange('maxCropWidth', value || 0)
                    }
                  />
                  <NumberField
                    label={intl.formatMessage(messages.maxHeight)}
                    value={settings.maxCropHeight ?? 0}
                    minValue={0}
                    onChange={(value) =>
                      handleSettingChange('maxCropHeight', value || 0)
                    }
                  />
                </div>
              </div>

              <div className="image-editor-settings-modal__section">
                <Checkbox
                  isSelected={settings.stencilGrid}
                  onChange={(isSelected) =>
                    handleSettingChange('stencilGrid', isSelected)
                  }
                >
                  <p>{intl.formatMessage(messages.stencilGrid)}</p>
                </Checkbox>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
