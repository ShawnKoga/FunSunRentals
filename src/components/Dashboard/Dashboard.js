import React, { Component } from 'react';
import './Dashboard.css';
// import logo from '../../assets/logo.jpg';
import svg from '../../assets/hamburger.svg';

import AdminMenu from './Admin_Menu';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

import './Admin_Menu.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';



export default class Dashboard extends Component {
    constructor() {
        super();

        this.state = {
            showMenu: false,
            showRentTools: false,
            showCustTools: false,
            showInventoryTools: false
        }

        this.toggleMenu = this.toggleMenu.bind(this);
        this.toggleSubMenu = this.toggleSubMenu.bind(this);
    }

    toggleMenu() {
        this.setState({
            showMenu: !this.state.showMenu
        })
    }

    toggleSubMenu(e){
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
        
        BigCalendar.momentLocalizer(moment);
        
        var myEventsList=[];

        return (
            <main>
                <AdminMenu toggleMenu={this.toggleMenu} 
                           showMenu={this.state.showMenu} 
                           toggleSubMenu={this.toggleSubMenu} 
                           showRentTools={this.state.showRentTools}
                           showCustTools={this.state.showCustTools}
                           showInventoryTools={this.state.showInventoryTools}/>
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
                    <container className="transparency">
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

// onClick={() => this.toggleMenu()} 