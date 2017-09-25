import React, { Component } from 'react';
import svg from '../../assets/hamburger.svg';
// import logo from '../../assets/FUTSRArtboard 1.png';
import AdminMenu from './Admin_Menu';
import { Link } from 'react-router-dom';

import './Admin_Menu.css';
import './Header.css';

export default class Header extends Component {
    constructor() {
        super();

        this.state = {
            showMenu: false,
            showRentTools: false,
            showCustTools: false,
            showInventoryTools: false,
        }

        this.toggleSubMenu = this.toggleSubMenu.bind(this);  
        this.toggleMenu = this.toggleMenu.bind(this);      
    }

    toggleMenu() {
        this.setState({
            showMenu: !this.state.showMenu
        })
    }

    toggleSubMenu(e) {
        if (e === 'CUST') {
            this.setState({
                showCustTools: !this.state.showCustTools
            })
        }
        else if (e === 'RENT') {
            this.setState({
                showRentTools: !this.state.showRentTools
            })
        }
        else if (e === 'INVNTRY') {
            this.setState({
                showInventoryTools: !this.state.showInventoryTools
            })
        }
    }

    render() {
        return (
            <div>
                <AdminMenu toggleMenu={this.toggleMenu}
                    showMenu={this.state.showMenu}
                    toggleSubMenu={this.toggleSubMenu}
                    showRentTools={this.state.showRentTools}
                    showCustTools={this.state.showCustTools}
                    showInventoryTools={this.state.showInventoryTools} />

                <section className="dash_header">
                    <img src={svg} className="hamburger" onClick={() => this.toggleMenu()} alt="hamburger" />
                    <Link to="/dashboard" className="header_title">Fun Under the Sun Rentals</Link>
                    <div className="credentials">
                        <div className="picture"></div>
                        <div className="name_logout_container">
                            <div className="name">ADAM GRIMALDO</div>
                            <div className="logout">logout</div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}