import React from 'react'
import { Box, BoxProps } from '@chakra-ui/react'

type StageProps = {
  perspective?: number
  children?: React.ReactNode
  chakra?: BoxProps
}

export const Stage: React.FC<StageProps> = ({
  perspective = 1000,
  children,
  chakra,
}) => {
  return (
    <Box
      bg="blackAlpha.800"
      cursor={'grab'}
      position={'relative'}
      zIndex={'0'}
      overflow={'hidden'}
      style={{
        perspective: `${perspective}px`,
      }}
      {...chakra}
    >{ children }</Box>
  )
}
