import React, { useState, useRef, useEffect, useCallback } from 'react';
import cn from 'classnames';
import './Slider.scss';

interface Props {
  className?: string;
  onChange?: (value: number) => void;
  value?: number;
  showValue?: boolean;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
}

export const Slider: React.FC<Props> = ({
  className,
  onChange,
  value = 0,
  showValue = true,
  min = -1,
  max = 1,
  step = 0.01,
  disabled = false,
}) => {
  const lineRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [focus, setFocus] = useState(false);
  const [width, setWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const displayValue = Math.round(value * 100);
  const internalValueToDisplay = (val: number) => Math.round(val * 100);

  const recalculateWidth = useCallback(() => {
    const line = lineRef.current;
    if (line) {
      setWidth(line.clientWidth);
    }
  }, []);

  const clampValue = useCallback(
    (val: number) => Math.max(min, Math.min(max, val)),
    [min, max],
  );

  const snapToStep = useCallback(
    (val: number) => Math.round(val / step) * step,
    [step],
  );

  const onDrag = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if ((focus || isDragging) && onChange && !disabled) {
        const position = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const line = lineRef.current;

        if (line) {
          const { left, width } = line.getBoundingClientRect();
          const normalizedPosition = (position - left) / width;
          const newValue = clampValue(
            snapToStep(min + normalizedPosition * (max - min)),
          );

          onChange(newValue);
        }
        e.preventDefault?.();
      }
    },
    [focus, isDragging, onChange, disabled, clampValue, snapToStep, min, max],
  );

  const onStop = useCallback(() => {
    setFocus(false);
    setIsDragging(false);
  }, []);

  const onStart = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (disabled) return;
      setFocus(true);
      setIsDragging(true);
      onDrag(e);
    },
    [onDrag, disabled],
  );

  const onSliderClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (onChange && !focus && !disabled && !isDragging) {
        const line = lineRef.current;
        if (line) {
          const { left, width } = line.getBoundingClientRect();
          const position = e.clientX;

          if (position >= left && position <= left + width) {
            const normalizedPosition = (position - left) / width;
            const newValue = clampValue(
              snapToStep(min + normalizedPosition * (max - min)),
            );

            onChange(newValue);
          }
        }
      }
    },
    [onChange, focus, disabled, isDragging, clampValue, snapToStep, min, max],
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled || !onChange) return;

      let newValue = value;
      const largeStep = step * 10;

      switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowDown':
          newValue = clampValue(value - step);
          break;
        case 'ArrowRight':
        case 'ArrowUp':
          newValue = clampValue(value + step);
          break;
        case 'PageDown':
          newValue = clampValue(value - largeStep);
          break;
        case 'PageUp':
          newValue = clampValue(value + largeStep);
          break;
        case 'Home':
          newValue = min;
          break;
        case 'End':
          newValue = max;
          break;
        case ' ':
        case 'Enter':
          newValue = 0;
          break;
        default:
          return;
      }

      e.preventDefault();
      onChange(snapToStep(newValue));
    },
    [disabled, onChange, value, step, clampValue, snapToStep, min, max],
  );

  useEffect(() => {
    const handleResize = () => recalculateWidth();
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    recalculateWidth();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [recalculateWidth]);

  useEffect(() => {
    if (!focus) return;

    const handleMouseUp = () => onStop();
    const handleMouseMove = (e: MouseEvent) => onDrag(e);
    const handleTouchEnd = () => onStop();
    const handleTouchMove = (e: TouchEvent) => onDrag(e);

    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [focus, onStop, onDrag]);

  useEffect(() => {
    const line = lineRef.current;
    if (!line) return;

    const handleMouseDown = (e: MouseEvent) => onStart(e);
    const handleTouchStart = (e: TouchEvent) => onStart(e);

    line.addEventListener('mousedown', handleMouseDown);
    line.addEventListener('touchstart', handleTouchStart);

    return () => {
      line.removeEventListener('mousedown', handleMouseDown);
      line.removeEventListener('touchstart', handleTouchStart);
    };
  }, [onStart]);

  const normalizedValue = (value - min) / (max - min);
  const centerNormalized = (0 - min) / (max - min);
  const handleInsideDot = width
    ? Math.abs(normalizedValue - centerNormalized) <= 16 / width
    : true;

  const fillWidth = `${Math.abs(normalizedValue - centerNormalized) * 100}%`;
  const fillLeft =
    normalizedValue < centerNormalized
      ? `${normalizedValue * 100}%`
      : `${centerNormalized * 100}%`;

  const formattedValue = `${displayValue > 0 ? '+' : ''}${displayValue}`;

  return (
    <div
      className={cn(
        'image-editor-slider',
        className,
        disabled && 'image-editor-slider--disabled',
        (focus || isDragging) && 'image-editor-slider--active',
      )}
      ref={sliderRef}
      tabIndex={disabled ? -1 : 0}
      role="slider"
      aria-valuemin={internalValueToDisplay(min)}
      aria-valuemax={internalValueToDisplay(max)}
      aria-valuenow={displayValue}
      aria-disabled={disabled}
      onKeyDown={onKeyDown}
      onClick={onSliderClick}
    >
      <div className="image-editor-slider__ticks">
        {[-1, -0.5, 0, 0.5, 1].map((tickValue) => (
          <div
            key={tickValue}
            className={cn(
              'image-editor-slider__tick',
              tickValue === 0 && 'image-editor-slider__tick--center',
            )}
            style={{ left: `${((tickValue - min) / (max - min)) * 100}%` }}
            role="button"
            tabIndex={disabled ? -1 : 0}
            aria-label={`Set value to ${Math.round(tickValue * 100)}`}
            onClick={(e) => {
              e.stopPropagation();
              if (onChange && !disabled) {
                onChange(snapToStep(tickValue));
              }
            }}
            onKeyDown={(e) => {
              if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
                e.preventDefault();
                e.stopPropagation();
                if (onChange) {
                  onChange(snapToStep(tickValue));
                }
              }
            }}
          />
        ))}
      </div>
      <div className="image-editor-slider__line" ref={lineRef}>
        <div
          className="image-editor-slider__fill"
          style={{
            width: fillWidth,
            left: fillLeft,
          }}
        />
        <div className="image-editor-slider__dot" />
        {showValue && (
          <div
            className={cn(
              'image-editor-slider__value',
              handleInsideDot && 'image-editor-slider__value--hidden',
            )}
            style={{
              left: `${normalizedValue * 100}%`,
            }}
          >
            {formattedValue}
          </div>
        )}
        <div
          className={cn(
            'image-editor-slider__handler',
            (focus || isDragging) && 'image-editor-slider__handler--focus',
            handleInsideDot && 'image-editor-slider__handler--hidden',
          )}
          style={{
            left: `${normalizedValue * 100}%`,
          }}
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-label={`Slider handle, current value: ${formattedValue}`}
          onMouseDown={(e) => {
            e.stopPropagation();
          }}
          onKeyDown={(e) => {
            if (
              e.key === 'ArrowLeft' ||
              e.key === 'ArrowRight' ||
              e.key === 'ArrowUp' ||
              e.key === 'ArrowDown' ||
              e.key === 'Home' ||
              e.key === 'End' ||
              e.key === ' ' ||
              e.key === 'Enter'
            ) {
              e.stopPropagation();
              if (sliderRef.current) {
                sliderRef.current.focus();
              }
            }
          }}
        />
      </div>
    </div>
  );
};
