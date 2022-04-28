import React from 'react'
import { Box, BoxProps } from '@chakra-ui/react'
import { stringifyTransform, formatTransform } from '../../../utils/transform'

export type StageSize = number

type StageProps = {
  zoom?: number
  size?: StageSize
  perspective?: number
  children?: React.ReactNode
  chakra?: BoxProps
}

export const Stage: React.FC<StageProps> = ({
  zoom = 100,
  size = 3000,
  perspective = 500,
  children,
  chakra,
}) => {
  return (
    <Box
      bg="gray.700"
      w={'100%'}
      h={'100%'}
      position={'relative'}
      zIndex={0}
      overflow={'hidden'}
      {...chakra}
    >
      <Box
        w={`${size}px`}
        minW={`${size}px`}
        h={`${size}px`}
        minH={`${size}px`}
        m={'auto'}
        position={'absolute'}
        top={`calc(50% - ${size / 2}px)`}
        left={`calc(50% - ${size / 2}px)`}
        zIndex={'0'}
        overflow={'hidden'}
        transformOrigin={'center center'}
        transform={stringifyTransform(formatTransform({
          scale: zoom / 100,
          translateX: 0,
          translateY: 0,
        }))}
        transition={'transform 0.3s'}
        willChange={'transform'}
        style={{
          perspective: `${perspective}px`
        }}
      >
        { children }
      </Box>
    </Box>
  )
}
