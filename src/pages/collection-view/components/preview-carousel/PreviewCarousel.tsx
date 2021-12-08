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

const CarouselContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  
  background-color: ${(props) => props.theme.colours.black};
`;

const Content = styled.article`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  
  display: grid;
  grid-template-columns: auto 20rem;
  background-color: ${(props) => props.theme.colours.lightGrey};
  
  @media screen and (max-width: 960px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto 10rem;
  }
`;

const Image = styled.img`
  max-height: 85vh;
  max-width: calc(85vw - 20rem);

  @media screen and (max-width: 960px) {
    max-width: 85vw;
  }
`;

const NavButton = styled.button`
  border: 0;
  width: 3rem;

  &:hover {
    background-color: hsl(204,4%,12%);
  }
  
  & > svg {
    fill: ${(props) => props.theme.colours.white};
  }
`;

const ActionContainer = styled.section`
  padding: ${(props) => props.theme.innerSpacing.xlarge};
  
  display: grid;
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
  grid-template-columns: auto;
  grid-template-rows: 2rem auto 2rem;
  grid-template-areas: "fav" "comment" "delete";

  @media screen and (max-width: 960px) {
    grid-template-columns: auto 8rem;
    grid-template-rows: 1fr 1fr;
    grid-template-areas: "comment fav" "comment delete";
  }
`;

const Favourite = styled(FavouriteButton)`
  grid-area: fav;
  display: flex;
  justify-content: flex-start;
`;

const Comments = styled(ImageCommentator)`
  grid-area: comment
`;

const DeleteButton = styled.button`
  grid-area: delete;
  border: 0;
  cursor: pointer;
  display: flex;
  align-items: center;

  & > span {
    margin-left: ${(props) => props.theme.innerSpacing.small};
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  height: 3rem;
  width: 3rem;
  border: 0;
  border-radius: 50%;
  display: flex;
  align-content: center;
  justify-content: center;

  &:hover {
    background-color: hsl(204,4%,12%);
  }

  & > svg {
    fill: ${(props) => props.theme.colours.white};
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
      <NavButton onClick={() => dispatch(imageStore.actions.selectPreviousImage())}>
        <ChevronLeftIcon />
      </NavButton>
      <Content>
        <Image src={src} alt="Preview" />
        <ActionContainer>
          <Favourite imageUid={uid}>Favourite</Favourite>
          <Comments imageUid={uid} />
          <DeleteButton>
            <TrashIcon width={20} />
            <span>Delete</span>
          </DeleteButton>
        </ActionContainer>
      </Content>
      <NavButton onClick={() => dispatch(imageStore.actions.selectNextImage())}>
        <ChevronRightIcon />
      </NavButton>
    </CarouselContainer>
  );
}
