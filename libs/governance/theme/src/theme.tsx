import { alpha, createTheme, lighten } from '@mui/material';
import {
  Checkbox,
  CheckboxEmpty,
  FaCircleCheckRegular,
  FaCircleExclamationRegular,
  FaCircleInfoRegular,
  FaCircleXmarkRegular,
} from '@origin/shared/icons';

const base = createTheme();

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8c66fc',
      dark: '#0274f1',
      light: '#b361e6',
      contrastText: '#FAFBFB',
    },
    secondary: {
      main: '#0074F0',
    },
    divider: '#101113',
    background: {
      paper: '#1E1F25',
      default: '#101113',
    },
    action: {
      hoverOpacity: 0.1,
      disabledOpacity: 0.25,
      disabled: alpha('#FAFBFB', 0.5),
    },
    text: {
      primary: '#FAFBFB',
      secondary: '#B5BECA',
      tertiary: '#828699',
    },
    grey: {
      200: '#B5BECA',
      400: '#515466',
      500: '#252833',
      600: '#3B3C3E',
      700: '#141519',
      800: '#282A32',
      900: '#18191C',
    },
    success: {
      main: '#5BFF92',
    },
    warning: {
      main: '#FFDC86',
    },
    error: {
      main: '#FF4E4E',
    },
    info: {
      main: '#586CF8',
    },
  },
  typography: {
    fontFamily: 'Inter, Helvetica, Arial, sans-serif',

    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,

    h1: {
      fontFamily: 'Sailec',
      fontSize: 32,
      fontWeight: 700,
      lineHeight: 1.4,
      [base.breakpoints.down('sm')]: {
        fontSize: 20,
        lineHeight: 1.25,
      },
    },
    h2: {
      fontFamily: 'Sailec',
      fontSize: 28,
      fontWeight: 700,
      lineHeight: 1.4,
      [base.breakpoints.down('sm')]: {
        fontSize: 24,
        lineHeight: 1.25,
      },
    },
    h3: {
      fontFamily: 'Sailec',
      fontSize: 24,
      fontWeight: 700,
      lineHeight: 1.4,
      [base.breakpoints.down('sm')]: {
        fontSize: 20,
        lineHeight: 1.25,
      },
    },
    h4: {
      fontFamily: 'Sailec',
      fontSize: 20,
      fontWeight: 700,
      lineHeight: 1.4,
      [base.breakpoints.down('sm')]: {
        fontSize: 18,
        lineHeight: 1.25,
      },
    },
    h5: {
      fontFamily: 'Sailec',
      fontSize: 16,
      fontWeight: 400,
      lineHeight: 1.4,
      [base.breakpoints.down('sm')]: {
        fontSize: 14,
        lineHeight: 1.25,
      },
    },
    h6: {
      fontFamily: 'Sailec',
      fontSize: 15,
      textTransform: 'uppercase',
      fontWeight: 500,
      lineHeight: 1.4,
      [base.breakpoints.down('sm')]: {
        fontSize: 13,
        lineHeight: 1.25,
      },
    },
    body1: {
      fontSize: 14,
      lineHeight: 1.5,
      [base.breakpoints.down('sm')]: {
        fontSize: 13,
      },
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
              sx={{ fontSize: 20, color: base.palette.error.main }}
            />
          ),
          info: (
            <FaCircleInfoRegular
              sx={{ fontSize: 20, color: base.palette.success.main }}
            />
          ),
          success: (
            <FaCircleCheckRegular
              sx={{ fontSize: 20, color: base.palette.success.main }}
            />
          ),
          warning: (
            <FaCircleExclamationRegular
              sx={{ fontSize: 20, color: base.palette.warning.main }}
            />
          ),
        },
      },
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.grey['900'],
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
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 0.75,
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
          minWidth: 0,
          variants: [
            {
              props: { variant: 'action' },
              style: {
                background:
                  'linear-gradient(90deg,#8c66fc -28.99%,#0274f1 144.97%)',
                color: theme.palette.text.primary,
                padding: theme.spacing(2),
                fontSize: 20,
                lineHeight: 1.6,
                borderRadius: theme.shape.borderRadius * 2,
                fontFamily: 'Sailec, Inter, Helvetica, Arial, sans-serif',
                fontWeight: 500,
                fontStyle: 'normal',
                '&:hover': {
                  background:
                    'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), linear-gradient(90deg, #8C66FC 0%, #0274F1 100%)',
                  opacity: 1,
                },
                '&:disabled': {
                  opacity: 0.5,
                  color: theme.palette.text.primary,
                },
                [base.breakpoints.down('sm')]: {
                  fontSize: 18,
                },
              },
            },
            {
              props: { variant: 'connect' },
              style: {
                background: 'linear-gradient(90deg, #8C66FC 0%, #0274F1 100%)',
                color: theme.palette.text.primary,
                borderRadius: theme.shape.borderRadius * 8,
                fontStyle: 'normal',
                '&:hover': {
                  background:
                    'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), linear-gradient(90deg, #8C66FC 0%, #0274F1 100%)',
                  opacity: 1,
                },
                '&:disabled': {
                  opacity: 0.5,
                  color: theme.palette.text.primary,
                },
              },
            },
            {
              props: { variant: 'nav' },
              style: {
                background: lighten(theme.palette.background.paper, 0.05),
                '&:hover': {
                  background: lighten(theme.palette.background.paper, 0.1),
                },
                minWidth: 36,
                minHeight: 36,
                [base.breakpoints.up('md')]: {
                  paddingX: 2,
                  paddingY: 0,
                  minWidth: 44,
                  minHeight: 44,
                },
              },
            },
          ],
        }),
        sizeSmall: {
          fontSize: 12,
          [base.breakpoints.down('sm')]: {
            fontSize: 11,
          },
        },
        sizeMedium: ({ theme }) => ({
          fontSize: theme.typography.button.fontSize,
          [base.breakpoints.down('sm')]: {
            fontSize: 11,
          },
        }),
        sizeLarge: {
          fontSize: 16,
          [base.breakpoints.down('sm')]: {
            fontSize: 15,
          },
        },
        containedPrimary: ({ theme }) => ({
          background: alpha(theme.palette.common.white, 0.05),
          '&:hover': {
            background: alpha(theme.palette.common.white, 0.1),
          },
        }),
        containedSecondary: ({ theme }) => ({
          background: theme.palette.grey[700],
          '&:hover': {
            background: theme.palette.grey[900],
          },
        }),
        containedWarning: {
          background:
            'linear-gradient(90deg, rgb(179, 97, 230) 20.29%, rgb(106, 54, 252) 79.06%)',
          '&:hover': {
            background:
              'linear-gradient(90deg, rgba(179, 97, 230, 0.75) 20.29%, rgba(106, 54, 252, 0.75) 79.06%)',
          },
        },
        containedSizeSmall: {
          fontSize: 12,
          fontWeight: 500,
          fontStyle: 'normal',
          lineHeight: 1.6,
          minHeight: 28,
          backgroundImage: 'none',
          gap: 1,
          borderRadius: 32,
          px: 2,
          py: 0.5,
        },
        outlinedSecondary: ({ theme }) => ({
          borderColor: theme.palette.secondary.main,
          ':hover': {
            borderColor: theme.palette.secondary.dark,
          },
        }),
        text: ({ theme }) => ({
          ':hover': {
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
      styleOverrides: {
        root: ({ theme }) => ({
          padding: 0,
          borderRadius: theme.shape.borderRadius,
          backgroundImage: 'none',
          backgroundColor: theme.palette.background.paper,
        }),
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: ({ theme }) => ({
          padding: theme.spacing(2, 3),
          borderBottom: `1px solid ${theme.palette.divider}`,
          [theme.breakpoints.down('md')]: {
            padding: theme.spacing(1.5, 2),
          },
        }),
        title: ({ theme }) => ({
          lineHeight: 1.5,
          fontSize: theme.typography.fontSize,
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
    MuiCheckbox: {
      defaultProps: {
        checkedIcon: <Checkbox />,
        icon: <CheckboxEmpty />,
      },
      styleOverrides: {
        root: ({ theme }) => ({
          ':hover': {
            backgroundColor: 'transparent',
          },
        }),
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
        root: {
          '.MuiModal-backdrop': {
            backdropFilter: 'blur(10px)',
          },
        },
        paper: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius * 2,
        }),
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: ({ theme }) => ({
          py: 3,
          fontSize: 16,
          fontWeight: 700,
          lineHeight: 1.75,
          color: theme.palette.text.primary,
          textTransform: 'none',
          [base.breakpoints.down('sm')]: {
            fontSize: 14,
          },
        }),
      },
    },
    MuiDialogContentText: {
      styleOverrides: {
        root: ({ theme }) => ({ color: theme.palette.text.primary }),
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderWidth: 1,
        },
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
    MuiIconButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          background: `linear-gradient(0deg, ${alpha('#fff', 0.05)} 0%, ${alpha(
            '#fff',
            0.05,
          )} 100%), #1E1F25;`,
          '&:hover': {
            background: theme.palette.background.paper,
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
      defaultProps: {
        underline: 'none',
      },
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundImage: 'none',
          color: theme.palette.text.primary,
          textDecorationColor: 'inherit',
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
          paddingInline: theme.spacing(3),
          paddingBlock: theme.spacing(2),
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
          background: 'linear-gradient(90deg, #8C66FC 0%, #0274F1 100%)',
          transition: theme.transitions.create('all', {
            duration: theme.transitions.duration.shortest,
            easing: theme.transitions.easing.easeInOut,
          }),
        }),
      },
    },
    MuiTooltip: {
      defaultProps: {
        placement: 'top',
      },
      styleOverrides: {
        tooltip: ({ theme }) => ({
          paddingInline: theme.spacing(2),
          paddingBlock: theme.spacing(1.5),
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
      height: 75,
    },
  },
});
