import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface TypeBackground {
    gradient1: string;
    gradient2: string;
    gradient3: string;
    gradientSuccess: string;
    gradientHover: string;
    gradientHoverActionButton: string;
  }

  interface TypeBackgroundOptions {
    gradient1: string;
    gradient2: string;
    gradient3: string;
    gradientSuccess: string;
    gradientHover: string;
    gradientHoverActionButton: string;
  }

  interface Shape {
    cardBorderRadius: number;
  }

  interface ShapeOptions {
    cardBorderRadius: number;
  }
}
