export type TranformObject = {
  [key: string]: string
}

export const useStyleTranform = () => {
  const transform = (transformObject: TranformObject): string => {
    return Object.keys(transformObject)
      .map((transformObjectKey: string): string => {
        return `${transformObjectKey}(${transformObject[transformObjectKey]})`
      })
      .join(' ')
  }

  return {
    transform,
  }
}