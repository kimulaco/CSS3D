import React from 'react'
import { Flex, Text } from '@chakra-ui/react'
import { stringifyTransform, TranformObject } from '../../../utils/transform'
import { ProjectObjectFace } from '../../../types/project'

const TRANSITIONS: string[] = ['transform', 'width', 'height']

export type CubePropsOptions = ProjectObjectFace

type CubeFaceProps = CubePropsOptions & {
  width: number
  height: number
  transform: TranformObject
}

export const CubeFace: React.FC<CubeFaceProps> = (props) => {
  return (
    <Flex
      bg={props.bg || 'gray.400'}
      border={'1px solid'}
      borderColor={props.borderColor || 'gray.500'}
      width={`${props.width}px`}
      height={`${props.height}px`}
      alignItems={'center'}
      justify={'center'}
      overflow={'hidden'}
      position={'absolute'}
      top={'0'}
      left={'0'}
      transform={stringifyTransform(props.transform)}
      userSelect={'none'}
      willChange={TRANSITIONS.join(',')}
      transition={TRANSITIONS.map((propName) => `${propName} 0.3s`).join(',')}
    >
      <Text>{props.text}</Text>
    </Flex>
  )
}
