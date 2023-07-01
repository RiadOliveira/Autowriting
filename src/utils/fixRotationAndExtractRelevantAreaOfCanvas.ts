import { drawImageOnCanvas } from './auxiliar/drawImageOnCanvas';
import { getColorFromImagePixels } from './auxiliar/getColorFromImagePixels';
import { pixelIsWhiteOrTransparent } from './auxiliar/pixelIsWhiteOrTransparent';
import { cropImageAsCanvas } from './cropImageAsCanvas';

export const fixRotationAndExtractRelevantAreaOfCanvas = (
  canvas: HTMLCanvasElement,
) => {
  const context = canvas.getContext('2d')!;
  const { width, height } = canvas;
  const { data: pixels } = context.getImageData(0, 0, width, height);

  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const color = getColorFromImagePixels(pixels, width, y, x);

      if (!pixelIsWhiteOrTransparent(color)) {
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
    }
  }

  const croppedWidth = maxX - minX + 1;
  const croppedHeight = maxY - minY + 1;
  const croppedCanvas = cropImageAsCanvas(canvas, {
    startX: minX,
    startY: minY,
    width: croppedWidth,
    height: croppedHeight,
  });

  context.clearRect(0, 0, width, height);
  drawImageOnCanvas(
    canvas,
    croppedCanvas,
    {
      startX: 0,
      startY: 0,
      width: croppedWidth,
      height: croppedHeight,
    },
    context,
  );
};
