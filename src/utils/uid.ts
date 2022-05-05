export const generateUid = (): string => {
  return crypto.getRandomValues(new Uint32Array(1)).join('')
}
