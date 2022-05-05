import { Box, BoxProps, Heading } from '@chakra-ui/react'

type ObjectControllerSectionProps = {
  heading: string
  children?: React.ReactNode
  chakra?: BoxProps
}

export const ObjectControllerSection: React.FC<ObjectControllerSectionProps> = ({
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
      pt: '0',
      borderTop: '0',
    }}
    _last={{
      pb: '0',
    }}
  >
    <Heading
      as={'h4'}
      size={'xs'}
      px={'2'}
      py={'1'}
    >{heading}</Heading>
    <Box px={'3'}>
      {children}
    </Box>
  </Box>
  )
}
