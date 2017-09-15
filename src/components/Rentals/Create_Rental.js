import React, { Component } from 'react';
import './Create_Rental.css';
// import './AssignInventory.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import AssignInventory from './AssignInventory';
// import { connect } from 'react-redux';
// import { updateCustomerID, updateStartDate, updateEndDate } from '../../ducks/reducer'

let url = 'http://localhost:8080';

export default class Create_Rental extends Component {
    constructor(props) {
        super(props);

        this.state = {
            customerID: null,
            startDate: null,
            endDate: null,
            pbCount: 0,
            kayakCount: 0,
            roofRackCount: 0,
            lifeJacketCount: 0,
            newRentalID: null,

            //INVENTORY TOGGLES
            showInvMenu: false
        }

        this.toggleInvMenu = this.toggleInvMenu.bind(this);
    }

    updateCustomerID(num) {
        this.setState({
            customerID: num
        })
    }
    updateStartDate(date) {
        this.setState({
            startDate: date
        })
    }
    updateEndDate(date) {
        this.setState({
            endDate: date
        })
    }
    updatePBCount(num) {
        this.setState({
            pbCount: num
        })
    }
    updateKayakCount(num) {
        this.setState({
            kayakCount: num
        })
    }
    updateRoofRackCount(num) {
        this.setState({
            roofRackCount: num
        })
    }
    updateLifeJacketCount(num) {
        this.setState({
            lifeJacketCount: num
        })
    }
    createRental(obj) {
        if (this.state.customerID !== null && this.state.startDate !== null && this.state.endDate !== null) {
            axios.post(url + `/rentals/create_new_rental`, obj)
                .then((res) => {
                    alert(`Rental ${res.data[0].rental_id} has been created!`)
                    this.setState({
                        newRentalID: res.data[0].rental_id
                    })
                })
        }
    }
    
    toggleInvMenu() {
        if (this.state.customerID !== null && this.state.startDate !== null && this.state.endDate !== null) {
            this.setState({
                showInvMenu: !this.state.showInvMenu
            })
        } else {
            alert("Please fill in rental specs!")
        }
    }

    render() {
        return (
            <main>
                {/* <AssignInventory
                    toggleInvMenu={this.toggleInvMenu}
                    showInvMenu={this.state.showInvMenu}
                    customerID={this.state.customerID}
                    newRentalID={this.state.newRentalID}
                /> */}
                <div className="newRentalContainer">
                    <div className="create_rental_container">
                        <h1>CREATE RENTAL</h1>
                        Customer ID: <input onChange={(e) => this.updateCustomerID(e.target.value)} />
                        Start Date: <input type="date" onChange={(e) => this.updateStartDate(e.target.value)} />
                        End Date: <input type="date" onChange={(e) => this.updateEndDate(e.target.value)} />
                        Paddleboards: <input type="number" min="0" onChange={(e) => this.updatePBCount(e.target.value)} />
                        Kayaks: <input type="number" min="0" onChange={(e) => this.updateKayakCount(e.target.value)} />
                        Roof Racks: <input type="number" min="0" onChange={(e) => this.updateRoofRackCount(e.target.value)} />
                        Life Jackets: <input type="number" min="0" onChange={(e) => this.updateLifeJacketCount(e.target.value)} />
                        {/* <button onClick={() => this.toggleInvMenu() }>Checkout Inventory</button> */}
                        <button onClick={() => {this.createRental(this.state)}}>Create Rental</button>
                        <Link to="/dashboard"><button>Cancel</button></Link>
                    </div>
                </div>
            </main>
        )
    }
}

// function mapStateToProps(state) {
//     return state;
// }

// export default connect(mapStateToProps, { updateCustomerID, updateStartDate, updateEndDate })(Create_Rental);