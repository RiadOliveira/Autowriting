import { useCallback, useState } from 'react';
import { Container } from './styles';
import { convertFileToImage } from 'utils/convertFileToImage';
import { getCroppedImage } from 'utils/getCroppedImage';
import { getRelevantPartOfCanvasAsImage } from 'utils/getRelevantPartOfCanvasAsImage';

export const Home = () => {
  const [fontSprites, setFontSprites] = useState<HTMLImageElement | undefined>(
    undefined,
  );

  const readFontSpritesFromFile = useCallback(
    async (file: File | undefined) => {
      if (file === undefined) return;

      try {
        const parsedImage = await convertFileToImage(file);
        const croppedImage = getCroppedImage(parsedImage, {
          startX: 0,
          startY: 0,
          width: parsedImage.width,
          height: parsedImage.height,
        });

        document.body.appendChild(parsedImage);
        document.body.appendChild(getRelevantPartOfCanvasAsImage(croppedImage));

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
