import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import Header from './Header';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getActiveRentalCount, getPendingRentals, getAvailPB, getAvailKayaks, getAvailLifeJackets, getAvailRoofRacks, getUpcomingDue, getPastDue, quickClose, backWidgetButton, nextWidgetButton } from '../../ducks/dashReducer';
import { updateCustomerID } from '../../ducks/createRentalReducer';
// import axios from 'axios';

// import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
// import 'pure-react-carousel/dist/react-carousel.es.css';
import './Dashboard.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// let url = 'http://localhost:8080';

// const ontime = require('ontime')

// ontime({
//     cycle: ['09:00:00']
// }, function (ot) {
//     axios.get(url + `/rentals/get_pending_today`)
//         .then(res => {
//             res.data.map((c, i) => {
//                 axios.put(url + `/rentals/confirm_checkout`, c)
//                     .then(res => {
//                         alert(res.data)
//                     }
//                     )
//             })
//         });
//     ot.done()
//     return
// })

class Dashboard extends Component {
    componentDidMount() {
        this.props.getActiveRentalCount();
        this.props.getPendingRentals();
        this.props.getAvailPB();
        this.props.getAvailKayaks();
        this.props.getAvailLifeJackets();
        this.props.getAvailRoofRacks();
        this.props.getPastDue();
        this.props.getUpcomingDue();
    }

    // componentWillReceiveProps(nextProps) {
    //     nextProps.getActiveRentalCount();
    //     nextProps.getPastDue();
    //     nextProps.getUpcomingDue();
    //     nextProps.getPendingRentals();
    // }


