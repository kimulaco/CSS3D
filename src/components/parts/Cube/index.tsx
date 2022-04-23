import React from 'react'
import { Box, BoxProps, Flex, FlexProps } from '@chakra-ui/react'
import {
  useRotate,
  stringifyTransform,
  TranformObject,
} from '../../../utils/transform'
import { useDrag } from '../../../utils/drag'

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
      transform={stringifyTransform(props.transform)}
      userSelect={'none'}
    >{ props.children }</Flex>
  )
}

type CubeGuideProps = {
  weight?: number
  height?: number
  color?: BoxProps['bg']
}

const CubeGuide: React.FC<CubeGuideProps> = ({
  weight = 2,
  height = 10000,
  color = 'whiteAlpha.600',
}) => {
  const commonStyles: BoxProps = {
    display: 'block',
    bg: color,
    w: `${weight}px`,
    h: `${height}px`,
    position: 'absolute',
    left: '0',
    top: `-${height / 2}px`,
    zIndex: '12'
  }

  return (
    <Box
      w={`${weight}px`}
      h={'100%'}
      position={'absolute'}
      top={'0'}
      left={`calc(50% - ${weight / 2}px)`}
      zIndex={11}
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      <Box {...commonStyles} />
      <Box
        {...commonStyles}
        transform={stringifyTransform({ rotateY: '45deg' })}
      />
      <Box
        {...commonStyles}
        transform={stringifyTransform({ rotateY: '90deg' })}
      />
      <Box
        {...commonStyles}
        transform={stringifyTransform({ rotateY: '135deg' })}
      />
    </Box>
  )
}

type CubeProps = {
  id: string
  width: number
  height: number
  depth: number
  rotatable?: boolean
  isSelected?: boolean
  enableGuide?: boolean
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
  const { rotate, transformObject } = useRotate({
    defaultState: {
      rotateX: -30,
      rotateY: -30,
      rotateZ: 0,
    },
  })
  const { isDragging, registerDrag } = useDrag({
    onMoveDrag(moveOffset) {
      rotate(moveOffset)
    },
  })

  registerDrag()

  return (
    <Box
      width={`${props.width}px`}
      height={`${props.height}px`}
      cursor={isDragging ? 'grabbing' : 'grab'}
      transform={stringifyTransform(transformObject)}
      willChange="transform"
      position={'relative'}
      zIndex={10}
      style={{
        transformStyle: 'preserve-3d',
      }}
      {...props.chakra}
      {...registerDrag()}
    >
      {/* front */}
      <CubeFace
        bg={props.front?.bg || props.bg}
        width={props.width}
        height={props.height}
        transform={{
          rotateX: `0deg`,
          rotateY: `0deg`,
          rotateZ: `0deg`,
          translateX: `0px`,
          translateY: `0px`,
          translateZ: `${props.depth / 2}px`,
        }}
      >{ props.front?.children }</CubeFace>

      {/* top */}
      <CubeFace
        bg={props.top?.bg || props.bg}
        width={props.width}
        height={props.depth}
        transform={{
          rotateY: `0deg`,
          rotateX: `90deg`,
          rotateZ: `0deg`,
          translateX: `0px`,
          translateY: `0px`,
          translateZ: `${props.depth / 2}px`,
        }}
      >{ props.top?.children }</CubeFace>

      {/* right */}
      <CubeFace
        bg={props.right?.bg || props.bg}
        width={props.depth}
        height={props.height}
        transform={{
          rotateX: `0deg`,
          rotateY: `90deg`,
          rotateZ: `0deg`,
          translateY: `0px`,
          translateX: `0px`,
          translateZ: `${(props.width) - (props.depth / 2)}px`,
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
          translateY: `0px`,
          translateZ: `${(props.height) - (props.depth / 2)}px`,
        }}
      >{ props.bottom?.children }</CubeFace>

      {/* left */}
      <CubeFace
        bg={props.left?.bg || props.bg}
        width={props.depth}
        height={props.height}
        transform={{
          rotateX: `0deg`,
          rotateY: `-90deg`,
          rotateZ: `0deg`,
          translateX: `0px`,
          translateY: `0px`,
          translateZ: `${props.depth / 2}px`,
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
          translateZ: `${props.depth / 2}px`,
        }}
      >{ props.back?.children }</CubeFace>

      {
        props.enableGuide && (isDragging || props.isSelected) &&
        <CubeGuide />
      }
    </Box>
  )
}
