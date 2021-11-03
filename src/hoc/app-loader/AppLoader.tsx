import React, { PropsWithChildren, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'store';
import LoadingIndicator from '../../assets/LoadingIndicator';
import { fetchProfile } from '../../store/profile/profile-store-requests';

export default function AppLoader({ children }: PropsWithChildren<{}>) {
  const ready = useAppSelector((state) => state.system.ready);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfile());
  }, []);

  return (
    <>{ ready ? children : <LoadingIndicator />}</>
  );
}
