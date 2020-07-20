import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import lazyLoader from '@utils/lazyloader'
import routes from './router'
import PageNotFound from '../pages/notfound'

const AppRouters = () => {
  const getRoute = routes
    .map((router) => router.path)
    .filter((router) => router === window.location.pathname)
  return (
    <>
      <Router>
        <Switch>
          {getRoute.length &&
            routes.map((router) => {
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
          {!getRoute.length && (
            <Route
              key="pageNotFound"
              path={window.location.pathname}
              exact
              component={PageNotFound}
            />
          )}
        </Switch>
      </Router>
    </>
  )
}

export default AppRouters
