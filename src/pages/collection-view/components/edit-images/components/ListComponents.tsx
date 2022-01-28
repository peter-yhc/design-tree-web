import React, { InputHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

interface SubListProps {
  $open?: boolean;
}

export const SubList = styled.div<SubListProps>`
  display: flex;
  flex-direction: column;
  max-height: 0;
  overflow: hidden;

  ${(props) => props.$open && css`
    max-height: max-content;
  `}
`;

interface LabelProps {
  $sub?: boolean;
}

const Label = styled.label<LabelProps>`
  position: relative;
  padding-left: 1.5rem;

  &:before {
    position: absolute;
    top: 1px;
    left: 0;
    content: ' ';
    height: 16px;
    width: 16px;
    border: 1px solid ${(props) => props.theme.colours.primaryDarkest};
    border-radius: 50%;
  }

  & > input {
    display: none;
  }

  & > input:checked + span {
    position: absolute;
    top: 4px;
    left: 3px;
    height: 12px;
    width: 12px;
    background-color: ${(props) => props.theme.colours.primaryDarkest};
    border-radius: 50%;
  }

  ${(props) => props.$sub && css`
    margin-left: ${props.theme.outerSpacing.medium};
  `}
`;

export const ListForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-left: ${(props) => props.theme.outerSpacing.large};
  max-height: 50vh;
  overflow-y: auto;
  
  & ${Label} {
    margin-top: 0.2rem;
    margin-bottom: 0.2rem;
  }
`;

interface ListItemProps extends InputHTMLAttributes<HTMLInputElement>{
  $sub?: boolean;
  onSelect: () => void;
  name: string;
}

export function ListItem({
  value, $sub, onSelect, name,
}: ListItemProps) {
  return (
    <Label $sub={$sub}>
      <input type="radio" value={value} onClick={onSelect} name={name} />
      {value}
      <span />
    </Label>
  );
}
