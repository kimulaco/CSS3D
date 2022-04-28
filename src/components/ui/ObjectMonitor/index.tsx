import React from 'react'
import {
  Box,
  BoxProps,
  Heading,
} from '@chakra-ui/react'
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
  if (!selectedObject) {
    return (<></>)
  }

  const handleChangeForm = (formId: string, value: number) => {
    if (typeof onChange === 'function') {
      const updatedObject = {
        ...selectedObject,
        [formId]: value,
      }
      onChange(updatedObject as ProjectObject)
    }
  }

  return (
    <Box
      as={'form'}
      color={'white'}
      bg="gray.900"
      overflow={'auto'}
      position={'relative'}
      zIndex={'0'}
      {...chakra}
    >
      <Heading
        as={'h2'}
        display={'none'}
      >Object Detail</Heading>

      <ObjectMonitorSection
        heading={'Rotate'}
      >
        <ObjectMonitorInput
          formId={'rotateX'}
          label={'X'}
          unit={'deg'}
          input={{
            value: selectedObject.rotateX,
          }}
          onChange={handleChangeForm}
        />
        <ObjectMonitorInput
          formId={'rotateY'}
          label={'Y'}
          unit={'deg'}
          input={{
            value: selectedObject.rotateY,
          }}
          onChange={handleChangeForm}
        />
      </ObjectMonitorSection>

      <ObjectMonitorSection
        heading={'Size'}
      >
        <ObjectMonitorInput
          formId={'width'}
          label={'Width'}
          unit={'px'}
          input={{
            value: selectedObject.width,
          }}
          onChange={handleChangeForm}
        />
        <ObjectMonitorInput
          formId={'height'}
          label={'Height'}
          unit={'px'}
          input={{
            value: selectedObject.height,
          }}
          onChange={handleChangeForm}
        />
        <ObjectMonitorInput
          formId={'depth'}
          label={'Depth'}
          unit={'px'}
          input={{
            value: selectedObject.depth,
          }}
          onChange={handleChangeForm}
        />
      </ObjectMonitorSection>
    </Box>
  )
}
