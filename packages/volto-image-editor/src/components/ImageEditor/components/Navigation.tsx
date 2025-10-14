import React, { FC } from 'react';
import cn from 'classnames';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import CancelSVG from '@plone/volto/icons/clear.svg';
import SaveSVG from '@plone/volto/icons/save.svg';
import { CropIcon } from '@plone-collective/volto-image-editor/icons/CropIcon';
import { HueIcon } from '@plone-collective/volto-image-editor/icons/HueIcon';
import { SaturationIcon } from '@plone-collective/volto-image-editor/icons/SaturationIcon';
import { ContrastIcon } from '@plone-collective/volto-image-editor/icons/ContrastIcon';
import { BrightnessIcon } from '@plone-collective/volto-image-editor/icons/BrightnessIcon';
import { RotateLeftIcon } from '@plone-collective/volto-image-editor/icons/RotateLeftIcon';
import { RotateRightIcon } from '@plone-collective/volto-image-editor/icons/RotateRightIcon';
import { FlipHorizontalIcon } from '@plone-collective/volto-image-editor/icons/FlipHorizontalIcon';
import { FlipVerticalIcon } from '@plone-collective/volto-image-editor/icons/FlipVerticalIcon';
import { Button } from './Button';
import './Navigation.scss';

interface Props {
  className?: string;
  mode?: string;
  onChange?: (mode: string) => void;
  onSave?: () => void;
  onUpload?: (blob: string) => void;
}

const CancelIcon = () => {
  return <Icon name={CancelSVG} />;
};

const SaveIcon = () => {
  return <Icon name={SaveSVG} />;
};

export const Navigation: FC<Props> = ({
  className,
  onChange,
  onSave,
  onCancel,
  onAction,
  mode,
}) => {
  const setMode = (mode: string) => () => {
    onChange?.(mode);
  };

  return (
    <div className={cn('image-editor-navigation', className)}>
      <div className="image-editor-navigation__buttons">
        <Button
          className={'image-editor-navigation__button'}
          active={mode === 'crop'}
          onClick={setMode('crop')}
        >
          <CropIcon />
        </Button>
        <Button
          className={'image-editor-navigation__button'}
          onClick={onAction('rotate-left')}
        >
          <RotateLeftIcon />
        </Button>
        <Button
          className={'image-editor-navigation__button'}
          onClick={onAction('rotate-right')}
        >
          <RotateRightIcon />
        </Button>
        <Button
          className={'image-editor-navigation__button'}
          onClick={onAction('flip-horizontal')}
        >
          <FlipHorizontalIcon />
        </Button>
        <Button
          className={'image-editor-navigation__button'}
          onClick={onAction('flip-vertical')}
        >
          <FlipVerticalIcon />
        </Button>
        <Button
          className={'image-editor-navigation__button'}
          active={false}
          onClick={setMode('rotate-right')}
        >
          <RotateRightIcon />
        </Button>
        <Button
          className={'image-editor-navigation__button'}
          active={mode === 'saturation'}
          onClick={setMode('saturation')}
        >
          <SaturationIcon />
        </Button>
        <Button
          className={'image-editor-navigation__button'}
          active={mode === 'brightness'}
          onClick={setMode('brightness')}
        >
          <BrightnessIcon />
        </Button>
        <Button
          className={'image-editor-navigation__button'}
          active={mode === 'contrast'}
          onClick={setMode('contrast')}
        >
          <ContrastIcon />
        </Button>
        <Button
          className={'image-editor-navigation__button'}
          active={mode === 'hue'}
          onClick={setMode('hue')}
        >
          <HueIcon />
        </Button>
      </div>
      <Button
        className={'image-editor-navigation__button cancel'}
        onClick={onCancel}
      >
        <CancelIcon />
      </Button>
      <Button className={'image-editor-navigation__button'} onClick={onSave}>
        <SaveIcon />
      </Button>
    </div>
  );
};
