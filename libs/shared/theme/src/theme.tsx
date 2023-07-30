import { experimental_extendTheme as extendTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface TypeBackground {
    gradient1: string;
    gradient2: string;
    gradient3: string;
    gradientSuccess: string;
  }

  interface TypeBackgroundOptions {
    gradient1: string;
    gradient2: string;
    gradient3: string;
    gradientSuccess: string;
  }

  interface Shape {
    cardBorderRadius: number;
  }

  interface ShapeOptions {
    cardBorderRadius: number;
  }
}

export const theme = extendTheme({
  colorSchemes: {
    dark: {
      palette: {
        primary: {
          main: 'rgb(130, 134, 153)',
          contrastText: '#fff',
        },
        divider: '#141519',
        background: {
          paper: 'rgb(30, 31, 37)',
          default: '#141519',

          gradient1: 'linear-gradient(90deg,#8c66fc -28.99%,#0274f1 144.97%)',
          gradient2: 'linear-gradient(90deg,#b361e6 -28.99%,#6a36fc 144.97%)',
          gradient3:
            'linear-gradient(90deg, rgb(179, 97, 230) 20.29%, rgb(106, 54, 252) 79.06%)',
          gradientSuccess:
            'linear-gradient(97.67deg, rgb(102, 254, 144) -10.09%, rgb(102, 217, 254) 120.99%)',
        },
        action: {
          hoverOpacity: 0.1,
        },
        text: {
          primary: 'rgb(130, 134, 153)',
        },
      },
    },
  },
  typography: {
    fontFamily: 'Inter, Helvetica, Arial, sans-serif',
  },
  shape: {
    borderRadius: 11,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
        containedPrimary: ({ theme }) => ({
          color: theme.palette.primary.contrastText,
          background: theme.palette.background.gradient1,
        }),
      },
    },
    MuiTab: {
      styleOverrides: {
        root: ({ theme }) => ({
          minHeight: 0,
          paddingBlock: theme.spacing(1),
          paddingInline: theme.spacing(2.5),
          '&.Mui-selected': {
            zIndex: 2,
            color: theme.palette.primary.contrastText,
          },
        }),
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.background.paper,
          borderRadius: theme.shape.borderRadius * 5,
          minHeight: 0,
        }),
        indicator: ({ theme }) => ({
          height: '100%',
          background: theme.palette.background.gradient2,
          zIndex: 1,
          borderRadius: theme.shape.borderRadius * 5,
          '&:after': {
            content: '""',
            position: 'absolute',
            height: '94%',
            width: '96%',
            backgroundColor: 'rgba(0, 0, 0, 0.667)',
            borderRadius: theme.shape.borderRadius * 5,
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            margin: 'auto',
            zIndex: 3,
          },
        }),
      },
    },
    MuiLink: {
      styleOverrides: {
        root: ({ theme }) => ({
          textDecoration: 'none',
          color: theme.palette.primary.contrastText,
        }),
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: ({ theme }) => ({
          '&.Mui-selected': {
            backgroundColor: 'transparent',
            color: theme.palette.primary.main,
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
    MuiMenu: {
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
    MuiFormControl: {
      styleOverrides: {
        root: {
          position: 'static',
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          '&.MuiInputLabel-root': {
            position: 'static',
            transform: 'none',
            transformOrigin: 'none',
            fontSize: '0.75rem',
            marginBlockEnd: '0.25rem',
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 40,
          border: '1px solid',
          borderColor: theme.palette.info.main,
          fontSize: '1rem',
          backgroundColor: theme.palette.background.default,
          width: 'auto',
          paddingBlock: theme.spacing(0.5),
          paddingInline: theme.spacing(1.5),
        }),
        input: {
          padding: 0,
        },
      },
    },
  },
});

export type Theme = typeof theme;
