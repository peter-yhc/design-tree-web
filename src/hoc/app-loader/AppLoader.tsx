import React, { PropsWithChildren, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import profileStore from 'store/profile/profile-store';
import { useAppSelector } from 'store';
import LoadingIndicator from '../../assets/LoadingIndicator';

export default function AppLoader({ children }: PropsWithChildren<{}>) {
  const ready = useAppSelector((state) => state.system.ready);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(profileStore.actions.fetchProfile());
  }, []);

  return (
    <>{ ready ? children : <LoadingIndicator />}</>
  );
}
