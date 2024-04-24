export type Font = {
  url: string;
  type?: `font/${string}`;
};

export const preloadFonts = (fonts: Font[]) => {
  for (const font of fonts) {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.type = font.type ?? 'font/woff2';
    link.href = font.url;
    link.crossOrigin = 'anonymous';

    document.head.appendChild(link);
  }
};
