import React from 'react'
import { Box } from '@chakra-ui/react'
import { Cube } from '../components/parts/Cube'

const PageHome: React.FC = () => {
  return (
    <Box>
      <Box
        bg="blackAlpha.800"
        w={'100vw'}
        maxW={'600px'}
        h={'100vw'}
        maxH={'600px'}
        cursor={'grab'}
        ml={'100px'}
        style={{
          perspective: '1000px',
        }}
      >
        <Cube
          width={100}
          height={100}
          depth={100}
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
      </Box>
    </Box>
  )
}

export default PageHome
