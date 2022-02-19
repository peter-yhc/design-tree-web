/* eslint-disable import/prefer-default-export */
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useLayoutEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import systemStore from 'store/system/system-store';
import { RootState, useAppSelector } from '../store';

export function useProject() {
  const activeProjectId = useSelector((state: RootState) => state.system.activeProjectId) as string;
  const { projectName, collections } = useSelector((state: RootState) => ({
    projectName: state.profile.projects[activeProjectId]?.name,
    collections: state.profile.projects[activeProjectId]?.collections,
  }));

  return {
    projectId: activeProjectId,
    projectName,
    projectCategories: collections,
  };
}

interface MatchProps {
  project: string;
  collection: string;
  focus: string;
}

export function useRoute() {
  const match = useRouteMatch<MatchProps>();

  return {
    projectUid: match.params.project,
    collectionUid: match.params.collection,
    focusUid: match.params.focus,
    locationUid: match.params.focus || match.params.collection,
  };
}

export function useAttachModalEscape(cb: () => void) {
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        cb();
      }
    };
    window.addEventListener('keydown', listener);
    return () => {
      window.removeEventListener('keydown', listener);
    };
  }, []);
}

export function useRegisterGlobalScrollHook() {
  const scrollDisabled = useAppSelector((state) => state.system.globalDisableScroll);

  useEffect(() => {
    const app = document.getElementById('app');
    if (app) {
      app.style.position = scrollDisabled ? 'fixed' : 'relative';
    }
  }, [scrollDisabled]);
}

export function useRegisterResponsiveListener() {
  const dispatch = useDispatch();
  const isResponsive = useAppSelector((state) => state.system.responsiveMode);

  useEffect(() => {
    dispatch(systemStore.actions.setResponsiveMode(window.innerWidth <= 810));
  }, []);

  useLayoutEffect(() => {
    const resizeListener = () => {
      if (window.innerWidth <= 810 !== isResponsive) {
        dispatch(systemStore.actions.setResponsiveMode(window.innerWidth <= 810));
      }
    };
    window.addEventListener('resize', resizeListener);
    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, [isResponsive]);
}
