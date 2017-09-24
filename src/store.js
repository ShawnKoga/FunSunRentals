import { createStore, applyMiddleware, combineReducers } from 'redux';
import dashReducer from './ducks/dashReducer';
import createRentalReducer from './ducks/createRentalReducer';
import promiseMiddleware from 'redux-promise-middleware';

const reducer = combineReducers({
    dashboard: dashReducer,
    newRental: createRentalReducer
})

export default createStore(
    reducer,
    applyMiddleware(promiseMiddleware())
)

