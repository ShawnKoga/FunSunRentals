import React, { Component } from 'react';
import './Rental_Lookup.css';
import Header from '../Dashboard/Header';
import { Link } from 'react-router-dom';
import axios from 'axios';

let url = 'http://localhost:8080';

class Rental_Lookup extends Component {
    constructor() {
        super()

        this.state = {
            custID: '',
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            dueDate: '',
            rentalDisplay: []
        }
    }
    componentDidMount(){
        axios.get('/auth/authorized').then(user => {
            // console.log('the response user', user)
            if(user.data.user === false) {
                this.props.history.push('/')
            } else {
                // console.log('did this work?!?!?!?!?')
                this.setState({
                    user: user.data
                })
            }
        })
    }
    updateCustID(e) {
        this.setState({
            custID: e
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
    updateDueDate(e) {
        this.setState({
            dueDate: e
        })
    }
    getAllRentals() {
        axios.get(`${url}/rentals/get_all_rentals`)
            .then((res) => {
                this.setState({
                    rentalDisplay: res.data
                })
            })
    }
    // findRental(obj) {
    //     if (this.state.custID !== '' || this.state.firstName !== '' || this.state.lastName !== '' || this.state.phone !== '' || this.state.email !== '' || this.state.dueDate !== '') {
    //         axios.get(`${url}/rentals/get_all_rentals`)
    //             .then((res) => {
    //                 console.log(res.data)
    //                 res.data.map()
    //             })
    //     } else {
    //         alert('No rentals specified!')
    //     }

    // }
    findRental(obj) {
        if (this.state.custID !== '' || this.state.firstName !== '' || this.state.lastName !== '' || this.state.phone !== '' || this.state.email !== '' || this.state.dueDate !== '') {
            axios.put(`${url}/rentals/find_rental`, obj)
                .then((res) => {
                    console.log(res.data)
                    this.setState({
                        rentalDisplay: res.data
                    })
                })
        } else {
            alert('No rentals specified!')
        }

    }
    resetRentalDisplay() {
        this.setState({
            custId: '',
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            dueDate: '',
            rentalDisplay: []
        })
        document.getElementById('textfield1').value = '';
        document.getElementById('textfield2').value = '';
        document.getElementById('textfield3').value = '';
        document.getElementById('textfield4').value = '';
        document.getElementById('textfield5').value = '';
        document.getElementById('textfield6').value = null;
    }

    render() {
        const rentalsToDisplay = this.state.rentalDisplay.map((c, i) => {
            var start = (c.start_date).substring(0, (c.start_date).indexOf('T'));
            var end = (c.end_date).substring(0, (c.end_date).indexOf('T'));
            return (
                <div key={i} className="rental_display_card">
                    <section className="rental_info">
                        <section className="rental_cust_info">
                            <div className="rental_disp_heading">Rental Info:</div>
                            <div className="rental_disp_key">Rental # & Status:&nbsp;</div><div className="rental_disp_val">{c.rental_id} - {c.status}</div>
                            <div className="rental_disp_key">Out Date:&nbsp;</div><div className="rental_disp_val">{start}</div>
                            <div className="rental_disp_key">Due Date:&nbsp;</div><div className="rental_disp_val">{end}</div>
                            <div className="rental_disp_key">Paddleboards:&nbsp;</div><div className="rental_disp_val">{c.paddleboards}</div>
                            <div className="rental_disp_key">Kayaks:&nbsp;</div><div className="rental_disp_val">{c.kayaks}</div>
                            <div className="rental_disp_key">Lifejackets:&nbsp;</div><div className="rental_disp_val">{c.lifejackets}</div>
                            <div className="rental_disp_key">Roof Racks:&nbsp;</div><div className="rental_disp_val">{c.roofracks}</div>
                            {/* <div className="rental_disp_key">Status:&nbsp;</div><div className="rental_disp_val">{c.status}</div> */}
                        </section>
                        <section className="rental_cust_info">
                            <div className="rental_disp_heading">Customer Info:</div>
                            <div className="rental_disp_key">Name & ID:&nbsp;</div><div className="rental_disp_val">{c.firstname} {c.lastname} - {c.customer_id}</div>
                            <div className="rental_disp_key">Phone:&nbsp;</div><div className="rental_disp_val">{c.phone}</div>
                            <div className="rental_disp_key">Email:&nbsp;</div><div className="rental_disp_val">{c.email}</div>
                            <div className="rental_disp_key">Address:&nbsp;</div><div className="rental_disp_val">{c.address}</div>
                            <div className="rental_disp_key"> State:&nbsp;</div><div className="rental_disp_val">{c.state}</div>
                            <div className="rental_disp_key">ZIP:&nbsp;</div><div className="rental_disp_val">{c.zip}</div>
                        </section>
                    </section>
                </div>
            )
        })

        return (
            <main>
                <Header />
                <div className="rental_lookup_main_container">
                    <section className="rental_lookup_card">
                        <div className="rental_lookup_title">RENTAL LOOKUP</div>
                        <div className="rental_lookup_input_container">
                            <input id="textfield1" className="rental_info_box" onChange={(e) => this.updateCustID(e.target.value)} placeholder="Customer ID" />
                            <input id="textfield2" className="rental_info_box" onChange={(e) => this.updateFirstName(e.target.value)} placeholder="First Name" />
                            <input id="textfield3" className="rental_info_box" onChange={(e) => this.updateLastName(e.target.value)} placeholder="Last Name" />
                        </div>
                        <div className="rental_lookup_input_container">
                            <input id="textfield4" className="rental_info_box" onChange={(e) => this.updatePhone(e.target.value)} placeholder="Phone Number" />
                            <input id="textfield5" className="rental_info_box" onChange={(e) => this.updateEmail(e.target.value)} placeholder="Email" />
                            <input id="textfield6" className="rental_info_box" type="date" onChange={(e) => this.updateDueDate(e.target.value)} placeholder="Due Date" />
                        </div>
                        <div className="rental_lookup_button_container">
                            <button className="rental_lookup_button" onClick={() => this.findRental(this.state)}>Find Rentals</button>
                            <button className="rental_lookup_button" onClick={() => this.getAllRentals()}>Get All Rentals</button>
                            <button className="rental_lookup_button" onClick={() => this.resetRentalDisplay()}>Reset</button>
                            <Link to="/dashboard"><button className="rental_lookup_button">Cancel</button></Link>
                        </div>

                        <section className="returned_rental_space">
                            {rentalsToDisplay}
                        </section>
                    </section>
                </div>
            </main>
        )
    }
}

// function mapStateToProps(state) {
//     return state;
// }

export default Rental_Lookup;