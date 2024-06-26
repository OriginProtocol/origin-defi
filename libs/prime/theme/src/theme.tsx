import { createTheme } from '@mui/material';
import {
  FaArrowsRotateRegular,
  FaCircleCheckRegular,
  FaCircleExclamationRegular,
  FaCircleXmarkRegular,
} from '@origin/shared/icons';

const base = createTheme();

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#FF4E4E',
      contrastText: '#FFF',
    },
    secondary: {
      main: '#0074F0',
      contrastText: '#FFF',
    },
    divider: '#D8DEE5',
    background: {
      paper: '#F7FAFF',
      default: '#F6F8FE',
    },
    text: {
      primary: '#1E293B',
      secondary: '#828699',
    },
    grey: {
      100: '#EAEDF2',
      200: '#B5BECA',
      300: '#97A0AB',
      400: '#515466',
      500: '#252833',
      600: '#3B3C3E',
      700: '#141519',
      800: '#282A32',
      900: '#18191C',
    },
    success: {
      main: '#07C166',
    },
    warning: {
      main: '#FFDC86',
    },
    error: {
      main: '#FF4E4E',
    },
    action: {
      hover: '#F3F5FC',
      selected: '#EAF0F9',
    },
  },
  typography: {
    fontFamily: 'Sailec, Inter, Helvetica, Arial, sans-serif',

    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,

    h1: {
      fontSize: 40,
      lineHeight: 1.4,
      fontWeight: 700,
      [base.breakpoints.down('sm')]: {
        fontSize: 32,
        lineHeight: 1.25,
      },
    },
    h2: {
      fontSize: 32,
      lineHeight: 1.4,
      fontWeight: 700,
      [base.breakpoints.down('sm')]: {
        fontSize: 28,
        lineHeight: 1.25,
      },
    },
    h3: {
      fontSize: 28,
      lineHeight: 1.4,
      fontWeight: 700,
      [base.breakpoints.down('sm')]: {
        fontSize: 24,
        lineHeight: 1.25,
      },
    },
    h4: {
      fontSize: 24,
      lineHeight: 1.4,
      fontWeight: 500,
      [base.breakpoints.down('sm')]: {
        fontSize: 20,
        lineHeight: 1.25,
      },
    },
    h5: {
      fontSize: 20,
      lineHeight: 1.625,
      fontWeight: 500,
      [base.breakpoints.down('sm')]: {
        fontSize: 16,
        lineHeight: 1.25,
      },
    },
    h6: {
      fontSize: 16,
      lineHeight: 1.4,
      fontWeight: 500,
      [base.breakpoints.down('sm')]: {
        fontSize: 13,
        lineHeight: 1.25,
      },
    },
    subtitle1: {
      fontSize: 18,
      fontWeight: 400,
      lineHeight: 1.4,
      [base.breakpoints.down('sm')]: {
        fontSize: 16,
        lineHeight: 1.25,
      },
    },
    subtitle2: {
      fontSize: 12,
      fontWeight: 400,
      lineHeight: 1.4,
      [base.breakpoints.down('sm')]: {
        fontSize: 11,
        lineHeight: 1.25,
      },
    },
    body1: {
      fontSize: 14,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: 12,
      fontWeight: 400,
      lineHeight: 1.6,
    },
    button: {
      fontSize: 14,
      lineHeight: 1.5,
    },
  },
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiAccordion: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius,
          backgroundColor: theme.palette.grey[900],
          border: '1px solid',
          borderColor: theme.palette.grey[800],
          boxShadow: 'none',
          '&:before': {
            height: 0,
          },
          backgroundImage: 'none',
        }),
      },
    },
    MuiAlert: {
      defaultProps: {
        variant: 'standard',
        iconMapping: {
          error: (
            <FaCircleXmarkRegular
              sx={{ color: base.palette.error.main, fontSize: 20 }}
            />
          ),
          info: (
            <FaArrowsRotateRegular
              sx={{ color: base.palette.success.main, fontSize: 20 }}
            />
          ),
          success: (
            <FaCircleCheckRegular
              sx={{ color: base.palette.success.main, fontSize: 20 }}
            />
          ),
          warning: (
            <FaCircleExclamationRegular
              sx={{ color: base.palette.warning.main, fontSize: 20 }}
            />
          ),
        },
      },
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        }),
      },
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        color: 'primary',
        disableElevation: true,
      },
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.text.primary,
          textTransform: 'none',
          borderRadius: 25,
          paddingX: {
            md: 3,
            xs: 2,
          },
          paddingY: {
            md: 1,
            xs: 0.75,
          },
          boxShadow: 'none',
        }),
        containedPrimary: ({ theme }) => ({
          color: theme.palette.primary.contrastText,
          background: theme.palette.primary.main,
          '&:hover': {
            background: theme.palette.primary.dark,
          },
          '&.Mui-disabled': {
            color: theme.palette.primary.contrastText,
            background: theme.palette.primary.main,
            opacity: 0.6,
          },
        }),
        containedSecondary: ({ theme }) => ({
          color: theme.palette.secondary.contrastText,
          background: theme.palette.grey[800],
          '&:hover': {
            background: theme.palette.grey[900],
          },
        }),
        outlinedPrimary: ({ theme }) => ({
          color: theme.palette.primary.main,
          borderColor: theme.palette.primary.main,
          '&:hover': {
            color: theme.palette.primary.contrastText,
            backgroundColor: theme.palette.primary.main,
          },
        }),
        outlinedSecondary: ({ theme }) => ({
          borderColor: theme.palette.divider,
          '&:hover': {
            borderColor: theme.palette.divider,
            backgroundColor: theme.palette.grey[100],
          },
        }),
        text: ({ theme }) => ({
          '&:hover': {
            color: theme.palette.common.white,
            background: 'transparent',
          },
        }),
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
        disableTouchRipple: true,
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: ({ theme }) => ({
          padding: 0,
          borderRadius: theme.shape.borderRadius * 5,
          backgroundImage: 'none',
          backgroundColor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
        }),
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: ({ theme }) => ({
          padding: theme.spacing(3),
          borderBottom: `1px solid ${theme.palette.divider}`,
          [theme.breakpoints.down('md')]: {
            padding: theme.spacing(1.5, 2),
          },
        }),
        title: ({ theme }) => ({
          lineHeight: 1.5,
          fontSize: 14,
          fontWeight: 500,
        }),
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: ({ theme }) => ({
          padding: theme.spacing(3),
          [theme.breakpoints.down('md')]: {
            padding: theme.spacing(1.5, 2),
          },
        }),
      },
    },
    MuiChip: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius,
        }),
        sizeSmall: {
          fontSize: 13,
          fontWeight: 600,
          maxHeight: 20,
        },
      },
    },
    MuiCssBaseline: {
      defaultProps: {
        enableColorScheme: true,
      },
      styleOverrides: `
          body {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: optimizeLegibility;
          }

          input[type=number] {
            -moz-appearance: textfield;
          }

          input[type="number"]::-webkit-inner-spin-button, input[type="number"]::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }

          @font-face {
            font-family: "Inter";
            font-weight: 400;
            src: url(/fonts/Inter-Regular.woff2) format('woff2');
            font-display: swap;
          }

          @font-face {
            font-family: Sailec;
            font-weight: 400;
            src: url(/fonts/Sailec-Regular.otf) format('opentype');
            font-display: swap;
          }

          @font-face {
            font-family: Sailec;
            font-weight: 500;
            src: url(/fonts/Sailec-Medium.otf) format('opentype');
            font-display: swap;
          }

          @font-face {
            font-family: Sailec;
            font-weight: 700;
            src: url(/fonts/Sailec-Bold.otf) format('opentype');
            font-display: swap;
          }
        `,
    },
    MuiDialog: {
      defaultProps: {
        transitionDuration: 0,
      },
      styleOverrides: {
        paper: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius * 5,
        }),
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: ({ theme }) => ({
          padding: theme.spacing(3, 2),
          fontSize: 14,
          fontWeight: 500,
          lineHeight: 1.5,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }),
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: ({ theme }) => ({
          padding: theme.spacing(3, 2),
        }),
      },
    },
    MuiDialogContentText: {
      styleOverrides: {
        root: ({ theme }) => ({
          padding: theme.spacing(3, 2),
          color: theme.palette.text.primary,
        }),
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          position: 'static',
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          '&.MuiInputLabel-root': {
            position: 'static',
            transform: 'none',
            transformOrigin: 'initial',
            fontSize: theme.typography.fontSize,
            marginBlockEnd: theme.spacing(1),
            color: `${theme.palette.text.primary}`,
          },
        }),
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 20,
          border: '1px solid',
          borderColor: theme.palette.info.main,
          backgroundColor: theme.palette.background.default,
          width: 'auto',
          paddingBlock: theme.spacing(0.5),
          paddingInline: theme.spacing(1.5),

          '& .MuiInputBase-input': {
            color: theme.palette.text.primary,
            fontSize: theme.typography.fontSize,
          },
        }),
        input: ({ theme }) => ({
          padding: theme.spacing(0.5),
        }),
      },
    },
    MuiLink: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundImage: 'none',
          color: theme.palette.text.primary,
          textDecoration: 'none',
        }),
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiPopover: {
      defaultProps: {
        transitionDuration: 0,
        disableScrollLock: true,
      },
      styleOverrides: {
        root: ({ theme }) => ({
          boxShadow: theme.shadows[23],
          backgroundImage: 'none',
          borderRadius: theme.shape.borderRadius * 2.5,
          background: 'transparent',
        }),
        paper: {
          backgroundImage: 'none',
        },
      },
    },
    MuiSkeleton: {
      defaultProps: {
        animation: 'wave',
      },
      styleOverrides: {
        text: ({ theme }) => ({
          borderRadius: 10,
        }),
      },
    },
    MuiSvgIcon: {
      defaultProps: {
        fontSize: 'inherit',
      },
    },
    MuiTab: {
      styleOverrides: {
        root: ({ theme }) => ({
          minHeight: 0,
          padding: theme.spacing(3, 2),
          fontSize: 16,
          textTransform: 'none',
          lineHeight: 1.6875,
          ':hover': {
            color: theme.palette.text.primary,
          },
          '&.Mui-selected': {
            color: theme.palette.text.primary,
          },
          [theme.breakpoints.down('md')]: {
            padding: theme.spacing(1, 2),
          },
          [theme.breakpoints.down('sm')]: {
            fontSize: 14,
          },
        }),
      },
    },
    MuiTooltip: {
      defaultProps: {
        placement: 'top',
      },
      styleOverrides: {
        tooltip: ({ theme }) => ({
          color: theme.palette.text.secondary,
          fontSize: 12,
          fontWeight: 400,
          lineHeight: 1.6,
          px: theme.spacing(2),
          py: theme.spacing(1.5),
          borderRadius: theme.shape.borderRadius * 2,
          border: '1px solid',
          borderColor: theme.palette.grey[500],
          boxShadow: theme.shadows[23],
          background: theme.palette.background.paper,
        }),
      },
    },
  },
  mixins: {
    toolbar: {
      height: 75,
      [base.breakpoints.down('sm')]: {
        height: 56,
      },
    },
  },
});
