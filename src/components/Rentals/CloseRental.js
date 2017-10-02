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
                        <div className="close_rental_id">Rental #:</div> 
                        <input className="close_rental_id_input" onChange={(e) => { this.updateRentalID(e.target.value) }} />
                        <Link to="/rental_lookup" className="rental_lookup_link">Rental Lookup</Link>
                        <button className="close_rental_p_button" onClick={() => this.closeRental(this.state)}>Close Rental</button>
                        <Link to="/dashboard"><button className="close_rental_cancel_button">Cancel/Exit</button></Link>
                    </section>
                </div>
            </div>
        )
    }
}