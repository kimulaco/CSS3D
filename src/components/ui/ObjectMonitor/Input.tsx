import React from 'react'
import {
  Flex,
  Input,
  InputProps,
  FormControl,
  FormControlProps,
  FormLabel,
} from '@chakra-ui/react'

type ObjectMonitorInputProps = {
  formId: string
  label: string
  input?: InputProps
  chakra?: FormControlProps
  onChange?: (formId: string, value: number) => void
}

export const ObjectMonitorInput: React.FC<ObjectMonitorInputProps> = ({
  formId,
  label = '',
  input,
  chakra,
  onChange,
}) => {
  return (
    <FormControl
      w={'calc(100% / 3)'}
      pr={3}
      {...chakra}
    >
      <Flex alignItems={'center'}>
        <FormLabel
          htmlFor={formId}
          minW={'45px'}
          mb={'0'}
          mr={2}
          fontSize={'sm'}
        >{label}</FormLabel>

        <Input
          id={formId}
          bg={'white'}
          color={'black'}
          w={'auto'}
          maxW={16}
          h={6}
          px={2}
          textAlign={'right'}
          {...input}
          onChange={(event) => {
            if (typeof onChange === 'function') {
              onChange(formId, Number(event.target.value))
            }
          }}
        />
      </Flex>
    </FormControl>
  )
}
