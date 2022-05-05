import { ChakraProps, ImageProps } from '@chakra-ui/react'

export type ProjectObjectFace = {
  bg?: ChakraProps['bg']
  borderColor?: ChakraProps['borderColor']
  img?: ImageProps['src']
  text?: string
}

export type ProjectObject = {
  uid: string
  objectId: string
  width: number
  height: number
  depth: number
  rotateX: number
  rotateY: number
  translateX: number
  translateY: number
  translateZ: number
  zIndex: number
  bg?: string,
  borderColor?: string,
  front?: ProjectObjectFace
  top?: ProjectObjectFace
  right?: ProjectObjectFace
  bottom?: ProjectObjectFace
  left?: ProjectObjectFace
  back?: ProjectObjectFace
}

export type Project = {
  id: string
  createdAt: number
  perspective: number
  zoom: number
  objects: ProjectObject[]
  objectCount: number
}