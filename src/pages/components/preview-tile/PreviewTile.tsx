import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import imagesStore from 'store/images/images-store';
import { HeartIcon } from '@heroicons/react/outline';
import ErrorImage from 'assets/images/Error.png';

const Container = styled.div`
  display: inline-block;
  margin-bottom: ${(props) => props.theme.outerSpacing.tiny};
  position: relative;
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
