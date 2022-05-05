import React from 'react'
import { Box, BoxProps } from '@chakra-ui/react'
import { ObjectControllerInputText } from './InputText'
import { ObjectControllerInputNumber } from './InputNumber'
import { ObjectControllerInputColor } from './InputColor'
import { ObjectControllerSection } from './Section'
import { ProjectObject } from '../../../types/project'

type ObjectControllerItemProps = {
  object: ProjectObject
  chakra?: BoxProps
  onChange?: (
    objectId: ProjectObject['objectId'],
    updatedObject: ProjectObject,
  ) => void
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
      onChange(object.objectId, updatedObject as ProjectObject)
    }
  }

  return (
    <Box {...chakra}>
      <ObjectControllerSection
        heading={'Info'}
      >
        <ObjectControllerInputText
          formId={'objectId'}
          label={'ID'}
          unit={''}
          input={{
            value: object.objectId,
            min: 1,
          }}
          onChange={handleChangeValue}
        />
        <ObjectControllerInputNumber
          formId={'zIndex'}
          label={'zIndex'}
          unit={''}
          input={{
            value: object.zIndex,
            min: 0,
          }}
          onChange={handleChangeValue}
        />
      </ObjectControllerSection>

      <ObjectControllerSection
        heading={'Size'}
      >
        <ObjectControllerInputNumber
          formId={'width'}
          label={'Width'}
          unit={'px'}
          input={{
            value: object.width,
            min: 1,
          }}
          onChange={handleChangeValue}
        />
        <ObjectControllerInputNumber
          formId={'height'}
          label={'Height'}
          unit={'px'}
          input={{
            value: object.height,
            min: 1,
          }}
          onChange={handleChangeValue}
        />
        <ObjectControllerInputNumber
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
        <ObjectControllerInputNumber
          formId={'rotateX'}
          label={'RotateX'}
          unit={'deg'}
          input={{
            value: object.rotateX,
          }}
          onChange={handleChangeValue}
        />
        <ObjectControllerInputNumber
          formId={'rotateY'}
          label={'RotateY'}
          unit={'deg'}
          input={{
            value: object.rotateY,
          }}
          onChange={handleChangeValue}
        />
        <ObjectControllerInputNumber
          formId={'translateX'}
          label={'TranslateX'}
          unit={'px'}
          input={{
            value: object.translateX,
          }}
          onChange={handleChangeValue}
        />
        <ObjectControllerInputNumber
          formId={'translateY'}
          label={'TranslateY'}
          unit={'px'}
          input={{
            value: object.translateY,
          }}
          onChange={handleChangeValue}
        />
        <ObjectControllerInputNumber
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
