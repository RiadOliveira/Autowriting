export const convertFileToImage = (file: File): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = event => {
      const image = new Image();

      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error());

      image.src = event.target?.result as string;
    };

    reader.onerror = () => reject(new Error());
    reader.readAsDataURL(file);
  });
