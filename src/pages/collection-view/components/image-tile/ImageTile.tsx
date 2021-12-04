import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import imagesStore from 'store/images/images-store';
import ErrorImage from 'assets/images/Error.png';
import Loading from 'assets/images/Loading.svg';
import FavouriteButton from '../favourite-button/FavouriteButton';

const Container = styled.div`
  display: inline-block;
  margin-bottom: ${(props) => props.theme.outerSpacing.tiny};
  position: relative;
`;

const PendingActionContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${(props) => props.theme.colours.grey};
  opacity: 0.7;
`;

const ImageContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const LoadingImage = styled.img`
  animation: ${spin} 700ms infinite linear;
`;

interface ImageProps {
  selected: boolean;
}

const Image = styled.img<ImageProps>`
  width: 100%;
  height: auto;
  cursor: pointer;

  ${(props) => props.selected && css`
    box-shadow: 0 0 0 3px ${props.theme.colours.primary};
  `}
`;

const StyledFavouriteButton = styled(FavouriteButton)`
  position: absolute;
  right: 5px;
  bottom: 5px;
  width: 30px;
  height: 30px;
`;

interface ImageTileProps {
  imageUid: string;
}

export default function ImageTile({ imageUid }: ImageTileProps) {
  const { src } = useSelector((state: RootState) => state.images.currentImages[imageUid]);
  const selected: boolean = useSelector((state: RootState) => state.images.selectedImages.includes(imageUid));
  const hasPendingAction: boolean = useSelector((state: RootState) => state.images.pendingImages.includes(imageUid));
  const inEditMode: boolean = useSelector((state: RootState) => state.system.inEditMode);
  const dispatch = useDispatch();

  const selectHandler = () => {
    if (inEditMode) {
      dispatch(imagesStore.actions.toggleSelectedImage(imageUid));
    } else {
      dispatch(imagesStore.actions.selectPreview(imageUid));
    }
  };

  return (
    <Container>
      {
        hasPendingAction && (
          <PendingActionContainer>
            <ImageContainer>
              <LoadingImage alt="" src={Loading} />
            </ImageContainer>
          </PendingActionContainer>
        )
      }
      <Image
        src={src}
        alt=""
        selected={selected}
        onClick={selectHandler}
        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
          (e.target as HTMLInputElement).src = ErrorImage;
        }}
      />
      <StyledFavouriteButton imageUid={imageUid} />
    </Container>
  );
}
