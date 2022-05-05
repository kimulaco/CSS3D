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
const OBJECT_ID_PREFIX = 'object-'

const DEFAULT_PROJECT_OBJECT: ProjectObject = {
  objectId: `${OBJECT_ID_PREFIX}1`,
  bg: '#a0aec0',
  borderColor: '#718096',
  width: 100,
  height: 100,
  depth: 100,
  rotateX: -20,
  rotateY: -20,
  translateX: 0,
  translateY: 0,
  translateZ: 0,
}

const DEFAULT_PROJECT: Project = {
  id: 'project-1',
  createdAt: new Date().getTime(),
  perspective: 1000,
  zoom: 100,
  objects: [DEFAULT_PROJECT_OBJECT],
  objectCount: 1,
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

type UseProjectTypes = {
  useStorage?: boolean
}

export const useProject = (props: UseProjectTypes) => {
  const [project, setProject] = useRecoilState<Project>(projectState);

  const updateProject = (projectPartials: Partial<Project>) => {
    setProject((_project: Project) => {
      return {
        ..._project,
        ...projectPartials,
      }
    })
  }

  const createObject = (): ProjectObject => {
    const { objectCount } = project
    return {
      ...DEFAULT_PROJECT_OBJECT,
      objectId: `${OBJECT_ID_PREFIX}${objectCount + 1}`,
    }
  }

  const addObject = () => {
    const newObject = createObject()
    updateProject({ objectCount: project.objectCount + 1 })
    setProject((project: Project) => {
      return {
        ...project,
        objects: [
          ...project.objects,
          newObject,
        ],
      }
    })
  }

  const updateObject = (updatedObject: ProjectObject) => {
    let isUpdatedObject = false

    const objects: ProjectObject[] = project.objects.map(
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

    updateProject({ objects })
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
    updateProject,
    createObject,
    addObject,
    updateObject,
    selectProject,
    saveProject,
    removeProject,
    removeStorage,
    resetProject,
  }
}
