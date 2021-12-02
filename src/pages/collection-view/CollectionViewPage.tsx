import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import systemStore from 'store/system/system-store';
import { RootState } from 'store';
import imagesStore from 'store/images/images-store';
import BaseContainer from '../components/base-container/BaseContainer';
import PreviewTile from '../components/preview-tile/PreviewTile';
import BreadCrumbs from '../components/bread-crumbs/BreadCrumbs';
import PageTitle from '../components/page-title/PageTitle';
import EditInfo from './components/edit-info/EditInfo';
import FileDropListener from '../../hoc/file-drop-listener/FileDropListener';
import { useRoute } from '../../hooks';

const TileContainer = styled.section`
  column-count: 4;
  column-gap: ${(props) => props.theme.outerSpacing.small};
  line-height: 0;

  @media screen and (max-width: 1440px) {
    column-count: 3;
  }

  @media screen and (max-width: 1024px) {
    column-count: 2;
  }

  @media screen and (max-width: 800px) {
    column-count: 1;
  }
`;

export default function CollectionViewPage() {
  const location = useLocation();
  const images = useSelector((state: RootState) => state.images.currentImages);
  const [ready, setReady] = useState(false);
  const dispatch = useDispatch();
  const { projectUid, collectionUid, focusUid } = useRoute();

  useEffect(() => {
    dispatch(systemStore.actions.changeActiveProject(projectUid));
    setReady(true);
  }, []);

  useEffect(() => {
    dispatch(imagesStore.actions.fetchImages({
      projectUid,
      locationUid: focusUid || collectionUid,
    }));
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
          {Object.values(images).map((v) => <PreviewTile key={v.uid} id={v.uid} />)}
        </TileContainer>
        <EditInfo />
      </FileDropListener>
    </BaseContainer>
  );
}
