import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import systemStore from 'store/system/system-store';
import { RootState, useAppSelector } from 'store';
import imagesStore from 'store/images/images-store';
import theme from 'theme';
import BaseContainer from '../components/base-container/BaseContainer';
import ImageTile from './components/image-tile/ImageTile';
import BreadCrumbs from '../components/bread-crumbs/BreadCrumbs';
import PageTitle from '../components/page-title/PageTitle';
import EditImageInfo from './components/edit-images/EditImageInfo';
import FileDropListener from '../../hoc/file-drop-listener/FileDropListener';
import { useRoute } from '../../hooks';
import PreviewCarousel from './components/preview-carousel/PreviewCarousel';
import EditImageToolbar from './components/edit-images/EditImageToolbar';

interface TileContainerProps {
  fixedMode: boolean;
}

const TileContainer = styled.section<TileContainerProps>`
  column-count: 4;
  column-gap: ${(props) => props.theme.outerSpacing.small};
  line-height: 0;
  
  ${(props) => props.fixedMode && css`
    margin-top: 4.2rem;
  `};

  @media screen and (max-width: 1920px) {
    column-count: 3;
  }

  @media screen and (max-width: 1366px) {
    column-count: 2;
  }

  @media screen and (max-width: 1024px) {
    column-count: 1;
  }
`;

interface PageHeaderProps {
  fixedMode: boolean;
}

const PageHeader = styled.section<PageHeaderProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${(props) => props.theme.innerSpacing.medium} 0;
  
  ${(props) => props.fixedMode && css`
    position: fixed;
    top: 0;
    right: ${props.theme.innerSpacing.large};
    left: calc(${props.theme.system.sideNavWidth} + ${props.theme.innerSpacing.large});
    background-color: ${props.theme.colours.lightGrey};
    border-bottom: 3px solid ${props.theme.colours.black};
    z-index: ${props.theme.system.zIndex.pageHeaderFixMode};
  `}
`;

const ActionsContainer = styled.div`
  
`;

export default function CollectionViewPage() {
  const location = useLocation();
  const images = useSelector((state: RootState) => state.images.currentImages);
  const [ready, setReady] = useState(false);
  const dispatch = useDispatch();
  const { projectUid, locationUid } = useRoute();
  const currentPreviewUid = useAppSelector((state) => state.images.currentPreviewUid);
  const [fixedMode, setFixedMode] = useState(false);

  const scrollListener = () => {
    if (window.pageYOffset > theme.system.editDialogFloatHeight) {
      setFixedMode(true);
    } else {
      setFixedMode(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  }, []);

  useEffect(() => {
    dispatch(systemStore.actions.changeActiveProject(projectUid));
    setReady(true);
  }, []);

  useEffect(() => {
    dispatch(imagesStore.actions.fetchImages({ projectUid, locationUid }));
  }, [location]);

  if (!ready) {
    return <></>;
  }

  return (
    <BaseContainer>
      <FileDropListener>
        <BreadCrumbs />
        <PageHeader fixedMode={fixedMode}>
          <PageTitle />
          <ActionsContainer>
            <EditImageToolbar />
          </ActionsContainer>
        </PageHeader>
        <TileContainer fixedMode={fixedMode}>
          {Object.values(images).map((v) => <ImageTile key={v.uid} imageUid={v.uid} />)}
        </TileContainer>
        <EditImageInfo />
      </FileDropListener>
      {currentPreviewUid && <PreviewCarousel />}
    </BaseContainer>
  );
}
