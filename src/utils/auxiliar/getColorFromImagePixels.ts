import { Color } from 'types/Color';

export const getColorFromImagePixels = (
  pixels: Uint8ClampedArray,
  canvasWidth: number,
  iterationY: number,
  iterationX: number,
): Color => {
  const index = (iterationY * canvasWidth + iterationX) * 4;

  const r = pixels[index];
  const g = pixels[index + 1];
  const b = pixels[index + 2];
  const a = pixels[index + 3];

  return { r, g, b, a };
};
