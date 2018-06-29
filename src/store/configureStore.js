import { createStore, applyMiddleware ,compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux'
const history = createHistory();

const finalCreateStore = compose(
    applyMiddleware(thunk, logger, routerMiddleware(history)),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
)(createStore);

function logger({ getState }) {
  return next => action => {
    console.log('will dispatch', action)

    // Call the next dispatch method in the middleware chain.
    let returnValue = next(action)

    console.log('state after dispatch', getState())

    // This will likely be the action itself, unless
    // a middleware further in chain changed it.
    return returnValue
  }
}

/**
 * 构建store方法
 */
export default function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState, applyMiddleware(thunk));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers/index')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}


