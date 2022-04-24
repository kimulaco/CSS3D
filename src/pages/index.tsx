import React, { useState } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { Stage } from '../components/parts/Stage'
import { Cube } from '../components/parts/Cube'
import { ZoomController } from '../components/ui/ZoomController'
import { ObjectMonitor } from '../components/ui/ObjectMonitor'
import { useProject } from '../state/project'
import { ProjectObject } from '../types/project'

type CubeSize = {
  width: number
  height: number
  depth: number
}

const PageHome: React.FC = () => {
  const { project, addObject } = useProject();
  const [zoom, setZoom] = useState<number>(100)
  const [cubeSize, setCubeSize] = useState<CubeSize>({
    width: 100,
    height: 100,
    depth: 100,
  })

  if (project.objects.length <= 0) {
    addObject({
      objectId: 'default-cube-1',
      width: 100,
      height: 100,
      depth: 100,
    })
  }

  const handleChangeObjectMonitor = (formId: string, value: number) => {
    setCubeSize({
      ...cubeSize,
      [formId]: value,
    })
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
                objectId={object.objectId}
                width={object.width}
                height={object.height}
                depth={object.depth}
                front={object.front}
                top={object.top}
                right={object.right}
                bottom={object.bottom}
                left={object.left}
                back={object.back}
                chakra={{
                  position: 'absolute',
                  top: '0',
                  right: '0',
                  bottom: '0',
                  left: '0',
                  margin: 'auto',
                }}
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
        chakra={{
          w: '50vw',
          maxW: '500px',
          h: '50vw',
          maxH: '500px',
        }}
        onChange={handleChangeObjectMonitor}
      />
    </Flex>
  )
}

export default PageHome
