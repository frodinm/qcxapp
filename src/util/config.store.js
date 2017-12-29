import { createStore } from 'redux';
import {persistedRootReducer} from 'AppRedux';

export const configureStore = (initialState) => {
  const store = createStore(persistedRootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../rootRedux', () => {
      const nextRootReducer = require('../rootRedux/index');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}