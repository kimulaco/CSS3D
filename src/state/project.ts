import { atom, useRecoilState } from 'recoil'
import { Project, ProjectObject } from '../types/project'

const ATOM_KEY = 'project'
const PROJECT_ID_STORAGE_KEY = 'CSS3D_PROJECT_ID'
const PROJECT_STORAGE_PREFIX = 'CSS3D_PROJECT_'

const DEFAULT_PROJECT_OBJECT: ProjectObject = {
  objectId: 'default-object-1',
  bg: '#a0aec0',
  borderColor: '#718096',
  width: 100,
  height: 100,
  depth: 100,
  rotateX: -20,
  rotateY: -20,
}

const DEFAULT_PROJECT: Project = {
  id: 'default-project-1',
  createdAt: new Date().getTime(),
  perspective: 1000,
  objects: [DEFAULT_PROJECT_OBJECT],
}

const getDefaultProject = (): Project => {
  const projectId = localStorage.getItem(PROJECT_ID_STORAGE_KEY)
  if (!projectId) {
    return DEFAULT_PROJECT
  }
  const project =  JSON.parse(
    localStorage.getItem(`${PROJECT_STORAGE_PREFIX}${projectId}`) || '{}',
  )
  if (!project || !project.id) {
    return DEFAULT_PROJECT
  }
  return project
}

export const projectState = atom<Project>({
  key: ATOM_KEY,
  default: getDefaultProject(),
})

export const useProject = () => {
  const [project, setProject] = useRecoilState<Project>(projectState);

  localStorage.setItem(PROJECT_ID_STORAGE_KEY, project.id)

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
        ...project,
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
        ...project,
        objects: projectObjects,
      }
    })
  }

  const getStorage = () => {
    const storage = localStorage.getItem(
      `${PROJECT_STORAGE_PREFIX}${project.id}`,
    )
    if (!storage) {
      return storage
    }
    return JSON.parse(storage)
  }

  const setStorage = () => {
    localStorage.setItem(
      `${PROJECT_STORAGE_PREFIX}${project.id}`, JSON.stringify(project),
    )
  }

  const removeStorage = () => {
    localStorage.removeItem(`${PROJECT_STORAGE_PREFIX}${project.id}`)
    localStorage.removeItem(PROJECT_ID_STORAGE_KEY)
  }

  const resetProject = (): Project => {
    removeStorage()
    const defaultProject = getDefaultProject()
    setProject(defaultProject)
    return defaultProject
  }

  return {
    project,
    resetProject,
    getObjectById,
    addObject,
    updateObject,
    getStorage,
    setStorage,
    removeStorage,
  }
}
