/* eslint-disable import/prefer-default-export */
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export function useProject() {
  const activeProjectId = useSelector((state: RootState) => state.system.activeProjectId) as string;
  const { projectName, categories } = useSelector((state: RootState) => ({
    projectName: state.profile.projects[activeProjectId].name,
    categories: state.profile.projects[activeProjectId].categories,
  }));

  return {
    projectId: activeProjectId,
    projectName,
    projectCategories: categories,
  };
}
