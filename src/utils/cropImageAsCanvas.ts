import { DrawData } from 'types/DrawData';
import { drawImageOnCanvas } from './auxiliar/drawImageOnCanvas';

export const cropImageAsCanvas = (
  image: HTMLImageElement | HTMLCanvasElement,
  cropData: DrawData,
) => {
  const canvas = document.createElement('canvas');
  drawImageOnCanvas(canvas, image, cropData);

  return canvas;
};
