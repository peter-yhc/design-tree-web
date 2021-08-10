import React from 'react';
import styled from 'styled-components';

const SelectBox = styled.select`
  margin-left: -4px;
  border: 0;
`;

interface SelectProps {
  values: string[];
  className?: string;
}

export default function Select({ values, className }: SelectProps) {
  return (
    <SelectBox className={className}>
      {
        values.map((value) => (
          <option key={value}>{value}</option>
        ))
      }
    </SelectBox>
  );
}

Select.defaultProps = {
  className: undefined,
};
