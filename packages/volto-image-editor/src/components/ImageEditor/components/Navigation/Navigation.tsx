import React, { FC } from 'react';
import cn from 'classnames';
import { defineMessages, useIntl } from 'react-intl';
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
import { ResetRotationIcon } from '@plone-collective/volto-image-editor/icons/ResetRotationIcon';
import { Button } from '../Button/Button';
import './Navigation.scss';

const messages = defineMessages({
  resetRotationAndFlip: {
    id: 'Reset rotation and flip',
    defaultMessage: 'Reset rotation and flip',
  },
});

interface Props {
  className?: string;
  mode?: string;
  onChange?: (mode: string) => void;
  onSave?: () => void;
  onCancel?: () => void;
  onAction?: (action: string) => void;
  onResetRotation?: () => void;
  hasRotationChanges?: boolean;
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
  onResetRotation,
  hasRotationChanges,
  mode,
}) => {
  const intl = useIntl();

  const setMode = (mode: string) => () => {
    onChange?.(mode);
  };

  const handleAction = (action: string) => () => {
    onAction?.(action);
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
          onClick={handleAction('rotate-left')}
        >
          <RotateLeftIcon />
        </Button>
        <Button
          className={'image-editor-navigation__button'}
          onClick={handleAction('rotate-right')}
        >
          <RotateRightIcon />
        </Button>
        <Button
          className={'image-editor-navigation__button'}
          onClick={handleAction('flip-horizontal')}
        >
          <FlipHorizontalIcon />
        </Button>
        <Button
          className={'image-editor-navigation__button'}
          onClick={handleAction('flip-vertical')}
        >
          <FlipVerticalIcon />
        </Button>
        <Button
          className={cn(
            'image-editor-navigation__button',
            'image-editor-navigation__reset-rotation',
            !hasRotationChanges && 'image-editor-navigation__button--disabled',
          )}
          onClick={onResetRotation}
          disabled={!hasRotationChanges}
          title={intl.formatMessage(messages.resetRotationAndFlip)}
        >
          <ResetRotationIcon />
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
