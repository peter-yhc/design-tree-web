import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import systemStore from 'store/system/system-store';
import { RootState, useAppSelector } from 'store';
import imagesStore from 'store/images/images-store';
import BaseContainer from '../components/base-container/BaseContainer';
import ImageTile from './components/image-tile/ImageTile';
import BreadCrumbs from '../components/bread-crumbs/BreadCrumbs';
import PageTitle from '../components/page-title/PageTitle';
import EditInfo from './components/edit-info/EditInfo';
import FileDropListener from '../../hoc/file-drop-listener/FileDropListener';
import { useAttachModalEscape, useRoute } from '../../hooks';
import PreviewCarousel from './components/preview-carousel/PreviewCarousel';
import imageStore from '../../store/images/images-store';

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
  const currentPreviewUid = useAppSelector((state) => state.images.currentPreviewUid);

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
          {Object.values(images).map((v) => <ImageTile key={v.uid} imageUid={v.uid} />)}
        </TileContainer>
        <EditInfo />
      </FileDropListener>
      {currentPreviewUid && <PreviewCarousel />}
    </BaseContainer>
  );
}
