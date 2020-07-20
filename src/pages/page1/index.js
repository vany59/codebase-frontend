import React from 'react'
import store from '@utils/reduxStore'

const Page1 = () => {
  store.subscribe(() => {
    console.log(store.getState())
  })

  return (
    <>
      <h1>Page1</h1>
    </>
  )
}

export default Page1
