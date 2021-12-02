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
};

const innerSpacing = {
  small: '0.5rem',
  medium: '0.75rem',
  large: '1.25rem',
  xlarge: '2rem',
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
};

export default {
  colours,
  innerSpacing,
  outerSpacing,
  system,
};

export interface ThemeType {
  colours: any;
  innerSpacing: any;
  outerSpacing: any;
  system: any;
}
