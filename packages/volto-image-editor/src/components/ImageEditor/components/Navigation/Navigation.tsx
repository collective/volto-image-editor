import React, { FC } from 'react';
import cn from 'classnames';
import { defineMessages, useIntl } from 'react-intl';
import { Button, Icon } from '@plone/components';
import VoltoIcon from '@plone/volto/components/theme/Icon/Icon';
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
  return <VoltoIcon name={CancelSVG} />;
};

const SaveIcon = () => {
  return <VoltoIcon name={SaveSVG} />;
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
          className={cn(
            'image-editor-button',
            'image-editor-navigation__button',
            mode === 'crop' && 'image-editor-button--active',
          )}
          onClick={setMode('crop')}
        >
          <Icon size="lg">
            <CropIcon />
          </Icon>
        </Button>
        <Button
          className={cn(
            'image-editor-button',
            'image-editor-navigation__button',
          )}
          onClick={handleAction('rotate-left')}
        >
          <Icon size="lg">
            <RotateLeftIcon />
          </Icon>
        </Button>
        <Button
          className={cn(
            'image-editor-button',
            'image-editor-navigation__button',
          )}
          onClick={handleAction('rotate-right')}
        >
          <Icon size="lg">
            <RotateRightIcon />
          </Icon>
        </Button>
        <Button
          className={cn(
            'image-editor-button',
            'image-editor-navigation__button',
          )}
          onClick={handleAction('flip-horizontal')}
        >
          <Icon size="lg">
            <FlipHorizontalIcon />
          </Icon>
        </Button>
        <Button
          className={cn(
            'image-editor-button',
            'image-editor-navigation__button',
          )}
          onClick={handleAction('flip-vertical')}
        >
          <Icon size="lg">
            <FlipVerticalIcon />
          </Icon>
        </Button>
        <Button
          className={cn(
            'image-editor-button',
            'image-editor-navigation__button',
            'image-editor-navigation__reset-rotation',
            !hasRotationChanges && 'image-editor-navigation__button--disabled',
          )}
          onClick={onResetRotation}
          isDisabled={!hasRotationChanges}
          aria-label={intl.formatMessage(messages.resetRotationAndFlip)}
        >
          <Icon size="lg">
            <ResetRotationIcon />
          </Icon>
        </Button>
        <Button
          className={cn(
            'image-editor-button',
            'image-editor-navigation__button',
            mode === 'saturation' && 'image-editor-button--active',
          )}
          onClick={setMode('saturation')}
        >
          <Icon size="lg">
            <SaturationIcon />
          </Icon>
        </Button>
        <Button
          className={cn(
            'image-editor-button',
            'image-editor-navigation__button',
            mode === 'brightness' && 'image-editor-button--active',
          )}
          onClick={setMode('brightness')}
        >
          <Icon size="lg">
            <BrightnessIcon />
          </Icon>
        </Button>
        <Button
          className={cn(
            'image-editor-button',
            'image-editor-navigation__button',
            mode === 'contrast' && 'image-editor-button--active',
          )}
          onClick={setMode('contrast')}
        >
          <Icon size="lg">
            <ContrastIcon />
          </Icon>
        </Button>
        <Button
          className={cn(
            'image-editor-button',
            'image-editor-navigation__button',
            mode === 'hue' && 'image-editor-button--active',
          )}
          onClick={setMode('hue')}
        >
          <Icon size="lg">
            <HueIcon />
          </Icon>
        </Button>
      </div>
      <div className="image-editor-navigation__action-buttons">
        <Button
          className={cn(
            'image-editor-button',
            'image-editor-navigation__button',
            'cancel',
          )}
          onClick={onCancel}
        >
          <CancelIcon />
        </Button>
        <Button
          className={cn(
            'image-editor-button',
            'image-editor-navigation__button',
          )}
          onClick={onSave}
        >
          <SaveIcon />
        </Button>
      </div>
    </div>
  );
};
