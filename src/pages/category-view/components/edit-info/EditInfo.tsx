import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

interface ContainerProps {
  hidden: boolean
}

const Container = styled.section<ContainerProps>`
  position: fixed;
  bottom: ${(props) => props.theme.outerSpacing.medium};
  left: calc((100vw + ${(props) => props.theme.system.sideNavWidth}) / 2);
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  transition: bottom ${(props) => props.theme.system.editModeTimings};
  padding: 0.4em 0.75em;
  border: 1px solid ${(props) => props.theme.colours.white};
  border-radius: 4px;
  background-color: ${(props) => props.theme.colours.white};
  border: 1px solid ${(props) => props.theme.colours.grey};
  
  ${(props) => props.hidden && css`
    bottom: -50px;
  `}
`;

export default function EditInfo() {
  const inEditMode = useSelector((state: RootState) => state.system.inEditMode);
  const numberTilesSelected = useSelector((state: RootState) => state.images.selectedImages.length);
  const [memoNumTiles, setMemoNumTimes] = useState(numberTilesSelected);

  useEffect(() => {
    if (inEditMode) {
      setMemoNumTimes(numberTilesSelected);
    }
  }, [numberTilesSelected, inEditMode]);

  return (
    <Container hidden={!inEditMode}>
      <span>
        {
          memoNumTiles > 0
            ? `${memoNumTiles} images selected`
            : 'Select an image'
        }
      </span>
    </Container>
  );
}
