import React, { useState, useRef, useEffect, useCallback } from 'react';
import cn from 'classnames';
import './Slider.scss';

interface Props {
  className?: string;
  onChange?: (value: number) => void;
  value?: number;
  showValue?: boolean;
}

export const Slider: React.FC<Props> = ({
  className,
  onChange,
  value = 0,
  showValue = true,
}) => {
  const lineRef = useRef<HTMLDivElement>(null);
  const [focus, setFocus] = useState(false);
  const [width, setWidth] = useState(0);

  // Convert between display value (-100 to 100) and internal value (-1 to 1)
  const displayValue = Math.round(value * 100);
  const internalValueToDisplay = (val: number) => Math.round(val * 100);
  const displayValueToInternal = (val: number) => val / 100;

  const recalculateWidth = useCallback(() => {
    const line = lineRef.current;
    if (line) {
      setWidth(line.clientWidth);
    }
  }, []);

  const onDrag = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (focus && onChange) {
        const position = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const line = lineRef.current;

        if (line) {
          const { left, width } = line.getBoundingClientRect();

          onChange(
            Math.max(
              -1,
              Math.min(1, (2 * (position - left - width / 2)) / width),
            ),
          );
        }
        e.preventDefault?.();
      }
    },
    [focus, onChange],
  );

  const onStop = useCallback(() => {
    setFocus(false);
  }, []);

  const onStart = useCallback(
    (e: MouseEvent | TouchEvent) => {
      setFocus(true);
      onDrag(e);
    },
    [onDrag],
  );

  // Handle direct click on slider line
  const onLineClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (onChange && !focus) {
        const line = lineRef.current;
        if (line) {
          const { left, width } = line.getBoundingClientRect();
          const position = e.clientX;

          onChange(
            Math.max(
              -1,
              Math.min(1, (2 * (position - left - width / 2)) / width),
            ),
          );
        }
      }
    },
    [onChange, focus],
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

  const handleInsideDot = width ? Math.abs(value) <= 16 / width : true;
  const fillWidth = `${Math.abs(value) * 50}%`;
  const fillLeft = `${50 * (1 - Math.abs(Math.min(0, value)))}%`;
  const formattedValue = `${displayValue > 0 ? '+' : ''}${displayValue}`;

  return (
    <div className={cn('image-editor-slider', className)} ref={lineRef}>
      {/* Tick marks for easier value selection */}
      <div className="image-editor-slider__ticks">
        {[-100, -50, 0, 50, 100].map((tickValue) => (
          <div
            key={tickValue}
            className={cn(
              'image-editor-slider__tick',
              tickValue === 0 && 'image-editor-slider__tick--center',
            )}
            style={{ left: `${(tickValue + 100) / 2}%` }}
            onClick={(e) => {
              e.stopPropagation();
              if (onChange) {
                onChange(displayValueToInternal(tickValue));
              }
            }}
          >
            <span className="image-editor-slider__tick-label">{tickValue}</span>
          </div>
        ))}
      </div>
      <div className="image-editor-slider__line" onClick={onLineClick}>
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
              left: `${Math.abs(value * 50 + 50)}%`,
            }}
          >
            {formattedValue}
          </div>
        )}
        <div
          className={cn(
            'image-editor-slider__handler',
            focus && 'image-editor-slider__handler--focus',
            handleInsideDot && 'image-editor-slider__handler--hidden',
          )}
          style={{
            left: `${value * 50 + 50}%`,
          }}
        />
      </div>
    </div>
  );
};
