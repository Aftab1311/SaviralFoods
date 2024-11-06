export const convertImageToBase64 = (file, maxWidth = 800, maxHeight = 800, quality = 0.7) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    // Load the file as a data URL
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      img.src = event.target.result;
    };

    img.onload = () => {
      // Create a canvas to resize the image
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      // Maintain aspect ratio and resize if necessary
      if (width > maxWidth) {
        height *= maxWidth / width;
        width = maxWidth;
      }
      if (height > maxHeight) {
        width *= maxHeight / height;
        height = maxHeight;
      }

      // Set canvas dimensions
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

      // Draw the image to canvas
      ctx.drawImage(img, 0, 0, width, height);

      // Convert the canvas to a Base64-encoded JPEG image
      const base64String = canvas.toDataURL('image/jpeg', quality);
      resolve(base64String);
    };

    img.onerror = (error) => reject(error);
  });
};
