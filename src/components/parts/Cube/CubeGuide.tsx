import { Box, BoxProps } from '@chakra-ui/react'
import {  stringifyTransform } from '../../../utils/transform'

type CubeGuideProps = {
  weight?: number
  height?: number
  color?: BoxProps['bg']
}

export const CubeGuide: React.FC<CubeGuideProps> = ({
  weight = 2,
  height = 10000,
  color = 'whiteAlpha.600',
}) => {
  const commonStyles: BoxProps = {
    display: 'block',
    bg: color,
    w: `${weight}px`,
    h: `${height}px`,
    position: 'absolute',
    left: '0',
    top: `-${height / 2}px`,
    zIndex: '12'
  }

  return (
    <Box
      w={`${weight}px`}
      h={'100%'}
      position={'absolute'}
      top={'0'}
      left={`calc(50% - ${weight / 2}px)`}
      zIndex={11}
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      <Box {...commonStyles} />
      <Box
        {...commonStyles}
        transform={stringifyTransform({ rotateY: '45deg' })}
      />
      <Box
        {...commonStyles}
        transform={stringifyTransform({ rotateY: '90deg' })}
      />
      <Box
        {...commonStyles}
        transform={stringifyTransform({ rotateY: '135deg' })}
      />
    </Box>
  )
}
