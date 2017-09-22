import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import Header from './Header';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getActiveRentalCount, getAvailPB, getAvailKayaks, getAvailLifeJackets, getAvailRoofRacks, getUpcomingDue, getPastDue, quickClose } from '../../ducks/dashReducer';
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

    // componentWillReceiveProps(nextProps) {
    //     nextProps.getActiveRentalCount();
    // }


    render() {
        BigCalendar.momentLocalizer(moment);

        var myEventsList = [];

        const rentalQuickView = this.props.activeRentalCount.map((c, i) => {
            var closeObj = {rentalID: c.rental_id}
            // var start = (c.start_date).substring(0, (c.start_date).indexOf('T'));
            var end = (c.end_date).substring(0, (c.end_date).indexOf('T'));
            return (
                <div key={i} className="open_rental_card">
                    <div>
                        <div>Customer Name: {c.firstname} {c.lastname}</div>
                        <div>Phone: {c.phone}</div>
                        <div>Email: {c.email}</div>
                        <div>Status: {c.status}</div>
                        <div>Return Date: {end}</div>
                        <div>Boards: {c.paddleboards}</div>
                        <div>Kayaks: {c.kayaks}</div>
                        <div>Racks: {c.roofracks}</div>
                        <div>Jackets: {c.lifejackets}</div>
                    </div>
                    <div>
                        <div>Rental #: {c.rental_id}</div>
                        <button className="quick_close_button" onClick={()=>{this.props.quickClose(closeObj)}}>Close Rental</button>
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
                                <Link to="/new_rental">New Rental</Link>
                                <Link to="/close_rental">Close Rental</Link>
                                <Link to="/new_customer">New Customer</Link>
                                <div>Rental Lookup</div>
                            </div>
                        </div>

                        {/* <div className="rental_quick_view_carousel">
                            <CarouselProvider
                                naturalSlideWidth={100}
                                naturalSlideHeight={125}
                                totalSlides={3}>
                                <ButtonBack>Back</ButtonBack>
                                <ButtonNext>Next</ButtonNext>
                                <Slider>
                                    <Slide index={0}>I am the first Slide</Slide>
                                    <Slide index={1}>I am the second Slide.</Slide>
                                    <Slide index={2}>I am the third Slide.</Slide>
                                </Slider>
                            </CarouselProvider>
                        </div> */}

                        <div className="rental_quick_view_container">
                                <div className="quick_guide_title">OPEN RENTALS:</div>
                                {rentalQuickView}
                        </div>

                    </container>
                </section>

                <section className="calendar_container">
                        <div className="calendar">
                            <BigCalendar
                                views={{month: true, week: true, day: false, agenda: true}}
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

export default connect(mapStateToProps, { getActiveRentalCount, getAvailPB, getAvailKayaks, getAvailLifeJackets, getAvailRoofRacks, getUpcomingDue, getPastDue, quickClose })(Dashboard)