import React, { useState } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { Stage } from '../components/parts/Stage'
import { Cube } from '../components/parts/Cube'
import { ZoomController } from '../components/ui/ZoomController'
import { ObjectMonitor } from '../components/ui/ObjectMonitor'
import { useProject } from '../state/project'
import { ProjectObject } from '../types/project'

const PageHome: React.FC = () => {
  const { project, addObject, updateObject } = useProject();
  const [zoom, setZoom] = useState<number>(100)
  const [
    selectedObject,
    setSelectedObject,
  ] = useState<ProjectObject | undefined>(undefined)

  if (project.objects.length <= 0) {
    const newObject: ProjectObject = {
      objectId: 'default-cube-1',
      width: 100,
      height: 100,
      depth: 100,
      rotateX: -20,
      rotateY: -20,
    }
    addObject(newObject)
    setSelectedObject(newObject)
  }

  const handleChangeObject = (updatedObject: ProjectObject) => {
    updateObject(updatedObject)
    if (updatedObject.objectId === selectedObject?.objectId) {
      setSelectedObject(updatedObject)
    }
  }

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
