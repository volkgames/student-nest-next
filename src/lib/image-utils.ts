export async function extractDominantColor(imageUrl: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageUrl;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve("bg-blue-500/20");
        return;
      }

      canvas.width = 1;
      canvas.height = 1;

      ctx.drawImage(img, 0, 0, 1, 1);
      const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
      
      // Return a semi-transparent RGBA string or a Tailwind-like class
      // For simplicity, let's return a hex or rgb that can be used in style
      resolve(`rgba(${r}, ${g}, ${b}, 0.2)`);
    };

    img.onerror = () => {
      resolve("bg-blue-500/20");
    };
  });
}

export const getTailwindColorFromRGB = (r: number, g: number, b: number) => {
  // Simple mapping or just return the rgba
  return `rgba(${r}, ${g}, ${b}, 0.2)`;
};
