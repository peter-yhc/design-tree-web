import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useAttachModalEscape } from 'hooks';
import imageStore from 'store/images/images-store';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'store';
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from '@heroicons/react/solid';
import { TrashIcon } from '@heroicons/react/outline';
import FavouriteButton from '../favourite-button/FavouriteButton';
import ImageCommentator from '../image-commentator/ImageCommentator';

const CarouselContainer = styled.article`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${(props) => props.theme.colours.lightGrey};
  box-shadow: ${(props) => props.theme.system.boxShadow};

  display: grid;
  grid-template-columns: 2.5rem 60vw 2.5rem 13rem 2rem;
  grid-template-rows: auto;
  grid-template-areas:
    "left image right actions actions";
`;

const Image = styled.img`
  grid-area: image;
  max-height: 100%;
  max-width: 100%;
  align-self: center;
  justify-self: center;
`;

const ActionContainer = styled.section`
  grid-area: actions;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 4rem 2.5rem 4rem 0;
`;

const NavButton = styled.button`
  border: 0;
  padding: 0;

  &:hover {
    background-color: ${(props) => props.theme.colours.grey};
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  height: 2.5rem;
  width: 2.5rem;
  border: 0;
  border-radius: 50%;
  display: flex;
  align-content: center;
  justify-content: center;

  &:hover {
    background-color: ${(props) => props.theme.colours.grey};
  }
`;

const DeleteButton = styled.button`
  position: absolute;
  bottom: 4rem;
  display: flex;
  align-items: center;
  border: 0;
  cursor: pointer;

  & > span {
    margin-left: ${(props) => props.theme.innerSpacing.small};
  }
`;

export default function PreviewCarousel() {
  const dispatch = useDispatch();
  useAttachModalEscape(() => dispatch(imageStore.actions.clearPreview()));
  // @ts-ignore
  const { src, uid } = useAppSelector((state) => state.images.currentPreviewUid && state.images.currentImages[state.images.currentPreviewUid]);

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
      <CloseButton onClick={() => dispatch(imageStore.actions.clearPreview())}>
        <XIcon />
      </CloseButton>
      <NavButton style={{ gridArea: 'left' }} onClick={() => dispatch(imageStore.actions.selectPreviousImage())}>
        <ChevronLeftIcon />
      </NavButton>
      <Image src={src} alt="Preview" />
      <NavButton style={{ gridArea: 'right' }} onClick={() => dispatch(imageStore.actions.selectNextImage())}>
        <ChevronRightIcon />
      </NavButton>
      <ActionContainer>
        <FavouriteButton imageUid={uid}>Favourite</FavouriteButton>
        <ImageCommentator imageUid={uid} />
        <DeleteButton>
          <TrashIcon width={20} />
          <span>Delete</span>
        </DeleteButton>
      </ActionContainer>
    </CarouselContainer>
  );
}
