import React, { Component } from 'react';
import './Create_Rental.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateCustomerID, updateStartDate, updateEndDate, updatePBCount, updateKayakCount, updateRoofRackCount, updateLifeJacketCount, resetRentalInfo } from '../../ducks/createRentalReducer';
import Header from '../Dashboard/Header';

let url = 'http://localhost:8080';

class Create_Rental extends Component {

    componentDidMount() {
        this.props.resetRentalInfo();
    }

    createRental(obj) {
        if (this.props.newRental.customerID !== null && this.props.newRental.startDate !== null && this.props.newRental.endDate !== null) {
            axios.post(url + `/rentals/create_new_rental`, obj)
                .then((res) => {
                    alert(`Rental ${res.data[0].rental_id} has been created!`)
                    this.setState({
                        newRentalID: res.data[0].rental_id
                    })
                })
        } else {
            alert('Please fill out rental specs!')
        }
    }



    render() {
        return (
            <main>
                <Header />
                <div className="newRentalContainer">
                    <div className="transparency_hue">
                        <div className="create_rental_container">
                            <div className="create_rental_title">CREATE RENTAL</div>
                            <div className="create_rental_category">Customer ID: </div>
                            <input placeholder={this.props.newRental.customerID} value={this.props.newRental.customerID} onChange={(e) => this.props.updateCustomerID(e.target.value)} />
                            <button className="customer_lookup_button">Customer Lookup</button>

                            <div className="create_rental_category">Start Date: </div>
                            <input className="input_box" type="date" onChange={(e) => this.props.updateStartDate(e.target.value)} />

                            <div className="create_rental_category">End Date: </div>
                            <input className="input_box" type="date" onChange={(e) => this.props.updateEndDate(e.target.value)} />

                            <div className="create_rental_category">Paddleboards: </div>
                            <input className="input_box" type="number" min="0" onChange={(e) => this.props.updatePBCount(e.target.value)} />

                            <div className="create_rental_category">Kayaks: </div>
                            <input className="input_box" type="number" min="0" onChange={(e) => this.props.updateKayakCount(e.target.value)} />

                            <div className="create_rental_category">Roof Racks: </div>
                            <input className="input_box" type="number" min="0" onChange={(e) => this.props.updateRoofRackCount(e.target.value)} />

                            <div className="create_rental_category">Life Jackets: </div>
                            <input className="input_box" type="number" min="0" onChange={(e) => this.props.updateLifeJacketCount(e.target.value)} />

                            <button onClick={() => {this.createRental(this.props.newRental)}}>Create Rental</button>
                            <Link to="/dashboard"><button>Cancel</button></Link>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps, { updateCustomerID, updateStartDate, updateEndDate, updatePBCount, updateKayakCount, updateRoofRackCount, updateLifeJacketCount, resetRentalInfo })(Create_Rental);