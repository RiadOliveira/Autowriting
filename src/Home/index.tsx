import { useCallback, useRef, useState } from 'react';
import { Container } from './styles';
import { convertFileToCanvasImage } from 'utils/convertFileToCanvasImage';
import { performCorrectionOperationsOnCanvas } from 'utils/performCorrectionOperationsOnCanvas';
import { FontSpritesData } from 'types/FontSpritesData';
import { generatePdfUsingFontSpritesData } from 'utils/generatePdfUsingFontSpritesData';

export const Home = () => {
  const textInputRef = useRef<HTMLInputElement>(null);
  const [fontSpritesData, setFontSpritesData] = useState<
    FontSpritesData | undefined
  >(undefined);

  const readFontSpritesFromFile = useCallback(
    async (file: File | undefined) => {
      if (file === undefined) return;

      try {
        const parsedImage = await convertFileToCanvasImage(file);
        performCorrectionOperationsOnCanvas(parsedImage);

        setFontSpritesData({
          sprites: parsedImage,
          columns: 16,
          rows: 14,
        });
      } catch (error) {
        alert('Algo deu errado!');
      }
    },
    [],
  );

  const handleOnClickGenerate = useCallback(() => {
    const { current } = textInputRef;
    if (!fontSpritesData || !current) return;

    generatePdfUsingFontSpritesData(current.value, fontSpritesData);
  }, [fontSpritesData]);

  return (
    <Container>
      <input
        type="file"
        onChange={({ target: { files } }) =>
          readFontSpritesFromFile((files ?? [])[0])
        }
      />

      <input ref={textInputRef} type="text" />
      <button type="button" onClick={handleOnClickGenerate}>
        Gerar
      </button>
    </Container>
  );
};
