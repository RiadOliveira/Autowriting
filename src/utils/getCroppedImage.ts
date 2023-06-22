interface CropData {
  startX: number;
  startY: number;
  width: number;
  height: number;
}

export const getCroppedImage = (
  originalImage: HTMLImageElement,
  { startX, startY, width, height }: CropData,
) => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d')!;

  canvas.width = width;
  canvas.height = height;
  context.drawImage(
    originalImage,
    startX,
    startY,
    width,
    height,
    0,
    0,
    width,
    height,
  );

  return canvas;
};
