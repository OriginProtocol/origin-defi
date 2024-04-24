import '@mui/material/styles';
import '@mui/material/Button';
import '@mui/material/Typography';

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

  interface TypographyVariants {
    body3: React.CSSProperties;
    feature1: React.CSSProperties;
    feature2: React.CSSProperties;
    feature3: React.CSSProperties;
    mono: React.CSSProperties;
    caption1: React.CSSProperties;
    caption2: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    body3?: React.CSSProperties;
    feature1?: React.CSSProperties;
    feature2?: React.CSSProperties;
    feature3?: React.CSSProperties;
    mono?: React.CSSProperties;
    caption1?: React.CSSProperties;
    caption2?: React.CSSProperties;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    action: true;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    body3: true;
    feature1: true;
    feature2: true;
    feature3: true;
    mono: true;
    caption1: true;
    caption2: true;
  }
}
