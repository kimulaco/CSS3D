import React from 'react'
import {
  Box,
  Flex,
  FlexProps,
} from '@chakra-ui/react'

export const HEADER_HEIGHT = '50px'

type LayoutContainerProps = {
  chakra?: FlexProps
  children?: React.ReactNode
}

export const LayoutContainer: React.FC<LayoutContainerProps> = ({
  chakra,
  children,
}) => {
  return (
    <Flex
      bg={'gray.800'}
      w={'100%'}
      h={'100vh'}
      minH={'100vh'}
      direction={'column'}
      {...chakra}
    >
      {children}
    </Flex>
  )
}

type LayoutHeaderProps = {
  chakra?: FlexProps
}

export const LayoutHeader: React.FC<LayoutHeaderProps> = ({
  chakra,
}) => {
  return (
    <Flex
      h={HEADER_HEIGHT}
      p={'2'}
      color={'white'}
      bg={'gray.900'}
      {...chakra}
    >
      <Box>
        <Flex
         as={'h1'}
         h={'100%'}
         alignItems={'center'}
         lineHeight={'1'}
         fontSize={'xl'}
         fontWeight={'bold'}
        >CSS3D</Flex>
      </Box>
    </Flex>
  )
}

type LayoutMainProps = {
  chakra?: FlexProps
  children?: React.ReactNode
}

export const LayoutMain: React.FC<LayoutMainProps> = ({
  chakra,
  children,
}) => {
  return (
    <Flex
      w={'100%'}
      h={`calc(100% - ${HEADER_HEIGHT})`}
      {...chakra}
    >
      {children}
    </Flex>
  )
}
