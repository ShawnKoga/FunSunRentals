import axios from 'axios';

let url = 'http://localhost:8080';

//SET INITIAL STATE
const initialState = {
    user: {}
}

//ACTION TYPES
const GET_USER_INFO = "GET_USER_INFO";

//REDUCER FUNCTION
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER_INFO + '_FULFILLED':
            return Object.assign({}, state, { user: action.payload })
        default:
            return state;
    }
}

//ACTION CREATORS
export function getUserInfo() {
    // console.log('get user info fired')
    const userInfo = axios.get(`/auth/me`).then(res => {
        console.log('this is the res', res.data)
        return res.data
    })
    return {
        type: GET_USER_INFO,
        payload: userInfo
    }
}