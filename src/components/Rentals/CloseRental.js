import React, { Component } from 'react';
import './Create_Rental.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './CloseRental.css';
import Header from '../Dashboard/Header';

let url = 'http://localhost:8080';


export default class CloseRental extends Component {
    constructor() {
        super();

        this.state = {
            rentalID: null
        }
    }

    updateRentalID(num) {
        this.setState({
            rentalID: num
        })
    }

    closeRental(val) {
        if (this.state.rentalID !== null) {
            axios.put(`${url}/rentals/close_rental`, val)
                .then(res => alert("Order closed!"))
        } else {
            alert("Please specify a rental number!")
        }
    }

    render() {
        return (
            <div>
                <Header />
                <div className="close_rental_container">
                    <section className="close_rental_card">
                        <div className="close_rental_title">CLOSE RENTAL</div>
                        <h1>Rental #:</h1> 
                        <input onChange={(e) => { this.updateRentalID(e.target.value) }} placeholder="* REQUIRED" />
                        <div>Rental Lookup</div>
                        <button onClick={() => this.closeRental(this.state)}>Close Rental</button>
                        <Link to="/dashboard"><button>Cancel/Exit</button></Link>
                    </section>
                </div>
            </div>
        )
    }
}