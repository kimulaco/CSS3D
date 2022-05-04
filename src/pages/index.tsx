import React, { useState } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { Stage } from '../components/parts/Stage'
import { Cube } from '../components/parts/Cube'
import { ZoomController } from '../components/ui/ZoomController'
import { ObjectMenu } from '../components/ui/ObjectMenu'
import { ObjectMonitor } from '../components/ui/ObjectMonitor'
import { useProject } from '../state/project'
import { ProjectObject } from '../types/project'

const rightWidth = 240

const PageHome: React.FC = () => {
  const {
    project,
    resetProject,
    updateObject,
    setStorage,
  } = useProject()
  const [zoom, setZoom] = useState<number>(100)
  const [
    selectedObject,
    setSelectedObject,
  ] = useState<ProjectObject | undefined>(project.objects[0])

  const handleChangeObject = (updatedObject: ProjectObject) => {
    updateObject(updatedObject)
    if (updatedObject.objectId === selectedObject?.objectId) {
      setSelectedObject(updatedObject)
    }
    setStorage()
  }

  const handleClickObjectReset = () => {
    const defaultProject = resetProject()
    setSelectedObject(defaultProject.objects[0])
  }

  return (
    <Flex w={'100%'} bg={'gray.800'}>
      <Box
        w={`calc(100% - ${rightWidth}px)`}
        position={'relative'}
      >
        <Stage
          zoom={zoom}
          perspective={project.perspective}
          size={1000}
        >
          {project.objects.map((object: ProjectObject) => {
            return (
              <Cube
                key={`object-${object.objectId}`}
                createdAt={project.createdAt}
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
          onClickReset={handleClickObjectReset}
        />

        <ZoomController
          value={zoom}
          chakra={{
            position: 'absolute',
            bottom: '4',
            left: '4',
            zIndex: '0',
          }}
          onChange={setZoom}
        />
      </Box>

      <ObjectMonitor
        selectedObject={selectedObject}
        chakra={{
          w: `${rightWidth}px`,
          h: '100%',
        }}
        onChange={handleChangeObject}
      />
    </Flex>
  )
}

export default PageHome
