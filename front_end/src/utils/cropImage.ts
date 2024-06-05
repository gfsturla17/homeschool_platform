interface PixelCrop {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function getCroppedImg(imageSrc: string, pixelCrop: PixelCrop): Promise<string> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;

    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        ctx.drawImage(
          image,
          pixelCrop.x,
          pixelCrop.y,
          pixelCrop.width,
          pixelCrop.height,
          0,
          0,
          pixelCrop.width,
          pixelCrop.height
        );

        resolve(canvas.toDataURL('image/jpeg'));
      } else {
        reject('Failed to get 2D context');
      }
    };

    image.onerror = () => {
      reject('Failed to load image');
    };
  });
}