import React, { useEffect } from 'react';
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
`;

const Image = styled.img`
  width: 100%;
  aspect-ratio: 3/2;
  max-width: 75vw;
`;

const ActionContainer = styled.section`
  background-color: red;
`;

const NavButton = styled.button`
  border: 0;
  padding: 0;
  
  &:hover {
    background-color: ${(props) => props.theme.colours.grey};
  }
`;

export default function PreviewCarousel() {
  const dispatch = useDispatch();
  const imageSrc = useAppSelector((state) => state.images.currentPreviewUid && state.images.currentImages[state.images.currentPreviewUid].src);
  useAttachModalEscape(() => dispatch(imageStore.actions.clearPreview()));

  useEffect(() => {
    const keyListener = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        dispatch(imageStore.actions.selectPreviousImage());
      } else if (e.key === 'ArrowRight') {
        dispatch(imageStore.actions.selectNextImage());
      }
    };

    window.addEventListener('keydown', keyListener);
    return () => {
      window.removeEventListener('keydown', keyListener);
    };
  }, []);

  return (
    <CarouselContainer>
      <ArticleBody>
        <NavButton onClick={() => dispatch(imageStore.actions.selectPreviousImage())}>
          <ChevronLeftIcon width="3rem" />
        </NavButton>
        <Image src={imageSrc} alt="Preview" />
        <NavButton onClick={() => dispatch(imageStore.actions.selectNextImage())}>
          <ChevronRightIcon width="3rem" />
        </NavButton>
      </ArticleBody>
      <footer>
        <ActionContainer />
      </footer>
    </CarouselContainer>
  );
}
