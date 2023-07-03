import { useCallback, useState } from 'react';
import { Container } from './styles';
import { convertFileToCanvasImage } from 'utils/convertFileToCanvasImage';
import { cropImageAsCanvas } from 'utils/cropImageAsCanvas';
import { fixRotationAndExtractRelevantAreaOfCanvas } from 'utils/fixRotationAndExtractRelevantAreaOfCanvas';

export const Home = () => {
  const [fontSprites, setFontSprites] = useState<HTMLCanvasElement | undefined>(
    undefined,
  );

  const readFontSpritesFromFile = useCallback(
    async (file: File | undefined) => {
      if (file === undefined) return;

      try {
        const parsedImage = await convertFileToCanvasImage(file);
        fixRotationAndExtractRelevantAreaOfCanvas(parsedImage);
        document.body.appendChild(parsedImage);

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
