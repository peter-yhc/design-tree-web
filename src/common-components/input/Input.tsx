import React from 'react';
import styled from 'styled-components';

const Label = styled.label`
  display: flex;
  flex-direction: column;
  text-transform: capitalize;
  font-weight: 600;
  font-size: 0.85rem;
  letter-spacing: 0.02rem;
`;

const InputStyled = styled.input`
  outline: 0;
  border: 1px solid ${(props) => props.theme.colours.grey};
  border-radius: ${(props) => props.theme.system.borderRadius};
  margin-top: ${(props) => props.theme.innerSpacing.small};
  font-size: 1rem;
  padding: ${(props) => props.theme.innerSpacing.small};
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
