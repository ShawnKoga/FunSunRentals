import React, { Component } from 'react';
import Header from '../Dashboard/Header';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './EditRental.css';

import { connect } from 'react-redux';
import { quickEdit } from '../../ducks/dashReducer';

class EditRental extends Component {
    
    constructor() {
        super()

        this.state = {
            paddleboards: 0,
            kayaks: 0,
            lifejackets: 0,
            roofracks: 0,
            start_date: null,
            end_date: null
        }
    }
    componentWillReceiveProps(){
        this.getInfo()
    }
    updatePaddleboards(e) {
        this.setState({
            paddleboards: e
        })
    }
    updateKayaks(e) {
        this.setState({
            kayaks: e
        })
    }
    updateLifejackets(e) {
        this.setState({
            lifejackets: e
        })
    }
    updateRoofracks(e) {
        this.setState({
            roofracks: e
        })
    }
    updateStartdate(e) {
        this.setState({
            start_date: e
        })
    }
    updateEnddate(e) {
        this.setState({
            end_date: e
        })
    }
    getInfo() {
        console.log('get the stuff!', this.props.rentalToEdit)
    }

    render() {
        return (
            <div>
                <Header />
                <div className="edit_rental_container">
                    <section className="edit_rental_card">
                        <div className="edit_rental_title">EDIT RENTAL</div>
                        <div className="edit_rental_row">
                            <div className="edit_rental_key">Rental ID:</div> <div className="edit_rental_val">{this.props.rentalToEdit.rental_id}</div>
                        </div>
                        <div className="edit_rental_row">
                            <div className="edit_rental_key">Name:</div> <div className="edit_rental_val">{this.props.rentalToEdit.firstname} {this.props.rentalToEdit.lastname}</div>
                        </div>
                        <div className="edit_rental_row">
                            <div className="edit_rental_key">Phone:</div> <div className="edit_rental_val">{this.props.rentalToEdit.phone}</div>
                        </div>
                        <div className="edit_rental_row">
                            <div className="edit_rental_key">Email:</div> <div className="edit_rental_val">{this.props.rentalToEdit.email}</div>
                        </div>

                        <div className="edit_rental_row">
                            <div className="edit_rental_key">Paddleboards:</div> <input className="edit_rental_box" type="number" min="0" placeholder={this.props.rentalToEdit.paddleboards} onChange={(e) => this.updatePaddleboards(e.target.value)} />
                        </div>
                        <div className="edit_rental_row">
                            <div className="edit_rental_key">Kayaks:</div> <input className="edit_rental_box" type="number" min="0" placeholder={this.props.rentalToEdit.kayaks} onChange={(e) => this.updateKayaks(e.target.value)} />
                        </div>
                        <div className="edit_rental_row">
                            <div className="edit_rental_key">Life Jackets:</div> <input className="edit_rental_box" type="number" min="0" placeholder={this.props.rentalToEdit.lifejackets} onChange={(e) => this.updateLifejackets(e.target.value)} />
                        </div>
                        <div className="edit_rental_row">
                            <div className="edit_rental_key">Roof Racks:</div> <input className="edit_rental_box" type="number" min="0" placeholder={this.props.rentalToEdit.roofracks} onChange={(e) => this.updateRoofracks(e.target.value)} />
                        </div>
                        <div className="edit_rental_key">Pickup Date:</div> <input className="edit_rental_date_box" type="date" placeholder={this.props.rentalToEdit.start_date} onChange={(e) => this.updateStartdate(e.target.value)} />
                        <div className="edit_rental_key">Return Date:</div> <input className="edit_rental_date_box" type="date" placeholder={this.props.rentalToEdit.end_date} onChange={(e) => this.updateEnddate(e.target.value)} />
                        <button className="save_and_close_button">Save Changes & Close</button>
                        <Link to="/dashboard"><button className="cancel_edit_button">Cancel</button></Link>
                        <button onClick={() =>  this.getInfo()}>GET INFO</button>
                    </section>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state.dashboard
}

export default connect(mapStateToProps, { quickEdit })(EditRental)