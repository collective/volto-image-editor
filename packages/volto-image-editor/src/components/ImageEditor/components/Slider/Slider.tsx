import React, { useState } from 'react';
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
  const [isFocused, setIsFocused] = useState(false);

  const displayValue = Math.round(value * 100);
  const formattedValue = `${displayValue > 0 ? '+' : ''}${displayValue}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange && !disabled) {
      onChange(parseFloat(e.target.value));
    }
  };

  const handleTickClick = (tickValue: number) => {
    if (onChange && !disabled) {
      onChange(tickValue);
    }
  };

  const normalizedValue = ((value - min) / (max - min)) * 100;
  const centerNormalized = ((0 - min) / (max - min)) * 100;

  return (
    <div
      className={cn(
        'image-editor-slider',
        className,
        disabled && 'image-editor-slider--disabled',
        isFocused && 'image-editor-slider--active',
      )}
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
            onClick={() => handleTickClick(tickValue)}
            onKeyDown={(e) => {
              if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
                e.preventDefault();
                handleTickClick(tickValue);
              }
            }}
          />
        ))}
      </div>

      <div className="image-editor-slider__container">
        <input
          type="range"
          className="image-editor-slider__input"
          min={min}
          max={max}
          step={step}
          value={value}
          disabled={disabled}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          aria-valuemin={Math.round(min * 100)}
          aria-valuemax={Math.round(max * 100)}
          aria-valuenow={displayValue}
          aria-disabled={disabled}
          style={{
            background: `linear-gradient(to right, 
              transparent 0%, 
              transparent ${Math.min(normalizedValue, centerNormalized)}%, 
              var(--slider-fill-color, #fff) ${Math.min(normalizedValue, centerNormalized)}%, 
              var(--slider-fill-color, #fff) ${Math.max(normalizedValue, centerNormalized)}%, 
              transparent ${Math.max(normalizedValue, centerNormalized)}%, 
              transparent 100%)`,
          }}
        />

        <div className="image-editor-slider__center-dot" />

        {showValue && (
          <div
            className="image-editor-slider__value"
            style={{
              left: `${normalizedValue}%`,
            }}
          >
            {formattedValue}
          </div>
        )}
      </div>
    </div>
  );
};
