import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useAttachModalEscape } from 'hooks';
import imageStore from 'store/images/images-store';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'store';
import { ChevronRightIcon, ChevronLeftIcon, XIcon } from '@heroicons/react/solid';

const CarouselContainer = styled.article`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${(props) => props.theme.colours.lightGrey};
  border: 1px solid ${(props) => props.theme.colours.grey};
  box-shadow: ${(props) => props.theme.system.boxShadow};
  padding: 3rem 0;
  max-width: fit-content;
  max-height: fit-content;

  @media screen and (max-width: 1280px) {
    padding: 2.5rem 0;
  }
  @media screen and (max-width: 960px) {
    padding: 2rem 0;
  }
`;

const ArticleBody = styled.section`
  display: flex;
`;

const Image = styled.img`
  max-height: 75vh;
  max-width: 75vw;
`;

const ActionContainer = styled.section`
  background-color: red;
`;

const NavButton = styled.button`
  border: 0;
  padding: 0;
  width: 3rem;
  
  &:hover {
    background-color: ${(props) => props.theme.colours.grey};
  }

  @media screen and (max-width: 1280px) {
    width: 2.5rem;
  }
  @media screen and (max-width: 960px) {
    width: 2rem;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0.3rem;
  right: 0.3rem;
  border: 0;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  align-content: center;
  justify-content: center;
  
  &:hover {
    background-color: ${(props) => props.theme.colours.grey};
  }

  @media screen and (max-width: 1280px) {
    width: 2.2rem;
    height: 2.2rem;
  }

  @media screen and (max-width: 960px) {
    top: 0.1rem;
    right: 0.1rem;
    width: 1.9rem;
    height: 1.9rem;
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
      <CloseButton><XIcon /></CloseButton>
      <ArticleBody>
        <NavButton onClick={() => dispatch(imageStore.actions.selectPreviousImage())}>
          <ChevronLeftIcon />
        </NavButton>
        <Image src={imageSrc} alt="Preview" />
        <NavButton onClick={() => dispatch(imageStore.actions.selectNextImage())}>
          <ChevronRightIcon />
        </NavButton>
      </ArticleBody>
      <footer>
        <ActionContainer />
      </footer>
    </CarouselContainer>
  );
}
