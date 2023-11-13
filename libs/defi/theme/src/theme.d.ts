import '@mui/material/styles';
import '@mui/material/Button';

declare module '@mui/material/styles' {
  interface TypeBackground {
    gradientPurple: string;
    gradientBlue: string;
    gradientOrange: string;
    header: string;
  }

  interface TypeBackgroundOptions {
    gradientPurple?: string;
    gradientBlue?: string;
    gradientOrange?: string;
    header?: string;
  }

  interface TypeText {
    tertiary: string;
  }

  interface TypeTextOptions {
    tertiary?: string;
  }

  interface Shape {
    cardBorderRadius: number;
  }

  interface ShapeOptions {
    cardBorderRadius?: number;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    action: true;
  }
}
