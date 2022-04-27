import React, { useState, useEffect } from 'react'
import { Box, Flex, IconButton } from '@chakra-ui/react'
import { AiOutlineSave } from 'react-icons/ai'
import { Stage } from '../components/parts/Stage'
import { Cube } from '../components/parts/Cube'
import { ZoomController } from '../components/ui/ZoomController'
import { ObjectMonitor } from '../components/ui/ObjectMonitor'
import { useProject } from '../state/project'
import { ProjectObject } from '../types/project'

const PageHome: React.FC = () => {
  const { project, updateObject, setStorage } = useProject()
  const [zoom, setZoom] = useState<number>(100)
  const [
    selectedObject,
    setSelectedObject,
  ] = useState<ProjectObject | undefined>(undefined)

  const handleChangeObject = (updatedObject: ProjectObject) => {
    updateObject(updatedObject)
    if (updatedObject.objectId === selectedObject?.objectId) {
      setSelectedObject(updatedObject)
    }
  }

  useEffect(() => {
    if (project.objects.length > 0) {
      setSelectedObject(project.objects[0])
    }
  }, [])

  return (
    <Flex>
      <Box position={'relative'}>
        <Stage
          zoom={zoom}
          size={1000}
          chakra={{
            w: '50vw',
            maxW: '500px',
            h: '50vw',
            maxH: '500px',
          }}
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
          onClick={setStorage}
        />

        <ZoomController
          value={zoom}
          onChange={setZoom}
        />
      </Box>

      <ObjectMonitor
        selectedObject={selectedObject}
        chakra={{
          w: '50vw',
          maxW: '500px',
          h: '50vw',
          maxH: '500px',
        }}
        onChange={handleChangeObject}
      />
    </Flex>
  )
}

export default PageHome
