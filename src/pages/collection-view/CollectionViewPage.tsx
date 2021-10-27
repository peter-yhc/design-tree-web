import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useRouteMatch } from 'react-router-dom';
import systemStore from 'store/system/system-store';
import { RootState } from 'store';
import imagesStore from 'store/images/images-store';
import BaseContainer from '../components/base-container/BaseContainer';
import PreviewTile from '../components/preview-tile/PreviewTile';
import BreadCrumbs from '../components/bread-crumbs/BreadCrumbs';
import PageTitle from '../components/page-title/PageTitle';
import EditInfo from './components/edit-info/EditInfo';
import FileDropListener from '../../hoc/file-drop-listener/FileDropListener';

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

interface MatchProps {
  project: string;
  collection: string;
  subcollection: string;
}

export default function CollectionViewPage() {
  const match = useRouteMatch<MatchProps>();
  const location = useLocation();
  const images = useSelector((state: RootState) => state.images.currentImages);
  const [ready, setReady] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(systemStore.actions.changeActiveProject(match.params.project));
    setReady(true);
  }, []);

  useEffect(() => {
    dispatch(imagesStore.actions.fetchImages(location.pathname));
  }, [location]);

  if (!ready) {
    return <></>;
  }

  return (
    <BaseContainer>
      <FileDropListener>
        <BreadCrumbs />
        <PageTitle />
        <TileContainer>
          {
          Object.values(images).map((v) => <PreviewTile key={v.hash} id={v.hash} />)
        }
        </TileContainer>
        <EditInfo />
      </FileDropListener>
    </BaseContainer>
  );
}
