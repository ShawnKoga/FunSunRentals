import { createStore, applyMiddleware, combineReducers } from 'redux';
import dashReducer from './ducks/dashReducer';
import promiseMiddleware from 'redux-promise-middleware';

const reducer = combineReducers({
    dashboard: dashReducer,
})

export default createStore(
    reducer,
    applyMiddleware(promiseMiddleware())
)

