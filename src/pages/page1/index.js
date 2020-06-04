import React from 'react'
import store from '@utils/reduxStore'
import { useLazyQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const GET_DATA = gql`
  {
    hello
  }
`

const Page1 = () => {
  const [getData, { loading, data }] = useLazyQuery(GET_DATA)

  store.subscribe(() => {
    console.log(store.getState())
  })

  if (loading) return <p>Loading...</p>
  if (data) {
    console.log(data)
  }

  const click = () => {
    console.log('clicked')
    getData()
  }

  return (
    <>
      <h1>Page1</h1>
      <button onClick={click}>click me!</button>
    </>
  )
}

export default Page1
