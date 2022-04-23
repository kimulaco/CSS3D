import React from 'react'
import { Box, BoxProps } from '@chakra-ui/react'

type ObjectMonitorProps = {
  children?: React.ReactNode
  chakra?: BoxProps
}

export const ObjectMonitor: React.FC<ObjectMonitorProps> = ({
  children,
  chakra,
}) => {
  return (
    <Box
      bg="blackAlpha.500"
      p={2}
      position={'relative'}
      zIndex={'0'}
      {...chakra}
    >{ children }</Box>
  )
}
