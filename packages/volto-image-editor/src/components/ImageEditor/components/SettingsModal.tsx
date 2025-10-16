import React, { FC } from 'react';
import cn from 'classnames';
import { Button } from './Button';
import { SettingsIcon } from '@plone-collective/volto-image-editor/icons/SettingsIcon';
import type { ImageSettings } from '../types/ImageSettings';
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
      {/* Settings Button */}
      <Button
        className={cn('image-editor-settings-modal__toggle', className)}
        onClick={onToggle}
        active={isOpen}
      >
        <SettingsIcon />
      </Button>

      {/* Cropper Modal */}
      {isOpen && (
        <div
          className="image-editor-settings-modal__overlay"
          onClick={handleBackdropClick}
        >
          <div className="image-editor-settings-modal__content">
            <div className="image-editor-settings-modal__header">
              <h2 className="image-editor-settings-modal__title">
                Configurações do Editor
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
                <label className="image-editor-settings-modal__label">
                  Proporção (Aspect Ratio)
                </label>
                <div className="image-editor-settings-modal__icon-scroll">
                  <div
                    className={cn(
                      'image-editor-settings-modal__icon-option',
                      settings.aspectRatio === 'free' && 'active',
                    )}
                    onClick={() => handleSettingChange('aspectRatio', 'free')}
                  >
                    <FreeIcon />
                    <span>Livre</span>
                  </div>
                  <div
                    className={cn(
                      'image-editor-settings-modal__icon-option',
                      settings.aspectRatio === '1:1' && 'active',
                    )}
                    onClick={() => handleSettingChange('aspectRatio', '1:1')}
                  >
                    <SquareIcon />
                    <span>1:1</span>
                  </div>
                  <div
                    className={cn(
                      'image-editor-settings-modal__icon-option',
                      settings.aspectRatio === '3:4' && 'active',
                    )}
                    onClick={() => handleSettingChange('aspectRatio', '3:4')}
                  >
                    <PhotoIcon />
                    <span>3:4</span>
                  </div>
                  <div
                    className={cn(
                      'image-editor-settings-modal__icon-option',
                      settings.aspectRatio === '4:3' && 'active',
                    )}
                    onClick={() => handleSettingChange('aspectRatio', '4:3')}
                  >
                    <MonitorIcon />
                    <span>4:3</span>
                  </div>
                  <div
                    className={cn(
                      'image-editor-settings-modal__icon-option',
                      settings.aspectRatio === '16:9' && 'active',
                    )}
                    onClick={() => handleSettingChange('aspectRatio', '16:9')}
                  >
                    <WidescreenIcon />
                    <span>16:9</span>
                  </div>
                  <div
                    className={cn(
                      'image-editor-settings-modal__icon-option',
                      settings.aspectRatio === '9:16' && 'active',
                    )}
                    onClick={() => handleSettingChange('aspectRatio', '9:16')}
                  >
                    <MobileIcon />
                    <span>9:16</span>
                  </div>
                  <div
                    className={cn(
                      'image-editor-settings-modal__icon-option',
                      settings.aspectRatio === '2:1' && 'active',
                    )}
                    onClick={() => handleSettingChange('aspectRatio', '2:1')}
                  >
                    <LandscapeIcon />
                    <span>2:1</span>
                  </div>
                  <div
                    className={cn(
                      'image-editor-settings-modal__icon-option',
                      settings.aspectRatio === '21:9' && 'active',
                    )}
                    onClick={() => handleSettingChange('aspectRatio', '21:9')}
                  >
                    <UltraWideIcon />
                    <span>21:9</span>
                  </div>
                  <div
                    className={cn(
                      'image-editor-settings-modal__icon-option',
                      settings.aspectRatio === '1:2' && 'active',
                    )}
                    onClick={() => handleSettingChange('aspectRatio', '1:2')}
                  >
                    <PortraitIcon />
                    <span>1:2</span>
                  </div>
                </div>
              </div>

              {/* Image Restriction */}
              <div className="image-editor-settings-modal__section">
                <label className="image-editor-settings-modal__label">
                  Restrição da Imagem
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
                    <span>Ajustar</span>
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
                    <span>Preencher</span>
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
                    <span>Stencil</span>
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
                    <span>Livre</span>
                  </div>
                </div>
              </div>

              {/* Stencil Type */}
              <div className="image-editor-settings-modal__section">
                <label className="image-editor-settings-modal__label">
                  Tipo de Stencil
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
                    <span>Retângulo</span>
                  </div>
                  <div
                    className={cn(
                      'image-editor-settings-modal__icon-option',
                      settings.stencilType === 'circle' && 'active',
                    )}
                    onClick={() => handleSettingChange('stencilType', 'circle')}
                  >
                    <CircleStencilIcon />
                    <span>Círculo</span>
                  </div>
                </div>
              </div>

              {/* Min/Max Dimensions */}
              <div className="image-editor-settings-modal__section">
                <label className="image-editor-settings-modal__label">
                  Dimensões Mínimas
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
                    placeholder="Largura min"
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
                    placeholder="Altura min"
                    min="0"
                  />
                </div>
              </div>

              <div className="image-editor-settings-modal__section">
                <label className="image-editor-settings-modal__label">
                  Dimensões Máximas do Crop
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
                    placeholder="Largura max"
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
                    placeholder="Altura max"
                    min="1"
                  />
                </div>
              </div>

              {/* Options */}
              <div className="image-editor-settings-modal__section">
                <label className="image-editor-settings-modal__label">
                  <input
                    type="checkbox"
                    checked={settings.scalable}
                    onChange={(e) =>
                      handleSettingChange('scalable', e.target.checked)
                    }
                    className="image-editor-settings-modal__checkbox"
                  />
                  Imagem Escalável
                </label>
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
                  Grade no Stencil
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
