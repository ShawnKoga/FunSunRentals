import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

let url = 'http://localhost:8080';

export default class Create_Customer extends Component {
    constructor() {
        super();

        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            address: "",
            city: "",
            state: "",
            zip: null,
            customerDisplay: []
        }
    }

    updateFirstName(e) {
        this.setState({
            firstName: e
        })
    }
    updateLastName(e) {
        this.setState({
            lastName: e
        })
    }
    updateEmail(e) {
        this.setState({
            email: e
        })
    }
    updatePhone(e) {
        this.setState({
            phone: e
        })
    }
    updateAddress(e) {
        this.setState({
            address: e
        })
    }
    updateCity(e) {
        this.setState({
            city: e
        })
    }
    updateState(e) {
        this.setState({
            state: e
        })
    }
    updateZip(e) {
        this.setState({
            zip: e
        })
    }
    createCustomer(obj) {
        axios.post(url + `/customers/create_new_customer`, obj)
            .then((res) => {
                this.setState({
                    customerDisplay: res.data
                })
            })
    }

    render() {
        const newUser = this.state.customerDisplay.map((c, i) => {
            return (
                <div key={i}>
                    <h2>CUSTOMER CREATED:</h2>
                    <div>Customer ID: {c.customer_id}</div>
                    <div>Name: {c.firstname} {c.lastname}</div>
                    <div>Phone: {c.phone}</div>
                    <div>Email: {c.email}</div>
                    <div>Address: {c.address}</div>
                    <div>City: {c.city}</div>
                    <div>State: {c.state}</div>
                    <div>Zip: {c.zip}</div>
                    <Link to="/dashboard"><button>Done</button></Link>
                    <Link to="/new_rental"><button>Create Rental</button></Link>
                </div>
            )
        })

        return (
            <div className="cust_creator_container">
                <div className="name_container">
                    <input onChange={(e) => this.updateFirstName(e.target.value)} placeholder="FIRST NAME" />
                    <input onChange={(e) => this.updateLastName(e.target.value)} placeholder="LAST NAME" />
                </div>

                <div className="contact_container">
                    <input onChange={(e) => this.updateEmail(e.target.value)} placeholder="EMAIL" />
                    <input onChange={(e) => this.updatePhone(e.target.value)} placeholder="PHONE" />
                </div>

                <div className="address_container">
                    <input onChange={(e) => this.updateAddress(e.target.value)} placeholder="ADDRESS" />
                    <input onChange={(e) => this.updateCity(e.target.value)} placeholder="CITY" />
                    <input onChange={(e) => this.updateState(e.target.value)} placeholder="STATE" />
                    <input onChange={(e) => this.updateZip(e.target.value)} placeholder="ZIP" />
                </div>


                <button onClick={() => this.createCustomer(this.state)}>CREATE CUSTOMER</button>
                <Link to="/dashboard"><button>Cancel</button></Link>

                <div>
                    {newUser}
                </div>
            </div>
        )
    }
}