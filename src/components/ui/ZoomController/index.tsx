import React from 'react'
import {
  NumberInput,
  NumberInputField,
  Text,
  Box,
  Flex,
  FlexProps,
  IconButton,
} from '@chakra-ui/react'
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons'

const WIDTH = 10
const BUTTON_HEIGHT = 5
const INPUT_HEIGHT = 7
const MAX_VALUE = 500
const MIN_VALUE = 1

type ZoomControllerProps = {
  value: number
  step?: number
  width?: number
  chakra?: FlexProps
  onChange?: (value: number) => void
}

export const ZoomController: React.FC<ZoomControllerProps> = ({
  value,
  step = 10,
  chakra,
  onChange,
}) => {
  const handleChangeInput = (value: number) => {
    if (typeof onChange === 'function') {
      onChange(value)
    }
  }

  return (
    <Flex
      direction={'column'}
      {...chakra}
    >
      <Box order={1} position={'relative'}>
        <NumberInput
          value={value}
          min={1}
          max={MAX_VALUE}
          onChange={(value) => handleChangeInput(Number(value))}
        >
          <NumberInputField
            bg={'white'}
            w={WIDTH}
            maxW={WIDTH}
            h={INPUT_HEIGHT}
            maxH={INPUT_HEIGHT}
            pt={'1'}
            pb={'1'}
            pl={'1'}
            pr={'2'}
            fontSize={'10px'}
            textAlign={'center'}
            borderRadius={0}
          />
        </NumberInput>
        <Text
          fontSize={'10px'}
          lineHeight={'1'}
          m={'auto'}
          h={'1em'}
          position={'absolute'}
          top={'1px'}
          right={'2px'}
          bottom={'0'}
        >%</Text>
      </Box>
      <IconButton
        isDisabled={value >= MAX_VALUE}
        display={'block'}
        p={0}
        w={WIDTH}
        minW={WIDTH}
        h={BUTTON_HEIGHT}
        borderBottomRadius={0}
        order={0}
        aria-label={'Zoom up'}
        icon={<ChevronUpIcon />}
        onClick={() => handleChangeInput(Math.min(value + step, MAX_VALUE))}
      />
      <IconButton
        isDisabled={value <= MIN_VALUE}
        display={'block'}
        p={0}
        w={WIDTH}
        minW={WIDTH}
        h={BUTTON_HEIGHT}
        borderTopRadius={0}
        order={2}
        aria-label={'Zoom down'}
        icon={<ChevronDownIcon />}
        onClick={() => handleChangeInput(Math.max(value - step, MIN_VALUE))}
      />
    </Flex>
  )
}
