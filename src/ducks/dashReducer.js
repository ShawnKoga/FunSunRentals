import * as dashboardService from '../services/dashboardService';
import axios from 'axios';
let url = 'http://localhost:8080';

let initialState = {
    activeRentalCount: [],
    currentAvailPB: 0,
    currentAvailKayaks: 0,
    currentAvailLifeJackets: 0,
    currentAvailRoofRacks: 0,
    pastDueRentals: [],
    upcomingDueRentals: [],
    pendingRentals: [],
    widgetRotate: 1,
    rentalToEdit: []
}

//CONSTANTS
const GET_ACTIVE_RENTALS = "GET_ACTIVE_RENTALS";
const GET_ACTIVE_RENTALS_FULFILLED = "GET_ACTIVE_RENTALS_FULFILLED";
const GET_PENDING_RENTALS = "GET_PENDING_RENTALS";
const GET_PENDING_RENTALS_FULFILLED = "GET_PENDING_RENTALS_FULFILLED";
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
const QUICK_CLOSE_FULFILLED = "QUICK_CLOSE_FULFILLED";
const QUICK_OPEN = "QUICK_OPEN";
const QUICK_OPEN_FULFILLED = "QUICK_OPEN_FULFILLED";
const QUICK_EDIT = "QUICK_EDIT";
const QUICK_EDIT_FULFILLED = "QUICK_EDIT_FULFILLED";
const OPEN_WIDGET_BUTTON = "OPEN_WIDGET_BUTTON";
const PAST_WIDGET_BUTTON = "PAST_WIDGET_BUTTON";
const SOON_WIDGET_BUTTON = "SOON_WIDGET_BUTTON";
const PENDING_WIDGET_BUTTON = "PENDING_WIDGET_BUTTON";

const TEST_CLOSER = "TEST_CLOSER";
const TEST_OPENER = "TEST_OPENER";

//REDUCER
export default function dashReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ACTIVE_RENTALS_FULFILLED:
            return Object.assign({}, state, { activeRentalCount: action.payload })

        case GET_PENDING_RENTALS_FULFILLED:
            return Object.assign({}, state, { pendingRentals: action.payload })

        case GET_PAST_DUE_FULFILLED:
            return Object.assign({}, state, { pastDueRentals: action.payload })

        case GET_UPCOMING_DUE_FULFILLED:
            return Object.assign({}, state, { upcomingDueRentals: action.payload })

        case GET_AVAIL_PB_FULFILLED:
            return Object.assign({}, state, { currentAvailPB: action.payload })

        case GET_AVAIL_KAYAKS_FULFILLED:
            return Object.assign({}, state, { currentAvailKayaks: action.payload })

        case GET_AVAIL_LIFEJACKETS_FULFILLED:
            return Object.assign({}, state, { currentAvailLifeJackets: action.payload })

        case GET_AVAIL_ROOFRACKS_FULFILLED:
            console.log('case hit')
            console.log(Object.assign({}, state, { currentAvailRoofRacks: action.payload }))
            return Object.assign({}, state, { currentAvailRoofRacks: action.payload })

        case QUICK_CLOSE_FULFILLED:
            console.log('yatayata', action.payload)
            return Object.assign({}, state, { activeRentalCount: action.payload })

        case QUICK_OPEN_FULFILLED:
            return Object.assign({}, state, { activeRentalCount: action.payload })

        case QUICK_EDIT_FULFILLED:
            console.log('yoyo payload', action.payload)
            return Object.assign({}, state, { rentalToEdit: action.payload })

        case OPEN_WIDGET_BUTTON:
            return Object.assign({}, state, { widgetRotate: action.payload })

        case PAST_WIDGET_BUTTON:
            return Object.assign({}, state, { widgetRotate: action.payload })

        case SOON_WIDGET_BUTTON:
            return Object.assign({}, state, { widgetRotate: action.payload })

        case PENDING_WIDGET_BUTTON:
            return Object.assign({}, state, { widgetRotate: action.payload })

        case TEST_CLOSER + '_FULFILLED':
            console.log('hit3', action.payload)
            var updatedInv = {
                currentAvailPB: action.payload.pb,
                currentAvailKayaks: action.payload.kayaks,
                currentAvailLifeJackets: action.payload.jackets,
                currentAvailRoofRacks: action.payload.rr,
                upcomingDueRentals: action.payload.dueSoon,
                pastDueRentals: action.payload.pastDue
            }
            return Object.assign({}, state, updatedInv)

        case TEST_OPENER + '_FULFILLED':
            console.log('hit3', action.payload)
            var updateInv = {
                currentAvailPB: action.payload.pb,
                currentAvailKayaks: action.payload.kayaks,
                currentAvailLifeJackets: action.payload.jackets,
                currentAvailRoofRacks: action.payload.rr,
                upcomingDueRentals: action.payload.dueSoon,
                pastDueRentals: action.payload.pastDue,
                activeRentalCount: action.payload.openRentals,
                pendingRentals: action.payload.pendingRentals
            }
            return Object.assign({}, state, updateInv)
        
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

export function getPendingRentals() {
    return {
        type: GET_PENDING_RENTALS,
        payload: dashboardService.getPendingRentals()
    }
}

export function getPastDue() {
    return {
        type: GET_PAST_DUE,
        payload: dashboardService.pastDueRentals()
    }
}

export function getUpcomingDue() {
    return {
        type: GET_UPCOMING_DUE,
        payload: dashboardService.upcomingDueRentals()
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
    console.log('awe;ltl')    
    return {
        type: GET_AVAIL_ROOFRACKS,
        payload: dashboardService.getAvailRoofRacks()
    }
}

export function quickClose(id) {
    var runFunctionPlease = dashboardService.quickClose(id).then(res => {
        console.log('weopfei', res)
        return res
    })
    return {
        type: QUICK_CLOSE,
        payload: runFunctionPlease,
    }
}

export function quickOpen(obj) {
    console.log('FIRE AWAY', obj)
    return {
        type: QUICK_OPEN,
        payload: dashboardService.quickOpen(obj),
    }
}

export function quickEdit(num) {
    return {
        type: QUICK_EDIT,
        payload: dashboardService.quickEdit(num)
    }
}

export function openWidgetButton(click) {
    return {
        type: OPEN_WIDGET_BUTTON,
        payload: click
    }
}

export function pastWidgetButton(click) {
    return {
        type: PAST_WIDGET_BUTTON,
        payload: click
    }
}

export function soonWidgetButton(click) {
    return {
        type: SOON_WIDGET_BUTTON,
        payload: click
    }
}

export function pendingWidgetButton(click) {
    return {
        type: PENDING_WIDGET_BUTTON,
        payload: click
    }
}

export function testCloser() {
    const inv = axios.get(`${url}/test/test`).then(res => {
        console.log('hit2', res)
        return res.data
    })
    return {
        type: TEST_CLOSER,
        payload: inv
    }
}

export function testOpener() {
    const inv = axios.get(`${url}/test/test`).then(res => {
        console.log('hit2', res)
        return res.data
    })
    return {
        type: TEST_OPENER,
        payload: inv
    }
}