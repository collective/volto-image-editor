/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, jsx-a11y/label-has-associated-control */
import React, { FC } from 'react';
import cn from 'classnames';
import { defineMessages, useIntl } from 'react-intl';
import { Button } from '../Button/Button';
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

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onToggle();
    }
  };

  return (
    <>
      <Button
        className={cn('image-editor-settings-modal__toggle', className)}
        onClick={onToggle}
        active={isOpen}
      >
        <SettingsIcon />
      </Button>

      {isOpen && (
        <div
          className="image-editor-settings-modal__overlay"
          tabIndex={-1}
          onClick={handleBackdropClick}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              onToggle();
            }
          }}
        >
          <div
            className="image-editor-settings-modal__content"
            role="dialog"
            aria-modal="true"
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
              {/* Aspect Ratio */}
              <div className="image-editor-settings-modal__section">
                <div
                  className="image-editor-settings-modal__label"
                  id="aspect-ratio-label"
                >
                  {intl.formatMessage(messages.aspectRatio)}
                </div>
                <div
                  className="image-editor-settings-modal__icon-scroll"
                  role="group"
                  aria-labelledby="aspect-ratio-label"
                >
                  <div
                    className={cn(
                      'image-editor-settings-modal__icon-option',
                      settings.aspectRatio === 'free' && 'active',
                    )}
                    role="button"
                    tabIndex={0}
                    aria-label={intl.formatMessage(messages.freeAspectRatio)}
                    aria-pressed={settings.aspectRatio === 'free'}
                    onClick={() => handleSettingChange('aspectRatio', 'free')}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleSettingChange('aspectRatio', 'free');
                      }
                    }}
                  >
                    <FreeIcon />
                    <span>{intl.formatMessage(messages.freeAspectRatio)}</span>
                  </div>
                  <div
                    className={cn(
                      'image-editor-settings-modal__icon-option',
                      settings.aspectRatio === '1:1' && 'active',
                    )}
                    role="button"
                    tabIndex={0}
                    aria-label={intl.formatMessage(messages.square)}
                    aria-pressed={settings.aspectRatio === '1:1'}
                    onClick={() => handleSettingChange('aspectRatio', '1:1')}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleSettingChange('aspectRatio', '1:1');
                      }
                    }}
                  >
                    <SquareIcon />
                    <span>{intl.formatMessage(messages.square)}</span>
                  </div>
                  <div
                    className={cn(
                      'image-editor-settings-modal__icon-option',
                      settings.aspectRatio === '3:4' && 'active',
                    )}
                    role="button"
                    tabIndex={0}
                    aria-label={intl.formatMessage(messages.photo)}
                    aria-pressed={settings.aspectRatio === '3:4'}
                    onClick={() => handleSettingChange('aspectRatio', '3:4')}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleSettingChange('aspectRatio', '3:4');
                      }
                    }}
                  >
                    <PhotoIcon />
                    <span>{intl.formatMessage(messages.photo)}</span>
                  </div>
                  <div
                    className={cn(
                      'image-editor-settings-modal__icon-option',
                      settings.aspectRatio === '4:3' && 'active',
                    )}
                    role="button"
                    tabIndex={0}
                    aria-label={intl.formatMessage(messages.monitor)}
                    aria-pressed={settings.aspectRatio === '4:3'}
                    onClick={() => handleSettingChange('aspectRatio', '4:3')}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleSettingChange('aspectRatio', '4:3');
                      }
                    }}
                  >
                    <MonitorIcon />
                    <span>{intl.formatMessage(messages.monitor)}</span>
                  </div>
                  <div
                    className={cn(
                      'image-editor-settings-modal__icon-option',
                      settings.aspectRatio === '16:9' && 'active',
                    )}
                    role="button"
                    tabIndex={0}
                    aria-label={intl.formatMessage(messages.widescreen)}
                    aria-pressed={settings.aspectRatio === '16:9'}
                    onClick={() => handleSettingChange('aspectRatio', '16:9')}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleSettingChange('aspectRatio', '16:9');
                      }
                    }}
                  >
                    <WidescreenIcon />
                    <span>{intl.formatMessage(messages.widescreen)}</span>
                  </div>
                  <div
                    className={cn(
                      'image-editor-settings-modal__icon-option',
                      settings.aspectRatio === '9:16' && 'active',
                    )}
                    role="button"
                    tabIndex={0}
                    aria-label={intl.formatMessage(messages.mobile)}
                    aria-pressed={settings.aspectRatio === '9:16'}
                    onClick={() => handleSettingChange('aspectRatio', '9:16')}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleSettingChange('aspectRatio', '9:16');
                      }
                    }}
                  >
                    <MobileIcon />
                    <span>{intl.formatMessage(messages.mobile)}</span>
                  </div>
                  <div
                    className={cn(
                      'image-editor-settings-modal__icon-option',
                      settings.aspectRatio === '2:1' && 'active',
                    )}
                    role="button"
                    tabIndex={0}
                    aria-label={intl.formatMessage(messages.landscape)}
                    aria-pressed={settings.aspectRatio === '2:1'}
                    onClick={() => handleSettingChange('aspectRatio', '2:1')}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleSettingChange('aspectRatio', '2:1');
                      }
                    }}
                  >
                    <LandscapeIcon />
                    <span>{intl.formatMessage(messages.landscape)}</span>
                  </div>
                  <div
                    className={cn(
                      'image-editor-settings-modal__icon-option',
                      settings.aspectRatio === '21:9' && 'active',
                    )}
                    role="button"
                    tabIndex={0}
                    aria-label={intl.formatMessage(messages.ultraWide)}
                    aria-pressed={settings.aspectRatio === '21:9'}
                    onClick={() => handleSettingChange('aspectRatio', '21:9')}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleSettingChange('aspectRatio', '21:9');
                      }
                    }}
                  >
                    <UltraWideIcon />
                    <span>{intl.formatMessage(messages.ultraWide)}</span>
                  </div>
                  <div
                    className={cn(
                      'image-editor-settings-modal__icon-option',
                      settings.aspectRatio === '1:2' && 'active',
                    )}
                    role="button"
                    tabIndex={0}
                    aria-label={intl.formatMessage(messages.portrait)}
                    aria-pressed={settings.aspectRatio === '1:2'}
                    onClick={() => handleSettingChange('aspectRatio', '1:2')}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleSettingChange('aspectRatio', '1:2');
                      }
                    }}
                  >
                    <PortraitIcon />
                    <span>{intl.formatMessage(messages.portrait)}</span>
                  </div>
                </div>
              </div>

              <div className="image-editor-settings-modal__section">
                <label className="image-editor-settings-modal__label">
                  {intl.formatMessage(messages.imageRestriction)}
                </label>
                <div className="image-editor-settings-modal__icon-scroll">
                  <div
                    className={cn(
                      'image-editor-settings-modal__icon-option',
                      settings.imageRestriction === 'fit-area' && 'active',
                    )}
                    onClick={() =>
                      handleSettingChange('imageRestriction', 'fit-area')
                    }
                  >
                    <FitAreaIcon />
                    <span>{intl.formatMessage(messages.fitArea)}</span>
                  </div>
                  <div
                    className={cn(
                      'image-editor-settings-modal__icon-option',
                      settings.imageRestriction === 'fill-area' && 'active',
                    )}
                    onClick={() =>
                      handleSettingChange('imageRestriction', 'fill-area')
                    }
                  >
                    <FillAreaIcon />
                    <span>{intl.formatMessage(messages.fillArea)}</span>
                  </div>
                  <div
                    className={cn(
                      'image-editor-settings-modal__icon-option',
                      settings.imageRestriction === 'stencil' && 'active',
                    )}
                    onClick={() =>
                      handleSettingChange('imageRestriction', 'stencil')
                    }
                  >
                    <StencilIcon />
                    <span>
                      {intl.formatMessage(messages.stencilRestriction)}
                    </span>
                  </div>
                  <div
                    className={cn(
                      'image-editor-settings-modal__icon-option',
                      settings.imageRestriction === 'none' && 'active',
                    )}
                    onClick={() =>
                      handleSettingChange('imageRestriction', 'none')
                    }
                  >
                    <NoRestrictionIcon />
                    <span>{intl.formatMessage(messages.noRestriction)}</span>
                  </div>
                </div>
              </div>

              <div className="image-editor-settings-modal__section">
                <label className="image-editor-settings-modal__label">
                  {intl.formatMessage(messages.stencilType)}
                </label>
                <div className="image-editor-settings-modal__icon-scroll">
                  <div
                    className={cn(
                      'image-editor-settings-modal__icon-option',
                      settings.stencilType === 'rectangle' && 'active',
                    )}
                    onClick={() =>
                      handleSettingChange('stencilType', 'rectangle')
                    }
                  >
                    <RectangleStencilIcon />
                    <span>{intl.formatMessage(messages.rectangle)}</span>
                  </div>
                  <div
                    className={cn(
                      'image-editor-settings-modal__icon-option',
                      settings.stencilType === 'circle' && 'active',
                    )}
                    onClick={() => handleSettingChange('stencilType', 'circle')}
                  >
                    <CircleStencilIcon />
                    <span>{intl.formatMessage(messages.circle)}</span>
                  </div>
                </div>
              </div>

              <div className="image-editor-settings-modal__section">
                <label className="image-editor-settings-modal__label">
                  {intl.formatMessage(messages.minDimensions)}
                </label>
                <div className="image-editor-settings-modal__row">
                  <input
                    type="number"
                    value={settings.minWidth}
                    onChange={(e) =>
                      handleSettingChange(
                        'minWidth',
                        parseInt(e.target.value) || 0,
                      )
                    }
                    className="image-editor-settings-modal__input"
                    placeholder={intl.formatMessage(messages.minWidth)}
                    min="0"
                  />
                  <input
                    type="number"
                    value={settings.minHeight}
                    onChange={(e) =>
                      handleSettingChange(
                        'minHeight',
                        parseInt(e.target.value) || 0,
                      )
                    }
                    className="image-editor-settings-modal__input"
                    placeholder={intl.formatMessage(messages.minHeight)}
                    min="0"
                  />
                </div>
              </div>

              <div className="image-editor-settings-modal__section">
                <label className="image-editor-settings-modal__label">
                  {intl.formatMessage(messages.maxCropDimensions)}
                </label>
                <div className="image-editor-settings-modal__row">
                  <input
                    type="number"
                    value={settings.maxCropWidth || ''}
                    onChange={(e) =>
                      handleSettingChange(
                        'maxCropWidth',
                        e.target.value ? parseInt(e.target.value) : undefined,
                      )
                    }
                    className="image-editor-settings-modal__input"
                    placeholder={intl.formatMessage(messages.maxWidth)}
                    min="1"
                  />
                  <input
                    type="number"
                    value={settings.maxCropHeight || ''}
                    onChange={(e) =>
                      handleSettingChange(
                        'maxCropHeight',
                        e.target.value ? parseInt(e.target.value) : undefined,
                      )
                    }
                    className="image-editor-settings-modal__input"
                    placeholder={intl.formatMessage(messages.maxHeight)}
                    min="1"
                  />
                </div>
              </div>

              <div className="image-editor-settings-modal__section">
                <label className="image-editor-settings-modal__label">
                  <input
                    type="checkbox"
                    checked={settings.stencilGrid}
                    onChange={(e) =>
                      handleSettingChange('stencilGrid', e.target.checked)
                    }
                    className="image-editor-settings-modal__checkbox"
                  />
                  {intl.formatMessage(messages.stencilGrid)}
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
