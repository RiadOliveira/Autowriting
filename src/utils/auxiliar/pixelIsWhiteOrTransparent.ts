import { Color } from 'types/Color';

export const pixelIsWhiteOrTransparent = ({ r, g, b, a }: Color) => {
  const pixelIsWhite = r >= 200 && g >= 200 && b >= 200;
  const pixelIsTransparent = a === 0;

  return pixelIsWhite || pixelIsTransparent;
};
