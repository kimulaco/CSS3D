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
      mb={3}
      {...chakra}
    >
      <Flex alignItems={'center'}>
        <FormLabel
          htmlFor={formId}
          minW={'50px'}
          mb={'0'}
        >{label}</FormLabel>

        <Input
          id={formId}
          bg={'white'}
          color={'black'}
          w={'auto'}
          maxW={20}
          h={7}
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
