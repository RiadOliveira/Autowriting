import { drawImageOnCanvas } from './auxiliar/drawImageOnCanvas';
import { getColorFromImagePixels } from './auxiliar/getColorFromImagePixels';
import { pixelIsWhiteOrTransparent } from './auxiliar/pixelIsWhiteOrTransparent';
import { cropImageAsCanvas } from './cropImageAsCanvas';

interface ExtremityCoordinates {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

const updateExtremityCoordinates = (
  extremityCoordinates: ExtremityCoordinates,
  xToVerify: number,
  yToVerify: number,
) => {
  extremityCoordinates.minX = Math.min(extremityCoordinates.minX, xToVerify);
  extremityCoordinates.minY = Math.min(extremityCoordinates.minY, yToVerify);

  extremityCoordinates.maxX = Math.max(extremityCoordinates.maxX, xToVerify);
  extremityCoordinates.maxY = Math.max(extremityCoordinates.maxY, yToVerify);
};

const calculateRotationFixAngle = (
  canvasWidth: number,
  canvasHeight: number,
  { minX, minY, maxX, maxY }: ExtremityCoordinates,
) => {
  const allCanvasHypotenuse = Math.sqrt(
    Math.pow(canvasWidth, 2) + Math.pow(canvasHeight, 2),
  );
  const allCanvasAngle =
    (Math.asin(canvasHeight / allCanvasHypotenuse) * 180) / Math.PI;

  const relevantAreaWidth = maxX - minX + 1;
  const relevantAreaHeight = maxY - minY + 1;
  const relevantAreaHypotenuse = Math.sqrt(
    Math.pow(relevantAreaWidth, 2) + Math.pow(relevantAreaHeight, 2),
  );
  const relevantAreaAngle =
    (Math.asin(relevantAreaHeight / relevantAreaHypotenuse) * 180) / Math.PI;

  return allCanvasAngle - relevantAreaAngle;
};

const fixCanvasRotation = (
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  extremityCoordinates: ExtremityCoordinates,
) => {
  const { width, height } = canvas;
  const rotationAngle = calculateRotationFixAngle(
    width,
    height,
    extremityCoordinates,
  );

  const rotatedCanvas = document.createElement('canvas');
  const rotatedContext = rotatedCanvas.getContext('2d')!;

  rotatedCanvas.width = width;
  rotatedCanvas.height = height;

  rotatedContext.translate(rotatedCanvas.width / 2, rotatedCanvas.height / 2);
  rotatedContext.rotate(rotationAngle);

  rotatedContext.drawImage(canvas, -canvas.width / 2, -canvas.height / 2);
  rotatedContext.restore();

  context.clearRect(0, 0, width, height);
  drawImageOnCanvas(canvas, rotatedCanvas, {}, context);
};

const extractCanvasRelevantArea = (
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  { minX, minY, maxX, maxY }: ExtremityCoordinates,
) => {
  const relevantWidth = maxX - minX + 1;
  const relevantHeight = maxY - minY + 1;
  const croppedCanvas = cropImageAsCanvas(canvas, {
    startX: minX,
    startY: minY,
    width: relevantWidth,
    height: relevantHeight,
  });

  context.clearRect(0, 0, canvas.width, canvas.height);
  drawImageOnCanvas(canvas, croppedCanvas, {}, context);
};

export const fixRotationAndExtractRelevantAreaOfCanvas = (
  canvas: HTMLCanvasElement,
) => {
  const context = canvas.getContext('2d')!;
  const { width, height } = canvas;
  const { data: pixels } = context.getImageData(0, 0, width, height);

  const extremityCoordinates: ExtremityCoordinates = {
    minX: width,
    minY: height,
    maxX: 0,
    maxY: 0,
  };

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const color = getColorFromImagePixels(pixels, width, y, x);

      if (!pixelIsWhiteOrTransparent(color)) {
        updateExtremityCoordinates(extremityCoordinates, x, y);
      }
    }
  }

  fixCanvasRotation(canvas, context, extremityCoordinates);
  extractCanvasRelevantArea(canvas, context, extremityCoordinates);
};
