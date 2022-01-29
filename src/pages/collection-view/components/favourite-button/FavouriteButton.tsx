import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { HeartIcon } from '@heroicons/react/outline';
import { useDispatch, useSelector } from 'react-redux';
import { toggleImageFavourite } from 'store/images/images-store-requests';
import { useRoute } from 'hooks';
import { RootState } from 'store';

interface FavouriteCircleProps {
  $loading: boolean;
}

const FavouriteCircle = styled.button<FavouriteCircleProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  border-radius: 100%;
  padding: 2px;
  background-color: hsl(210, 15%, 95%, 0.5);
  cursor: pointer;

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
  opacity: 0.4;
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

const Text = styled.span`
  cursor: pointer;
  margin-left: ${(props) => props.theme.innerSpacing.small};
`;

interface FavouriteButtonProps extends React.HtmlHTMLAttributes<HTMLDivElement>{
  imageUid: string;
}

export default function FavouriteButton({ className, imageUid, children }: FavouriteButtonProps) {
  const dispatch = useDispatch();
  const [favInProgress, setFavInProgress] = useState(false);
  const { metadata } = useSelector((state: RootState) => state.images.currentImages[imageUid]);
  const { projectUid, locationUid } = useRoute();

  useEffect(() => {
    setFavInProgress(false);
  }, [metadata]);

  const favouriteHandler = () => {
    setFavInProgress(true);
    dispatch(toggleImageFavourite({ projectUid, locationUid, imageUid }));
  };

  return (
    <FavouriteCircle onClick={favouriteHandler} $loading={favInProgress} className={className}>
      <Favourite $highlight={metadata?.favourite || false} />
      {children && <Text>{children}</Text>}
    </FavouriteCircle>
  );
}
