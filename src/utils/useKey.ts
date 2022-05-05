import { useState, useCallback } from 'react'
import { useWindowEvent } from './useWindowEvent'

export const useKey = () => {
  const [pressKey, setPressKey] = useState<KeyboardEvent|undefined>(undefined)

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    setPressKey(event)
  }, [])

  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    if (pressKey) {
      setPressKey(undefined)
    }
  }, [pressKey])

  useWindowEvent('keydown', handleKeyDown)
  useWindowEvent('keyup', handleKeyUp)

  return {
    pressKey,
  }
}
