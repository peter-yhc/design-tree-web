const colours = {
  primary: 'hsl(203,80%,56%)',
  primaryLighest: 'hsl(203,40%,95%)',
  primaryLighter: 'hsl(203,40%,80%)',
  secondary: 'hsl(168,66%,53%)',
  accent: 'hsl(346,47%,46%)',
  white: '#f5f5fa',
  black: 'hsl(204,4%,22%)',
  lightGrey: 'hsl(210,15%,95%)',
  grey: 'hsl(0,0%,82%)',
  darkGrey: 'hsl(0,0%,43%)',
};

const innerSpacing = {
  small: '0.5em',
  medium: '0.75em',
  large: '1.25em',
  xlarge: '2em',
};

const outerSpacing = {
  tiny: '0.35em',
  small: '0.85em',
  medium: '1.5em',
  large: '2.25em',
  xlarge: '4em',
};

const system = {
  sideNavWidth: '250px',
  editModeTimings: 'ease-in-out 300ms',
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
