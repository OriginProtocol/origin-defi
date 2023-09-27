import { alpha, Box } from '@mui/material';
import { experimental_extendTheme as extendTheme } from '@mui/material/styles';
import shadows from '@mui/material/styles/shadows';

export const theme = extendTheme({
  colorSchemes: {
    dark: {
      palette: {
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
          gradient1: 'linear-gradient(90deg,#8c66fc -28.99%,#0274f1 144.97%)',
          gradient2: 'linear-gradient(90deg, #8C66FC 0%, #0274F1 100%)',
          gradient3:
            'linear-gradient(90deg, rgb(179, 97, 230) 20.29%, rgb(106, 54, 252) 79.06%)',
          gradientSuccess:
            'linear-gradient(97.67deg, rgb(102, 254, 144) -10.09%, rgb(102, 217, 254) 120.99%)',
          gradientHover:
            'linear-gradient(0deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.05) 100%), #1E1F25',
          gradientHoverActionButton:
            'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), linear-gradient(90deg, #8C66FC 0%, #0274F1 100%)',
          gradientSelected:
            'linear-gradient(90deg, rgba(140, 102, 252, 0.30) 0%, rgba(2, 116, 241, 0.30) 100%)',
          gradientPaper: `linear-gradient(0deg, ${alpha(
            '#fff',
            0.05,
          )} 0%, ${alpha('#fff', 0.05)} 100%), #1E1F25;`,
        },
        action: {
          hoverOpacity: 0.1,
          disabledOpacity: 0.3,
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
      },
    },
  },
  typography: {
    fontFamily: 'Inter, Sailec, Helvetica, Arial, sans-serif',
    h3: {
      fontFamily: 'Sailec',
      fontSize: '1.5rem',
      fontStyle: 'normal',
      fontWeight: 700,
      lineHeight: '2rem',
    },
    body1: {
      fontSize: '0.875rem',
      lineHeight: '1.4375rem',
    },
    body2: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: '1.25rem',
      fontStyle: 'normal',
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
            <Box component="img" src="/images/failed.svg" sx={{ width: 20 }} />
          ),
          info: (
            <Box component="img" src="/images/pending.svg" sx={{ width: 20 }} />
          ),
          success: (
            <Box component="img" src="/images/success.svg" sx={{ width: 20 }} />
          ),
          warning: (
            <Box component="img" src="/images/failed.svg" sx={{ width: 20 }} />
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
          background: theme.palette.background.gradientPaper,
          '&:hover': {
            background: theme.palette.background.paper,
          },
        }),
        containedSecondary: ({ theme }) => ({
          background: theme.palette.grey[700],
          '&:hover': {
            background: theme.palette.grey[900],
          },
        }),
      },
      variants: [
        {
          props: { variant: 'action' },
          style: ({ theme }) => ({
            background: theme.palette.background.gradient1,
            color: theme.palette.text.primary,
            paddingBlock: 16,
            fontSize: theme.typography.pxToRem(20),
            lineHeight: '2rem',
            borderRadius: theme.shape.borderRadius * 2,
            fontFamily: 'Sailec, Inter, Helvetica, Arial, sans-serif',
            fontWeight: 500,
            fontStyle: 'normal',
            '&:hover': {
              background: theme.palette.background.gradientHoverActionButton,
              opacity: 1,
            },
            '&:disabled': {
              background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
              opacity: 0.3,
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
        title: {
          fontSize: 14,
          fontWeight: 500,
        },
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
    MuiCssBaseline: {
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
        `,
    },
    MuiDialog: {
      defaultProps: {
        transitionDuration: 0,
        disableScrollLock: true,
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
            fontSize: theme.typography.pxToRem(14),
            marginBlockEnd: '0.5rem',
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
            fontSize: theme.typography.pxToRem(14),
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
          borderRadius: theme.shape.borderRadius * 22,
          backgroundColor: 'grey.900',
        }),
      },
    },
    MuiTab: {
      styleOverrides: {
        root: ({ theme }) => ({
          minHeight: 0,
          padding: theme.spacing(3, 2),
          fontSize: '1rem',
          textTransform: 'none',
          lineHeight: '1.6875rem',
          ':hover': {
            color: theme.palette.text.primary,
          },
          '&.Mui-selected': {
            color: theme.palette.text.primary,
          },
          [theme.breakpoints.down('md')]: {
            padding: theme.spacing(1, 2),
            fontSize: '0.875rem',
          },
        }),
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: ({ theme }) => ({
          paddingInline: theme.spacing(3),
          paddingBlock: theme.spacing(2),
          fontSize: theme.typography.pxToRem(14),
          fontStyle: 'normal',
          fontWeight: 400,
          lineHeight: theme.typography.pxToRem(23),
        }),
        head: ({ theme }) => ({
          color: theme.palette.text.secondary,
        }),
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: ({ theme }) => ({
          background: theme.palette.background.gradient2,
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

export type Theme = typeof theme;
