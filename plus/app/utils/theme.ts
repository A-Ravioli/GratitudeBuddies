// Theme constants for the Plus app

// Colors
export const colors = {
  // Primary colors
  primary: '#4CAF50', // Green
  primaryDark: '#388E3C',
  primaryLight: '#81C784',
  
  // Background colors
  background: {
    dark: '#121212',
    card: '#1a1a1a',
    input: '#212121',
  },
  
  // Text colors
  text: {
    primary: '#ffffff',
    secondary: '#b0b0b0',
    tertiary: '#757575',
    disabled: '#5c5c5c',
  },
  
  // Accent colors
  accent: {
    success: '#4CAF50', // Green
    danger: '#F44336',  // Red
    warning: '#FFC107',  // Amber
    info: '#2196F3',     // Blue
  },
  
  // Border colors
  border: {
    light: '#2a2a2a',
    medium: '#333333',
    focus: '#4CAF50',
  },
};

// Typography
export const typography = {
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  
  fontWeights: {
    normal: "normal" as const,
    medium: "500" as const,
    semibold: "600" as const,
    bold: "bold" as const,
  },
  
  lineHeights: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
};

// Spacing
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Radius
export const radius = {
  xs: 4,
  sm: 8, 
  md: 12,
  lg: 16,
  round: 999, // Fully rounded (for pills, circles)
};

// Shadows
export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
  },
}; 