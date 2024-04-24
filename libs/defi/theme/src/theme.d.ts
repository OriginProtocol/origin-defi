import '@mui/material/styles';
import '@mui/material/Button';

declare module '@mui/material/styles' {
  interface TypeBackground {
    gradientPurple: string;
    gradientBlue: string;
    gradientOrange: string;
    highlight: string;
    primaryFaded?: string;
  }

  interface TypeBackgroundOptions {
    gradientPurple?: string;
    gradientBlue?: string;
    gradientOrange?: string;
    highlight?: string;
    primaryFaded?: string;
  }

  interface TypeText {
    tertiary: string;
    success: string;
    warning: string;
    error: string;
  }

  interface TypeTextOptions {
    tertiary?: string;
    success?: string;
    warning?: string;
    error?: string;
  }

  interface Palette {
    chart1: string;
    chart2: string;
    chart3: string;
    chart4: string;
    chart5: string;
    chart6: string;
    chart7: string;
  }

  interface PaletteOptions {
    chart1?: string;
    chart2?: string;
    chart3?: string;
    chart4?: string;
    chart5?: string;
    chart6?: string;
    chart7?: string;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    action: true;
  }
}
