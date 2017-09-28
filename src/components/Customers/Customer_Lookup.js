import React, { Component } from 'react';
import './Customer_Lookup.css';
import Header from '../Dashboard/Header';
import { Link } from 'react-router-dom';
import { updateCustomerID } from '../../ducks/createRentalReducer';
import { connect } from 'react-redux';
import axios from 'axios';

let url = 'http://localhost:8080';

class Customer_Lookup extends Component {
    constructor() {
        super()

        this.state = {
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            customerDisplay: []
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
    updatePhone(e) {
        this.setState({
            phone: e
        })
    }
    updateEmail(e) {
        this.setState({
            email: e
        })
    }
    getAllCustomers() {
        axios.get(`${url}/customers/get_all`)
            .then((res) => {
                this.setState({
                    customerDisplay: res.data
                })
            })
    }
    findCustomer(obj) {
        axios.put(`${url}/customers/find_customer`, obj)
            .then((res) => {
                if (res.data.length === 0) {
                    alert('Customer not found!')
                } else {
                    this.setState({
                        customerDisplay: res.data
                    })
                }
            })
    }
    resetCustomerDisplay() {
        this.setState({
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            customerDisplay: []
        })
        document.getElementById('textfield1').value = '';
        document.getElementById('textfield2').value = '';
        document.getElementById('textfield3').value = null;
        document.getElementById('textfield4').value = '';
    }

    render() {
        const customersToDisplay = this.state.customerDisplay.map((c, i) => {
            return (
                <div key={i} className="customer_display_card">
                    <section className="customer_info">
                        <div className="cust_disp_key">Name:&nbsp;</div><div className="cust_disp_val">{c.firstname} {c.lastname}</div>
                        <div className="cust_disp_key">Phone:&nbsp;</div><div className="cust_disp_val">{c.phone}</div>
                        <div className="cust_disp_key">Email:&nbsp;</div><div className="cust_disp_val">{c.email}</div>
                        <div className="cust_disp_key">Address:&nbsp;</div><div className="cust_disp_val">{c.address}</div>
                        <div className="cust_disp_key">City:&nbsp;</div><div className="cust_disp_val">{c.city}</div>
                        <div className="cust_disp_key"> State:&nbsp;</div><div className="cust_disp_val">{c.state}</div>
                        <div className="cust_disp_key">ZIP:&nbsp;</div><div className="cust_disp_val">{c.zip}</div>
                        <div className="cust_disp_key">Customer ID:&nbsp;</div><div className="cust_disp_val">{c.customer_id}</div>
                    </section>
                    <Link to="/new_rental"><button className="cust_info_button" onClick={() => this.props.updateCustomerID(c.customer_id)}>Create Rental</button></Link>
                </div>
            )
        })

        return (
            <main>
                <Header />
                <div className="customer_lookup_main_container">
                    <section className="customer_lookup_card">
                        <div className="cust_lookup_title">CUSTOMER LOOKUP</div>
                        <div className="cust_lookup_input_container">
                            <input id="textfield1" className="cust_info_box" onChange={(e) => this.updateFirstName(e.target.value)} placeholder="First Name" />
                            <input id="textfield2" className="cust_info_box" onChange={(e) => this.updateLastName(e.target.value)} placeholder="Last Name" />
                            <input id="textfield3" className="cust_info_box" onChange={(e) => this.updatePhone(e.target.value)} placeholder="Phone Number" />
                            <input id="textfield4" className="cust_info_box" onChange={(e) => this.updateEmail(e.target.value)} placeholder="Email" />
                        </div>
                        <div className="cust_lookup_button_container">
                            <button className="cust_lookup_button" onClick={() => this.findCustomer(this.state)}>Find Customer</button>
                            <button className="cust_lookup_button" onClick={() => this.getAllCustomers()}>Get All Customers</button>
                            <button className="cust_lookup_button" onClick={() => this.resetCustomerDisplay()}>Reset</button>
                            <Link to="/dashboard"><button className="cust_lookup_button">Cancel</button></Link>
                        </div>

                        <section className="returned_customer_space">
                            {customersToDisplay}
                        </section>
                    </section>
                </div>
            </main>
        )
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps, { updateCustomerID })(Customer_Lookup);