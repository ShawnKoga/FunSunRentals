import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateCustomerID } from '../../ducks/createRentalReducer';

class Admin_Menu extends Component {
    render() {
        return (
            <div className={"admin_nav_container " + (this.props.showMenu ? 'show' : 'hide')}>
                <div className="admin_menu_header">
                    <button className="close_button" onClick={() => this.props.toggleMenu()}>{'<<'}</button>
                </div>

                <div className="admin_nav_link" onClick={() => this.props.toggleSubMenu('RENT')}>RENTALS</div>
                <div className={this.props.showRentTools ? 'show_sub' : 'hide_sub'}>
                    <Link className="home_sub" to="/new_rental" onClick={() => this.props.updateCustomerID(0)}>CREATE NEW</Link>
                    <Link className="home_sub" to="/close_rental">CLOSE RENTAL</Link>
                    <Link className="home_sub" to="/checkout_inventory">MANUAL INVENTORY CHECKOUT</Link>
                    <Link className="home_sub" to="/rental_lookup">LOOKUP</Link>
                </div>

                <div className="admin_nav_link" onClick={() => this.props.toggleSubMenu('CUST')}>CUSTOMERS</div>
                <div className={this.props.showCustTools ? 'show_sub' : 'hide_sub'}>
                    <Link className="home_sub" to="/new_customer">CREATE NEW</Link>
                    <Link className="home_sub" to="/customer_lookup">LOOKUP</Link>
                </div>

                <div className="admin_nav_link" onClick={() => this.props.toggleSubMenu('INVNTRY')}>INVENTORY</div>
                <div className={this.props.showInventoryTools ? 'show_sub' : 'hide_sub'}>
                    <li className="home_sub">AVAILABILITY</li>
                    <Link className="home_sub" to="/add_inventory">ADD NEW</Link>
                </div>

                <div className="admin_nav_link" onClick={() => this.props.toggleSubMenu('EMP')}>EMPLOYEES</div>
                <div className={this.props.showEmpTools ? 'show_sub' : 'hide_sub'}>
                    <li className="home_sub">ADD NEW</li>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps, { updateCustomerID })(Admin_Menu);