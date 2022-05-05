import { useState, useMemo, useCallback } from 'react'
import { useDrag, UseDragProps } from './useDrag'
import { useKey } from './useKey'
import { TranformState } from './transform'
import { Offset } from '../types/'

export type UseRotateProps = {
  rotateRate?: number
  defaultState?: TranformState
  onRotate?: (rotateState: TranformState) => void
  onEndDrag?: UseDragProps['onEndDrag']
}

export const useRotate = (props: UseRotateProps) => {
  const defaultState = useMemo<Required<UseRotateProps>['defaultState']>(() => {
    return props.defaultState || {}
  }, [props.defaultState])
  const rotateRate = useMemo<Required<UseRotateProps>['rotateRate']>(() => {
    return props.rotateRate || 0.5
  }, [props.rotateRate])

  const [
    startRotateState,
    setStartRotateState,
  ] = useState<TranformState>(Object.assign({
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    translateX: 0,
    translateY: 0,
    translateZ: 0,
  }, defaultState))
  const [rotateState, setRotateState] = useState<TranformState>(Object.assign({
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    translateX: 0,
    translateY: 0,
    translateZ: 0,
  }, defaultState))
  const rate: number = Math.max(rotateRate , 0)

  const { pressKey } = useKey()

  const getDiffOffset = useMemo<
    (startOffset: Offset, moveOffset: Offset) => Offset
  >(() => {
    return (startOffset, moveOffset) => {
      const diffOffsetValue: Offset = {
        x: moveOffset.x - startOffset.x,
        y: moveOffset.y - startOffset.y,
      }
      return diffOffsetValue
    }
  }, [])

  const rotate = (startOffset: Offset, moveOffset: Offset) => {
    const diffOffsetValue = getDiffOffset(startOffset, moveOffset)
    const state: TranformState = {
      rotateX: Number(startRotateState.rotateX) - (diffOffsetValue.y * rate),
      rotateY: Number(startRotateState.rotateY) + (diffOffsetValue.x * rate),
      rotateZ: Number(startRotateState.rotateZ),
      translateX: rotateState.translateX,
      translateY: rotateState.translateY,
      translateZ: rotateState.translateZ,
    }
    setRotateState(state)
    if (typeof props.onRotate === 'function') {
      props.onRotate(state)
    }
  }

  const translate = (startOffset: Offset, moveOffset: Offset) => {
    const diffOffsetValue = getDiffOffset(startOffset, moveOffset)
    const state: TranformState = {
      rotateX: rotateState.rotateX,
      rotateY: rotateState.rotateY,
      rotateZ: rotateState.rotateZ,
      translateX: Number(startRotateState.translateX) + diffOffsetValue.x,
      translateY: Number(startRotateState.translateY) + diffOffsetValue.y,
      translateZ: Number(startRotateState.translateZ),
    }
    setRotateState(state)
    if (typeof props.onRotate === 'function') {
      props.onRotate(state)
    }
  }

  const { isDragging, registDrag } = useDrag({
    onStartDrag() {
      setStartRotateState(rotateState)
    },
    onEndDrag: props.onEndDrag,
    onMoveDrag(startOffset, moveOffset) {
      if (pressKey?.shiftKey) {
        translate(startOffset, moveOffset)
      } else {
        rotate(startOffset, moveOffset)
      }
    },
  })

  const resetRotateState = useCallback(() => {
    setStartRotateState(Object.assign({
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      translateX: 0,
      translateY: 0,
      translateZ: 0,
    }, defaultState))
    setRotateState(Object.assign({
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      translateX: 0,
      translateY: 0,
      translateZ: 0,
    }, defaultState))
  }, [
    setStartRotateState,
    setRotateState,
    defaultState,
  ])

  return {
    isDragging,
    registDrag,
    rotateState,
    resetRotateState,
  }
}