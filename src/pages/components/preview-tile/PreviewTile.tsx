import React from 'react';
import styled from 'styled-components';

const Image = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: ${(props) => props.theme.outerSpacing.small};
`;

interface PreviewTileProps {
  src: string;
}

export default function PreviewTile({ src }: PreviewTileProps) {
  return (
    <Image src={src} alt="rectangle" />
  );
}
