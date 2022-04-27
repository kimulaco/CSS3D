import { useState } from 'react'
import { useDrag } from './useDrag'
import { TranformState } from './transform'
import { Offset } from '../types/'

type UseRotateProps = {
  rotateRate?: number
  defaultState?: TranformState
  onRotate?: (rotateState: TranformState) => void
}

export const useRotate = ({
  rotateRate = 0.5,
  defaultState = {},
  onRotate,
}: UseRotateProps) => {
  const [
    stateRotateState,
    setStartRotateState,
  ] = useState<TranformState>(Object.assign({
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
  }, defaultState))
  const [rotateState, setRotateState] = useState<TranformState>(Object.assign({
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
  }, defaultState))
  const rate: number = Math.max(rotateRate, 0)

  const rotate = (startOffset: Offset, moveOffset: Offset) => {
    const diffOffsetValue: Offset = {
      x: moveOffset.x - startOffset.x,
      y: moveOffset.y - startOffset.y,
    }
    const state: TranformState = {
      rotateX: Number(stateRotateState.rotateX) - (diffOffsetValue.y * rate),
      rotateY: Number(stateRotateState.rotateY) + (diffOffsetValue.x * rate),
      rotateZ: Number(stateRotateState.rotateZ),
    }
    setRotateState(state)
    if (typeof onRotate === 'function') {
      onRotate(state)
    }
  }

  const { isDragging, registDrag } = useDrag({
    onStartDrag() {
      setStartRotateState(rotateState)
    },
    onMoveDrag(startOffset, moveOffset) {
      rotate(startOffset, moveOffset)
    },
  })

  return {
    isDragging,
    registDrag,
    rotateState,
  }
}