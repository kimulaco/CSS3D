import { atom, useRecoilState } from 'recoil'
import { Project, ProjectObject } from '../types/project'

const ATOM_KEY = 'project'

export const projectState = atom<Project>({
  key: ATOM_KEY,
  default: {
    objects: [],
  },
})

export const useProject = () => {
  const [project, setProject] = useRecoilState<Project>(projectState);

  const addObject = (newProject: ProjectObject) => {
    setProject((project: Project) => {
      return {
        objects: [
          ...project.objects,
          newProject,
        ],
      }
    })
  }

  return {
    project,
    addObject,
  }
}
