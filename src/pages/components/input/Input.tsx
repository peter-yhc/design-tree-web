import React from 'react';
import styled from 'styled-components';

const Label = styled.label`
  display: flex;
  flex-direction: column;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 0.75rem;
  letter-spacing: 0.02rem;
`;

const InputStyled = styled.input`
  border: 0;
  outline: 0;
  margin-top: ${(props) => props.theme.innerSpacing.small};
  border-bottom: 1px solid ${(props) => props.theme.colours.darkGrey};
  font-size: 1rem;
`;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder: string;
}

export default function Input({
  label, placeholder, className, ...props
}: InputProps) {
  return (
    <Label className={className}>
      {label}
      <InputStyled placeholder={placeholder} {...props} />
    </Label>
  );
}
