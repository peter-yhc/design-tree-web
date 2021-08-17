const colours = {
  primary: 'hsl(133,41%,53%)',
  secondary: 'hsl(216,41%,53%)',
  accent: 'hsl(345,41%,53%)',
  white: '#f5f5fa',
  black: 'hsl(204,4%,22%)',
  lightGrey: 'hsl(200,27%,98%)',
  grey: 'hsl(0,0%,82%)',
  darkGrey: 'hsl(0,0%,46%)',
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

export default {
  colours,
  innerSpacing,
  outerSpacing,
};

export interface ThemeType {
  colours: any;
  innerSpacing: any;
  outerSpacing: any;
}
