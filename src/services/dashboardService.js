import axios from 'axios';
let url = 'http://localhost:8080';


export function getActiveRentalCount() {
    return axios.get(`${url}/rentals/get_active_count`)
        .then(res => {
            return res.data
        })
}

export function getPendingRentals() {
    return axios.get(`${url}/rentals/get_pending_quick`)
        .then(res => {
            return res.data
        })
}

export function pastDueRentals() {
    return axios.get(`${url}/rentals/get_past_due`)
    .then(res => {
        return (res.data)
    })
}

export function upcomingDueRentals() {
    return axios.get(`${url}/rentals/get_upcoming_due`)
        .then(res => {
            return (res.data)
        })
}

export function getAvailPB() {
    return axios.get(`${url}/inventory/get_pb_avail`)
        .then(res => {
            return res.data[0].count
        })
}

export function getAvailKayaks() {
    return axios.get(`${url}/inventory/get_kayaks_avail`)
        .then(res => {
            return res.data[0].count
        })
}

export function getAvailLifeJackets() {
    return axios.get(`${url}/inventory/get_lj_avail`)
        .then(res => {
            return res.data[0].count
        })
}

export function getAvailRoofRacks() {
    return axios.get(`${url}/inventory/get_rr_avail`)
        .then(res => {
            return res.data[0].count
        })
}

export function quickClose(id) {
    return axios.put(`${url}/rentals/close_rental`, id)
    .then(res => {
        return res.data
    })
}

export function quickOpen(obj) {
    console.log('this is the obj to open', obj)
    return axios.put(`${url}/rentals/confirm_checkout`, obj)
    .then(res => {
        return res.data
    })
}