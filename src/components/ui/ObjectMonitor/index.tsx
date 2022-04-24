import React from 'react'
import {
  Box,
  BoxProps,
} from '@chakra-ui/react'
import { ObjectMonitorInput } from './Input'
import { useForm } from 'react-hook-form'

type FormValuesProps = {
  width?: number
  height?: number
  depth?: number
}

type ObjectMonitorProps = {
  defaultValues?: FormValuesProps
  children?: React.ReactNode
  chakra?: BoxProps
  onChange?: (formId: string, value: number) => void
}

export const ObjectMonitor: React.FC<ObjectMonitorProps> = ({
  defaultValues = {},
  children,
  chakra,
  onChange,
}) => {
  const { register, handleSubmit } = useForm({
    defaultValues: Object.assign({
      width: 100,
      height: 100,
      depth: 100,
    }, defaultValues),
  })

  const handleChangeForm = (formId: string, value: number) => {
    if (typeof onChange === 'function') {
      onChange(formId, value)
    }
  }

  const handleSubmitForm = (formValues: any) => {
    console.log(formValues)
  }

  return (
    <Box
      as={'form'}
      color={'white'}
      bg="gray.800"
      p={4}
      position={'relative'}
      zIndex={'0'}
      {...chakra}
      onSubmit={handleSubmit(handleSubmitForm)}
    >
      <ObjectMonitorInput
        formId={'width'}
        label={'Width'}
        input={{
          type: 'number',
          ...register('width', {}),
        }}
        onChange={handleChangeForm}
      />

      <ObjectMonitorInput
        formId={'height'}
        label={'Height'}
        input={{
          type: 'number',
          ...register('height', {}),
        }}
        onChange={handleChangeForm}
      />

      <ObjectMonitorInput
        formId={'depth'}
        label={'Depth'}
        input={{
          type: 'number',
          ...register('depth', {}),
        }}
        onChange={handleChangeForm}
      />
    </Box>
  )
}
