import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { themeConfig, Theme as ThemeType } from './theme-config';
import { applyTheme, initializeTheme, getComputedTheme } from './theme-utils';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextValue {
  theme: ThemeMode;
  currentTheme: 'light' | 'dark';
  setTheme: (theme: ThemeMode) => void;
  themes: typeof themeConfig;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: ThemeMode;
}

export function ThemeProvider({
  children,
  defaultTheme = 'system',
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    return (localStorage.getItem('theme') as ThemeMode) || defaultTheme;
  });

  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>(
    getComputedTheme()
  );

  // Initialize theme system
  useEffect(() => {
    initializeTheme();
  }, []);

  // Handle theme changes
  useEffect(() => {
    const newTheme = theme === 'system' ? getComputedTheme() : theme;
    setCurrentTheme(newTheme);
    applyTheme(newTheme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      if (theme === 'system') {
        const newTheme = getComputedTheme();
        setCurrentTheme(newTheme);
        applyTheme(newTheme);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      currentTheme,
      setTheme,
      themes: themeConfig,
    }),
    [theme, currentTheme]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
}

// Hook to access theme values
export function useThemeValue<T = unknown>(path: string): T {
  const { currentTheme, themes } = useTheme();
  const theme = themes[currentTheme];
  
  return path.split('.').reduce((obj: any, key) => {
    if (obj && typeof obj === 'object' && key in obj) {
      return obj[key];
    }
    return undefined;
  }, theme) as T;
}