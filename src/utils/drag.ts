import { useState } from 'react'
import { Offset } from '../types/'

type UseDragProps = {
  stop?: boolean
  onMoveDrag?: (moveOffset: Offset) => void
  onEndDrag?: (endOffset: Offset) => void
}

export const useDrag = (props: UseDragProps) => {
  let _moveOffset = {x: 0, y: 0}
  let _startOffset: Offset = {x: 0, y: 0}

  const [isRegisted, setIsRegisted] = useState<boolean>(false)
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [moveOffset, setMoveOffset] = useState<Offset>(_moveOffset)

  const updateIsDragging = (bool: boolean) => {
    setIsDragging(bool)
  }

  const updateMoveOffset = (offset: Offset) => {
    _moveOffset = offset
    setMoveOffset(offset)
  }

  const handleMouseMove = (event: MouseEvent) => {
    if (!isDragging) {
      return
    }
    const moveOffsetValue: Offset = {
      x: event.pageX - _startOffset.x,
      y: event.pageY - _startOffset.y,
    }
    updateIsDragging(true)
    updateMoveOffset(moveOffsetValue)
    if (props.onMoveDrag) {
      props.onMoveDrag(moveOffsetValue)
    }
  }

  const startDrag = (event: MouseEvent): Offset => {
    _startOffset = {x: event.pageX, y: event.pageY}
    updateIsDragging(true)
    updateMoveOffset({x: 0, y: 0})
    return _startOffset
  }

  const endDrag = (event: MouseEvent): Offset => {
    const moveOffsetValue: Offset = {
      x: event.pageX - _startOffset.x,
      y: event.pageY - _startOffset.y,
    }
    updateIsDragging(false)
    updateMoveOffset(moveOffsetValue)
    _startOffset = {x: 0, y: 0}
    if (props.onEndDrag) {
      props.onEndDrag(moveOffsetValue)
    }
    return moveOffset
  }

  const handleMouseUp = (event: MouseEvent) => {
    if (!isDragging) {
      return
    }
    endDrag(event)
  }

  const registerDrag = () => {
    if (!isRegisted) {
      window.addEventListener('mouseup', handleMouseUp)
      window.addEventListener('mousemove', handleMouseMove)
      setIsRegisted(true)
    }
    return {
      onMouseDown(event: any) {
        if (props.stop) {
          event.stopPropagation()
        }
        startDrag(event)
      },
    }
  }

  const unregisterDrag = () => {
    if (isRegisted) {
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('mousemove', handleMouseMove)
      setIsRegisted(false)
    }
  }

  return {
    // state
    isRegisted,
    isDragging,

    // method
    startDrag,
    endDrag,

    // register
    registerDrag,
    unregisterDrag,
  }
}
