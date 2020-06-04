import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import client from '@utils/client'
import AppRouters from './routers'

const App = () => (
  <>
    <ApolloProvider client={client}>
      <AppRouters />
    </ApolloProvider>
  </>
)

export default App
