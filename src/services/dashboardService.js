import axios from 'axios';
let url = 'http://localhost:8080';


export function getActiveRentalCount() {
    return axios.get(`${url}/rentals/get_active_count`)
        .then(res => {
            return res.data[0].count
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