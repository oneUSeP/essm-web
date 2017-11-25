import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { loadingBarReducer } from 'react-redux-loading-bar'
import app from './modules/app'
import auth from './modules/auth'
import track from './modules/track'
import admission from './modules/admission'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    // Add sync reducers here
    router,
    app,
    auth,
    track,
    admission,
    loadingBar: loadingBarReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
