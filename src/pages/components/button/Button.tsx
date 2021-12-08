import React from 'react';
import styled, { css } from 'styled-components';

const Button = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  border: 1px ${(props) => props.theme.colours.grey} solid;
  border-radius: 4px;
  padding: 0.4em 0.75em;
  background-color: transparent;
  color: ${(props) => props.theme.colours.black};
  cursor: pointer;
  
  ${(props) => props.primary && css`
    border: 0;
    background-color: ${props.theme.colours.primary};
    color: ${props.theme.colours.white};
    
    &:hover:not(:disabled) {
      background-color: ${props.theme.colours.primaryDarker};
    }
    &:active {
      background-color: ${props.theme.colours.primaryDarkest};
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
  
  ${(props) => props.disabled && css`
    background-color: ${props.theme.colours.grey};
    cursor: not-allowed;
  `}
`;

interface ButtonProps {
  children: React.ReactNode,
  primary?: boolean,
  secondary?: boolean,
  inline?: boolean,
  disabled?: boolean,
}

export default Button;
