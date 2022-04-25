import React, { useEffect } from 'react'
import {
  Box,
  BoxProps,
  Flex,
  Heading,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { ObjectMonitorInput } from './Input'
import { ObjectMonitorSection } from './Section'
import { optimizeRotate } from '../../../utils/transform'
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
  const { register, getValues, setValue, handleSubmit } = useForm({
    defaultValues: Object.assign({
      rotateX: selectedObject?.rotateX,
      rotateY: selectedObject?.rotateX,
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

  useEffect(() => {
    if (
      selectedObject?.rotateX &&
      selectedObject.rotateX !== getValues('rotateX')
    ) {
      setValue('rotateX', optimizeRotate(selectedObject.rotateX))
    }
    if (
      selectedObject?.rotateY &&
      selectedObject.rotateY !== getValues('rotateY')
    ) {
      setValue('rotateY', optimizeRotate(selectedObject.rotateY))
    }
  }, [
    getValues,
    setValue,
    selectedObject?.rotateX,
    selectedObject?.rotateY,
  ])

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
        heading={'Rotate'}
      >
        <Flex flexWrap={'wrap'}>
          <ObjectMonitorInput
            formId={'rotateX'}
            label={'X'}
            input={{
              type: 'number',
              ...register('rotateX', {}),
            }}
            chakra={{ w: 'calc(100% / 3)' }}
            onChange={handleChangeForm}
          />
          <ObjectMonitorInput
            formId={'rotateY'}
            label={'Y'}
            input={{
              type: 'number',
              ...register('rotateY', {}),
            }}
            chakra={{ w: 'calc(100% / 3)' }}
            onChange={handleChangeForm}
          />
        </Flex>
      </ObjectMonitorSection>

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
            chakra={{ w: 'calc(100% / 3)' }}
            onChange={handleChangeForm}
          />
          <ObjectMonitorInput
            formId={'height'}
            label={'Height'}
            input={{
              type: 'number',
              ...register('height', {}),
            }}
            chakra={{ w: 'calc(100% / 3)' }}
            onChange={handleChangeForm}
          />
          <ObjectMonitorInput
            formId={'depth'}
            label={'Depth'}
            input={{
              type: 'number',
              ...register('depth', {}),
            }}
            chakra={{ w: 'calc(100% / 3)' }}
            onChange={handleChangeForm}
          />
        </Flex>
      </ObjectMonitorSection>
    </Box>
  )
}
