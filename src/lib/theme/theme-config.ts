export const themeConfig = {
  light: {
    colors: {
      // Base colors
      background: '#ffffff',
      foreground: '#1a1a1a',
      
      // Brand colors
      primary: {
        DEFAULT: '#2563eb',
        foreground: '#ffffff',
        50: '#eff6ff',
        100: '#dbeafe',
        200: '#bfdbfe',
        300: '#93c5fd',
        400: '#60a5fa',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
        800: '#1e40af',
        900: '#1e3a8a',
      },

      // Semantic colors
      success: {
        DEFAULT: '#16a34a',
        foreground: '#ffffff',
      },
      warning: {
        DEFAULT: '#eab308',
        foreground: '#1a1a1a',
      },
      error: {
        DEFAULT: '#dc2626',
        foreground: '#ffffff',
      },

      // UI colors
      card: {
        DEFAULT: '#ffffff',
        foreground: '#1a1a1a',
        border: '#e5e7eb',
      },
      popover: {
        DEFAULT: '#ffffff',
        foreground: '#1a1a1a',
        border: '#e5e7eb',
      },
      modal: {
        DEFAULT: '#ffffff',
        foreground: '#1a1a1a',
        border: '#e5e7eb',
      },

      // States
      muted: {
        DEFAULT: '#f3f4f6',
        foreground: '#6b7280',
      },
      accent: {
        DEFAULT: '#f9fafb',
        foreground: '#111827',
      },
    },

    borderRadius: {
      sm: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
      '2xl': '1rem',
      '3xl': '1.5rem',
      full: '9999px',
    },

    animation: {
      fast: '150ms',
      normal: '250ms',
      slow: '350ms',
    },
  },

  dark: {
    colors: {
      // Base colors
      background: '#111827',
      foreground: '#ffffff',
      
      // Brand colors
      primary: {
        DEFAULT: '#3b82f6',
        foreground: '#ffffff',
        50: '#1a1d29',
        100: '#1e2433',
        200: '#1f2937',
        300: '#374151',
        400: '#4b5563',
        500: '#6b7280',
        600: '#9ca3af',
        700: '#d1d5db',
        800: '#e5e7eb',
        900: '#f3f4f6',
      },

      // Semantic colors
      success: {
        DEFAULT: '#22c55e',
        foreground: '#ffffff',
      },
      warning: {
        DEFAULT: '#fbbf24',
        foreground: '#1a1a1a',
      },
      error: {
        DEFAULT: '#ef4444',
        foreground: '#ffffff',
      },

      // UI colors
      card: {
        DEFAULT: '#1f2937',
        foreground: '#ffffff',
        border: '#374151',
      },
      popover: {
        DEFAULT: '#1f2937',
        foreground: '#ffffff',
        border: '#374151',
      },
      modal: {
        DEFAULT: '#1f2937',
        foreground: '#ffffff',
        border: '#374151',
      },

      // States
      muted: {
        DEFAULT: '#374151',
        foreground: '#9ca3af',
      },
      accent: {
        DEFAULT: '#1f2937',
        foreground: '#ffffff',
      },
    },

    // Keep the same values as light theme
    borderRadius: {
      sm: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
      '2xl': '1rem',
      '3xl': '1.5rem',
      full: '9999px',
    },

    animation: {
      fast: '150ms',
      normal: '250ms',
      slow: '350ms',
    },
  },
} as const;

export type Theme = typeof themeConfig.light;
export type ThemeColor = keyof typeof themeConfig.light.colors;

// CSS variable generation
const toVar = (name: string) => `--${name}`;

export const createThemeVariables = (theme: 'light' | 'dark') => {
  const themeValues = themeConfig[theme];
  const cssVars: Record<string, string> = {};

  // Helper function to flatten nested objects into CSS variables
  const flattenObject = (obj: any, prefix = '') => {
    for (const key in obj) {
      const value = obj[key];
      if (typeof value === 'object' && value !== null) {
        flattenObject(value, `${prefix}${key}-`);
      } else {
        cssVars[toVar(`${prefix}${key}`)] = value;
      }
    }
  };

  flattenObject(themeValues);
  return cssVars;
};

// Utility function to get CSS variable value
export const getCssVar = (name: string) => `var(${toVar(name)})`;

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

type ThemeValue = string | number | DeepPartial<typeof themeConfig.light>;

// Type-safe theme getter
export const getThemeValue = (theme: Theme, path: string): ThemeValue => {
  return path.split('.').reduce((obj: any, key) => {
    if (obj && typeof obj === 'object' && key in obj) {
      return obj[key];
    }
    return undefined;
  }, theme);
};

// Get CSS variable name from path
export const getThemeVar = (path: string) => `--${path.replace(/\./g, '-')}`;

// Helper to create CSS variables object
export const createCssVariables = (
  obj: Record<string, any>,
  prefix = ''
): Record<string, string> => {
  const result: Record<string, string> = {};

  for (const key in obj) {
    const value = obj[key];
    const newPrefix = prefix ? `${prefix}-${key}` : key;

    if (value && typeof value === 'object') {
      Object.assign(result, createCssVariables(value, newPrefix));
    } else {
      result[`--${newPrefix}`] = String(value);
    }
  }

  return result;
};