import { useState } from 'react'
import { useWindowEvent } from './useWindowEvent'
import { Offset } from '../types/'

type UseDragProps = {
  onStartDrag?: (startOffset: Offset) => void
  onMoveDrag?: (startOffset: Offset, moveOffset: Offset) => void
  onEndDrag?: (startOffset: Offset, endOffset: Offset) => void
}

export const useDrag = (props: UseDragProps) => {
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [startOffset, setStartOffset] = useState<Offset>({x: 0, y: 0})
  const [moveOffset, setMoveOffset] = useState<Offset>({x: 0, y: 0})

  const handleMouseMove = (event: MouseEvent) => {
    if (!isDragging) {
      return
    }
    setIsDragging(true)
    const moveOffsetValue: Offset = {
      x: event.pageX,
      y: event.pageY,
    }
    setMoveOffset(moveOffsetValue)
    if (props.onMoveDrag) {
      props.onMoveDrag(startOffset, moveOffsetValue)
    }
  }

  const startDrag = (event: MouseEvent): Offset => {
    setIsDragging(true)
    const startOffsetValue: Offset = {
      x: event.pageX,
      y: event.pageY,
    }
    setStartOffset(startOffsetValue)
    return startOffsetValue
  }

  const endDrag = (event: MouseEvent): Offset => {
    setIsDragging(false)
    const endOffsetValue: Offset = {
      x: event.pageX - startOffset.x,
      y: event.pageY - startOffset.y,
    }
    return endOffsetValue
  }

  const handleMouseUp = (event: MouseEvent) => {
    if (!isDragging) {
      return
    }
    const endOffsetValue = endDrag(event)
    if (props.onEndDrag) {
      props.onEndDrag(startOffset, endOffsetValue)
    }
  }

  const registDrag = (event: any) => {
    const startOffset = startDrag(event)
    if (props.onStartDrag) {
      props.onStartDrag(startOffset)
    }
  }

  useWindowEvent('mouseup', handleMouseUp, [])
  useWindowEvent('mousemove', handleMouseMove, [])

  return {
    // state
    isDragging,
    startOffset,
    moveOffset,

    // register
    registDrag,
  }
}