    render() {
        console.log(this.props)

        BigCalendar.momentLocalizer(moment);
        var myEventsList = [];

        const activeRentalQuickView = this.props.activeRentalCount.map((c, i) => {
            var closeObj = { rentalID: c.rental_id }
            // var start = (c.start_date).substring(0, (c.start_date).indexOf('T'));
            var end = (c.end_date).substring(0, (c.end_date).indexOf('T'));
            return (
                <div key={i} className={this.props.widgetRotate === 1 ? "open_rental_card show_widget" : "open_rental_card hide_widget"}>
                    <div>
                        <div className="rental_card_key">Customer Name:&nbsp;</div> <div className="rental_card_val">{c.firstname} {c.lastname}</div>
                        <div className="rental_card_key">Phone:&nbsp;</div> <div className="rental_card_val">{c.phone}</div>
                        <div className="rental_card_key">Email:&nbsp;</div> <div className="rental_card_val">{c.email}</div>
                        <div className="rental_card_key">Return Date:&nbsp;</div> <div className="rental_card_val">{end}</div>
                        <div className="rental_card_key">Boards:&nbsp;</div> <div className="rental_card_val">{c.paddleboards}</div>
                        <div className="rental_card_key">Kayaks:&nbsp;</div> <div className="rental_card_val">{c.kayaks}</div>
                        <div className="rental_card_key">Racks:&nbsp;</div> <div className="rental_card_val">{c.roofracks}</div>
                        <div className="rental_card_key">Jackets:&nbsp;</div> <div className="rental_card_val">{c.lifejackets}</div>
                    </div>
                    <div>
                        <div className="rental_card_key">Rental #:&nbsp;</div> <div className="rental_card_val">{c.rental_id}</div>
                        <button className="quick_close_button" onClick={() => { this.props.quickClose(closeObj) }}>Close Rental</button>
                    </div>
                </div>
            )
        })
        
        const pastDueQuickView = this.props.pastDueRentals.map((c, i) => {
            var closeObj = { rentalID: c.rental_id }
            // var start = (c.start_date).substring(0, (c.start_date).indexOf('T'));
            var end = (c.end_date).substring(0, (c.end_date).indexOf('T'));
            return (
                <div key={i} className={this.props.widgetRotate === 2 ? "open_rental_card show_widget" : "open_rental_card hide_widget"}>
                    <div>
                        <div className="rental_card_key">Customer Name:&nbsp;</div> <div className="rental_card_val">{c.firstname} {c.lastname}</div>
                        <div className="rental_card_key">Phone:&nbsp;</div> <div className="rental_card_val">{c.phone}</div>
                        <div className="rental_card_key">Email:&nbsp;</div> <div className="rental_card_val">{c.email}</div>
                        <div className="rental_card_key">Return Date:&nbsp;</div> <div className="rental_card_val">{end}</div>
                        <div className="rental_card_key">Boards:&nbsp;</div> <div className="rental_card_val">{c.paddleboards}</div>
                        <div className="rental_card_key">Kayaks:&nbsp;</div> <div className="rental_card_val">{c.kayaks}</div>
                        <div className="rental_card_key">Racks:&nbsp;</div> <div className="rental_card_val">{c.roofracks}</div>
                        <div className="rental_card_key">Jackets:&nbsp;</div> <div className="rental_card_val">{c.lifejackets}</div>
                    </div>
                    <div>
                        <div className="rental_card_key">Rental #:&nbsp;</div> <div className="rental_card_val">{c.rental_id}</div>
                        <button className="quick_close_button" onClick={() => { this.props.quickClose(closeObj) }}>Close Rental</button>
                    </div>
                </div>
            )
        })

        const upcomingDueQuickView = this.props.upcomingDueRentals.map((c, i) => {
            var closeObj = { rentalID: c.rental_id }
            // var start = (c.start_date).substring(0, (c.start_date).indexOf('T'));
            var end = (c.end_date).substring(0, (c.end_date).indexOf('T'));
            return (
                <div key={i} className={this.props.widgetRotate === 3 ? "open_rental_card show_widget" : "open_rental_card hide_widget"}>
                    <div>
                        <div className="rental_card_key">Customer Name:&nbsp;</div> <div className="rental_card_val">{c.firstname} {c.lastname}</div>
                        <div className="rental_card_key">Phone:&nbsp;</div> <div className="rental_card_val">{c.phone}</div>
                        <div className="rental_card_key">Email:&nbsp;</div> <div className="rental_card_val">{c.email}</div>
                        <div className="rental_card_key">Return Date:&nbsp;</div> <div className="rental_card_val">{end}</div>
                        <div className="rental_card_key">Boards:&nbsp;</div> <div className="rental_card_val">{c.paddleboards}</div>
                        <div className="rental_card_key">Kayaks:&nbsp;</div> <div className="rental_card_val">{c.kayaks}</div>
                        <div className="rental_card_key">Racks:&nbsp;</div> <div className="rental_card_val">{c.roofracks}</div>
                        <div className="rental_card_key">Jackets:&nbsp;</div> <div className="rental_card_val">{c.lifejackets}</div>
                    </div>
                    <div>
                        <div className="rental_card_key">Rental #:&nbsp;</div> <div className="rental_card_val">{c.rental_id}</div>
                        <button className="quick_close_button" onClick={() => { this.props.quickClose(closeObj) }}>Close Rental</button>
                    </div>
                </div>
            )
        })

        const pendingRentalQuickView = this.props.pendingRentals.map((c, i) => {
            var closeObj = { rentalID: c.rental_id }
            var start = (c.start_date).substring(0, (c.start_date).indexOf('T'));
            var end = (c.end_date).substring(0, (c.end_date).indexOf('T'));
            return (
                <div key={i} className={this.props.widgetRotate === 4 ? "open_rental_card show_widget" : "open_rental_card hide_widget"}>
                    <div>
                        <div className="rental_card_key">Customer Name:&nbsp;</div> <div className="rental_card_val">{c.firstname} {c.lastname}</div>
                        <div className="rental_card_key">Phone:&nbsp;</div> <div className="rental_card_val">{c.phone}</div>
                        <div className="rental_card_key">Email:&nbsp;</div> <div className="rental_card_val">{c.email}</div>
                        <div className="rental_card_key">Dates:&nbsp;</div> <div className="rental_card_val">{start}</div><div>{end}</div>
                        <div className="rental_card_key">Boards:&nbsp;</div> <div className="rental_card_val">{c.paddleboards}</div>
                        <div className="rental_card_key">Kayaks:&nbsp;</div> <div className="rental_card_val">{c.kayaks}</div>
                        <div className="rental_card_key">Racks:&nbsp;</div> <div className="rental_card_val">{c.roofracks}</div>
                        <div className="rental_card_key">Jackets:&nbsp;</div> <div className="rental_card_val">{c.lifejackets}</div>
                    </div>
                    <div>
                        <div className="rental_card_key">Rental #:&nbsp;</div> <div className="rental_card_val">{c.rental_id}</div>
                        <button className="quick_close_button" onClick={() => { this.props.quickClose(closeObj) }}>Close Rental</button>
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
                            <div className="quick_guide_component">
                                <div className="quick_guide_title">QuickStats</div>
                                <div>Active Rentals: {this.props.activeRentalCount.length}</div>
                                <div>Rentals Past Due: {this.props.pastDueRentals.length}</div>
                                <div>Upcoming Due: {this.props.upcomingDueRentals.length}</div>
                                <div>Avail. PB: {this.props.currentAvailPB}</div>
                                <div>Avail. Kayaks: {this.props.currentAvailKayaks}</div>
                                <div>Avail. Jackets: {this.props.currentAvailLifeJackets}</div>
                                <div>Avail. Racks: {this.props.currentAvailRoofRacks}</div>
                            </div>

                            <div className="quick_guide_component">
                                <div className="quick_guide_title">QuickLinks</div>
                                <Link to="/new_rental" onClick={() => this.props.updateCustomerID(0)}>New Rental</Link>
                                <Link to="/close_rental">Close Rental</Link>
                                <Link to="/new_customer">New Customer</Link>
                                <Link to="/rental_lookup">Rental Lookup</Link>
                                <Link to="/customer_lookup">Customer Lookup</Link>
                            </div>
                        </div>

                        <div className="rental_quick_view_container">
                            <section className="rental_quick_view_header">
                                <button disabled={this.props.widgetRotate <= 1 ? true : false} onClick={() => this.props.backWidgetButton(1)}>Back</button>
                                <div className={this.props.widgetRotate === 1 ? "rental_quick_view_title show_widget" : "rental_quick_view_title hide_widget"}>OPEN RENTALS:</div>
                                <div className={this.props.widgetRotate === 2 ? "rental_quick_view_title show_widget" : "rental_quick_view_title hide_widget"}>PAST DUE:</div>
                                <div className={this.props.widgetRotate === 3 ? "rental_quick_view_title show_widget" : "rental_quick_view_title hide_widget"}>UPCOMING DUE:</div>
                                <div className={this.props.widgetRotate === 4 ? "rental_quick_view_title show_widget" : "rental_quick_view_title hide_widget"}>PENDING RENTALS:</div>
                                <button disabled={this.props.widgetRotate >= 4 ? true : false} onClick={() => this.props.nextWidgetButton(1)}>Next</button>
                            </section>

                            <div className="quick_guide_card_container">
                                {activeRentalQuickView}
                            </div>

                            <div className="quick_guide_card_container">
                                {pastDueQuickView}
                            </div>

                            <div className="quick_guide_card_container">
                                {upcomingDueQuickView}
                            </div>

                            <div className="quick_guide_card_container">
                                {pendingRentalQuickView}
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

export default connect(mapStateToProps, { getActiveRentalCount, getPendingRentals, getAvailPB, getAvailKayaks, getAvailLifeJackets, getAvailRoofRacks, getUpcomingDue, getPastDue, quickClose, updateCustomerID, backWidgetButton, nextWidgetButton })(Dashboard)