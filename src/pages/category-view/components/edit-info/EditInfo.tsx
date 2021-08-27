import React from 'react';
import styled, { css } from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

interface ContainerProps {
  hidden: boolean
}

const Container = styled.section<ContainerProps>`
  position: fixed;
  bottom: ${(props) => props.theme.outerSpacing.medium};
  left: calc(100vw / 2);
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  transition: bottom ${(props) => props.theme.system.editModeTimings};
  padding: 0.4em 0.75em;
  border: 1px solid ${(props) => props.theme.colours.white};
  border-radius: 4px;
  background-color: ${(props) => props.theme.colours.white};
  box-shadow: 0 0 3px 1px hsl(0,0%,80%);
  
  ${(props) => props.hidden && css`
    bottom: -50px;
  `}
`;

export default function EditInfo() {
  const inEditMode = useSelector((state: RootState) => state.system.inEditMode);
  return (
    <Container hidden={!inEditMode}>
      <span>Select a tile</span>
    </Container>
  );
}
