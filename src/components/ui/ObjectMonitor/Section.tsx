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
    pb={'4'}
    _first={{
      mt: '0',
      borderTop: '0',
    }}
  >
    <Heading
      as={'h3'}
      size={'xs'}
      p={'2'}
    >{heading}</Heading>
    <Box px={'3'}>
      {children}
    </Box>
  </Box>
  )
}
