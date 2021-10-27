/* eslint-disable import/prefer-default-export */
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export function useProject() {
  const activeProjectId = useSelector((state: RootState) => state.system.activeProjectId) as string;
  const { projectName, collections } = useSelector((state: RootState) => ({
    projectName: state.profile.projects[activeProjectId].name,
    collections: state.profile.projects[activeProjectId].collections,
  }));

  return {
    projectId: activeProjectId,
    projectName,
    projectCategories: collections,
  };
}
