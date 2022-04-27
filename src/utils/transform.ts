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

export const stringifyFormatTransform = (
  transformState: TranformState,
): string => {
  return stringifyTransform(formatTransform(transformState))
}

export const optimizeRotate = (rotateValue: number): number => {
  return rotateValue % 360
}
