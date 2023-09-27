import '@mui/material/styles';
import '@mui/material/Button';

declare module '@mui/material/styles' {
  interface TypeBackground {
    gradient1: string;
    gradient2: string;
    gradient3: string;
    gradientSuccess: string;
    gradientHover: string;
    gradientHoverActionButton: string;
    gradientSelected: string;
    gradientPaper: string;
  }

  interface TypeBackgroundOptions {
    gradient1?: string;
    gradient2?: string;
    gradient3?: string;
    gradientSuccess?: string;
    gradientHover?: string;
    gradientHoverActionButton?: string;
    gradientSelected?: string;
    gradientPaper?: string;
  }

  interface TypeText {
    subtle: string;
  }

  interface TypeTextOptions {
    subtle?: string;
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
