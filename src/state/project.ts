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

  const getObjectById = (
    objectId: ProjectObject['objectId'],
  ): ProjectObject | undefined => {
    for (const object of project.objects) {
      if (object.objectId === objectId) {
        return object
      }
    }
    return undefined
  }

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

  const updateObject = (updatedObject: ProjectObject) => {
    let isUpdatedObject = false

    const projectObjects: ProjectObject[] = project.objects.map(
      (object: ProjectObject) => {
        if (object.objectId === updatedObject.objectId) {
          isUpdatedObject = true
          return updatedObject
        }
        return object
      }
    )

    if (!isUpdatedObject) {
      return
    }

    setProject((project: Project) => {
      return {
        objects: projectObjects,
      }
    })
  }

  return {
    project,
    getObjectById,
    addObject,
    updateObject,
  }
}
