import { createStore } from 'redux'
import states from './states'

const globalState = (state = states, action) => {
  if (action.setAuth) {
    console.log(action.setAuth)
  }
  return state
}

const store = createStore(globalState)

// store.dispatch({ type: 'auth', setAuth: true })

export default store
