// import axios from 'axios';
// let url = 'http://localhost:8080';

let initialState = {
    customerID: 0,
    startDate: null,
    endDate: null,
    pbCount: 0,
    kayakCount: 0,
    roofRackCount: 0,
    lifeJacketCount: 0,
    newRentalID: null,
}

//CONSTANTS
const UPDATE_CUSTOMER_ID = "UPDATE_CUSTOMER_ID";
const UPDATE_START_DATE = "UPDATE_START_DATE";
const UPDATE_END_DATE = "UPDATE_END_DATE";
const UPDATE_PB_COUNT = "UPDATE_PB_COUNT";
const UPDATE_KAYAK_COUNT = "UPDATE_KAYAK_COUNT";
const UPDATE_ROOFRACK_COUNT = "UPDATE_ROOFRACK_COUNT";
const UPDATE_LIFEJACKET_COUNT = "UPDATE_LIFEJACKET_COUNT";
const RESET_RENTAL_INFO = "RESET_RENTAL_INFO";


//REDUCER
export default function createRentalReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_CUSTOMER_ID:
            return Object.assign({}, state, { customerID: action.payload })
        case UPDATE_START_DATE:
            return Object.assign({}, state, { startDate: action.payload })
        case UPDATE_END_DATE:
            return Object.assign({}, state, { endDate: action.payload })
        case UPDATE_PB_COUNT:
            return Object.assign({}, state, { pbCount: action.payload })
        case UPDATE_KAYAK_COUNT:
            return Object.assign({}, state, { kayakCount: action.payload })
        case UPDATE_ROOFRACK_COUNT:
            return Object.assign({}, state, { roofRackCount: action.payload })
        case UPDATE_LIFEJACKET_COUNT:
            return Object.assign({}, state, { lifeJacketCount: action.payload })
        case RESET_RENTAL_INFO:
            return Object.assign({}, state, {
                startDate: action.payload,
                endDate: action.payload,
                pbCount: 0,
                kayakCount: 0,
                roofRackCount: 0,
                lifeJacketCount: 0,
                newRentalID: action.payload
            })

        default:
            return state
    }
}

//ACTION CREATORS
export function updateCustomerID(num) {
    return {
        type: UPDATE_CUSTOMER_ID,
        payload: num
    }
}
export function updateStartDate(date) {
    return {
        type: UPDATE_START_DATE,
        payload: date
    }
}
export function updateEndDate(date) {
    return {
        type: UPDATE_END_DATE,
        payload: date
    }
}
export function updatePBCount(num) {
    return {
        type: UPDATE_PB_COUNT,
        payload: num
    }
}
export function updateKayakCount(num) {
    return {
        type: UPDATE_KAYAK_COUNT,
        payload: num
    }
}
export function updateRoofRackCount(num) {
    return {
        type: UPDATE_ROOFRACK_COUNT,
        payload: num
    }
}
export function updateLifeJacketCount(num) {
    return {
        type: UPDATE_LIFEJACKET_COUNT,
        payload: num
    }
}
export function resetRentalInfo() {
    return {
        type: RESET_RENTAL_INFO,
        payload: null
    }
}