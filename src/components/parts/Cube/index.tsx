import React from 'react'
import { Box, BoxProps } from '@chakra-ui/react'
import { CubeGuide } from './CubeGuide'
import { CubeFace, CubePropsOptions } from './CubeFace'
import { useRotate, stringifyTransform } from '../../../utils/transform'
import { useDrag } from '../../../utils/drag'

type CubeProps = {
  objectId: string
  width: number
  height: number
  depth: number
  rotatable?: boolean
  isSelected?: boolean
  enableGuide?: boolean
  bg?: BoxProps['bg']
  front?: CubePropsOptions
  top?: CubePropsOptions
  right?: CubePropsOptions
  bottom?: CubePropsOptions
  left?: CubePropsOptions
  back?: CubePropsOptions
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
      id={props.objectId}
      width={`${props.width}px`}
      height={`${props.height}px`}
      cursor={isDragging ? 'grabbing' : 'grab'}
      transform={stringifyTransform(transformObject)}
      position={'relative'}
      zIndex={10}
      willChange="transform"
      style={{
        transformStyle: 'preserve-3d',
      }}
      {...props.chakra}
      {...registerDrag()}
    >
      {/* front */}
      <CubeFace
        bg={props.front?.bg || props.bg}
        text={props.front?.text}
        img={props.front?.img}
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
      />

      {/* top */}
      <CubeFace
        bg={props.top?.bg || props.bg}
        text={props.top?.text}
        img={props.top?.img}
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
      />

      {/* right */}
      <CubeFace
        bg={props.right?.bg || props.bg}
        text={props.right?.text}
        img={props.right?.img}
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
      />

      {/* bottom */}
      <CubeFace
        bg={props.bottom?.bg || props.bg}
        text={props.bottom?.text}
        img={props.bottom?.img}
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
      />

      {/* left */}
      <CubeFace
        bg={props.left?.bg || props.bg}
        text={props.left?.text}
        img={props.left?.img}
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
      />

      {/* back */}
      <CubeFace
        bg={props.back?.bg || props.bg}
        text={props.back?.text}
        img={props.back?.img}
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
      />

      {
        props.enableGuide && (isDragging || props.isSelected) &&
        <CubeGuide />
      }
    </Box>
  )
}
