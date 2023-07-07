import { FontSpritesData } from 'types/FontSpritesData';
import { cropImageAsCanvas } from './cropImageAsCanvas';
import { performCorrectionOperationsOnCanvas } from './performCorrectionOperationsOnCanvas';
import { drawImageOnCanvas } from './auxiliar/drawImageOnCanvas';

interface CreateCharacterSpriteData {
  expectedWidth: number;
  expectedHeight: number;
  parsedWidth: number;
  parsedHeight: number;
  additionalStartX: number;
  additionalStartY: number;
}

const FIRST_CHAR_CODE = 33;

const extractCharacterFromFontSprites = (
  characterCode: number,
  charactersMap: Map<number, HTMLCanvasElement>,
  { sprites, columns }: Omit<FontSpritesData, 'rows'>,
  {
    expectedWidth,
    expectedHeight,
    parsedWidth,
    additionalStartX,
    parsedHeight,
    additionalStartY,
  }: CreateCharacterSpriteData,
) => {
  const parsedCharacterCode = characterCode - FIRST_CHAR_CODE;
  const mappedCharacter = charactersMap.get(parsedCharacterCode);
  if (mappedCharacter !== undefined) return mappedCharacter;

  const startX = (parsedCharacterCode % columns) * expectedWidth;
  const startY = Math.floor(parsedCharacterCode / columns) * expectedHeight;

  const characterSprite = cropImageAsCanvas(sprites, {
    startX: startX + additionalStartX,
    startY: startY + additionalStartY,
    width: parsedWidth,
    height: parsedHeight,
  });
  performCorrectionOperationsOnCanvas(characterSprite, { fixRotation: false });
  charactersMap.set(parsedCharacterCode, characterSprite);

  return characterSprite;
};

export const generatePdfUsingFontSpritesData = (
  text: string,
  { sprites, columns, rows }: FontSpritesData,
) => {
  const charactersMap = new Map<number, HTMLCanvasElement>();
  const widthPerCharacter = sprites.width / columns;
  const heightPerCharacter = sprites.height / rows;

  const createCharacterSpriteData = {
    expectedWidth: widthPerCharacter,
    expectedHeight: heightPerCharacter,
    parsedWidth: widthPerCharacter * 0.7,
    additionalStartX: widthPerCharacter * 0.15,
    parsedHeight: heightPerCharacter * 0.6,
    additionalStartY: heightPerCharacter * 0.3,
  } as CreateCharacterSpriteData;

  for (let ind = 0; ind < text.length; ind++) {
    // Temporary space handle.
    if (text.charCodeAt(ind) === 32) {
      const spaceCanvas = document.createElement('canvas');
      spaceCanvas.width = 20;
      spaceCanvas.height = 20;

      document.body.appendChild(spaceCanvas);
      continue;
    }

    const characterSprite = extractCharacterFromFontSprites(
      text.charCodeAt(ind),
      charactersMap,
      { sprites, columns },
      createCharacterSpriteData,
    );

    // Temporary while not inserts on pdf.
    const characterCanvas = document.createElement('canvas');
    drawImageOnCanvas(characterCanvas, characterSprite);
    document.body.appendChild(characterCanvas);
  }
};
