import { ChakraProps, ImageProps } from '@chakra-ui/react'

export type ProjectObjectFace = {
  bg?: ChakraProps['bg']
  img?: ImageProps['src']
  text?: string
}

export type ProjectObject = {
  objectId: string
  width: number
  height: number
  depth: number
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