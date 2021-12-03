import React from 'react';
import styled from 'styled-components';
import { useAttachModalEscape } from 'hooks';
import imageStore from 'store/images/images-store';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'store';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/solid';

const CarouselContainer = styled.article`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${(props) => props.theme.colours.lightGrey};
  border: 1px solid ${(props) => props.theme.colours.grey};
  box-shadow: ${(props) => props.theme.system.boxShadow};
  padding: ${(props) => props.theme.innerSpacing.large} 0;
`;

const ArticleBody = styled.section`
  display: flex;
  align-items: center;
`;

const Image = styled.img`
  width: 100%;
  aspect-ratio: 3/2;
  max-width: 75vw;
`;

const ActionContainer = styled.section`
  background-color: red;
`;

export default function PreviewCarousel() {
  const dispatch = useDispatch();
  const imageSrc = useAppSelector((state) => state.images.currentPreviewUid && state.images.currentImages[state.images.currentPreviewUid].src);
  useAttachModalEscape(() => dispatch(imageStore.actions.clearPreview()));

  return (
    <CarouselContainer>
      <ArticleBody>
        <ChevronLeftIcon width="3rem" />
        <Image src={imageSrc} alt="Preview" />
        <ChevronRightIcon width="3rem" />
      </ArticleBody>
      <footer>
        <ActionContainer />
      </footer>
    </CarouselContainer>
  );
}
