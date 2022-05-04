import React from 'react'
import {
  Box,
  Flex,
  Input,
  InputProps,
  FormControl,
  FormControlProps,
  FormLabel,
} from '@chakra-ui/react'

type ObjectMonitorInputColorProps = {
  formId: string
  label: string
  type: 'text' | 'color'
  input?: InputProps
  chakra?: FormControlProps
  inputChakra?: InputProps
  onChange?: (formId: string, value: string) => void
}

export const ObjectMonitorInputColor: React.FC<
  ObjectMonitorInputColorProps
> = ({
  formId,
  label = '',
  input,
  chakra,
  onChange,
}) => {
  return (
    <FormControl mt={'1'} {...chakra}>
      <Flex alignItems={'center'} w={'100%'}>
        <FormLabel
          htmlFor={formId}
          minW={'56px'}
          mb={'0'}
          mr={'2'}
          fontSize={'sm'}
        >{label}</FormLabel>

        <Input
          id={formId}
          type={'color'}
          size={'xs'}
          bg={'white'}
          color={'black'}
          w={'100%'}
          px={'1'}
          borderRadius={'sm'}
          isFullWidth
          {...input}
          onChange={(event) => {
            const value = String(event?.target?.value || '')
            if (typeof onChange === 'function') {
              onChange(formId, value)
            }
          }}
        />

        <Box
          minW={'36px'}
          pl={2}
        />
      </Flex>
    </FormControl>
  )
}