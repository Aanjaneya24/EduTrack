import { createTheme } from '@mui/material/styles';

// Modern Color Palette
export const colors = {
  primary: {
    main: '#6366F1', // Indigo
    light: '#818CF8',
    dark: '#4F46E5',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  secondary: {
    main: '#EC4899', // Pink
    light: '#F472B6',
    dark: '#DB2777',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  },
  success: {
    main: '#10B981',
    light: '#34D399',
    dark: '#059669',
  },
  warning: {
    main: '#F59E0B',
    light: '#FBBF24',
    dark: '#D97706',
  },
  error: {
    main: '#EF4444',
    light: '#F87171',
    dark: '#DC2626',
  },
  info: {
    main: '#3B82F6',
    light: '#60A5FA',
    dark: '#2563EB',
  },
  neutral: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
  },
  background: {
    default: '#F8FAFC',
    paper: '#FFFFFF',
    dark: '#0F172A',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
};

// Spacing system (based on 8px)
export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px',
  xxxl: '64px',
};

// Shadow system
export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  xxl: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
};

// Border radius
export const borderRadius = {
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  xxl: '24px',
  full: '9999px',
};

// Typography
export const typography = {
  fontFamily: '"Inter", "Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightSemiBold: 600,
  fontWeightBold: 700,
  fontWeightExtraBold: 800,
};

// Create MUI theme
export const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary.main,
      light: colors.primary.light,
      dark: colors.primary.dark,
    },
    secondary: {
      main: colors.secondary.main,
      light: colors.secondary.light,
      dark: colors.secondary.dark,
    },
    success: {
      main: colors.success.main,
      light: colors.success.light,
      dark: colors.success.dark,
    },
    warning: {
      main: colors.warning.main,
      light: colors.warning.light,
      dark: colors.warning.dark,
    },
    error: {
      main: colors.error.main,
      light: colors.error.light,
      dark: colors.error.dark,
    },
    info: {
      main: colors.info.main,
      light: colors.info.light,
      dark: colors.info.dark,
    },
    background: {
      default: colors.background.default,
      paper: colors.background.paper,
    },
    text: {
      primary: colors.neutral[900],
      secondary: colors.neutral[600],
    },
  },
  typography: {
    fontFamily: typography.fontFamily,
    fontWeightLight: typography.fontWeightLight,
    fontWeightRegular: typography.fontWeightRegular,
    fontWeightMedium: typography.fontWeightMedium,
    fontWeightBold: typography.fontWeightBold,
    h1: {
      fontSize: '3.5rem',
      fontWeight: typography.fontWeightBold,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '3rem',
      fontWeight: typography.fontWeightBold,
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '2.5rem',
      fontWeight: typography.fontWeightSemiBold,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: '2rem',
      fontWeight: typography.fontWeightSemiBold,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: typography.fontWeightMedium,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: typography.fontWeightMedium,
      lineHeight: 1.5,
    },
    subtitle1: {
      fontSize: '1.125rem',
      lineHeight: 1.75,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none',
      fontWeight: typography.fontWeightMedium,
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    shadows.sm,
    shadows.md,
    shadows.md,
    shadows.lg,
    shadows.lg,
    shadows.xl,
    shadows.xl,
    shadows.xxl,
    shadows.xxl,
    shadows.xxl,
    shadows.xxl,
    shadows.xxl,
    shadows.xxl,
    shadows.xxl,
    shadows.xxl,
    shadows.xxl,
    shadows.xxl,
    shadows.xxl,
    shadows.xxl,
    shadows.xxl,
    shadows.xxl,
    shadows.xxl,
    shadows.xxl,
    shadows.xxl,
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: borderRadius.lg,
          padding: '10px 24px',
          fontSize: '1rem',
          fontWeight: typography.fontWeightMedium,
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: shadows.lg,
          },
        },
        contained: {
          boxShadow: shadows.md,
        },
        outlined: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: borderRadius.xl,
          boxShadow: shadows.md,
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            boxShadow: shadows.xl,
            transform: 'translateY(-4px)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: borderRadius.lg,
        },
        elevation1: {
          boxShadow: shadows.sm,
        },
        elevation2: {
          boxShadow: shadows.md,
        },
        elevation3: {
          boxShadow: shadows.lg,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: borderRadius.lg,
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: colors.primary.light,
              },
            },
            '&.Mui-focused': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderWidth: '2px',
              },
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: shadows.md,
        },
      },
    },
  },
});

export default theme;
