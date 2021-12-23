import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { rootReducer } from './rootReducer';

const composedEnhancer = composeWithDevTools({
  trace: true,
  traceLimit: 25,
});

const store = createStore(
  rootReducer,
  composedEnhancer(applyMiddleware(loggerMiddleware, thunkMiddleware))
);

export default store;
