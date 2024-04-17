import { alpha, createTheme } from '@mui/material';
import shadows from '@mui/material/styles/shadows';
import {
  FaArrowsRotateRegular,
  FaCircleCheckRegular,
  FaCircleExclamationRegular,
  FaCircleXmarkRegular,
  FaSquareCheckRegular,
  FaSquareMinusRegular,
  FaSquareRegular,
} from '@origin/shared/icons';

const base = createTheme();

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0074F0',
      contrastText: '#FAFBFB',
    },
    secondary: {
      main: '#9869FB',
      contrastText: '#FAFBFB',
    },
    divider: '#3B3C3E',
    background: {
      paper: '#171619',
      default: '#141214',
      header: '#19191D',
      highlight: '#1E1F25',
      gradientBlue: 'linear-gradient(90deg, #8C66FC -28.99%, #0274F1 144.97%)',
      gradientPurple:
        'linear-gradient(90deg, rgba(179, 97, 230, 0.50) -28.99%, rgba(106, 54, 252, 0.50) 144.97%)',
      gradientOrange: 'linear-gradient(91deg, #FEDBA8 -3.29%, #CF75D5 106.42%)',
    },
    action: {
      hoverOpacity: 0.01,
      disabledOpacity: 0.25,
      disabled: alpha('#FAFBFB', 0.5),
    },
    text: {
      primary: '#FAFBFB',
      secondary: '#B5BECA',
      tertiary: '#828699',
    },
    grey: {
      100: '#FAFBFB',
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
      main: '#66FE90',
    },
    warning: {
      main: '#FFDC86',
    },
    error: {
      main: '#FF4E4E',
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
      fontFamily: 'Sailec',
      fontSize: 40,
      lineHeight: 1.4,
      fontWeight: 700,
      [base.breakpoints.down('sm')]: {
        fontSize: 32,
        lineHeight: 1.25,
      },
    },
    h2: {
      fontFamily: 'Sailec',
      fontSize: 32,
      lineHeight: 1.4,
      fontWeight: 700,
      [base.breakpoints.down('sm')]: {
        fontSize: 28,
        lineHeight: 1.25,
      },
    },
    h3: {
      fontFamily: 'Sailec',
      fontSize: 28,
      lineHeight: 1.4,
      fontWeight: 700,
      [base.breakpoints.down('sm')]: {
        fontSize: 24,
        lineHeight: 1.25,
      },
    },
    h4: {
      fontFamily: 'Sailec',
      fontSize: 24,
      lineHeight: 1.4,
      fontWeight: 500,
      [base.breakpoints.down('sm')]: {
        fontSize: 20,
        lineHeight: 1.25,
      },
    },
    h5: {
      fontFamily: 'Sailec',
      fontSize: 20,
      lineHeight: 1.4,
      fontWeight: 500,
      [base.breakpoints.down('sm')]: {
        fontFamily: 'Inter',
        fontSize: 14,
        lineHeight: 1.25,
      },
    },
    h6: {
      fontFamily: 'Sailec',
      fontSize: 18,
      lineHeight: 1.4,
      fontWeight: 400,
      [base.breakpoints.down('sm')]: {
        fontFamily: 'Inter',
        fontSize: 13,
        lineHeight: 1.25,
      },
    },
    subtitle1: {
      fontFamily: 'Sailec',
      fontSize: 20,
      fontWeight: 500,
      lineHeight: 1.4,
      [base.breakpoints.down('sm')]: {
        fontSize: 16,
        lineHeight: 1.25,
      },
    },
    subtitle2: {
      fontFamily: 'Inter',
      fontSize: 12,
      fontWeight: 400,
      lineHeight: 1.4,
      [base.breakpoints.down('sm')]: {
        fontFamily: 'Inter',
        fontSize: 11,
        lineHeight: 1.25,
      },
    },
    body1: {
      fontFamily: 'Inter',
      fontSize: 14,
      lineHeight: 1.71429,
    },
    body2: {
      fontFamily: 'Inter',
      fontSize: 12,
      fontWeight: 400,
      lineHeight: 1.6,
    },
    button: {
      fontFamily: 'Sailec',
      fontSize: 14,
      lineHeight: 1.5,
    },
  },
  shape: {
    borderRadius: 4,
  },
  shadows: [
    // @ts-expect-error remove one box shadow
    ...shadows.slice(0, -2),
    '0px 6px 12px 0px rgba(0, 0, 0, 0.20)',
    'rgba(0, 0, 0, 0.25) 0px 4px 4px 0px',
    '0px 1.7955275774002075px 5.32008171081543px 0px rgba(0, 0, 0, 0.03), 0px 6.030803203582764px 17.869047164916992px 0px rgba(0, 0, 0, 0.04), 0px 27px 80px 0px rgba(0, 0, 0, 0.07)',
  ],
  components: {
    MuiAccordion: {
      defaultProps: {
        disableGutters: true,
      },
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 4,
          border: '1px solid',
          borderColor: theme.palette.divider,
          boxShadow: 'none',
          '&:before': {
            height: 0,
          },
          backgroundImage: 'none',
        }),
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: ({ theme }) => ({
          padding: 0,
          minHeight: 0,
          borderRadius: theme.shape.borderRadius,
        }),
        content: {
          marginTop: 0,
          marginBottom: 0,
        },
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
          backgroundColor: theme.palette.background.highlight,
          color: theme.palette.text.primary,
          '&&&': { border: 'none' },
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
          background: theme.palette.primary.main,
          '&:hover': {
            background: theme.palette.primary.dark,
          },
        }),
        containedSecondary: ({ theme }) => ({
          background: theme.palette.grey[800],
          '&:hover': {
            background: theme.palette.grey[900],
          },
        }),
        outlinedSecondary: ({ theme }) => ({
          borderColor: theme.palette.divider,
          ':hover': {
            borderColor: theme.palette.primary.main,
          },
        }),
        text: ({ theme }) => ({
          ':hover': {
            color: theme.palette.common.white,
            background: 'transparent',
          },
        }),
      },
      variants: [
        {
          props: { variant: 'action' },
          style: ({ theme }) => ({
            background: theme.palette.primary.main,
            color: theme.palette.text.primary,
            padding: theme.spacing(2),
            fontSize: 20,
            lineHeight: 1.6,
            borderRadius: theme.shape.borderRadius * 2,
            fontFamily: 'Sailec, Inter, Helvetica, Arial, sans-serif',
            fontWeight: 500,
            fontStyle: 'normal',
            '&:hover': {
              background: theme.palette.primary.dark,
              opacity: 1,
            },
            '&:disabled': {
              opacity: 0.5,
              color: theme.palette.text.primary,
            },
          }),
        },
      ],
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
        disableTouchRipple: true,
      },
    },
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          padding: 0,
          borderRadius: '8px',
          backgroundImage: 'none',
          backgroundColor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: 'none',
        }),
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: ({ theme }) => ({
          minHeight: 72,
          padding: theme.spacing(3),
          backgroundColor: theme.palette.background.header,
          [theme.breakpoints.down('md')]: {
            minHeight: 56,
            padding: theme.spacing(2, 3),
          },
        }),
        title: ({ theme }) => ({
          fontSize: theme.typography.fontSize,
          lineHeight: 1.5,
          fontWeight: 500,
        }),
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: ({ theme }) => ({
          padding: theme.spacing(2.5, 3),
          [theme.breakpoints.down('md')]: {
            padding: theme.spacing(1.25, 1.5),
          },
        }),
      },
    },
    MuiContainer: {
      styleOverrides: {
        maxWidthMd: {
          '&&&': { maxWidth: 1000 },
        },
      },
    },
    MuiCheckbox: {
      defaultProps: {
        indeterminateIcon: <FaSquareMinusRegular fontSize="inherit" />,
        checkedIcon: <FaSquareCheckRegular fontSize="inherit" />,
        icon: <FaSquareRegular fontSize="inherit" />,
      },
      styleOverrides: {
        root: {
          padding: 0,
        },
        sizeSmall: { fontSize: 16 },
        sizeMedium: { fontSize: 20 },
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
        disableScrollLock: true,
      },
      styleOverrides: {
        root: ({ theme }) => ({
          border: '1px solid',
          borderColor: theme.palette.divider,
          backgroundImage: 'none',
        }),
        paper: ({ theme }) => ({
          backgroundColor: theme.palette.background.paper,
          borderRadius: theme.shape.borderRadius * 2,
        }),
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: ({ theme }) => ({
          padding: theme.spacing(2.5, 3),
          fontSize: 14,
          fontWeight: 500,
          lineHeight: 1.71429,
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.background.header,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }),
      },
    },
    MuiDialogContentText: {
      styleOverrides: {
        root: ({ theme }) => ({ color: theme.palette.text.primary }),
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
            color: theme.palette.text.primary,
          },
        }),
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.palette.grey['800'],
          ':hover': {
            backgroundColor: theme.palette.background.highlight,
          },
        }),
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 20,
          border: '1px solid',
          borderColor: theme.palette.primary.main,
          backgroundColor: theme.palette.background.default,
          width: 'auto',
          padding: theme.spacing(0.5, 1.5),

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
    MuiMenu: {
      defaultProps: {
        transitionDuration: 0,
      },
      styleOverrides: {
        paper: ({ theme }) => ({
          border: '1px solid',
          borderColor: theme.palette.background.default,
        }),
        list: {
          padding: 0,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: ({ theme }) => ({
          '&.Mui-selected': {
            backgroundColor: 'transparent',
            color: theme.palette.text.secondary,
            '&:hover': {
              backgroundColor: theme.palette.grey[800],
            },
          },
          '&:hover': {
            backgroundColor: theme.palette.grey[800],
          },
        }),
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        outlined: ({ theme }) => ({
          borderColor: theme.palette.divider,
          '&.Mui-selected': {
            background: theme.palette.background.paper,
          },
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
          // backgroundColor: theme.palette.grey[900],
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
    MuiTableCell: {
      styleOverrides: {
        root: ({ theme }) => ({
          padding: theme.spacing(2, 3),
          fontSize: theme.typography.fontSize,
          fontStyle: 'normal',
          fontWeight: 400,
          lineHeight: 1.6,
        }),
        head: ({ theme }) => ({
          color: theme.palette.text.secondary,
        }),
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: ({ theme }) => ({
          background: theme.palette.primary.main,
          transition: theme.transitions.create('all', {
            duration: theme.transitions.duration.shortest,
            easing: theme.transitions.easing.easeInOut,
          }),
        }),
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: ({ theme }) => ({
          padding: theme.spacing(1.5, 2),
          borderRadius: theme.shape.borderRadius * 2,
          border: '1px solid',
          borderColor: theme.palette.grey[500],
          boxShadow: theme.shadows[23],
        }),
      },
    },
  },
  mixins: {
    toolbar: {
      height: 72,
      [base.breakpoints.down('sm')]: {
        height: 56,
      },
    },
  },
});
