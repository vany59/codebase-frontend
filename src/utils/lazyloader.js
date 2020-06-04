import React, { lazy, Suspense } from 'react'

const lazyLoader = (component) => {
  const Component = lazy(() => import(`@pages/${component}`))
  const Mycomponent = () => (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Component />
      </Suspense>
    </div>
  )
  return Mycomponent
}

export default lazyLoader
