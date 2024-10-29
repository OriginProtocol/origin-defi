import {
  alertClasses,
  alpha,
  CircularProgress,
  emphasize,
} from '@mui/material';
import {
  FaCircleCheckRegular,
  FaCircleExclamationRegular,
  FaCircleInfoRegular,
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
            <FaCircleXmarkRegular sx={{ color: base.palette.error.main }} />
          ),
          info: (
            <FaCircleInfoRegular sx={{ color: base.palette.primary.main }} />
          ),
          success: (
            <FaCircleCheckRegular sx={{ color: base.palette.success.main }} />
          ),
          warning: (
            <FaCircleExclamationRegular
              sx={{ color: base.palette.warning.main }}
            />
          ),
          pending: <CircularProgress color="primary" size={20} />,
        },
      },
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius * 3,
          color: theme.palette.text.primary,
          boxShadow: theme.shadows[2],
          backgroundColor: theme.palette.background.highlight,
          [`&.${alertClasses.standard}.${alertClasses.colorSuccess}`]: {
            backgroundColor: theme.palette.success.faded,
          },
          [`&.${alertClasses.standard}.${alertClasses.colorError}`]: {
            backgroundColor: theme.palette.error.faded,
          },
          [`&.${alertClasses.standard}.${alertClasses.colorInfo}`]: {
            backgroundColor: theme.palette.background.highlight,
          },
          [`&.${alertClasses.standard}.${alertClasses.colorWarning}`]: {
            backgroundColor: theme.palette.background.highlight,
          },
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
          textTransform: 'none',
          boxShadow: 'none',
          minWidth: 0,
          variants: [
            {
              props: { variant: 'action' },
              style: {
                background: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                fontSize: 20,
                lineHeight: 1.6,
                fontStyle: 'normal',
                '&:hover': {
                  background: theme.palette.primary.dark,
                },
                '&:disabled': {
                  opacity: 0.5,
                  color: theme.palette.primary.contrastText,
                },
              },
            },
            {
              props: { variant: 'link' },
              style: {
                padding: 0,
                minWidth: 0,
                minHeight: 0,
                color: theme.palette.primary.main,
                '&:hover': {
                  color: theme.palette.primary.light,
                  backgroundColor: 'transparent',
                },
                '&:disabled': {
                  opacity: 0.5,
                  color: theme.palette.text.secondary,
                },
              },
            },
            {
              props: { variant: 'nav' },
              style: {
                height: 40,
                padding: theme.spacing(0.75, 2),
                [base.breakpoints.up('md')]: {
                  minWidth: 58,
                },
                [base.breakpoints.down('md')]: {
                  width: 40,
                  borderRadius: '50%',
                },
                [base.breakpoints.down('sm')]: {
                  height: 36,
                  width: 36,
                  borderRadius: '50%',
                },
              },
            },
            {
              props: { variant: 'nav', color: 'secondary' },
              style: {
                background: theme.palette.secondary.main,
                color: theme.palette.secondary.contrastText,
                border: '1px solid',
                borderColor: theme.palette.divider,
                '&:hover': {
                  borderColor: emphasize(theme.palette.divider, 0.2),
                  background: emphasize(theme.palette.background.default, 0.2),
                },
              },
            },
            {
              props: { variant: 'nav', color: 'primary' },
              style: {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                border: '1px solid',
                borderColor: theme.palette.divider,
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark,
                },
              },
            },
          ],
        }),
        sizeSmall: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius,
          padding: theme.spacing(0.75, 1),
        }),
        sizeMedium: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius * 2,
          padding: theme.spacing(1, 1.5),
          minHeight: 36,
          variants: [
            {
              props: { variant: 'action' },
              style: {
                padding: theme.spacing(2),
              },
            },
          ],
        }),
        sizeLarge: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius * 3,
          padding: theme.spacing(0.5, 2),
          minHeight: 48,
        }),
        textSecondary: ({ theme }) => ({
          color: theme.palette.text.primary,
          backgroundColor: 'transparent',
          '&:hover': {
            backgroundColor: theme.palette.primary.faded,
          },
        }),
        outlinedSecondary: ({ theme }) => ({
          backgroundColor: 'transparent',
          color: theme.palette.text.primary,
          border: '1px solid',
          borderColor: theme.palette.divider,
          '&:hover': {
            borderColor: emphasize(theme.palette.divider, 0.2),
            background: emphasize(theme.palette.background.default, 0.2),
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
          display: 'flex',
          alignItems: 'center',
          minHeight: 72,
          paddingLeft: theme.spacing(3),
          paddingRight: theme.spacing(3),
          [theme.breakpoints.down('md')]: {
            minHeight: 56,
            paddingLeft: theme.spacing(1.5),
            paddingRight: theme.spacing(1.5),
          },
        }),
        title: ({ theme }) => ({
          ...theme.typography.body3,
          fontWeight: theme.typography.fontWeightMedium,
        }),
        subheader: ({ theme }) => ({
          ...theme.typography.body3,
        }),
        action: ({ theme }) => ({
          margin: 0,
        }),
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: ({ theme }) => ({
          padding: theme.spacing(3),
          [theme.breakpoints.down('md')]: {
            padding: theme.spacing(1.5),
          },
        }),
      },
    },
    MuiCircularProgress: {
      defaultProps: {
        color: 'secondary',
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
          ':hover': {
            backgroundColor: 'transparent',
          },
        },
        sizeSmall: { fontSize: 16 },
        sizeMedium: { fontSize: 20 },
      },
    },
    MuiCssBaseline: {
      defaultProps: {
        enableColorScheme: true,
      },
      styleOverrides: (theme) => ({
        body: {
          height: '100%',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          textRendering: 'optimizeLegibility',
          fontSize: theme.typography.body3.fontSize,
          lineHeight: theme.typography.body3.lineHeight,
          fontWeight: theme.typography.body3.fontWeight,
        },
        'input[type=number]': {
          MozAppearance: 'textfield',
        },
        'input[type="number"]::-webkit-inner-spin-button, input[type="number"]::-webkit-outer-spin-button':
          {
            WebkitAppearance: 'none',
            margin: 0,
          },
      }),
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
    MuiDialogActions: {
      defaultProps: {
        disableSpacing: true,
      },
      styleOverrides: {
        root: ({ theme }) => ({
          padding: theme.spacing(3),
          flexDirection: 'column',
          alignItems: 'stretch',
        }),
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: ({ theme }) => ({
          padding: theme.spacing(3),
          background: `
            linear-gradient(rgba(255, 255, 255, 0), ${theme.palette.background.paper} 70%) center bottom,
            radial-gradient(farthest-side at 50% 100%, ${alpha(theme.palette.common.white, 0.25)}, rgba(0, 0, 0, 0)) center bottom
          `,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 40px, 100% 10px',
          backgroundAttachment: 'local, scroll',
          ...theme.applyStyles('light', {
            background: `
              linear-gradient(rgba(255, 255, 255, 0), ${alpha(theme.palette.common.black, 0.25)} 70%) center bottom,
              radial-gradient(farthest-side at 50% 100%, , rgba(0, 0, 0, 0)) center bottom
            `,
          }),
        }),
      },
    },
    MuiDialogContentText: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.text.primary,
          ...theme.typography.body3,
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
          ...theme.typography.body3,
        }),
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: ({ theme }) => ({
          svg: { fontSize: 24 },
        }),
      },
    },
    MuiListItemText: {
      defaultProps: {
        primaryTypographyProps: {
          variant: 'body3',
        },
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
    MuiMenuItem: {
      styleOverrides: {
        root: ({ theme }) => ({
          ...theme.typography.body3,
          '&.Mui-selected': {
            background: alpha(theme.palette.primary.main, 0.15),
          },
          '&:hover': {
            background: alpha(theme.palette.primary.main, 0.1),
          },
        }),
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
    MuiPopper: {
      styleOverrides: {
        root: ({ theme }) => ({
          zIndex: theme.zIndex.tooltip,
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
          boxShadow: theme.shadows[2],
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
          padding: theme.spacing(0.5, 1),
          background: theme.palette.background.highlight,
          color: theme.palette.text.primary,
          borderRadius: theme.shape.borderRadius,
          boxShadow: theme.shadows[2],
          '>.MuiTypography-root': theme.typography.caption1,
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
