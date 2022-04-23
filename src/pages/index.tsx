import React from 'react'
import { Flex, Box } from '@chakra-ui/react'
import { Stage } from '../components/parts/Stage'
import { Cube } from '../components/parts/Cube'
import { ObjectMonitor } from '../components/ui/ObjectMonitor'

const PageHome: React.FC = () => {
  return (
    <Flex>
      <Box>
        <Stage
          perspective={1000}
          chakra={{
            w: '50vw',
            maxW: '500px',
            h: '50vw',
            maxH: '500px',
          }}
        >
          <Cube
            id="cube-1"
            width={100}
            height={100}
            depth={100}
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
      </Box>

      <ObjectMonitor
        chakra={{
          w: '50vw',
          maxW: '500px',
          h: '50vw',
          maxH: '500px',
        }}
      >
        <p>ObjectMonitor</p>
      </ObjectMonitor>
    </Flex>
  )
}

export default PageHome
