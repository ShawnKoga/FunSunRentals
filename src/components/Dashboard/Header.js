import React, { Component } from 'react';
import svg from '../../assets/hamburger.svg';
// import logo from '../../assets/FUTSRArtboard 1.png';
import AdminMenu from './Admin_Menu';
import { connect } from 'react-redux';
import { getUserInfo } from '../../ducks/userReducer';
import { Link } from 'react-router-dom';

import './Admin_Menu.css';
import './Header.css';

class Header extends Component {
    constructor() {
        super();

        this.state = {
            showMenu: false,
            showRentTools: false,
            showCustTools: false,
            showInventoryTools: false,
            showEmpTools: false
        }

        this.toggleSubMenu = this.toggleSubMenu.bind(this);  
        this.toggleMenu = this.toggleMenu.bind(this);      
    }

    componentDidMount() {
        this.props.getUserInfo()
       
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
        else if ( e === 'EMP') {
            this.setState({
                showEmpTools: !this.state.showEmpTools
            })
        }
    }

    render() {
        console.log('hey', this.props)
        return (
            <div>
                <AdminMenu toggleMenu={this.toggleMenu}
                    showMenu={this.state.showMenu}
                    toggleSubMenu={this.toggleSubMenu}
                    showRentTools={this.state.showRentTools}
                    showCustTools={this.state.showCustTools}
                    showInventoryTools={this.state.showInventoryTools}
                    showEmpTools={this.state.showEmpTools} />

                <section className="dash_header">
                    <img src={svg} className="hamburger" onClick={() => this.toggleMenu()} alt="hamburger" />
                    <Link to="/dashboard" className="header_title">Fun Under the Sun Rentals</Link>
                    <div className="credentials">
                        <img className="picture" src={this.props.user.img} alt='' />
                        <div className="name_logout_container">
                            <div className="name">{this.props.user ? this.props.user.username : 'nope'}</div>
                            <a href={process.env.REACT_APP_LOGOUT}><button className="logout">LOGOUT</button></a>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state.userReducer
}

export default connect (mapStateToProps, {getUserInfo})(Header);