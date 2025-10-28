import React from 'react';

export function createDemoImageDataURL(width = 800, height = 500): string {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // Background gradient
  const grad = ctx.createLinearGradient(0, 0, width, height);
  grad.addColorStop(0, '#f0f4ff');
  grad.addColorStop(1, '#d1ffe6');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Draw some shapes and text to make adjustments visible
  ctx.fillStyle = '#ff6b6b';
  ctx.fillRect(width * 0.1, height * 0.15, width * 0.3, height * 0.2);
  ctx.fillStyle = '#4d96ff';
  ctx.beginPath();
  ctx.arc(
    width * 0.7,
    height * 0.6,
    Math.min(width, height) * 0.15,
    0,
    Math.PI * 2,
  );
  ctx.fill();

  ctx.font = `${Math.floor(height * 0.06)}px sans-serif`;
  ctx.fillStyle = '#1f2937';
  ctx.fillText('Demo image', width * 0.35, height * 0.52);

  return canvas.toDataURL('image/jpeg', 0.92);
}

export const DemoContainer: React.FC<
  React.PropsWithChildren<{
    width?: number | string;
    height?: number | string;
    maxWidth?: number | string;
    style?: React.CSSProperties;
  }>
> = ({ width = 960, height = 640, maxWidth = '100%', style, children }) => {
  return (
    <div
      style={{
        width,
        height,
        maxWidth,
        margin: '0 auto',
        border: '1px solid #e5e7eb',
        borderRadius: 8,
        overflow: 'hidden',
        background: '#fff',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        ...style,
      }}
    >
      {children}
    </div>
  );
};
