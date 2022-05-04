import { useMemo, useEffect } from 'react'
import { atom, useRecoilState } from 'recoil'
import { Project, ProjectObject } from '../types/project'

type SelectProjectTypes = (projectId: Project['id']) => void
type SaveProjectTypes = (projectId: Project['id'], newProject: Project) => void
type RemoveProjectTypes = (projectId: Project['id']) => void
type RemoveStorageProjectTypes = (projectId: Project['id']) => void
type ResetProjectTypes = (projectId: Project['id']) => Project

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

// const getProjectFromStorage = (
//   projectId: Project['id'],
// ): Project | undefined => {
//   const project = localStorage.getItem(
//     `${PROJECT_STORAGE_PREFIX}${projectId}`
//   )
//   if (!project) {
//     return undefined
//   }
//   return JSON.parse(project) as Project
// }

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

type UseProjectTypes = {
  useStorage?: boolean
}

export const useProject = (props: UseProjectTypes) => {
  const [project, setProject] = useRecoilState<Project>(projectState);

  // const addObject = (newObject: ProjectObject) => {
  //   setProject((project: Project) => {
  //     return {
  //       ...project,
  //       objects: [
  //         ...project.objects,
  //         newObject,
  //       ],
  //     }
  //   })
  // }

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

  const selectProject = useMemo<SelectProjectTypes>(() => {
    return (projectId) => {
      localStorage.setItem(PROJECT_ID_STORAGE_KEY, projectId)
    }
  }, [])

  const saveProject = useMemo<SaveProjectTypes>(() => {
    return (projectId, newProject) => {
      localStorage.setItem(
        `${PROJECT_STORAGE_PREFIX}${projectId}`, JSON.stringify(newProject),
      )
    }
  }, [])

  const removeProject = useMemo<RemoveProjectTypes>(() => {
    return (projectId) => {
      localStorage.removeItem(`${PROJECT_STORAGE_PREFIX}${projectId}`)
    }
  }, [])

  const removeStorage = useMemo<RemoveStorageProjectTypes>(() => {
    return (projectId) => {
      localStorage.removeItem(`${PROJECT_STORAGE_PREFIX}${projectId}`)
      localStorage.removeItem(PROJECT_ID_STORAGE_KEY)
    }
  }, [])

  const resetProject = useMemo<ResetProjectTypes>(() => {
    return (projectId) => {
      removeStorage(projectId)
      const defaultProject = getDefaultProject()
      setProject(defaultProject)
      return defaultProject
    }
  }, [removeStorage, setProject])

  useEffect(() => {
    selectProject(project.id)
  }, [
    selectProject,
    project.id,
  ])

  useEffect(() => {
    saveProject(project.id, project)
  }, [saveProject, project])

  return {
    project,
    resetProject,
    // addObject,
    updateObject,
    selectProject,
    saveProject,
    removeProject,
    removeStorage,
  }
}
