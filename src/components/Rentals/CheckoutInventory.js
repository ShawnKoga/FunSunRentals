import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './CheckoutInventory.css';
import Header from '../Dashboard/Header';

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

    componentDidMount(){
        axios.get('/auth/authorized').then(user => {
            console.log('the response user', user)
            if(user.data.user === false) {
                this.props.history.push('/')
            } else {
                console.log('did this work?!?!?!?!?')
                this.setState({
                    user: user.data
                })
            }
        })
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
                <div key={i} className="pending_rental_info">
                    <div className="rental_info_container">
                    <div className="rental_info_key">Customer Name:&nbsp;</div><div className="rental_info_val">{c.firstname} {c.lastname} - {c.customer_id}</div>
                    </div>
                    <div className="rental_info_container">
                    <div className="rental_info_key">Phone:&nbsp;</div><div className="rental_info_val">{c.phone}</div>
                    </div>
                    <div className="rental_info_container">
                    <div className="rental_info_key">Email:&nbsp;</div><div className="rental_info_val">{c.email}</div>
                    </div>
                    <div className="rental_info_container">
                    <div className="rental_info_key">Start:&nbsp;</div><div className="rental_info_val">{start}</div>
                    </div>
                    <div className="rental_info_container">
                    <div className="rental_info_key">Due:&nbsp;</div><div className="rental_info_val">{end}</div>
                    </div>
                    <div className="rental_info_container">
                    <div className="rental_info_key">Paddleboards:&nbsp;</div><div className="rental_info_val">{c.paddleboards}</div>
                    </div>
                    <div className="rental_info_container">
                    <div className="rental_info_key">Kayaks:&nbsp;</div><div className="rental_info_val">{c.kayaks}</div>
                    </div>
                    <div className="rental_info_container">
                    <div className="rental_info_key">Roof Racks:&nbsp;</div><div className="rental_info_val">{c.roofracks}</div>
                    </div>
                    <div className="rental_info_container">
                    <div className="rental_info_key">Life Jackets:&nbsp;</div><div className="rental_info_val">{c.lifejackets}</div>
                    </div>
                    <button className="confirm_checkout_button" onClick={() => this.confirmCheckout(this.state)}>Confirm Inventory Checkout</button>
                    <Link to="/dashboard"><button className="back_to_dash_button" >Back to Dash</button></Link>
                </div>
            )
        })

        return (
            <div>
                <Header />
                <main className="inventory_checkout_main" >
                    <div className="inventory_checkout_container">
                        <h1> INVENTORY CHECKOUT</h1>
                        <div>
                            Rental #: <input onChange={(e) => this.updateRentalId(e.target.value)} />
                        </div>
                        <div className="checkout_button_container">
                            <button className="get_rental_info_button" onClick={() => this.getRentalInfo(this.state.rentalID)}>Get Rental Info</button>
                            <Link to="/dashboard"><button className="back_to_dash_button" >Cancel</button></Link>
                        </div>
                        {rentalDisplay}
                    </div>
                </main>
            </div>
        )
    }
}