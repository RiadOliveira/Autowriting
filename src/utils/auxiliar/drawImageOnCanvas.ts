import { DrawData } from 'types/DrawData';

export const drawImageOnCanvas = (
  canvas: HTMLCanvasElement,
  image: HTMLImageElement | HTMLCanvasElement,
  { startX, startY, width, height }: DrawData,
  context?: CanvasRenderingContext2D,
) => {
  const canvasContext = context ?? canvas.getContext('2d')!;

  canvas.width = width;
  canvas.height = height;
  canvasContext.drawImage(
    image,
    startX,
    startY,
    width,
    height,
    0,
    0,
    width,
    height,
  );
};
