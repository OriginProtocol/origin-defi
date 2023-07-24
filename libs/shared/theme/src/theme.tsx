import { experimental_extendTheme as extendTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface TypeBackground {
    gradient1: string;
    gradient2: string;
  }

  interface TypeBackgroundOptions {
    gradient1: string;
    gradient2: string;
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
        }),
        indicator: ({ theme }) => ({
          height: '100%',
          background: theme.palette.background.gradient2,
          zIndex: 1,
          borderRadius: theme.shape.borderRadius * 5,
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
          position: 'static'
        }
      }
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          '&.MuiInputLabel-root':{
            position: 'static',
            transform: 'none',
            transformOrigin: 'none',
            fontSize: '0.75rem',
            marginBlockEnd: '0.25rem'
          }
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: ({theme})=>({
          borderRadius:  40,
          border: '1px solid',
          borderColor:theme.palette.info.main,
          fontSize: '1rem',
          backgroundColor: theme.palette.background.default,
          width: 'auto',
          padding: '7px 12px',
      
          
        })
      }
    }
  },
});