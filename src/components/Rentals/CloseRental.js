import React, { Component } from 'react';
import './Create_Rental.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './CloseRental.css';

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
            axios.put(url + `/rentals/close_rental`, val)
                .then(res => alert(res.data))
        } else {
            alert("Please specify a rental number!")
        }
    }

    render() {
        return (
            <div className="close_rental_container">
                <h1>CLOSE RENTAL</h1>
                Rental #: <input onChange={(e) => { this.updateRentalID(e.target.value) }} placeholder="* REQUIRED" />
                <button onClick={() => this.closeRental(this.state)}>Close Rental</button>
                <Link to="/dashboard"><button>Cancel/Exit</button></Link>
            </div>
        )
    }
}