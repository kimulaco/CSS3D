import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ChakraProvider, theme, Text } from '@chakra-ui/react'

const PageHome = lazy(() => import('./pages/'))

export const App = () => (
  <ChakraProvider theme={theme}>
    <Routes>
      <Route path="/" element={
        <Suspense fallback={<Text>Loading...</Text>}>
          <PageHome />
        </Suspense>
      } />
    </Routes>
  </ChakraProvider>
)
