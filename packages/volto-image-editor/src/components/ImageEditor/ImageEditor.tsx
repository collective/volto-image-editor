import React, { useState, useRef } from 'react';
import cn from 'classnames';
import { Cropper, CropperPreview } from 'react-advanced-cropper';
import type { CropperRef, CropperPreviewRef } from 'react-advanced-cropper';
import { AdjustablePreviewBackground } from './components/AdjustablePreviewBackground';
import { Navigation } from './components/Navigation';
import { Slider } from './components/Slider';
import { AdjustableCropperBackground } from './components/AdjustableCropperBackground';
import { Button } from './components/Button';
import { ResetIcon } from '@plone-collective/volto-image-editor/icons/ResetIcon';
import './ImageEditor.scss';

// The polyfill for Safari browser. The dynamic require is needed to work with SSR
if (typeof window !== 'undefined') {
  require('context-filter-polyfill');
}

const ImageEditor = ({ src, onImageSave, onCancel }) => {
  const cropperRef = useRef<CropperRef>(null);
  const previewRef = useRef<CropperPreviewRef>(null);

  const [mode, setMode] = useState('crop');

  const [adjustments, setAdjustments] = useState({
    brightness: 0,
    hue: 0,
    saturation: 0,
    contrast: 0,
  });

  const onAction = (action: string) => {
    switch (action) {
      case 'rotate-left':
        rotate(-90);
        break;
      case 'rotate-right':
        rotate(90);
        break;
      case 'flip-horizontal':
        flip(true, false);
        break;
      case 'flip-vertical':
        flip(false, true);
        break;
    }
  };

  const onChangeValue = (value: number) => {
    if (mode in adjustments) {
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
  };

  const onSave = () => {
    if (cropperRef.current) {
      const newData = cropperRef.current.getCanvas()?.toDataURL();
      onImageSave(newData);
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

  const changed = Object.values(adjustments).some((el) => Math.floor(el * 100));

  const cropperEnabled = mode === 'crop';

  return (
    <div className={'image-editor'}>
      <div className="image-editor__cropper">
        <Cropper
          src={src}
          ref={cropperRef}
          stencilProps={{
            movable: cropperEnabled,
            resizable: cropperEnabled,
            lines: cropperEnabled,
            handlers: cropperEnabled,
            overlayClassName: cn(
              'image-editor__cropper-overlay',
              !cropperEnabled && 'image-editor__cropper-overlay--faded',
            ),
          }}
          backgroundWrapperProps={{
            scaleImage: cropperEnabled,
            moveImage: cropperEnabled,
          }}
          backgroundComponent={AdjustableCropperBackground}
          backgroundProps={adjustments}
          onUpdate={onUpdate}
        />
        {mode !== 'crop' && (
          <Slider
            className="image-editor__slider"
            value={adjustments[mode]}
            onChange={onChangeValue}
          />
        )}
        <CropperPreview
          className={'image-editor__preview'}
          ref={previewRef}
          backgroundComponent={AdjustablePreviewBackground}
          backgroundProps={adjustments}
        />
        <Button
          className={cn(
            'image-editor__reset-button',
            !changed && 'image-editor__reset-button--hidden',
          )}
          onClick={onReset}
        >
          <ResetIcon />
        </Button>
      </div>
      <Navigation
        mode={mode}
        onAction={onAction}
        onChange={setMode}
        onSave={onSave}
        onCancel={onCancel}
      />
    </div>
  );
};

export default ImageEditor;
