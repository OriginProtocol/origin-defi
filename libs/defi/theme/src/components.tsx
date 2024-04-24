import {
  FaArrowsRotateRegular,
  FaCircleCheckRegular,
  FaCircleExclamationRegular,
  FaCircleXmarkRegular,
  FaSquareCheckRegular,
  FaSquareMinusRegular,
  FaSquareRegular,
} from '@origin/shared/icons';

import type { Theme, ThemeOptions } from '@mui/material';

export const components = (base: Theme): ThemeOptions => ({
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
        root: {
          textTransform: 'none',
          boxShadow: 'none',
          paddingX: {
            md: 3,
            xs: 2,
          },
          paddingY: {
            md: 1,
            xs: 0.75,
          },
        },
        sizeSmall: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius,
        }),
        sizeMedium: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius * 3,
        }),
        sizeLarge: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius * 3,
        }),
      },
      variants: [
        {
          props: { variant: 'action' },
          style: ({ theme }) => ({
            background: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            padding: theme.spacing(2),
            fontSize: 20,
            lineHeight: 1.6,
            fontWeight: 500,
            fontStyle: 'normal',
            '&:hover': {
              background: theme.palette.primary.dark,
            },
            '&:disabled': {
              opacity: 0.5,
              color: theme.palette.primary.contrastText,
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
          borderRadius: theme.shape.borderRadius * 4,
          backgroundColor: theme.palette.background.paper,
          border: '1px solid',
          borderColor: theme.palette.divider,
          boxShadow: 'none',
        }),
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: ({ theme }) => ({
          minHeight: 72,
          padding: theme.spacing(3),
          [theme.breakpoints.down('md')]: {
            minHeight: 56,
            padding: theme.spacing(2, 3),
          },
        }),
        title: ({ theme }) => theme.typography.body2,
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: ({ theme }) => ({
          padding: theme.spacing(3),
          [theme.breakpoints.down('md')]: {
            padding: theme.spacing(2, 3),
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
      styleOverrides: (theme) => `
          body {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: optimizeLegibility;            
            font-size: ${theme.typography.body3.fontSize}px;
            line-height: ${theme.typography.body3.lineHeight};
            font-weight: ${theme.typography.body3.fontWeight};
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
      styleOverrides: {
        root: ({ theme }) => ({
          border: '1px solid',
          borderColor: theme.palette.divider,
        }),
        paper: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius * 4,
        }),
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: ({ theme }) => ({
          padding: theme.spacing(3),
          ...theme.typography.body2,
          fontWeight: theme.typography.fontWeightMedium,
          color: theme.palette.text.primary,
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
    MuiIconButton: {
      styleOverrides: {
        root: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: ({ theme }) => ({
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
          borderColor: theme.palette.divider,
        }),
        list: {
          padding: 0,
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
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
    MuiPopover: {
      defaultProps: {
        transitionDuration: 0,
        disableScrollLock: true,
        elevation: 0,
      },
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius * 4,
        }),
        paper: ({ theme }) => ({
          border: '1px solid',
          borderColor: theme.palette.divider,
        }),
      },
    },
    MuiSkeleton: {
      defaultProps: {
        animation: 'wave',
      },
      styleOverrides: {
        text: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius,
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
          ...theme.typography.body2,
          textTransform: 'none',
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
            ...theme.typography.body3,
          },
        }),
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: ({ theme }) => ({
          padding: theme.spacing(3),
          ...theme.typography.body3,
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
          padding: theme.spacing(1.5),
          background: theme.palette.background.paper,
          color: theme.palette.text.secondary,
          borderRadius: theme.shape.borderRadius,
          border: '1px solid',
          borderColor: theme.palette.divider,
          boxShadow: theme.shadows[1],
          '>.MuiTypography-root': theme.typography.body3,
        }),
      },
    },
    MuiTypography: {
      defaultProps: {
        variant: 'body3',
      },
    },
  },
});
