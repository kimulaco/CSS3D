import React from 'react'
import {
  Box,
  BoxProps,
  Flex,
  Heading,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { ObjectMonitorInput } from './Input'
import { ObjectMonitorSection } from './Section'
import { ProjectObject } from '../../../types/project'

type ObjectMonitorProps = {
  selectedObject: ProjectObject | undefined
  children?: React.ReactNode
  chakra?: BoxProps
  onChange?: (updatedProject: ProjectObject) => void
}

export const ObjectMonitor: React.FC<ObjectMonitorProps> = ({
  selectedObject,
  children,
  chakra,
  onChange,
}) => {
  const { register, handleSubmit } = useForm({
    defaultValues: Object.assign({
      width: 100,
      height: 100,
      depth: 100,
    }, {}),
  })

  const handleChangeForm = (formId: string, value: number) => {
    if (typeof onChange === 'function') {
      const updatedObject = {
        ...selectedObject,
        [formId]: value,
      }
      onChange(updatedObject as ProjectObject)
    }
  }

  const handleSubmitForm = (formValues: any) => {
    console.log(formValues)
  }

  if (!selectedObject) {
    return (<></>)
  }

  return (
    <Box
      as={'form'}
      color={'white'}
      bg="gray.800"
      p={4}
      overflow={'auto'}
      position={'relative'}
      zIndex={'0'}
      {...chakra}
      onSubmit={handleSubmit(handleSubmitForm)}
    >
      <Heading
        as={'h2'}
        display={'none'}
      >Object Detail</Heading>

      <ObjectMonitorSection
        heading={'Size'}
      >
        <Flex flexWrap={'wrap'}>
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
        </Flex>
      </ObjectMonitorSection>
    </Box>
  )
}
