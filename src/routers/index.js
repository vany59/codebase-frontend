import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import lazyLoader from '@utils/lazyloader'
import routes from './router'

const AppRouters = () => {
  return (
    <>
      <Router>
        <Switch>
          {routes.map((router) => {
            const { path, exact, component } = router
            const Mycomponent = lazyLoader(component)
            return (
              <Route
                key={`${path}-${component}`}
                path={path}
                exact={exact}
                component={Mycomponent}
              />
            )
          })}
        </Switch>
      </Router>
    </>
  )
}

export default AppRouters
