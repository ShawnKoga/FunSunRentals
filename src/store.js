import { createStore, applyMiddleware, combineReducers } from 'redux';
import dashReducer from './ducks/dashReducer';
import createRentalReducer from './ducks/createRentalReducer';
import userReducer from './ducks/userReducer';
import promiseMiddleware from 'redux-promise-middleware';

const reducer = combineReducers({
    dashboard: dashReducer,
    newRental: createRentalReducer,
    userReducer: userReducer
})

export default createStore(
    reducer,
    applyMiddleware(promiseMiddleware())
)

