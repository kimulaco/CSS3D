import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ChakraProvider, theme } from '@chakra-ui/react'
import {
  LayoutContainer,
  LayoutHeader,
  LayoutMain,
} from './components/ui/Layout/'

const SuspenseFallback = () => {
  return <></>
}

const PageHome = lazy(() => import(/* webpackChunkName: "home" */'./pages/'))

export const App = () => (
  <ChakraProvider theme={theme}>
    <LayoutContainer>
      <LayoutHeader />
      <LayoutMain>
        <Routes>
          <Route path="/" element={
            <Suspense fallback={<SuspenseFallback />}>
              <PageHome />
            </Suspense>
          } />
        </Routes>
      </LayoutMain>
    </LayoutContainer>
  </ChakraProvider>
)
