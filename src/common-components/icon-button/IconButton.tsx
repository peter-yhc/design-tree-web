import React, { HtmlHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
import { PencilIcon, XIcon } from '@heroicons/react/outline';

const Button = styled.button.attrs({ type: 'button' })<{ selected?: boolean}>`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 0;
  aspect-ratio: 1;
  border-radius: 50%;
  height: 2.5rem;
  
  &:hover {
    background-color: ${(props) => props.theme.colours.grey};
  }
  
  ${(props) => props.selected && css`
    background-color: ${props.theme.colours.primary};
    color: ${props.theme.colours.white};

    &:hover {
      background-color: ${props.theme.colours.primaryDarker};
    }
    
    &:active {
      background-color: ${props.theme.colours.primaryDarkest};
    }
  `}
`;

interface IconButtonProps extends HtmlHTMLAttributes<HTMLButtonElement> {
  variant: 'Pencil' | 'X'
}

export default function IconButton({ variant, ...props }: IconButtonProps) {
  return (
    <Button {...props}>
      {variant === 'Pencil' && <PencilIcon />}
      {variant === 'X' && <XIcon />}
    </Button>
  );
}
