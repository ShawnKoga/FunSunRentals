import React, { Component } from 'react';
import svg from '../../assets/hamburger.svg';
import BigCalendar from 'react-big-calendar';
import AdminMenu from './Admin_Menu';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getActiveRentalCount, getAvailPB, getAvailKayaks } from '../../ducks/dashReducer';

import './Dashboard.css';
import './Admin_Menu.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

class Dashboard extends Component {
    constructor() {
        super();

        this.state = {
            showMenu: false,
            showRentTools: false,
            showCustTools: false,
            showInventoryTools: false,
        }

        this.toggleMenu = this.toggleMenu.bind(this);
        this.toggleSubMenu = this.toggleSubMenu.bind(this);
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

    componentDidMount() {
        this.props.getActiveRentalCount();
        this.props.getAvailPB();
        this.props.getAvailKayaks();
    }

    render() {

        BigCalendar.momentLocalizer(moment);

        var myEventsList = [];

        return (
            <main>
                <AdminMenu toggleMenu={this.toggleMenu}
                    showMenu={this.state.showMenu}
                    toggleSubMenu={this.toggleSubMenu}
                    showRentTools={this.state.showRentTools}
                    showCustTools={this.state.showCustTools}
                    showInventoryTools={this.state.showInventoryTools} />

                <section className="dash_header">
                    <img src={svg} className="hamburger" onClick={() => this.toggleMenu()} alt="hamburger" />
                    <h1>FUN UNDER THE SUN RENTALS</h1>
                    <div className="credentials">
                        <div className="picture"></div>
                        <div className="name_logout_container">
                            <div className="name">ADAM GRIMALDO</div>
                            <div className="logout">logout</div>
                        </div>
                    </div>
                </section>

                <section className="body">
                    <container className="dash_transparency">

                        <div className="quick_guide_container">
                            <div className="quick_guide_component">
                                <h2>QuickStats</h2>
                                {/* <button onClick={() => {this.props.getActiveRentalCount()}}>Get Stats</button> */}
                                <div>Active Rentals: {this.props.activeRentalCount}</div>
                                <div>Current Avail. PB: {this.props.currentAvailPB}</div>
                                <div>Current Avail. Kayaks: {this.props.currentAvailKayaks}</div>
                                <div>Rentals Past Due: {this.props.pastDueRentals}</div>
                                <div>Upcoming Due Rentals: {this.props.upcomingDueRentals}</div>
                            </div>

                            <div className="quick_guide_component">
                                <h2>QuickLinks</h2>
                                <Link to="/checkout_inventory">Checkout Inventory</Link>
                                <Link to="/new_rental">New Rental</Link>
                                <Link to="/close_rental">Close Rental</Link>
                                <Link to="/new_customer">New Customer</Link>
                                <div>Rental Lookup</div>
                            </div>
                        </div>

                        <div className="calendar">
                            <BigCalendar
                                /* views={{month: true, week: true, day: false, agenda: true}} */
                                events={myEventsList}
                                startAccessor='startDate'
                                endAccessor='endDate'
                            />
                        </div>

                    </container>
                </section>
            </main>
        )
    }
}
function mapStateToProps(state) {
    return state.dashboard
}

export default connect(mapStateToProps, {getActiveRentalCount, getAvailPB, getAvailKayaks})(Dashboard)