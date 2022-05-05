import React from 'react'
import {
  Box,
  BoxProps,
} from '@chakra-ui/react'
import { ObjectControllerInput } from './Input'
import { ObjectControllerInputColor } from './InputColor'
import { ObjectControllerSection } from './Section'
import { ProjectObject } from '../../../types/project'

type ObjectControllerItemProps = {
  object: ProjectObject
  chakra?: BoxProps
  onChange?: (updatedProject: ProjectObject) => void
}

export const ObjectControllerItem: React.FC<ObjectControllerItemProps> = ({
  object,
  chakra,
  onChange,
}) => {
  const handleChangeValue = (formId: string, value: string|number) => {
    if (typeof onChange === 'function') {
      const updatedObject = {
        ...object,
        [formId]: value,
      }
      onChange(updatedObject as ProjectObject)
    }
  }

  return (
    <Box {...chakra}>
      <ObjectControllerSection
        heading={'Size'}
      >
        <ObjectControllerInput
          formId={'width'}
          label={'Width'}
          unit={'px'}
          input={{
            value: object.width,
            min: 1,
          }}
          onChange={handleChangeValue}
        />
        <ObjectControllerInput
          formId={'height'}
          label={'Height'}
          unit={'px'}
          input={{
            value: object.height,
            min: 1,
          }}
          onChange={handleChangeValue}
        />
        <ObjectControllerInput
          formId={'depth'}
          label={'Depth'}
          unit={'px'}
          input={{
            value: object.depth,
            min: 1,
          }}
          onChange={handleChangeValue}
        />
      </ObjectControllerSection>

      <ObjectControllerSection
        heading={'Color'}
      >
        <ObjectControllerInputColor
          formId={'bg'}
          label={'Color'}
          type={'color'}
          input={{
            value: object.bg,
          }}
          onChange={handleChangeValue}
        />
        <ObjectControllerInputColor
          formId={'borderColor'}
          label={'Border'}
          type={'color'}
          input={{
            value: object.borderColor,
          }}
          onChange={handleChangeValue}
        />
      </ObjectControllerSection>

      <ObjectControllerSection
        heading={'Transform'}
      >
        <ObjectControllerInput
          formId={'rotateX'}
          label={'RotateX'}
          unit={'deg'}
          input={{
            value: object.rotateX,
          }}
          onChange={handleChangeValue}
        />
        <ObjectControllerInput
          formId={'rotateY'}
          label={'RotateY'}
          unit={'deg'}
          input={{
            value: object.rotateY,
          }}
          onChange={handleChangeValue}
        />
        <ObjectControllerInput
          formId={'translateX'}
          label={'TranslateX'}
          unit={'px'}
          input={{
            value: object.translateX,
          }}
          onChange={handleChangeValue}
        />
        <ObjectControllerInput
          formId={'translateY'}
          label={'TranslateY'}
          unit={'px'}
          input={{
            value: object.translateY,
          }}
          onChange={handleChangeValue}
        />
        <ObjectControllerInput
          formId={'translateZ'}
          label={'TranslateZ'}
          unit={'px'}
          input={{
            value: object.translateZ,
          }}
          onChange={handleChangeValue}
        />
      </ObjectControllerSection>
    </Box>
  )
}
