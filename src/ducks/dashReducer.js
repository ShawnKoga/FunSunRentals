import * as dashboardService from '../services/dashboardService';

let initialState = {
    activeRentalCount: [],
    currentAvailPB: 0,
    currentAvailKayaks: 0,
    currentAvailLifeJackets: 0,
    currentAvailRoofRacks: 0,
    pastDueRentals: 0,
    upcomingDueRentals: 0,
    propsChecker: 0
}

//CONSTANTS
const GET_ACTIVE_RENTALS = "GET_ACTIVE_RENTALS";
const GET_ACTIVE_RENTALS_FULFILLED = "GET_ACTIVE_RENTALS_FULFILLED";
const GET_AVAIL_PB = "GET_AVAIL_PB";
const GET_AVAIL_PB_FULFILLED = "GET_AVAIL_PB_FULFILLED";
const GET_AVAIL_KAYAKS = "GET_AVAIL_KAYAKS";
const GET_AVAIL_KAYAKS_FULFILLED = "GET_AVAIL_KAYAKS_FULFILLED";
const GET_AVAIL_LIFEJACKETS = "GET_AVAIL_LIFEJACKETS";
const GET_AVAIL_LIFEJACKETS_FULFILLED = "GET_AVAIL_LIFEJACKETS_FULFILLED";
const GET_AVAIL_ROOFRACKS = "GET_AVAIL_ROOFRACKS";
const GET_AVAIL_ROOFRACKS_FULFILLED = "GET_AVAIL_ROOFRACKS_FULFILLED";
const GET_UPCOMING_DUE = "GET_UPCOMING_DUE";
const GET_UPCOMING_DUE_FULFILLED = "GET_UPCOMING_DUE_FULFILLED";
const GET_PAST_DUE = "GET_PAST_DUE";
const GET_PAST_DUE_FULFILLED = "GET_PAST_DUE_FULFILLED";
const QUICK_CLOSE = "QUICK_CLOSE";
const QUICK_CLOSE_FULFILLED = "QUICK_CLOSE";

//REDUCER
export default function dashReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ACTIVE_RENTALS_FULFILLED:
            return Object.assign({}, state, { activeRentalCount: action.payload })

        case GET_AVAIL_PB_FULFILLED:
            return Object.assign({}, state, { currentAvailPB: action.payload })
        
        case GET_AVAIL_KAYAKS_FULFILLED:
            return Object.assign({}, state, { currentAvailKayaks: action.payload })

        case GET_AVAIL_LIFEJACKETS_FULFILLED:
            return Object.assign({}, state, { currentAvailLifeJackets: action.payload })
        
        case GET_AVAIL_ROOFRACKS_FULFILLED:
            return Object.assign({}, state, { currentAvailRoofRacks: action.payload })

        case GET_UPCOMING_DUE_FULFILLED:
            return Object.assign({}, state, { upcomingDueRentals: action.payload })

        case GET_PAST_DUE_FULFILLED:
            return Object.assign({}, state, { pastDueRentals: action.payload })

        case QUICK_CLOSE_FULFILLED:
            return Object.assign({}, state, { activeRentalCount: action.payload })
            
        default:
            return state
    }
}

//ACTION CREATORS
export function getActiveRentalCount() {
    return {
        type: GET_ACTIVE_RENTALS,
        payload: dashboardService.getActiveRentalCount()
    }
}

export function getAvailPB() {
    return {
        type: GET_AVAIL_PB,
        payload: dashboardService.getAvailPB()
    }
}

export function getAvailKayaks() {
    return {
        type: GET_AVAIL_KAYAKS,
        payload: dashboardService.getAvailKayaks()
    }
}

export function getAvailLifeJackets() {
    return {
        type: GET_AVAIL_LIFEJACKETS,
        payload: dashboardService.getAvailLifeJackets()
    }
}

export function getAvailRoofRacks() {
    return {
        type: GET_AVAIL_ROOFRACKS,
        payload: dashboardService.getAvailRoofRacks()
    }
}

export function getUpcomingDue() {
    return {
        type: GET_UPCOMING_DUE,
        payload: dashboardService.upcomingDueRentals()
    }
}

export function getPastDue() {
    return {
        type: GET_PAST_DUE,
        payload: dashboardService.pastDueRentals()
    }
}

export function quickClose(id) {
    return {
        type: QUICK_CLOSE,
        payload: dashboardService.quickClose(id)
    }
}