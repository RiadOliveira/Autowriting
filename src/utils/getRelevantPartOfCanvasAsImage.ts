export const getRelevantPartOfCanvasAsImage = (
  originalCanvas: HTMLCanvasElement,
) => {
  const originalContext = originalCanvas.getContext('2d')!;
  const imageData = originalContext.getImageData(
    0,
    0,
    originalCanvas.width,
    originalCanvas.height,
  );
  const pixels = imageData.data;

  let minX = originalCanvas.width;
  let minY = originalCanvas.height;
  let maxX = 0;
  let maxY = 0;

  for (let y = 0; y < originalCanvas.height; y++) {
    for (let x = 0; x < originalCanvas.width; x++) {
      const index = (y * originalCanvas.width + x) * 4;

      const r = pixels[index];
      const g = pixels[index + 1];
      const b = pixels[index + 2];
      const a = pixels[index + 3];

      const pixelIsWhite = r === 255 && g === 255 && b === 255;
      const pixelIsTransparent = a === 0;

      if (!pixelIsWhite && !pixelIsTransparent) {
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
    }
  }

  const croppedWidth = maxX - minX + 1;
  const croppedHeight = maxY - minY + 1;

  const croppedCanvas = document.createElement('canvas');
  croppedCanvas.width = croppedWidth;
  croppedCanvas.height = croppedHeight;

  const croppedContext = croppedCanvas.getContext('2d')!;
  croppedContext.drawImage(
    originalCanvas,
    minX,
    minY,
    croppedWidth,
    croppedHeight,
    0,
    0,
    croppedWidth,
    croppedHeight,
  );

  const croppedImage = new Image();
  croppedImage.src = croppedCanvas.toDataURL('image/png', 1.0);

  return croppedImage;
};
