import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './CheckoutInventory.css';

let url = 'http://localhost:8080';

export default class CheckoutInventory extends Component {
    constructor() {
        super();

        this.state = {
            customer_id: null,
            rental_id: null,
            rentalDisplay: [],
            paddleboards: 0,
            kayaks: 0,
            roofracks: 0,
            lifejackets: 0
        }
    }

    updateRentalId(e) {
        this.setState({
            rentalID: e
        })
    }

    getRentalInfo(num) {
        axios.get(url + `/rentals/get_rental/${num}`)
            .then((res) => {
                this.setState({
                    rentalDisplay: res.data,
                    rental_id: res.data[0].rental_id,
                    customer_id: res.data[0].customer_id,
                    paddleboards: res.data[0].paddleboards,
                    kayaks: res.data[0].kayaks,
                    roofracks: res.data[0].roofracks,
                    lifejackets: res.data[0].lifejackets
                })
            })
    }

    confirmCheckout(obj) {
        axios.put(url + `/rentals/confirm_checkout`, obj)
        .then(res => {
            alert(res.data)
        })
    }

    render() {
        const rentalDisplay = this.state.rentalDisplay.map((c, i) => {
            var start = (c.start_date).substring(0, (c.start_date).indexOf('T'));
            var end = (c.end_date).substring(0, (c.end_date).indexOf('T'));
            return (
                <div key={i}>
                    <h2>Rental #: {c.rental_id}</h2>
                    <h2>Customer Name - id: {c.firstname} {c.lastname} - {c.customer_id}</h2>
                    <h3>Phone: {c.phone} | Email: {c.email}</h3>
                    <div>Start: {start}</div>
                    <div>Due: {end}</div>
                    <div>Paddleboards: {c.paddleboards}</div>
                    <div>Kayaks: {c.kayaks}</div>
                    <div>Roof Racks: {c.roofracks}</div>
                    <div>Life Jackets: {c.lifejackets}</div>
                    <button onClick={() => this.confirmCheckout(this.state)}>Confirm Inventory Checkout</button>
                    <Link to="/dashboard"><button>Done</button></Link>
                </div>
            )
        })

        return (
            <main className="inventory_checkout_main" >
                <h1> INVENTORY CHECKOUT</h1>
                <div>
                    Rental #: <input onChange={(e) => this.updateRentalId(e.target.value)} />
                </div>
                <div>
                    <button onClick={() => this.getRentalInfo(this.state.rentalID)}>Get Rental Info</button>
                    <Link to="/dashboard"><button>Cancel</button></Link>
                </div>
                <div className="rental_info">
                    { rentalDisplay }
                </div>
            </main>
        )
    }
}