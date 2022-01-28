import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

const Container = styled.section`
  position: fixed;
  bottom: ${(props) => props.theme.outerSpacing.medium};
  left: calc((100vw + ${(props) => props.theme.system.sideNavWidth}) / 2);
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  padding: 0.4em 0.75em;
  border-radius: 4px;
  background-color: ${(props) => props.theme.colours.white};
  border: 1px solid ${(props) => props.theme.colours.grey};
`;

export default function EditImageInfo() {
  const inEditMode = useSelector((state: RootState) => state.system.inEditMode);
  const numberTilesSelected = useSelector((state: RootState) => state.images.selectedImages.length);
  const [memoNumTiles, setMemoNumTimes] = useState(numberTilesSelected);

  useEffect(() => {
    if (inEditMode) {
      setMemoNumTimes(numberTilesSelected);
    }
  }, [numberTilesSelected, inEditMode]);

  if (inEditMode) {
    return (
      <Container>
        <span>
          {memoNumTiles > 0 ? `${memoNumTiles} images selected` : 'Select an image'}
        </span>
      </Container>
    );
  }

  return <></>;
}
