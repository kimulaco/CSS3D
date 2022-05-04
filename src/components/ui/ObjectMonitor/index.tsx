import React from 'react'
import {
  Box,
  BoxProps,
  Heading,
} from '@chakra-ui/react'
import { ObjectMonitorInput } from './Input'
import { ObjectMonitorInputColor } from './InputColor'
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

  const handleChangeValue = (formId: string, value: number) => {
    if (typeof onChange === 'function') {
      const updatedObject = {
        ...selectedObject,
        [formId]: value,
      }
      onChange(updatedObject as ProjectObject)
    }
  }

  const handleChangeColor = (formId: string, value: string) => {
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
      bg="gray.800"
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
        heading={'Size'}
      >
        <ObjectMonitorInput
          formId={'width'}
          label={'Width'}
          unit={'px'}
          input={{
            value: selectedObject.width,
            min: 1,
          }}
          onChange={handleChangeValue}
        />
        <ObjectMonitorInput
          formId={'height'}
          label={'Height'}
          unit={'px'}
          input={{
            value: selectedObject.height,
            min: 1,
          }}
          onChange={handleChangeValue}
        />
        <ObjectMonitorInput
          formId={'depth'}
          label={'Depth'}
          unit={'px'}
          input={{
            value: selectedObject.depth,
            min: 1,
          }}
          onChange={handleChangeValue}
        />
      </ObjectMonitorSection>

      <ObjectMonitorSection
        heading={'Color'}
      >
        <ObjectMonitorInputColor
          formId={'bg'}
          label={'Color'}
          type={'color'}
          input={{
            value: selectedObject.bg,
          }}
          onChange={handleChangeColor}
        />
        <ObjectMonitorInputColor
          formId={'borderColor'}
          label={'Border'}
          type={'color'}
          input={{
            value: selectedObject.borderColor,
          }}
          onChange={handleChangeColor}
        />
      </ObjectMonitorSection>

      <ObjectMonitorSection
        heading={'Transform'}
      >
        <ObjectMonitorInput
          formId={'rotateX'}
          label={'RotateX'}
          unit={'deg'}
          input={{
            value: selectedObject.rotateX,
          }}
          onChange={handleChangeValue}
        />
        <ObjectMonitorInput
          formId={'rotateY'}
          label={'RotateY'}
          unit={'deg'}
          input={{
            value: selectedObject.rotateY,
          }}
          onChange={handleChangeValue}
        />
      </ObjectMonitorSection>
    </Box>
  )
}
