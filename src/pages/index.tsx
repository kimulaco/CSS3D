import React from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { Stage } from '../components/parts/Stage'
import { Cube } from '../components/parts/Cube'
import { ZoomController } from '../components/ui/ZoomController'
import { ObjectMenu } from '../components/ui/ObjectMenu'
import { ObjectController } from '../components/ui/ObjectController'
import { useProject } from '../state/project'
import { ProjectObject } from '../types/project'

const rightWidth = 240

const PageHome: React.FC = () => {
  const {
    project,
    updateProject,
    resetProject,
    addObject,
    updateObject,
  } = useProject({
    useStorage: true,
  })

  const handleChangeObject = (
    objectId: ProjectObject['objectId'],
    updatedObject: ProjectObject,
  ) => {
    updateObject(objectId, updatedObject)
  }

  const handleClickAddObject = () => {
    addObject()
  }

  const handleClickObjectReset = () => {
    resetProject(project.id)
  }

  return (
    <Flex w={'100%'} bg={'gray.800'}>
      <Box
        w={`calc(100% - ${rightWidth}px)`}
        position={'relative'}
      >
        <Stage
          zoom={project.zoom}
          perspective={project.perspective}
          size={1000}
        >
          {project.objects.map((object: ProjectObject) => {
            return (
              <Cube
                key={`object-${object.uid}`}
                object={object}
                onChangeRotate={handleChangeObject}
              />
            )
          })}
        </Stage>

        <ObjectMenu
          chakra={{
            position: 'absolute',
            top: '4',
            left: '4',
            zIndex: '0',
          }}
          onClickAddObject={handleClickAddObject}
          onClickReset={handleClickObjectReset}
        />

        <ZoomController
          value={project.zoom}
          chakra={{
            position: 'absolute',
            bottom: '4',
            left: '4',
            zIndex: '0',
          }}
          onChange={(zoomValue) => {
            updateProject({ zoom: zoomValue })
          }}
        />
      </Box>

      <Box
        color={'white'}
        w={`${rightWidth}px`}
        h={'100%'}
        bg="gray.800"
        overflow={'auto'}
        position={'relative'}
        zIndex={'0'}
      >
        <ObjectController
          objects={project.objects}
          onChange={handleChangeObject}
        />
      </Box>
    </Flex>
  )
}

export default PageHome
