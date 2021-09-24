import React, { useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import imagesStore from 'store/images/images-store';
import { HeartIcon } from '@heroicons/react/outline';
import ErrorImage from 'assets/images/Error.png';
import Loading from 'assets/images/Loading.svg';

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
  disabled: boolean;
  selected: boolean;
}

const Image = styled.img<ImageProps>`
  width: 100%;
  height: auto;
  cursor: pointer;

  ${(props) => props.disabled && css`
    pointer-events: none;
    cursor: default;
  `}

  ${(props) => props.selected && css`
    box-shadow: 0 0 0 3px ${props.theme.colours.primary};
  `}
`;

interface FavouriteCircleProps {
  $loading: boolean;
}

const FavouriteCircle = styled.div<FavouriteCircleProps>`
  position: absolute;
  right: 5px;
  bottom: 5px;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  background-color: hsl(210, 15%, 95%, 0.2);


  ${(props) => props.$loading && css`
    cursor: none;
    pointer-events: none;
  `}
`;

interface FavouriteProps {
  $highlight: boolean;
}

const Favourite = styled(HeartIcon)<FavouriteProps>`
  width: 24px;
  fill: ${(props) => props.theme.colours.grey};
  stroke-width: 1.5px;
  opacity: 0.2;
  transition: all 80ms ease-in-out;

  &:active {
    transform: scale(0.9);
  }

  ${(props) => props.$highlight && css`
    stroke: ${props.theme.colours.black};
    fill: ${props.theme.colours.highlight};
    opacity: 1;
  `}
`;

interface PreviewTileProps {
  id: string;
}

export default function PreviewTile({ id }: PreviewTileProps) {
  const [loading, setLoading] = useState(false);
  const { src, metadata } = useSelector((state: RootState) => state.images.currentImages[id]);
  const selected: boolean = useSelector((state: RootState) => state.images.selectedImages.includes(id));
  const hasPendingAction: boolean = useSelector((state: RootState) => state.images.pendingImages.includes(id));
  const inEditMode: boolean = useSelector((state: RootState) => state.system.inEditMode);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(false);
  }, [metadata]);

  const selectHandler = () => {
    dispatch(imagesStore.actions.toggleSelectedImage(id));
  };

  const favouriteHandler = () => {
    setLoading(true);
    dispatch(imagesStore.actions.toggleImageFavourite(id));
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
        disabled={!inEditMode}
        selected={selected}
        onClick={selectHandler}
        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
          (e.target as HTMLInputElement).src = ErrorImage;
        }}
      />
      <FavouriteCircle onClick={favouriteHandler} $loading={loading}>
        <Favourite $highlight={metadata?.favourite || false} />
      </FavouriteCircle>
    </Container>
  );
}
