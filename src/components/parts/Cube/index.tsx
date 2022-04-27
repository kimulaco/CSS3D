import React from 'react'
import { Box, BoxProps } from '@chakra-ui/react'
import { CubeGuide } from './CubeGuide'
import { CubeFace } from './CubeFace'
import { stringifyFormatTransform } from '../../../utils/transform'
import { isNumber } from '../../../utils/number'
import { useRotate } from '../../../utils/useRotate'
import { ProjectObject } from '../../../types/project'

type CubeProps = {
  object: ProjectObject
  enableGuide?: boolean
  chakra?: BoxProps
  onChangeRotate: (updatedObject: ProjectObject) => void
}

export const Cube: React.FC<CubeProps> = ({
  object,
  enableGuide = false,
  chakra = {},
  onChangeRotate,
}) => {
  const { registDrag, isDragging } = useRotate({
    defaultState: {
      rotateX: isNumber(object.rotateX) ? object.rotateX : -20,
      rotateY: isNumber(object.rotateY) ? object.rotateY : -20,
      rotateZ: 0,
    },
    onRotate(rotateState) {
      const updatedObject: ProjectObject = {
        ...object,
        rotateX: Number(rotateState.rotateX),
        rotateY: Number(rotateState.rotateY),
      }
      if (typeof onChangeRotate === 'function') {
        onChangeRotate(updatedObject)
      }
    }
  })

  return (
    <Box
      id={object.objectId}
      w={`${object.width}px`}
      h={`${object.height}px`}
      m={'auto'}
      cursor={isDragging ? 'grabbing' : 'grab'}
      transform={stringifyFormatTransform({
        rotateX: object.rotateX,
        rotateY: object.rotateY,
      })}
      position={'absolute'}
      top={'0'}
      right={'0'}
      bottom={'0'}
      left={'0'}
      zIndex={10}
      willChange="transform"
      style={{
        transformStyle: 'preserve-3d',
      }}
      {...chakra}
      onMouseDown={registDrag}
    >
      {/* front */}
      <CubeFace
        bg={object.front?.bg || object.bg}
        text={object.front?.text}
        img={object.front?.img}
        width={object.width}
        height={object.height}
        transform={{
          rotateX: `0deg`,
          rotateY: `0deg`,
          rotateZ: `0deg`,
          translateX: `0px`,
          translateY: `0px`,
          translateZ: `${object.depth / 2}px`,
        }}
      />

      {/* top */}
      <CubeFace
        bg={object.top?.bg || object.bg}
        text={object.top?.text}
        img={object.top?.img}
        width={object.width}
        height={object.depth}
        transform={{
          rotateY: `0deg`,
          rotateX: `90deg`,
          rotateZ: `0deg`,
          translateX: `0px`,
          translateY: `0px`,
          translateZ: `${object.depth / 2}px`,
        }}
      />

      {/* right */}
      <CubeFace
        bg={object.right?.bg || object.bg}
        text={object.right?.text}
        img={object.right?.img}
        width={object.depth}
        height={object.height}
        transform={{
          rotateX: `0deg`,
          rotateY: `90deg`,
          rotateZ: `0deg`,
          translateY: `0px`,
          translateX: `0px`,
          translateZ: `${(object.width) - (object.depth / 2)}px`,
        }}
      />

      {/* bottom */}
      <CubeFace
        bg={object.bottom?.bg || object.bg}
        text={object.bottom?.text}
        img={object.bottom?.img}
        width={object.width}
        height={object.depth}
        transform={{
          rotateX: `90deg`,
          rotateY: `180deg`,
          rotateZ: `0deg`,
          translateX: `0px`,
          translateY: `0px`,
          translateZ: `${(object.height) - (object.depth / 2)}px`,
        }}
      />

      {/* left */}
      <CubeFace
        bg={object.left?.bg || object.bg}
        text={object.left?.text}
        img={object.left?.img}
        width={object.depth}
        height={object.height}
        transform={{
          rotateX: `0deg`,
          rotateY: `-90deg`,
          rotateZ: `0deg`,
          translateX: `0px`,
          translateY: `0px`,
          translateZ: `${object.depth / 2}px`,
        }}
      />

      {/* back */}
      <CubeFace
        bg={object.back?.bg || object.bg}
        text={object.back?.text}
        img={object.back?.img}
        width={object.width}
        height={object.height}
        transform={{
          rotateX: `0deg`,
          rotateY: `180deg`,
          rotateZ: `0deg`,
          translateX: `0px`,
          translateY: `0px`,
          translateZ: `${object.depth / 2}px`,
        }}
      />

      {
        enableGuide && (isDragging) &&
        <CubeGuide />
      }
    </Box>
  )
}
