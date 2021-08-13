import React from 'react';
import styled from 'styled-components';
import a01 from 'assets/images/1.png';
import a02 from 'assets/images/2.png';
import a03 from 'assets/images/3.png';
import a04 from 'assets/images/4.png';
import a05 from 'assets/images/5.png';
import a06 from 'assets/images/6.png';
import a07 from 'assets/images/7.png';
import a08 from 'assets/images/8.png';
import a09 from 'assets/images/9.png';
import a10 from 'assets/images/10.png';
import a11 from 'assets/images/11.png';
import a12 from 'assets/images/12.png';
import BaseContainer from './components/base-container/BaseContainer';
import PreviewTile from './components/preview-tile/PreviewTile';

const TileContainer = styled.section`
  column-count: 5;
  column-gap: ${(props) => props.theme.outerSpacing.small};
  line-height: 0;
  
  @media screen and (max-width: 1440px) {
    column-count: 4;
  }
  
  @media screen and (max-width: 1280px) {
    column-count: 3;
  }
  
  @media screen and (max-width: 960px) {
    column-count: 2;
  }
  
  @media screen and (max-width: 720px) {
    column-count: 1;
  }
`;

export default function Dashboard() {
  return (
    <BaseContainer>
      <h1>Kitchen</h1>
      <TileContainer>
        <PreviewTile src={a01} />
        <PreviewTile src={a02} />
        <PreviewTile src={a03} />
        <PreviewTile src={a04} />
        <PreviewTile src={a05} />
        <PreviewTile src={a06} />
        <PreviewTile src={a07} />
        <PreviewTile src={a08} />
        <PreviewTile src={a09} />
        <PreviewTile src={a10} />
        <PreviewTile src={a11} />
        <PreviewTile src={a12} />
      </TileContainer>
    </BaseContainer>
  );
}
