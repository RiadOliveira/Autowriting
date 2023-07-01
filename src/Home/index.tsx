import { useCallback, useState } from 'react';
import { Container } from './styles';
import { convertFileToImage } from 'utils/convertFileToImage';
import { cropImageAsCanvas } from 'utils/cropImageAsCanvas';
import { fixRotationAndExtractRelevantAreaOfCanvas } from 'utils/fixRotationAndExtractRelevantAreaOfCanvas';

export const Home = () => {
  const [fontSprites, setFontSprites] = useState<HTMLImageElement | undefined>(
    undefined,
  );

  const readFontSpritesFromFile = useCallback(
    async (file: File | undefined) => {
      if (file === undefined) return;

      try {
        const parsedImage = await convertFileToImage(file);
        const croppedImage = cropImageAsCanvas(parsedImage, {
          startX: 0,
          startY: 0,
          width: parsedImage.width,
          height: parsedImage.height,
        });

        //document.body.appendChild(alignCanvasRotation(croppedImage));

        fixRotationAndExtractRelevantAreaOfCanvas(croppedImage);
        document.body.appendChild(croppedImage);

        setFontSprites(parsedImage);
      } catch (error) {
        alert('Algo deu errado!');
      }
    },
    [],
  );

  return (
    <Container>
      <input
        type="file"
        onChange={({ target: { files } }) =>
          readFontSpritesFromFile((files ?? [])[0])
        }
      />
    </Container>
  );
};
