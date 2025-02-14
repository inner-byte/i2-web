import { createCssVariables, themeConfig } from './theme-config';

// Apply theme CSS variables to document root
export const applyTheme = (theme: 'light' | 'dark') => {
  const root = document.documentElement;
  const variables = createCssVariables(themeConfig[theme]);

  // Remove existing theme variables
  const existingVars = Array.from(root.style)
    .filter(prop => prop.startsWith('--'))
    .forEach(prop => root.style.removeProperty(prop));

  // Apply new theme variables
  Object.entries(variables).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });

  // Add theme class
  root.classList.remove('light', 'dark');
  root.classList.add(theme);
};

// Get computed theme value
export const getComputedTheme = (): 'light' | 'dark' => {
  // Check if theme is set in localStorage
  const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null;
  
  if (savedTheme && savedTheme !== 'system') {
    return savedTheme as 'light' | 'dark';
  }

  // Check system preference
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// Create CSS custom properties string
export const createThemeStyles = () => {
  const lightVars = createCssVariables(themeConfig.light);
  const darkVars = createCssVariables(themeConfig.dark);

  return `
    :root {
      ${Object.entries(lightVars)
        .map(([prop, value]) => `${prop}: ${value};`)
        .join('\n      ')}
    }

    .dark {
      ${Object.entries(darkVars)
        .map(([prop, value]) => `${prop}: ${value};`)
        .join('\n      ')}
    }

    /* Base transitions for theme changes */
    *, *::before, *::after {
      transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out, color 0.2s ease-in-out;
    }
  `;
};

// Create dynamic theme styles element
export const createThemeStylesheet = () => {
  const style = document.createElement('style');
  style.id = 'theme-styles';
  style.textContent = createThemeStyles();
  return style;
};

// Initialize theme system
export const initializeTheme = () => {
  // Add theme stylesheet
  if (!document.getElementById('theme-styles')) {
    document.head.appendChild(createThemeStylesheet());
  }

  // Apply initial theme
  const initialTheme = getComputedTheme();
  applyTheme(initialTheme);

  // Watch for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (e) => {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'system') {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
};