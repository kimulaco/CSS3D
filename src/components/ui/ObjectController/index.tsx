import React from 'react'
import {
  Box,
  BoxProps,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react'
import { ObjectControllerItem } from './Item'
import { ProjectObject } from '../../../types/project'

type ObjectControllerProps = {
  objects: ProjectObject[]
  children?: React.ReactNode
  chakra?: BoxProps
  onChange?: (updatedProject: ProjectObject) => void
}

export const ObjectController: React.FC<ObjectControllerProps> = ({
  objects,
  children,
  chakra,
  onChange,
}) => {
  return (
    <Box {...chakra}>
      <Heading
        as={'h2'}
        bg={'gray.900'}
        borderTopWidth={'2px'}
        borderTopColor={'gray.800'}
        p={2}
        fontSize={'sm'}
      >Objects</Heading>

      <Accordion
        defaultIndex={[0]}
        allowToggle
        allowMultiple
      >
        {objects.map((object: ProjectObject) => {
          return (
            <AccordionItem
              key={`ObjectController_${object.objectId}`}
              borderColor={'gray.700'}
            >
              <Heading as={'h3'}>
                <AccordionButton
                  px={'2'}
                  fontSize={'sm'}
                  fontWeight={'bold'}
                >
                  {object.objectId}
                  <AccordionIcon ml={'auto'} />
                </AccordionButton>
              </Heading>

              <AccordionPanel pt={'0'} px={'0'} pb={'2'}>
                <ObjectControllerItem
                  object={object}
                  onChange={onChange}
                />
              </AccordionPanel>
            </AccordionItem>
          )
        })}
      </Accordion>
    </Box>
  )
}
