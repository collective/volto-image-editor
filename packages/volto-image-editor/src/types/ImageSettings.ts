export interface ImageSettings {
  // Cropper settings
  aspectRatio:
    | 'free'
    | '1:1'
    | '1:2'
    | '2:1'
    | '3:4'
    | '4:3'
    | '16:9'
    | '9:16'
    | '21:9';
  imageRestriction: 'fit-area' | 'fill-area' | 'stencil' | 'none';
  stencilType: 'rectangle' | 'circle';
  minWidth: number;
  minHeight: number;
  maxCropWidth?: number;
  maxCropHeight?: number;
  scalable: boolean;
  stencilGrid: boolean;
  minScale: number;
  maxScale: number;
}
