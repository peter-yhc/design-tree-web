const colours = {
  primaryDarkest: 'hsl(203,80%,40%)',
  primaryDarker: 'hsl(203,80%,47%)',
  primary: 'hsl(203,80%,53%)',
  primaryLighest: 'hsl(203,80%,85%)',
  primaryLighter: 'hsl(203,80%,75%)',
  secondary: 'hsl(302,66%,53%)',
  accent: 'hsl(0,83%,75%)',
  highlight: 'hsl(48,100%,70%)',
  white: '#f5f5fa',
  black: 'hsl(204,4%,22%)',
  lightGrey: 'hsl(210,15%,97%)',
  grey: 'hsl(0,0%,87%)',
  darkGrey: 'hsl(0,0%,43%)',
  error: 'hsl(0,72%,50%)',
};

const innerSpacing = {
  small: '0.5rem',
  medium: '0.75rem',
  large: '1.5rem',
  xlarge: '2.25rem',
};

const outerSpacing = {
  tiny: '0.35rem',
  small: '0.85rem',
  medium: '1.5rem',
  large: '2.25rem',
  xlarge: '4rem',
};

const system = {
  sideNavWidth: '15.625rem',
  sideNavHighlight: 'hsl(203,80%,93%)',
  topCornerDialogHeight: '5rem',
  borderRadius: '4px',
  boxShadow: '2px 2px 16px 0 hsl(0, 0%, 50%)',
  editDialogFloatHeight: 100,
  zIndex: {
    previewCarousel: 100,
    responsiveNav: 99,
    pageHeaderFixMode: 90,
  },
};

const screenSize = {
  xs: '420px',
  sm: '810px',
  md: '1024px',
  lg: '1366px',
  xl: '1920px',
};

export default {
  colours,
  innerSpacing,
  outerSpacing,
  system,
  screenSize,
};

export interface ThemeType {
  colours: any;
  innerSpacing: any;
  outerSpacing: any;
  system: any;
  screenSize: any;
}
