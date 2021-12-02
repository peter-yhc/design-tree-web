/* eslint-disable import/prefer-default-export */
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { RootState } from '../store';

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
