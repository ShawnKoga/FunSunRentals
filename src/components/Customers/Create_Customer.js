import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../Dashboard/Header';
import './Create_Customer.css';
import NewCustomerCard from './New_Customer_Card';

let url = 'http://localhost:8080';

export default class Create_Customer extends Component {
    constructor() {
        super();

        this.state = {
            firstName: null,
            lastName: null,
            email: null,
            phone: null,
            address: null,
            city: null,
            state: null,
            zip: null,
            customerDisplay: [],
            showCustCard: false
        }

        this.resetCustCard = this.resetCustCard.bind(this)
        this.clearFields = this.clearFields.bind(this)
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
        if (this.state.firstName !== null && this.state.lastName !== null && this.state.phone !== null && this.state.address !== null && this.state.city !== null && this.state.state !== null) {
            axios.post(url + `/customers/create_new_customer`, obj)
                .then((res) => {
                    this.setState({
                        customerDisplay: res.data
                    })
                })
            this.setState({
                showCustCard: !this.state.showCustCard
            })
        } else {
            alert('Please fill out customer info!')
        }
    }
    resetCustCard() {
        this.setState({
            customerDisplay: []
        })
    }
    clearFields() {
        document.getElementById('textfield1').value = '';
        document.getElementById('textfield2').value = '';
        document.getElementById('textfield3').value = '';
        document.getElementById('textfield4').value = '';
        document.getElementById('textfield5').value = '';
        document.getElementById('textfield6').value = '';
        document.getElementById('textfield7').value = '';
        document.getElementById('selectfield').value = 'null';
    }

    render() {
        // const newCustomer = this.state.customerDisplay.map((c, i) => {
        //     return (
        //         <div key={i} className={"new_customer_card"}>
        //             <div className="cust_creator_heading">CUSTOMER CREATED:</div>
        //             <div>Customer ID: {c.customer_id}</div>
        //             <div>Name: {c.firstname} {c.lastname}</div>
        //             <div>Phone: {c.phone}</div>
        //             <div>Email: {c.email}</div>
        //             <div>Address: {c.address}</div>
        //             <div>City: {c.city}</div>
        //             <div>State: {c.state}</div>
        //             <div>Zip: {c.zip}</div>
        //             <Link to="/dashboard"><button>Done</button></Link>
        //             <Link to="/new_rental"><button>Create Rental</button></Link>
        //         </div>
        //     )
        // })

        return (
            <div>
                <Header />
                <div className="cust_creator_container">
                    <NewCustomerCard resetCustCard={this.resetCustCard}
                        clearFields={this.clearFields}
                        customerDisplay={this.state.customerDisplay} />

                    <section className="cust_creator_form">
                        <div className="cust_creator_heading">Name:</div>
                        <div className="name_container">
                            <input id="textfield1" className="name_box" onChange={(e) => this.updateFirstName(e.target.value)} placeholder="FIRST NAME" />
                            <input id="textfield2" className="name_box" onChange={(e) => this.updateLastName(e.target.value)} placeholder="LAST NAME" />
                        </div>

                        <div className="cust_creator_heading">Contact:</div>
                        <div className="contact_container">
                            <input id="textfield3" className="phone_box" onChange={(e) => this.updatePhone(e.target.value)} placeholder="PHONE" />
                            <input id="textfield4" className="email_box" onChange={(e) => this.updateEmail(e.target.value)} placeholder="EMAIL" />
                        </div>

                        <div className="cust_creator_heading">Address:</div>
                        <input id="textfield5" className="street_box" onChange={(e) => this.updateAddress(e.target.value)} placeholder="ADDRESS" />
                        <div className="address_container">
                            <input id="textfield6" className="city_box" onChange={(e) => this.updateCity(e.target.value)} placeholder="CITY" />
                            <select id="selectfield" className="state_box" onChange={(e) => this.updateState(e.target.value)}>
                                <option value="null">SELECT ONE</option>
                                <option value="AL">Alabama</option>
                                <option value="AK">Alaska</option>
                                <option value="AZ">Arizona</option>
                                <option value="AR">Arkansas</option>
                                <option value="CA">California</option>
                                <option value="CO">Colorado</option>
                                <option value="CT">Connecticut</option>
                                <option value="DE">Delaware</option>
                                <option value="DC">District Of Columbia</option>
                                <option value="FL">Florida</option>
                                <option value="GA">Georgia</option>
                                <option value="HI">Hawaii</option>
                                <option value="ID">Idaho</option>
                                <option value="IL">Illinois</option>
                                <option value="IN">Indiana</option>
                                <option value="IA">Iowa</option>
                                <option value="KS">Kansas</option>
                                <option value="KY">Kentucky</option>
                                <option value="LA">Louisiana</option>
                                <option value="ME">Maine</option>
                                <option value="MD">Maryland</option>
                                <option value="MA">Massachusetts</option>
                                <option value="MI">Michigan</option>
                                <option value="MN">Minnesota</option>
                                <option value="MS">Mississippi</option>
                                <option value="MO">Missouri</option>
                                <option value="MT">Montana</option>
                                <option value="NE">Nebraska</option>
                                <option value="NV">Nevada</option>
                                <option value="NH">New Hampshire</option>
                                <option value="NJ">New Jersey</option>
                                <option value="NM">New Mexico</option>
                                <option value="NY">New York</option>
                                <option value="NC">North Carolina</option>
                                <option value="ND">North Dakota</option>
                                <option value="OH">Ohio</option>
                                <option value="OK">Oklahoma</option>
                                <option value="OR">Oregon</option>
                                <option value="PA">Pennsylvania</option>
                                <option value="RI">Rhode Island</option>
                                <option value="SC">South Carolina</option>
                                <option value="SD">South Dakota</option>
                                <option value="TN">Tennessee</option>
                                <option value="TX">Texas</option>
                                <option value="UT">Utah</option>
                                <option value="VT">Vermont</option>
                                <option value="VA">Virginia</option>
                                <option value="WA">Washington</option>
                                <option value="WV">West Virginia</option>
                                <option value="WI">Wisconsin</option>
                                <option value="WY">Wyoming</option>
                            </select>
                        </div>
                        <input id="textfield7" className="zip_box" onChange={(e) => this.updateZip(e.target.value)} placeholder="ZIP" />

                        <button className="create_customer_button" onClick={() => this.createCustomer(this.state)}>Create Customer</button>
                        <Link to="/dashboard"><button className="cancel_customer_button">Cancel</button></Link>
                    </section>
                </div>
            </div>
        )
    }
}