import {createStore, compose, applyMiddleware} from 'redux'
import  {createLogger}  from 'redux-logger'
import reduxThunk from 'redux-thunk'
import { autoRehydrate } from 'redux-persist'
import { rootReducer } from 'AppRedux'
import Reactotron from 'reactotron-react-native'

const getMiddleware = () => {
    const middlewares = [reduxThunk];

    if(__DEV__){
        middlewares.push(createLogger())
    }
    return applyMiddleware(...middlewares);
}

const getEnhancers = () =>{
    const enhancers = [];

    enhancers.push(autoRehydrate());

    return enhancers;
};

export const configuredStore = Reactotron.createStore(
    rootReducer,
    compose(getMiddleware(), ...getEnhancers())
);