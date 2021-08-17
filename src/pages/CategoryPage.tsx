import React, { useEffect, useState } from 'react';
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
import { Type } from 'typescript';
import { useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import systemStore from 'store/system/system-store';
import BaseContainer from './components/base-container/BaseContainer';
import PreviewTile from './components/preview-tile/PreviewTile';
import BreadCrumbs from './components/bread-crumbs/BreadCrumbs';
import PageTitle from './components/page-title/PageTitle';

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

function shuffleArray(array: Array<Type>) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    // eslint-disable-next-line no-param-reassign
    array[i] = array[j];
    // eslint-disable-next-line no-param-reassign
    array[j] = temp;
  }
}

interface MatchProps {
  project: string;
  category: string;
  subcategory: string;
}

export default function CategoryPage() {
  const match = useRouteMatch<MatchProps>();
  const [ready, setReady] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(systemStore.actions.changeActiveProject(match.params.project));
    setReady(true);
  }, []);

  if (!ready) {
    return '';
  }

  const images = [a01, a02, a03, a04, a05, a06, a07, a08, a09, a10, a11, a12];
  shuffleArray([...images, ...images]);
  const randomImages = images.splice(0, Math.floor(Math.random() * (images.length + 1)));
  return (
    <BaseContainer>
      <BreadCrumbs />
      <PageTitle />
      <TileContainer>
        {
          randomImages.map((i) => <PreviewTile src={i} />)
        }
      </TileContainer>
    </BaseContainer>
  );
}
