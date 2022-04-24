import { Box, BoxProps, Heading } from '@chakra-ui/react'

type ObjectMonitorSectionProps = {
  heading: string
  children?: React.ReactNode
  chakra?: BoxProps
}

export const ObjectMonitorSection: React.FC<ObjectMonitorSectionProps> = ({
  heading,
  children,
  chakra,
}) => {
  return (
  <Box
    as="section"
    p={2}
    pb={4}
    mt={4}
    border={'1px'}
    borderRadius={'sm'}
    _first={{
      mt: '0',
    }}
  >
    <Heading
      as={'h3'}
      size={'sm'}
      pb={2}
      mb={4}
      borderBottom={'1px'}
    >{heading}</Heading>
    <Box>
      {children}
    </Box>
  </Box>
  )
}
