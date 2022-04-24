import { useState } from 'react'
import { Offset } from '../types/'

type UseDragProps = {
  stop?: boolean
  onMoveDrag?: (moveOffset: Offset) => void
  onEndDrag?: (endOffset: Offset) => void
}

export const useDrag = (props: UseDragProps) => {
  let _isDragging = false
  let _moveOffset = {x: 0, y: 0}
  let startOffset: Offset = {x: 0, y: 0}

  const [isDragging, setIsDragging] = useState<boolean>(_isDragging)
  const [moveOffset, setMoveOffset] = useState<Offset>(_moveOffset)

  const updateIsDragging = (bool: boolean) => {
    _isDragging = bool
    setIsDragging(bool)
  }

  const updateMoveOffset = (offset: Offset) => {
    _moveOffset = offset
    setMoveOffset(offset)
  }

  const handleMouseMove = (event: MouseEvent) => {
    if (!_isDragging) {
      return
    }
    const moveOffsetValue: Offset = {
      x: event.pageX - startOffset.x,
      y: event.pageY - startOffset.y,
    }
    updateIsDragging(true)
    updateMoveOffset(moveOffsetValue)
    if (props.onMoveDrag) {
      props.onMoveDrag(moveOffsetValue)
    }
  }

  const startDrag = (event: MouseEvent): Offset => {
    startOffset = {x: event.pageX, y: event.pageY}
    updateIsDragging(true)
    updateMoveOffset({x: 0, y: 0})
    return startOffset
  }

  const endDrag = (event: MouseEvent): Offset => {
    const moveOffsetValue: Offset = {
      x: event.pageX - startOffset.x,
      y: event.pageY - startOffset.y,
    }
    updateIsDragging(false)
    updateMoveOffset(moveOffsetValue)
    startOffset = {x: 0, y: 0}
    if (props.onEndDrag) {
      props.onEndDrag(moveOffsetValue)
    }
    return moveOffset
  }

  const handleMouseUp = (event: MouseEvent) => {
    if (!_isDragging) {
      return
    }
    endDrag(event)
  }

  const registerDrag = () => {
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('mousemove', handleMouseMove)
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
    window.removeEventListener('mouseup', handleMouseUp)
    window.removeEventListener('mousemove', handleMouseMove)
  }

  return {
    // state
    isDragging,

    // method
    startDrag,
    endDrag,

    // register
    registerDrag,
    unregisterDrag,
  }
}
