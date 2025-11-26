import React, { useState, useRef, useLayoutEffect } from 'react';
import cn from 'classnames';
import {
  Cropper,
  CropperPreview,
  RectangleStencil,
  CircleStencil,
  ImageRestriction,
} from 'react-advanced-cropper';
import type { CropperRef, CropperPreviewRef } from 'react-advanced-cropper';
import { AdjustablePreviewBackground } from '../components/AdjustablePreviewBackground';
import { Navigation } from '../components/Navigation/Navigation';
import { AdjustableCropperBackground } from '../components/AdjustableCropperBackground';
import { Button, Icon, Slider } from '@plone/components';
import { SettingsModal } from '../components/SettingsModal/SettingsModal';
import type { ImageSettings } from '../types/ImageSettings';
import { ResetIcon } from '@plone-collective/volto-image-editor/icons/ResetIcon';
import './ImageEditor.scss';

if (typeof window !== 'undefined') {
  require('context-filter-polyfill');
}

const ImageEditor = ({ src, onImageSave, onCancel }) => {
  const cropperRef = useRef<CropperRef>(null);
  const previewRef = useRef<CropperPreviewRef>(null);

  const [mode, setMode] = useState('crop');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [hasRotationChanges, setHasRotationChanges] = useState(false);

  const [adjustments, setAdjustments] = useState({
    brightness: 0,
    hue: 0,
    saturation: 0,
    contrast: 0,
  });

  const [imageSettings, setImageSettings] = useState<ImageSettings>({
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
  });

  const onAction = (action: string) => {
    switch (action) {
      case 'rotate-left':
        rotate(-90);
        setHasRotationChanges(true);
        break;
      case 'rotate-right':
        rotate(90);
        setHasRotationChanges(true);
        break;
      case 'flip-horizontal':
        flip(true, false);
        setHasRotationChanges(true);
        break;
      case 'flip-vertical':
        flip(false, true);
        setHasRotationChanges(true);
        break;
    }
  };

  const onChangeValue = (value: number) => {
    if (mode && mode in adjustments) {
      setAdjustments((previousValue) => ({
        ...previousValue,
        [mode]: value,
      }));
    }
  };

  const onReset = () => {
    setMode('crop');
    setAdjustments({
      brightness: 0,
      hue: 0,
      saturation: 0,
      contrast: 0,
    });
    if (cropperRef.current) {
      cropperRef.current.reset();
    }
  };

  const onResetRotation = () => {
    if (cropperRef.current) {
      const coordinates = cropperRef.current.getCoordinates();
      cropperRef.current.reset();
      if (coordinates && coordinates.width > 0 && coordinates.height > 0) {
        cropperRef.current.setCoordinates(coordinates);
      }
    }
    setHasRotationChanges(false);
  };

  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      if (cropperRef.current) {
        onResetRotation();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [src]);

  const onSave = () => {
    if (cropperRef.current) {
      const canvas = cropperRef.current.getCanvas();
      if (canvas) {
        let finalCanvas = canvas;

        if (imageSettings.stencilType === 'circle') {
          const circleCanvas = document.createElement('canvas');
          const ctx = circleCanvas.getContext('2d');

          if (ctx) {
            circleCanvas.width = canvas.width;
            circleCanvas.height = canvas.height;

            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const radius = Math.min(canvas.width, canvas.height) / 2;

            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.closePath();
            ctx.clip();

            ctx.drawImage(canvas, 0, 0);

            finalCanvas = circleCanvas;
          }
        }

        if (imageSettings.maxWidth || imageSettings.maxHeight) {
          const tempCanvas = document.createElement('canvas');
          const ctx = tempCanvas.getContext('2d');

          if (ctx) {
            let { width, height } = finalCanvas;

            if (imageSettings.maxWidth && width > imageSettings.maxWidth) {
              const ratio = imageSettings.maxWidth / width;
              width = imageSettings.maxWidth;
              height = imageSettings.maintainAspectRatio
                ? height * ratio
                : height;
            }

            if (imageSettings.maxHeight && height > imageSettings.maxHeight) {
              const ratio = imageSettings.maxHeight / height;
              height = imageSettings.maxHeight;
              width = imageSettings.maintainAspectRatio ? width * ratio : width;
            }

            tempCanvas.width = width;
            tempCanvas.height = height;
            ctx.drawImage(finalCanvas, 0, 0, width, height);
            finalCanvas = tempCanvas;
          }
        }

        const mimeType = `image/${imageSettings.format}`;
        const newData = finalCanvas.toDataURL(mimeType, imageSettings.quality);
        onImageSave(newData);
      }
    }
  };

  const flip = (horizontal: boolean, vertical: boolean) => {
    if (cropperRef.current) {
      cropperRef.current.flipImage(horizontal, vertical);
    }
  };
  const rotate = (angle: number) => {
    if (cropperRef.current) {
      cropperRef.current.rotateImage(angle);
    }
  };

  const onUpdate = (cropper: CropperRef) => {
    previewRef.current?.update(cropper);
  };

  const changed = Object.values(adjustments).some(
    (el: number) => Math.abs(el) > 0.01,
  );

  const cropperEnabled = mode === 'crop';

  const getAspectRatio = (): number | undefined => {
    if (imageSettings.aspectRatio === 'free') return undefined;
    const [width, height] = imageSettings.aspectRatio.split(':').map(Number);
    return width / height;
  };

  const getImageRestriction = () => {
    switch (imageSettings.imageRestriction) {
      case 'fill-area':
        return ImageRestriction.fillArea;
      case 'fit-area':
        return ImageRestriction.fitArea;
      case 'stencil':
        return ImageRestriction.stencil;
      case 'none':
        return ImageRestriction.none;
      default:
        return ImageRestriction.fillArea;
    }
  };

  return (
    <div className={'image-editor'}>
      <div className="image-editor__cropper">
        <Cropper
          src={src}
          ref={cropperRef}
          stencilComponent={
            imageSettings.stencilType === 'circle'
              ? CircleStencil
              : RectangleStencil
          }
          stencilProps={{
            movable: cropperEnabled,
            resizable: cropperEnabled,
            lines: cropperEnabled,
            handlers: cropperEnabled,
            grid: imageSettings.stencilGrid,
            aspectRatio:
              imageSettings.aspectRatio === 'free'
                ? undefined
                : getAspectRatio(),
            overlayClassName: cn(
              'image-editor__cropper-overlay',
              !cropperEnabled && 'image-editor__cropper-overlay--faded',
            ),
          }}
          sizeRestrictions={{
            minWidth: imageSettings.minWidth,
            minHeight: imageSettings.minHeight,
            maxWidth: imageSettings.maxCropWidth,
            maxHeight: imageSettings.maxCropHeight,
          }}
          imageRestriction={getImageRestriction()}
          backgroundWrapperProps={{
            scaleImage: cropperEnabled && imageSettings.scalable,
            moveImage: cropperEnabled,
          }}
          backgroundComponent={AdjustableCropperBackground}
          backgroundProps={adjustments}
          onUpdate={onUpdate}
          onReady={() => {
            if (cropperRef.current) {
              cropperRef.current.refresh();
            }
          }}
        />
        {mode !== 'crop' && mode && mode in adjustments && (
          <div className={'image-editor__slider'}>
            <Slider
              value={Math.round(
                adjustments[mode as keyof typeof adjustments] * 100,
              )}
              onChange={(val: number) => onChangeValue(val / 100)}
              minValue={-100}
              maxValue={100}
              step={1}
              formatOptions={{ maximumFractionDigits: 0 }}
              label={mode.charAt(0).toUpperCase() + mode.slice(1)}
            />
          </div>
        )}

        <CropperPreview
          className={'image-editor__preview'}
          ref={previewRef}
          backgroundComponent={AdjustablePreviewBackground}
          backgroundProps={adjustments}
        />
        <Button
          className={cn(
            'image-editor-button',
            'image-editor__reset-button',
            !changed && 'image-editor__reset-button--hidden',
          )}
          onClick={onReset}
        >
          <Icon size="lg">
            <ResetIcon />
          </Icon>
        </Button>

        <SettingsModal
          settings={imageSettings}
          onChange={setImageSettings}
          isOpen={settingsOpen}
          onToggle={() => setSettingsOpen(!settingsOpen)}
        />
      </div>
      <Navigation
        mode={mode}
        onAction={onAction}
        onResetRotation={onResetRotation}
        hasRotationChanges={hasRotationChanges}
        onChange={setMode}
        onSave={onSave}
        onCancel={onCancel}
      />
    </div>
  );
};

export default ImageEditor;
