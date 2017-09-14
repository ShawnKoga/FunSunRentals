import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Admin_Menu extends Component {
    render() {
        return (
            <div className={"admin_nav_container " + (this.props.showMenu ? 'show' : 'hide')}>
                <div className="admin_menu_header">
                    <button className="close_button" onClick={() => this.props.toggleMenu()}>&#10006;</button>
                </div>

                <div className="admin_nav_link" onClick={() => this.props.toggleSubMenu('RENT')}>RENTALS</div>
                <div className={this.props.showRentTools ? 'show_sub' : 'hide_sub'}>
                    <Link className="home_sub" to="/new_rental">CREATE NEW</Link>
                    <Link className="home_sub" to="/close_rental">CLOSE RENTAL</Link>
                    <li className="home_sub">BY CUSTOMER</li>
                    <li className="home_sub">BY DATE</li>
                    <li className="home_sub">ALL RENTALS</li>
                </div>

                <div className="admin_nav_link" onClick={() => this.props.toggleSubMenu('CUST')}>CUSTOMERS</div>
                <div className={this.props.showCustTools ? 'show_sub' : 'hide_sub'}>
                    <Link className="home_sub" to="/new_customer">CREATE NEW</Link>
                    <li className="home_sub">BY NAME</li>
                    <li className="home_sub">BY RENTALS</li>
                    <li className="home_sub">ALL CUSTOMERS</li>
                </div>

                <div className="admin_nav_link" onClick={() => this.props.toggleSubMenu('INVNTRY')}>INVENTORY</div>
                <div className={this.props.showInventoryTools ? 'show_sub' : 'hide_sub'}>
                    <li className="home_sub">AVAILABILITY</li>
                    <li className="home_sub">ALL INVENTORY</li>
                    <Link className="home_sub" to="/add_inventory">ADD NEW</Link>
                </div>
                {/* <div className="admin_nav_link">EMPLOYEES</div> */}
            </div>
        )
    }
}