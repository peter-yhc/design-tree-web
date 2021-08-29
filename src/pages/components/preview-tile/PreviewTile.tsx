import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

const Image = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: ${(props) => props.theme.outerSpacing.small};
`;

interface PreviewTileProps {
  id: string;
}

export default function PreviewTile({ id }: PreviewTileProps) {
  const src = useSelector((state: RootState) => state.images.currentImages[id].src);
  return (
    <Image src={src} alt="rectangle" />
  );
}
