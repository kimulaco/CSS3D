import React, { useState } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { Stage } from '../components/parts/Stage'
import { Cube } from '../components/parts/Cube'
import { ZoomController } from '../components/ui/ZoomController'
import { ObjectMonitor } from '../components/ui/ObjectMonitor'

type CubeSize = {
  width: number
  height: number
  depth: number
}

const PageHome: React.FC = () => {
  const [zoom, setZoom] = useState<number>(100)
  const [cubeSize, setCubeSize] = useState<CubeSize>({
    width: 100,
    height: 100,
    depth: 100,
  })

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
          <Cube
            objectId="cube-1"
            width={cubeSize.width}
            height={cubeSize.height}
            depth={cubeSize.depth}
            isSelected={true}
            front={{
              bg: 'red.600',
              children: <p>Front</p>,
            }}
            top={{
              bg: 'blue.600',
              children: <p>Top</p>,
            }}
            right={{
              bg: 'green.600',
              children: <p>Right</p>,
            }}
            bottom={{
              bg: 'yellow.600',
              children: <p>Bottom</p>,
            }}
            left={{
              bg: 'gray.600',
              children: <p>Left</p>,
            }}
            back={{
              bg: 'purple.600',
              children: <p>Back</p>,
            }}
            chakra={{
              position: 'absolute',
              top: '0',
              right: '0',
              bottom: '0',
              left: '0',
              margin: 'auto',
            }}
          />
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
