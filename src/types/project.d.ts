import { ChakraProps, ImageProps } from '@chakra-ui/react'

export type ProjectObjectFace = {
  bg?: ChakraProps['bg']
  borderColor?: ChakraProps['borderColor']
  img?: ImageProps['src']
  text?: string
}

export type ProjectObject = {
  objectId: string
  width: number
  height: number
  depth: number
  bg?: ChakraProps['bg'],
  borderColor?: ChakraProps['borderColor'],
  front?: ProjectObjectFace
  top?: ProjectObjectFace
  right?: ProjectObjectFace
  bottom?: ProjectObjectFace
  left?: ProjectObjectFace
  back?: ProjectObjectFace
}

export type Project = {
  objects: ProjectObject[]
}