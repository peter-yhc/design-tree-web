import React from 'react';
import styled, { css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import imagesStore from 'store/images/images-store';

interface ImageProps {
  disabled: boolean;
  selected: boolean;
}

const Image = styled.img<ImageProps>`
  width: 100%;
  height: auto;
  margin-bottom: ${(props) => props.theme.outerSpacing.small};
  cursor: pointer;
  
  ${(props) => props.disabled && css`
    pointer-events: none;
    cursor: default;
  `}
  
  ${(props) => props.selected && css`
    box-shadow: 0 0 0 3px ${props.theme.colours.primary};
  `}
`;

interface PreviewTileProps {
  id: string;
}

export default function PreviewTile({ id }: PreviewTileProps) {
  const src = useSelector((state: RootState) => state.images.currentImages[id].src);
  const selected: boolean = useSelector((state: RootState) => state.images.selectedImages.includes(id));
  const inEditMode: boolean = useSelector((state: RootState) => state.system.inEditMode);
  const dispatch = useDispatch();

  const selectHandler = () => {
    dispatch(imagesStore.actions.toggleSelectedImage(id));
  };

  return (
    <Image src={src} alt="rectangle" disabled={!inEditMode} selected={selected} onClick={selectHandler} />
  );
}
