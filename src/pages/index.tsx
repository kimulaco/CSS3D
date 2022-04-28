import React, { useState } from 'react'
import { Box, Flex, IconButton, useToast } from '@chakra-ui/react'
import { AiOutlineSave } from 'react-icons/ai'
import { Stage } from '../components/parts/Stage'
import { Cube } from '../components/parts/Cube'
import { ZoomController } from '../components/ui/ZoomController'
import { ObjectMonitor } from '../components/ui/ObjectMonitor'
import { useProject } from '../state/project'
import { ProjectObject } from '../types/project'

const rightWidth = 200

const PageHome: React.FC = () => {
  const toast = useToast()
  const { project, updateObject, setStorage } = useProject()
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
  }

  const handleClickSaveButton = () => {
    setStorage()
    toast({
      description: 'Saved',
      status: 'success',
      position: 'top-right',
      duration: 3000,
      isClosable: true,
    })
  }

  return (
    <Flex minH={'100vh'} bg={'gray.900'}>
      <Box
        w={`calc(100% - ${rightWidth}px)`}
        h={'100vh'}
        position={'relative'}
      >
        <Stage
          zoom={zoom}
          size={1000}
        >
          {project.objects.map((object: ProjectObject) => {
            return (
              <Cube
                key={`object-${object.objectId}`}
                object={object}
                onChangeRotate={handleChangeObject}
              />
            )
          })}
        </Stage>

        <IconButton
          aria-label="Save Project"
          icon={<AiOutlineSave style={{
            width: '100%',
            height: '100%',
            fill: 'currentcolor',
          }} />}
          p={2}
          position={'absolute'}
          top={4}
          right={4}
          zIndex={'0'}
          onClick={handleClickSaveButton}
        />

        <ZoomController
          value={zoom}
          onChange={setZoom}
        />
      </Box>

      <ObjectMonitor
        selectedObject={selectedObject}
        chakra={{
          w: `${rightWidth}px`,
          h: '100%',
          maxH: '100vh',
        }}
        onChange={handleChangeObject}
      />
    </Flex>
  )
}

export default PageHome
