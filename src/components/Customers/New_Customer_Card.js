import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateCustomerID } from '../../ducks/createRentalReducer';

class New_Customer_Card extends Component {
    render() {
        const newCustomer = this.props.customerDisplay.map((c, i) => {
            return (
                <div key={i} className="new_customer_card">
                    <div className="close_card_button_container">
                        <button className="close_card_button" onClick={() => { this.props.clearFields() }}>&#10006;</button>
                    </div >
                    <div className="cust_info">
                        <div className="cust_creator_heading">CUSTOMER CREATED:</div>
                        <section className="new_cust_stat_list">
                            <div className="new_cust_stat_container">
                                <div className="cust_card_key">Customer ID:&nbsp;</div><div className="cust_card_stats">{c.customer_id}</div>
                            </div>
                            <div className="new_cust_stat_container">
                                <div className="cust_card_key">Name:&nbsp;</div> <div className="cust_card_stats">{c.firstname} {c.lastname}</div>
                            </div>
                            <div className="new_cust_stat_container">
                                <div className="cust_card_key">Phone:&nbsp;</div> <div className="cust_card_stats">{c.phone}</div>
                            </div>
                            <div className="new_cust_stat_container">
                                <div className="cust_card_key">Email:&nbsp;</div> <div className="cust_card_stats">{c.email}</div>
                            </div>
                            <div className="new_cust_stat_container">
                                <div className="cust_card_key">Address:&nbsp;</div> <div className="cust_card_stats">{c.address}</div>
                            </div>
                            <div className="new_cust_stat_container">
                                <div className="cust_card_key">City:&nbsp;</div> <div className="cust_card_stats">{c.city}</div>
                            </div>
                            <div className="new_cust_stat_container">
                                <div className="cust_card_key">State:&nbsp;</div> <div className="cust_card_stats">{c.state}</div>
                            </div>
                            <div className="new_cust_stat_container">
                                <div className="cust_card_key">Zip:&nbsp;</div> <div className="cust_card_stats">{c.zip}</div>
                            </div>
                        </section>
                        <Link to="/dashboard"><button className="cust_card_done_button">Back To Dash</button></Link>
                        <Link to="/new_rental"><button className="cust_card_rental_button" onClick={() => this.props.updateCustomerID(c.customer_id)}>Create Rental</button></Link>
                    </div>
                </div>
            )
        })
        return (
            <div className={this.props.showCustCard ? "new_customer_container show_new_card" : "new_customer_container hide_new_card"}>
                {newCustomer}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps, { updateCustomerID })(New_Customer_Card);