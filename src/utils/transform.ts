import { useState, useEffect } from 'react'
import { Offset } from '../types/'

export type TranformState = {
  [key: string]: number | string
}

export type TranformObject = {
  [key: string]: string
}

export const formatTransform = (
  transformState: TranformState,
): TranformObject => {
  const result: TranformObject = {}
  for (const transformKey of Object.keys(transformState)) {
    if (transformKey.startsWith('translate')) {
      result[transformKey] = `${transformState[transformKey]}px`
    } else if (transformKey.startsWith('rotate')) {
      result[transformKey] = `${transformState[transformKey]}deg`
    } else {
      result[transformKey] = `${transformState[transformKey]}`
    }
  }
  return result
}

export const stringifyTransform = (transformObject: TranformObject): string => {
  return Object.keys(transformObject)
    .map((transformObjectKey: string): string => {
      return `${transformObjectKey}(${transformObject[transformObjectKey]})`
    })
    .join(' ')
}

type UseRotateProps = {
  rotateRate?: number
  defaultState?: TranformState
}

export const useRotate = ({
  rotateRate = 0.5,
  defaultState = {},
}: UseRotateProps) => {
  const [rotateState, setRotateState] = useState<TranformState>(Object.assign({
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
  }, defaultState))
  const [transformObject, setTransformObject] = useState<TranformObject>(
    formatTransform(rotateState),
  )
  const rate: number = Math.max(rotateRate, 0)

  const rotate = (moveOffset: Offset) => {
    setRotateState({
      rotateX: Number(rotateState.rotateX) - (moveOffset.y * rate),
      rotateY: Number(rotateState.rotateY) + (moveOffset.x * rate),
      rotateZ: Number(rotateState.rotateZ),
    })
  }

  useEffect(() => {
    setTransformObject(formatTransform(rotateState))
  }, [rotateState])

  return {
    rotate,
    transformObject,
  }
}
