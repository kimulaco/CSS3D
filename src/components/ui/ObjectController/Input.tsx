import React from 'react'
import {
  Box,
  Flex,
  NumberInput,
  NumberInputProps,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  InputProps,
  FormControl,
  FormControlProps,
  FormLabel,
} from '@chakra-ui/react'

type ObjectControllerInputProps = {
  formId: string
  label: string
  unit?: string
  input?: NumberInputProps
  chakra?: FormControlProps
  inputChakra?: InputProps
  onChange?: (formId: string, value: number) => void
}

export const ObjectControllerInput: React.FC<ObjectControllerInputProps> = ({
  formId,
  label = '',
  unit = '',
  input,
  chakra,
  onChange,
}) => {
  return (
    <FormControl mt={'1'} {...chakra}>
      <Flex alignItems={'center'} w={'100%'}>
        <FormLabel
          htmlFor={formId}
          minW={'86px'}
          mb={'0'}
          mr={2}
          fontSize={'sm'}
        >{label}</FormLabel>

        <NumberInput
          size={'xs'}
          {...input}
          onChange={(value: string) => {
            if (typeof onChange === 'function') {
              onChange(formId, Number(value))
            }
          }}
        >
          <NumberInputField
            id={formId}
            bg={'white'}
            color={'black'}
            w={'100%'}
            px={2}
            borderRadius={'sm'}
            textAlign={'right'}
          />
          <NumberInputStepper>
            <NumberIncrementStepper color={'gray.800'} />
            <NumberDecrementStepper color={'gray.800'} />
          </NumberInputStepper>
        </NumberInput>

        <Box
          minW={'36px'}
          pl={2}
        >
          {unit}
        </Box>
      </Flex>
    </FormControl>
  )
}
