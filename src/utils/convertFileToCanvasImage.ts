import { drawImageOnCanvas } from './auxiliar/drawImageOnCanvas';

export const convertFileToCanvasImage = (
  file: File,
): Promise<HTMLCanvasElement> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = event => {
      const image = new Image();

      image.onload = () => {
        const canvas = document.createElement('canvas');
        drawImageOnCanvas(canvas, image);
        resolve(canvas);
      };
      image.onerror = () => reject(new Error());

      image.src = event.target?.result as string;
    };

    reader.onerror = () => reject(new Error());
    reader.readAsDataURL(file);
  });
