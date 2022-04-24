import React from 'react'
import {
  NumberInput,
  NumberInputField,
  Flex,
  FlexProps,
  IconButton,
} from '@chakra-ui/react'
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons'

type ZoomControllerProps = {
  value: number
  width?: number
  chakra?: FlexProps
  onChange?: (value: number) => void
}

export const ZoomController: React.FC<ZoomControllerProps> = ({
  value,
  chakra,
  onChange,
}) => {
  const WIDTH = 10
  const BUTTON_HEIGHT = 5
  const INPUT_HEIGHT = 7
  const MAX_VALUE = 200
  const MIN_VALUE = 1

  const handleChangeInput = (value: number) => {
    if (typeof onChange === 'function') {
      onChange(value)
    }
  }

  return (
    <Flex
      direction={'column'}
      position={'absolute'}
      bottom={4}
      right={4}
      zIndex={'0'}
      {...chakra}
    >
      <NumberInput
        value={value}
        min={1}
        max={200}
        order={1}
        onChange={(value) => handleChangeInput(Number(value))}
      >
        <NumberInputField
          bg={'white'}
          w={WIDTH}
          maxW={WIDTH}
          h={INPUT_HEIGHT}
          maxH={INPUT_HEIGHT}
          p={1}
          fontSize={'10px'}
          textAlign={'center'}
          borderRadius={0}
        />
      </NumberInput>
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
        onClick={() => handleChangeInput(value + 1)}
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
        onClick={() => handleChangeInput(value - 1)}
      />
    </Flex>
  )
}
