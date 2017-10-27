import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import Header from './Header';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getActiveRentalCount, getPendingRentals, getAvailPB, getAvailKayaks, getAvailLifeJackets, getAvailRoofRacks, getUpcomingDue, getPastDue, quickClose, quickEdit, openWidgetButton, pastWidgetButton, soonWidgetButton, pendingWidgetButton, quickOpen, testCloser, testOpener } from '../../ducks/dashReducer';
import { updateCustomerID } from '../../ducks/createRentalReducer';
import axios from 'axios';

import './Dashboard.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

let url = 'http://localhost:8080';

const ontime = require('ontime')

ontime({
    cycle: ['09:00:00']
}, function (ot) {
    axios.get(url + `/rentals/get_pending_today`)
        .then(res => {
            res.data.map((c, i) => {
                axios.put(url + `/rentals/confirm_checkout`, c)
                    .then(res => {
                        alert(res.data)
                    }
                    )
            })
        });
    ot.done()
    return
})



class Dashboard extends Component {
    componentDidMount() {
        axios.get('/auth/authorized').then(user => {
            // console.log('the response user', user)
            if (user.data.user === false) {
                this.props.history.push('/')
            } else {
                // console.log('did this work?!?!?!?!?')
                this.setState({
                    user: user.data
                })
            }
        })

        this.props.getActiveRentalCount();
        this.props.getPendingRentals();
        this.props.getAvailPB();
        this.props.getAvailKayaks();
        this.props.getAvailLifeJackets();
        this.props.getAvailRoofRacks();
        this.props.getPastDue();
        this.props.getUpcomingDue();
    }

    testCloser(obj) {
        this.props.quickClose(obj)
        .then(res => {
            this.props.testCloser()
        })
    }
    testOpener(obj) {
        this.props.quickOpen(obj)
        .then(res => {
            console.log('hit 1')
            this.props.testOpener()
        })
    }

