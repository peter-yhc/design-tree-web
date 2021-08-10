import React from 'react';
import styled, { css } from 'styled-components';

const Button = styled.button<ButtonProps>`
  border: 1px ${(props) => props.theme.colours.grey} solid;
  border-radius: 4px;
  padding: ${(props) => props.theme.innerSpacing.small} ${(props) => props.theme.innerSpacing.medium};
  background-color: transparent;
  color: ${(props) => props.theme.colours.black};
  cursor: pointer;
  
  ${(props) => props.primary && css`
    border: 0;
    background-color: ${props.theme.colours.primary};
    color: ${props.theme.colours.white};
    
    &:active {
      background-color: hsl(195,35%,35%);
    }
  `}
  
  ${(props) => props.secondary && css`
    border: 0;
    background-color: ${props.theme.colours.secondary};
    color: ${props.theme.colours.white};
    
    &:active {
      background-color: hsl(340,75%,41%);
    }
  `}
  
  ${(props) => props.inline && css`
    border: 0;
    padding: 0;
  `}
`;

interface ButtonProps {
  children: React.ReactNode,
  primary?: boolean,
  secondary?: boolean,
  inline?: boolean,
}

export default Button;
