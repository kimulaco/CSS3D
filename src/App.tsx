import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ChakraProvider, theme, Text } from '@chakra-ui/react'
import {
  LayoutContainer,
  LayoutHeader,
  LayoutMain,
} from './components/ui/Layout/'

const PageHome = lazy(() => import(/* webpackChunkName: "home" */'./pages/'))

export const App = () => (
  <ChakraProvider theme={theme}>
    <LayoutContainer>
      <LayoutHeader />
      <LayoutMain>
        <Routes>
          <Route path="/" element={
            <Suspense fallback={<Text>Loading...</Text>}>
              <PageHome />
            </Suspense>
          } />
        </Routes>
      </LayoutMain>
    </LayoutContainer>
  </ChakraProvider>
)