    render() {
        BigCalendar.momentLocalizer(moment);
        var myEventsList = [];
        console.log('stuff to update', this.props.activeRentalCount)
        const pendingRentalQuickView = this.props.pendingRentals.map((c, i) => {
            var closeObj = { rentalID: c.rental_id }
            var start = (c.start_date).substring(0, (c.start_date).indexOf('T'));
            var end = (c.end_date).substring(0, (c.end_date).indexOf('T'));
            return (
                <div key={i} className={this.props.widgetRotate === 1 ? "open_rental_card show_widget" : "open_rental_card hide_widget"}>
                    <div>
                        <div className="rental_card_key">Customer Name:&nbsp;</div> <div className="rental_card_val">{c.firstname} {c.lastname}</div>
                        <div className="rental_card_key">Phone:&nbsp;</div> <div className="rental_card_val">{c.phone}</div>
                        <div className="rental_card_key">Email:&nbsp;</div> <div className="rental_card_val">{c.email}</div>
                        <div className="rental_card_key">Pickup:&nbsp;</div> <div className="rental_card_val">{start}</div>
                        <div className="rental_card_key">Return:&nbsp;</div> <div className="rental_card_val">{end}</div>
                        <div className="rental_card_key">Boards:&nbsp;</div> <div className="rental_card_val">{c.paddleboards}</div>
                        <div className="rental_card_key">Kayaks:&nbsp;</div> <div className="rental_card_val">{c.kayaks}</div>
                        <div className="rental_card_key">Racks:&nbsp;</div> <div className="rental_card_val">{c.roofracks}</div>
                        <div className="rental_card_key">Jackets:&nbsp;</div> <div className="rental_card_val">{c.lifejackets}</div>
                    </div>
                    <div>
                        <div className="rental_card_key">Rental #:&nbsp;</div> <div className="rental_card_val">{c.rental_id}</div>
                        <div className="quick_button_container">
                        <Link to="/edit_rental"><button className="quick_edit_button" onClick={() => { this.props.quickEdit(c.rental_id) }}>Edit Rental</button></Link>
                        <button className="quick_open_button" onClick={() => { this.testOpener(c) }}>Open Rental</button>
                        <button className="quick_close_button" onClick={() => { this.testCloser(closeObj) }}>Close Rental</button>
                        </div>
                    </div>
                </div>
            )
        })

        const activeRentalQuickView = this.props.activeRentalCount.map((c, i) => {
            var closeObj = { rentalID: c.rental_id }
            var start = (c.start_date).substring(0, (c.start_date).indexOf('T'));
            var end = (c.end_date).substring(0, (c.end_date).indexOf('T'));
            return (
                <div key={i} className={this.props.widgetRotate === 2 ? "open_rental_card show_widget" : "open_rental_card hide_widget"}>
                    <div>
                        <div className="rental_card_key">Customer Name:&nbsp;</div> <div className="rental_card_val">{c.firstname} {c.lastname}</div>
                        <div className="rental_card_key">Phone:&nbsp;</div> <div className="rental_card_val">{c.phone}</div>
                        <div className="rental_card_key">Email:&nbsp;</div> <div className="rental_card_val">{c.email}</div>
                        <div className="rental_card_key">Pickup:&nbsp;</div> <div className="rental_card_val">{start}</div>
                        <div className="rental_card_key">Return:&nbsp;</div> <div className="rental_card_val">{end}</div>
                        <div className="rental_card_key">Boards:&nbsp;</div> <div className="rental_card_val">{c.paddleboards}</div>
                        <div className="rental_card_key">Kayaks:&nbsp;</div> <div className="rental_card_val">{c.kayaks}</div>
                        <div className="rental_card_key">Racks:&nbsp;</div> <div className="rental_card_val">{c.roofracks}</div>
                        <div className="rental_card_key">Jackets:&nbsp;</div> <div className="rental_card_val">{c.lifejackets}</div>
                    </div>
                    <div>
                        <div className="rental_card_key">Rental #:&nbsp;</div> <div className="rental_card_val">{c.rental_id}</div>
                        <button className="quick_close_button" onClick={() => { this.testCloser(closeObj) }}>Close Rental</button>
                    </div>
                </div>
            )
        })

        const pastDueQuickView = this.props.pastDueRentals.map((c, i) => {
            var closeObj = { rentalID: c.rental_id }
            var start = (c.start_date).substring(0, (c.start_date).indexOf('T'));
            var end = (c.end_date).substring(0, (c.end_date).indexOf('T'));
            return (
                <div key={i} className={this.props.widgetRotate === 3 ? "open_rental_card show_widget" : "open_rental_card hide_widget"}>
                    <div>
                        <div className="rental_card_key">Customer Name:&nbsp;</div> <div className="rental_card_val">{c.firstname} {c.lastname}</div>
                        <div className="rental_card_key">Phone:&nbsp;</div> <div className="rental_card_val">{c.phone}</div>
                        <div className="rental_card_key">Email:&nbsp;</div> <div className="rental_card_val">{c.email}</div>
                        <div className="rental_card_key">Pickup:&nbsp;</div> <div className="rental_card_val">{start}</div>
                        <div className="rental_card_key">Return:&nbsp;</div> <div className="rental_card_val">{end}</div>
                        <div className="rental_card_key">Boards:&nbsp;</div> <div className="rental_card_val">{c.paddleboards}</div>
                        <div className="rental_card_key">Kayaks:&nbsp;</div> <div className="rental_card_val">{c.kayaks}</div>
                        <div className="rental_card_key">Racks:&nbsp;</div> <div className="rental_card_val">{c.roofracks}</div>
                        <div className="rental_card_key">Jackets:&nbsp;</div> <div className="rental_card_val">{c.lifejackets}</div>
                    </div>
                    <div>
                        <div className="rental_card_key">Rental #:&nbsp;</div> <div className="rental_card_val">{c.rental_id}</div>
                        <button className="quick_close_button" onClick={() => { this.testCloser(closeObj) }}>Close Rental</button>
                    </div>
                </div>
            )
        })

        const upcomingDueQuickView = this.props.upcomingDueRentals.map((c, i) => {
            var closeObj = { rentalID: c.rental_id }
            var start = (c.start_date).substring(0, (c.start_date).indexOf('T'));
            var end = (c.end_date).substring(0, (c.end_date).indexOf('T'));
            return (
                <div key={i} className={this.props.widgetRotate === 4 ? "open_rental_card show_widget" : "open_rental_card hide_widget"}>
                    <div>
                        <div className="rental_card_key">Customer Name:&nbsp;</div> <div className="rental_card_val">{c.firstname} {c.lastname}</div>
                        <div className="rental_card_key">Phone:&nbsp;</div> <div className="rental_card_val">{c.phone}</div>
                        <div className="rental_card_key">Email:&nbsp;</div> <div className="rental_card_val">{c.email}</div>
                        <div className="rental_card_key">Pickup:&nbsp;</div> <div className="rental_card_val">{start}</div>
                        <div className="rental_card_key">Return:&nbsp;</div> <div className="rental_card_val">{end}</div>
                        <div className="rental_card_key">Boards:&nbsp;</div> <div className="rental_card_val">{c.paddleboards}</div>
                        <div className="rental_card_key">Kayaks:&nbsp;</div> <div className="rental_card_val">{c.kayaks}</div>
                        <div className="rental_card_key">Racks:&nbsp;</div> <div className="rental_card_val">{c.roofracks}</div>
                        <div className="rental_card_key">Jackets:&nbsp;</div> <div className="rental_card_val">{c.lifejackets}</div>
                    </div>
                    <div>
                        <div className="rental_card_key">Rental #:&nbsp;</div> <div className="rental_card_val">{c.rental_id}</div>
                        <button className="quick_close_button" onClick={() => { this.testCloser(closeObj) }}>Close Rental</button>
                    </div>
                </div>
            )
        })

        return (
            <main>
                <Header />

                <section className="body">
                    <container className="dash_transparency">

                        <div className="quick_guide_container">
                            <div className="quick_guide_component1">
                                <div className="quick_guide_title">QuickStats</div>
                                <div className="quick_stat_row">
                                    <div className="quick_stat_key">Active Rentals:</div> <div className="quick_stat_val">{this.props.activeRentalCount.length}</div>
                                </div>
                                <div className="quick_stat_row">
                                    <div className="quick_stat_key">Rentals Past Due:</div> <div className={this.props.pastDueRentals.length === 0 ? "quick_stat_val" : "quick_stat_val_warning"}>{this.props.pastDueRentals.length}</div>
                                </div>
                                <div className="quick_stat_row">
                                    <div className="quick_stat_key">Due Soon:</div> <div className={this.props.upcomingDueRentals.length === 0 ? "quick_stat_val" : "quick_stat_val_attention"}>{this.props.upcomingDueRentals.length}</div>
                                </div>
                                <div className="quick_stat_row">
                                    <div className="quick_stat_key">Boards Available:</div> <div className={this.props.currentAvailPB <= 3 ? "quick_stat_val_attention" : "quick_stat_val"}>{this.props.currentAvailPB}</div>
                                </div>
                                <div className="quick_stat_row">
                                    <div className="quick_stat_key">Kayaks Available:</div> <div className={this.props.currentAvailKayaks <= 2 ? "quick_stat_val_attention" : "quick_stat_val"}>{this.props.currentAvailKayaks}</div>
                                </div>
                                <div className="quick_stat_row">
                                    <div className="quick_stat_key">Jackets Available:</div> <div className={this.props.currentAvailLifeJackets <= 3 ? "quick_stat_val_attention" : "quick_stat_val"}>{this.props.currentAvailLifeJackets}</div>
                                </div>
                                <div className="quick_stat_row">
                                    <div className="quick_stat_key">Racks Available:</div> <div className={this.props.currentAvailRoofRacks <= 2 ? "quick_stat_val_attention" : "quick_stat_val"}>{this.props.currentAvailRoofRacks}</div>
                                </div>
                            </div>

                            <div className="quick_guide_component2">
                                <div className="quick_guide_title">QuickLinks</div>
                                <Link className="quick_guide_link" to="/new_rental" onClick={() => this.props.updateCustomerID(0)}>New Rental</Link>
                                <Link className="quick_guide_link" to="/close_rental">Close Rental</Link>
                                <Link className="quick_guide_link" to="/new_customer">New Customer</Link>
                                <Link className="quick_guide_link" to="/rental_lookup">Rental Lookup</Link>
                                <Link className="quick_guide_link" to="/customer_lookup">Customer Lookup</Link>
                            </div>
                        </div>

                        <div className="rental_quick_view_container">
                            <section className="rental_quick_view_header">
                                <div className="tab_container">
                                    <button className="widget_rotate_tabs" disabled={this.props.widgetRotate === 1 ? true : false} onClick={() => this.props.pendingWidgetButton(1)}>Pending Rentals</button>
                                    <button className="widget_rotate_tabs" disabled={this.props.widgetRotate === 2 ? true : false} onClick={() => this.props.openWidgetButton(2)}>Open Rentals</button>
                                    <button className="widget_rotate_tabs" disabled={this.props.widgetRotate === 3 ? true : false} onClick={() => this.props.pastWidgetButton(3)}>Past Due</button>
                                    <button className="widget_rotate_tabs" disabled={this.props.widgetRotate === 4 ? true : false} onClick={() => this.props.soonWidgetButton(4)}>Due Soon</button>
                                </div>
                                <div className={this.props.widgetRotate === 1 ? "rental_quick_view_title show_widget" : "rental_quick_view_title hide_widget"}>PENDING RENTALS:</div>
                                <div className={this.props.widgetRotate === 2 ? "rental_quick_view_title show_widget" : "rental_quick_view_title hide_widget"}>OPEN RENTALS:</div>
                                <div className={this.props.widgetRotate === 3 ? "rental_quick_view_title show_widget" : "rental_quick_view_title hide_widget"}>PAST DUE:</div>
                                <div className={this.props.widgetRotate === 4 ? "rental_quick_view_title show_widget" : "rental_quick_view_title hide_widget"}>DUE SOON:</div>
                            </section>

                            <div className={this.props.widgetRotate === 1 ? "quick_guide_card_container show_widget" : "quick_guide_card_container hide_widget"}>
                                {pendingRentalQuickView}
                            </div>

                            <div className={this.props.widgetRotate === 2 ? "quick_guide_card_container show_widget" : "quick_guide_card_container hide_widget"}>
                                {activeRentalQuickView}
                            </div>

                            <div className={this.props.widgetRotate === 3 ? "quick_guide_card_container show_widget" : "quick_guide_card_container hide_widget"}>
                                {pastDueQuickView}
                            </div>

                            <div className={this.props.widgetRotate === 4 ? "quick_guide_card_container show_widget" : "quick_guide_card_container hide_widget"}>
                                {upcomingDueQuickView}
                            </div>
                        </div>

                    </container>
                </section>

                <section className="calendar_container">
                    <div className="calendar">
                        <BigCalendar
                            views={{ month: true, week: true, day: false, agenda: true }}
                            events={myEventsList}
                            startAccessor='startDate'
                            endAccessor='endDate'
                        />
                    </div>
                </section>
            </main>
        )
    }
}

function mapStateToProps(state) {
    return state.dashboard
}

export default connect(mapStateToProps, { getActiveRentalCount, getPendingRentals, getAvailPB, getAvailKayaks, getAvailLifeJackets, getAvailRoofRacks, getUpcomingDue, getPastDue, quickClose, quickEdit, updateCustomerID, openWidgetButton, pastWidgetButton, soonWidgetButton, pendingWidgetButton, quickOpen, testCloser, testOpener })(Dashboard)