import React, { useMemo, useEffect } from 'react'
import { Box, BoxProps } from '@chakra-ui/react'
import { CubeFace } from './CubeFace'
import { stringifyFormatTransform } from '../../../utils/transform'
import { isNumber } from '../../../utils/number'
import { useRotate, UseRotateProps } from '../../../utils/useRotate'
import { Project, ProjectObject } from '../../../types/project'

type CubeProps = {
  createdAt: Project['createdAt']
  object: ProjectObject
  chakra?: BoxProps
  onEndDrag?: UseRotateProps['onEndDrag']
  onChangeRotate: (updatedObject: ProjectObject) => void
}

export const Cube: React.FC<CubeProps> = ({
  createdAt,
  object,
  chakra = {},
  onChangeRotate,
  onEndDrag,
}) => {
  const defaultRotateState = useMemo<UseRotateProps['defaultState']>(() => {
    return {
      rotateX: isNumber(object.rotateX) ? object.rotateX : -20,
      rotateY: isNumber(object.rotateY) ? object.rotateY : -20,
      rotateZ: 0,
    }
  }, [createdAt]) // eslint-disable-line react-hooks/exhaustive-deps

  const { registDrag, isDragging, resetRotateState } = useRotate({
    createdAt,
    defaultState: defaultRotateState,
    onRotate(rotateState) {
      const updatedObject: ProjectObject = {
        ...object,
        rotateX: Number(rotateState.rotateX),
        rotateY: Number(rotateState.rotateY),
      }
      if (typeof onChangeRotate === 'function') {
        onChangeRotate(updatedObject)
      }
    },
    onEndDrag,
  })

  const transformOrigin = useMemo<() => string>(() => {
    return () => {
      const translateX = (object.width / 2) + object.translateX
      const translateY = (object.height / 2) + object.translateY
      const translateZ = object.translateZ
      return `${translateX}px ${translateY}px ${translateZ}px`
    }
  }, [
    object.width,
    object.height,
    object.translateX,
    object.translateY,
    object.translateZ,
  ])

  useEffect(() => {
    resetRotateState()
  }, [resetRotateState])

  return (
    <Box
      id={object.objectId}
      w={`${object.width}px`}
      h={`${object.height}px`}
      m={'auto'}
      cursor={isDragging ? 'grabbing' : 'grab'}
      transformOrigin={transformOrigin()}
      transform={stringifyFormatTransform({
        rotateX: object.rotateX,
        rotateY: object.rotateY,
        translateX: object.translateX,
        translateY: object.translateY,
        translateZ: object.translateZ,
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
        borderColor={object.front?.borderColor || object.borderColor}
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
        borderColor={object.top?.borderColor || object.borderColor}
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
        borderColor={object.right?.borderColor || object.borderColor}
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
        borderColor={object.bottom?.borderColor || object.borderColor}
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
        borderColor={object.left?.borderColor || object.borderColor}
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
        borderColor={object.back?.borderColor || object.borderColor}
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
    </Box>
  )
}
