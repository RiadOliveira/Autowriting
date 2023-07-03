import { DrawData } from 'types/DrawData';

export const drawImageOnCanvas = (
  canvas: HTMLCanvasElement,
  image: HTMLImageElement | HTMLCanvasElement,
  {
    width = image.width,
    height = image.height,
    startX = 0,
    startY = 0,
  }: Partial<DrawData> = {},
  context: CanvasRenderingContext2D = canvas.getContext('2d')!,
) => {
  canvas.width = width;
  canvas.height = height;
  context.drawImage(image, startX, startY, width, height, 0, 0, width, height);
};
