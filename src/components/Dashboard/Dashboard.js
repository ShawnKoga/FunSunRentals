import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import Header from './Header';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getActiveRentalCount, getAvailPB, getAvailKayaks, getAvailLifeJackets, getAvailRoofRacks, getUpcomingDue, getPastDue, quickClose } from '../../ducks/dashReducer';
import { updateCustomerID } from '../../ducks/createRentalReducer';
// import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import axios from 'axios';

import './Dashboard.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'pure-react-carousel/dist/react-carousel.es.css';

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
        this.props.getActiveRentalCount();
        this.props.getAvailPB();
        this.props.getAvailKayaks();
        this.props.getAvailLifeJackets();
        this.props.getAvailRoofRacks();
        this.props.getPastDue();
        this.props.getUpcomingDue();
    }

    componentWillReceiveProps(nextProps) {
        nextProps.getActiveRentalCount();
    }


    render() {
        BigCalendar.momentLocalizer(moment);

        var myEventsList = [];

        const rentalQuickView = this.props.activeRentalCount.map((c, i) => {
            var closeObj = { rentalID: c.rental_id }
            // var start = (c.start_date).substring(0, (c.start_date).indexOf('T'));
            var end = (c.end_date).substring(0, (c.end_date).indexOf('T'));
            return (
                <div key={i} className="open_rental_card">
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

        return (
            <main>
                <Header />

                <section className="body">
                    <container className="dash_transparency">

                        <div className="quick_guide_container">
                            <div className="quick_guide_component">
                                <div className="quick_guide_title">QuickStats</div>
                                <div>Active Rentals: {this.props.activeRentalCount.length}</div>
                                <div>Rentals Past Due: {this.props.pastDueRentals}</div>
                                <div>Upcoming Due: {this.props.upcomingDueRentals}</div>
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
                                <div>Rental Lookup</div>
                                <Link to="/customer_lookup">Customer Lookup</Link>
                            </div>
                        </div>

                        {/* <div className="rental_quick_view_carousel">
                            <CarouselProvider
                                naturalSlideWidth={100}
                                naturalSlideHeight={100}
                                totalSlides={3}
                            >
                                <ButtonBack>Back</ButtonBack>
                                <ButtonNext>Next</ButtonNext>
                                <Slider>
                                    <Slide index={0}>I am the first Slide.</Slide>
                                    <Slide index={1}>I am the second Slide.</Slide>
                                    <Slide index={2}>I am the third Slide.</Slide>
                                </Slider>
                            </CarouselProvider>
                        </div> */}

                        <div className="rental_quick_view_container">
                            <div className="quick_guide_title">OPEN RENTALS:</div>
                            <div className="quick_guide_card_container">
                                {rentalQuickView}
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

export default connect(mapStateToProps, { getActiveRentalCount, getAvailPB, getAvailKayaks, getAvailLifeJackets, getAvailRoofRacks, getUpcomingDue, getPastDue, quickClose, updateCustomerID })(Dashboard)