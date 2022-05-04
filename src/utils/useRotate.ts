import { useState, useMemo, useCallback } from 'react'
import { useDrag } from './useDrag'
import { TranformState } from './transform'
import { log } from './logger'
import { Offset } from '../types/'

type UseRotateProps = {
  createdAt: number
  rotateRate?: number
  defaultState?: TranformState
  onRotate?: (rotateState: TranformState) => void
}

export const useRotate = (props: UseRotateProps) => {
  const defaultState = useMemo<Required<UseRotateProps>['defaultState']>(() => {
    log('useRotate: defaultState')
    return props.defaultState || {}
  }, [props.defaultState])
  const rotateRate = useMemo<Required<UseRotateProps>['rotateRate']>(() => {
    return props.rotateRate || 0.5
  }, [props.rotateRate])

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
  const rate: number = Math.max(rotateRate , 0)

  const rotate = (startOffset: Offset, moveOffset: Offset) => {
    log('useRotate: rotate')
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
    if (typeof props.onRotate === 'function') {
      props.onRotate(state)
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

  const resetRotateState = useCallback(() => {
    setStartRotateState(Object.assign({
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
    }, defaultState))
    setRotateState(Object.assign({
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
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