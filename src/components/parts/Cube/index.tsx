import React from 'react'
import { Box, BoxProps, Flex, FlexProps } from '@chakra-ui/react'
import { useStyleTranform, TranformObject } from '../../../utils/style'

type CubePropsFace = {
  bg?: FlexProps['bg']
  children?: React.ReactNode
}

type CubeFaceProps = CubePropsFace & {
  width: number
  height: number
  transform: TranformObject
}

const CubeFace: React.FC<CubeFaceProps> = (props) => {
  const { transform } = useStyleTranform()

  return (
    <Flex
      bg={props.bg}
      width={`${props.width}px`}
      height={`${props.height}px`}
      alignItems={'center'}
      justify={'center'}
      overflow={'hidden'}
      position={'absolute'}
      top={'0'}
      left={'0'}
      transform={transform(props.transform)}
    >{ props.children }</Flex>
  )
}

export type CubeProps = {
  width: number
  height: number
  depth: number
  bg?: BoxProps['bg']
  front?: CubePropsFace
  top?: CubePropsFace
  right?: CubePropsFace
  bottom?: CubePropsFace
  left?: CubePropsFace
  back?: CubePropsFace
  chakra?: BoxProps
}

export const Cube: React.FC<CubeProps> = (props) => {
  const { transform } = useStyleTranform()

  return (
    <Box
      width={`${props.width}px`}
      height={`${props.height}px`}
      transform={transform({
        rotateY: `-30deg`,
        rotateX: `-30deg`,
        rotateZ: `0deg`,
      })}
      style={{
        transformStyle: 'preserve-3d',
      }}
      {...props.chakra}
    >
      {/* front */}
      <CubeFace
        bg={props.front?.bg || props.bg}
        width={props.width}
        height={props.height}
        transform={{
          rotateY: `0deg`,
          rotateX: `0deg`,
          rotateZ: `0deg`,
          translateX: `0px`,
          translateY: `0px`,
          translateZ: `${props.depth}px`,
        }}
      >{ props.front?.children }</CubeFace>

      {/* top */}
      <CubeFace
        bg={props.top?.bg || props.bg}
        width={props.width}
        height={props.depth}
        transform={{
          rotateX: `90deg`,
          rotateY: `0deg`,
          rotateZ: `0deg`,
          translateX: `0px`,
          translateY: `${props.height / 2}px`,
          translateZ: `${props.depth / 2}px`,
        }}
      >{ props.top?.children }</CubeFace>

      {/* right */}
      <CubeFace
        bg={props.right?.bg || props.bg}
        width={props.width}
        height={props.depth}
        transform={{
          rotateX: `0deg`,
          rotateY: `90deg`,
          rotateZ: `0deg`,
          translateY: `0px`,
          translateX: `-${props.width / 2}px`,
          translateZ: `${props.width / 2}px`,
        }}
      >{ props.right?.children }</CubeFace>

      {/* bottom */}
      <CubeFace
        bg={props.bottom?.bg || props.bg}
        width={props.width}
        height={props.depth}
        transform={{
          rotateX: `90deg`,
          rotateY: `180deg`,
          rotateZ: `0deg`,
          translateX: `0px`,
          translateY: `${props.width / 2}px`,
          translateZ: `${props.width / 2}px`,
        }}
      >{ props.bottom?.children }</CubeFace>

      {/* left */}
      <CubeFace
        bg={props.left?.bg || props.bg}
        width={props.width}
        height={props.depth}
        transform={{
          rotateX: `0deg`,
          rotateY: `-90deg`,
          rotateZ: `0deg`,
          translateY: `0px`,
          translateX: `${props.width / 2}px`,
          translateZ: `${props.width / 2}px`,
        }}
      >{ props.left?.children }</CubeFace>

      {/* back */}
      <CubeFace
        bg={props.back?.bg || props.bg}
        width={props.width}
        height={props.height}
        transform={{
          rotateX: `0deg`,
          rotateY: `180deg`,
          rotateZ: `0deg`,
          translateX: `0px`,
          translateY: `0px`,
          translateZ: `0px`,
        }}
      >{ props.back?.children }</CubeFace>
    </Box>
  )
}
