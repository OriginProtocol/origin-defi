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

  interface PaletteColor {
    faded?: string;
  }

  interface SimplePaletteColorOptions {
    faded?: string;
  }

  interface TypographyVariants {
    body3: React.CSSProperties;
    featured1: React.CSSProperties;
    featured2: React.CSSProperties;
    featured3: React.CSSProperties;
    mono: React.CSSProperties;
    caption1: React.CSSProperties;
    caption2: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    body3?: React.CSSProperties;
    featured1?: React.CSSProperties;
    featured2?: React.CSSProperties;
    featured3?: React.CSSProperties;
    mono?: React.CSSProperties;
    caption1?: React.CSSProperties;
    caption2?: React.CSSProperties;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    action: true;
    nav: true;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    body3: true;
    featured1: true;
    featured2: true;
    featured3: true;
    mono: true;
    caption1: true;
    caption2: true;
    subtitle1: false;
    subtitle2: false;
    caption: false;
    overline: false;
  }
}
