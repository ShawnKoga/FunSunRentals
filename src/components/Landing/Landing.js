import React, { Component } from 'react';
import './Landing.css';
import logo from '../../assets/FUTSRArtboard 1.svg';
import lakeVideo from '../../assets/Lake - 913.mp4';
import { SocialIcon } from 'react-social-icons';
import axios from 'axios';

let url = 'http://localhost:8080';

export default class Landing extends Component {
    constructor() {
        super()

        this.state = {
            firstName: null,
            lastName: null,
            email: null,
            phone: null,
            address: null,
            city: null,
            state: null,
            zip: null,
            customerDisp: [],

            customerID: 0,
            startDate: null,
            endDate: null,
            pbCount: 0,
            kayakCount: 0,
            roofRackCount: 0,
            lifeJacketCount: 0,

            weatherCity: null,
            weatherState: null,
            weatherForecast: [],

            custReqToggler: 1
        }
    }
    updateFirstName(e) {
        this.setState({
            firstName: e
        })
    }
    updateLastName(e) {
        this.setState({
            lastName: e
        })
    }
    updateEmail(e) {
        this.setState({
            email: e
        })
    }
    updatePhone(e) {
        this.setState({
            phone: e
        })
    }
    updateAddress(e) {
        this.setState({
            address: e
        })
    }
    updateCity(e) {
        this.setState({
            city: e
        })
    }
    updateState(e) {
        this.setState({
            state: e
        })
    }
    updateZip(e) {
        this.setState({
            zip: e
        })
    }
    customerCheck(obj) {
        if (this.state.firstName !== null && this.state.lastName !== null && this.state.email !== null && this.state.phone !== null && this.state.address !== null && this.state.city !== null && this.state.state !== null && this.state.zip !== null) {
            axios.put(`${url}/customers/check_customer`, obj)
                .then((res) => {
                    console.log('the first', res.data)
                    if (res.data[0]) {
                        this.setState({
                            customerDisp: res.data,
                            custReqToggler: 2
                        })
                    } else {
                        axios.post(`${url}/customers/create_new_customer`, obj)
                            .then((res) => {
                                this.setState({
                                    customerID: res.data[0].customer_id,
                                    custReqToggler: 3
                                })
                            })
                    }
                })
        } else {
            alert('Please fill out contact info!')
        }
    }
    returningCustApprove(num) {
        this.setState({
            customerID: num,
            custReqToggler: 3
        })
    }
    newCustomerApprove(obj) {
        axios.post(`${url}/customers/create_new_customer`, obj)
            .then((res) => {
                this.setState({
                    customerID: res.data[0].customer_id,
                    custReqToggler: 3
                })
            })
    }
    updateStartDate(date) {
        this.setState({
            startDate: date
        })
    }
    updateEndDate(date) {
        this.setState({
            endDate: date
        })
    }
    updatePBCount(num) {
        this.setState({
            pbCount: num
        })
    }
    updateKayakCount(num) {
        this.setState({
            kayakCount: num
        })
    }
    updateLifeJacketCount(num) {
        this.setState({
            lifeJacketCount: num
        })
    }
    updateRoofRackCount(num) {
        this.setState({
            roofRackCount: num
        })
    }
    submitRentalRequest(obj) {
        if (this.state.startDate !== null && this.state.endDate !== null) {
            document.getElementById('inputfield1').value = '';
            document.getElementById('inputfield2').value = '';
            document.getElementById('inputfield3').value = '';
            document.getElementById('inputfield4').value = '';
            document.getElementById('inputfield5').value = '';
            document.getElementById('inputfield6').value = '';
            document.getElementById('inputfield7').value = '';
            document.getElementById('inputfield8').value = '';
            document.getElementById('inputfield9').value = '';
            document.getElementById('inputfield10').value = '';
            document.getElementById('inputfield11').value = '';
            document.getElementById('inputfield12').value = '';
            document.getElementById('inputfield13').value = '';
            document.getElementById('selectfield').value = 'null';
            this.setState({
                custReqToggler: 1
            })
            axios.post(`${url}/rentals/create_new_rental`, obj)
                .then((res) => {
                    alert('Thank you for your request! We will be in touch with you shortly!')
                })
        } else {
            alert('Please fill out your rental info!')
        }

    }
    updateWeatherCity(e) {
        this.setState({
            weatherCity: e
        })
    }
    updateWeatherState(e) {
        this.setState({
            weatherState: e
        })
    }
    getWeather(obj) {
        const { weatherCity, weatherState } = obj;
        axios.get(`http://api.wunderground.com/api/${process.env.REACT_APP_WEATHER}/forecast10day/q/${weatherState}/${weatherCity}.json`)
            .then((res) => {
                console.log(res.data.forecast.simpleforecast.forecastday)
                this.setState({
                    weatherForecast: res.data.forecast.simpleforecast.forecastday
                })
            })
    }

    render() {
        const isThisYouCust = this.state.customerDisp.map((c, i) => {
            return (
                <div key={i} className="step_two_info_container">
                    <div className="step_two_name">{c.firstname} {c.lastname}</div>
                    <div className="step_two_key">Phone:&nbsp;</div><div className="step_two_val">{c.phone}</div>
                    <div className="step_two_key">Email:&nbsp;</div><div className="step_two_val">{c.email}</div>
                    <div className="step_two_key">Address:&nbsp;</div><div className="step_two_val">{c.address}</div>
                    <div className="step_two_key">City:&nbsp;</div><div className="step_two_val">{c.city}</div>
                    <div className="step_two_key">State:&nbsp;</div><div className="step_two_val">{c.state}</div>
                    <div className="step_two_key">ZIP:&nbsp;</div><div className="step_two_val">{c.zip}</div>
                </div>
            )
        })
        const forecast = this.state.weatherForecast.map((c, i) => {
            return (
                <div key={i} className="forecast_day_plat">
                    <div className="forecast_row">
                        <div className="forecast_title">Date:&nbsp;</div><div>{c.date.monthname_short} {c.date.day}, {c.date.year}</div>
                    </div>
                    <div className="forecast_row">
                        <div className="forecast_title">Low:&nbsp;</div><div>{c.low.fahrenheit}&#176;F</div>
                        <div className="forecast_title">High:&nbsp;</div><div>{c.high.fahrenheit}&#176;F</div>
                    </div>
                    <div className="forecast_row">
                        <div className="forecast_title">Conditions:&nbsp;</div><div>{c.conditions}</div>
                        <div className="forecast_title">Wind:&nbsp;</div><div>{c.avewind.mph}</div>
                    </div>
                </div>
            )
        })

        return (
            <main>
                {/* HEADER */}
                <section className="landing_header">
                    <a  href="#landing" className="landing_title">
                        <div>FUN UNDER THE SUN<br />RENTALS</div>
                    </a>
                    <div>
                        <a href="#about_us" className="landing_header_button">ABOUT US</a>
                        <a href="#request_time" className="landing_header_button">RENT</a>
                        <a href="#contact" className="landing_header_button">CONTACT US</a>
                        <a href={process.env.REACT_APP_LOGIN}><button className="landing_header_button">LOGIN</button></a>
                    </div>
                </section>

                {/* LANDING */}
                <a id="landing">
                    <div className="landing_img_container">
                        <img className="landing_img" src={logo} alt='logo' />
                    </div>

                    <div className="fullscreen-bg">
                        <video loop autoPlay className="fullscreen-bg_video" type="video/mp4">
                            <source src={lakeVideo} type="video/mp4" />
                        </video>
                    </div>
                </a>

                {/* ABOUT US */}
                <a id="about_us">
                    <section id="about_us" className="about_section">
                        <div className="about_us_header">
                            <div className="about_heading">Fun under the sun</div>
                            <div className="about_style_line"></div>
                        </div>
                        <div className="about_text">
                            Your 'go-to' rental company for kayaks,<br />
                            stand up paddle boards, tables, and chairs.<br />
                            Equipment powered by latest Lifetime Products.<br />
                            $20/Day with special promotions on multi-rentals!<br />
                        </div>
                    </section>
                </a>


                {/* REQUEST A RESERVATION */}
                <a id="request_time">
                    <section id="reservation_section" className="reservation_section">
                        <div className="reservation_header">
                            <div className="reservation_style_line"></div>
                            <div className="reservation_heading">Request a rental</div>
                        </div>
                        <section className="request_container">
                            <section className="main_request_container">

                                {/* STEP ONE */}
                                <div className={this.state.custReqToggler === 1 ? "request_info_container show_req" : "request_info_container hide_req"}>
                                    <div className="req_row">
                                        <div className="req_info_title">First Name:</div> <input id="inputfield1" className="req_name_box" onChange={(e) => this.updateFirstName(e.target.value)} />
                                        <div className="req_info_title">Last Name:</div> <input id="inputfield2" className="req_name_box" onChange={(e) => this.updateLastName(e.target.value)} />
                                    </div>
                                    <div className="req_row">
                                        <div className="req_info_title">Phone:</div> <input id="inputfield3" className="req_name_box" onChange={(e) => this.updatePhone(e.target.value)} />
                                        <div className="req_info_title">Email:</div> <input id="inputfield4" className="req_name_box" onChange={(e) => this.updateEmail(e.target.value)} />
                                    </div>
                                    <div className="req_row">
                                        <div className="req_info_title">Address:</div> <input id="inputfield5" className="req_address_box" onChange={(e) => this.updateAddress(e.target.value)} />
                                    </div>
                                    <div className="req_row">
                                        <div className="req_info_title">City:</div> <input id="inputfield6" className="req_name_box" onChange={(e) => this.updateCity(e.target.value)} />
                                        <div className="req_info_title">State:</div>
                                        <select id="selectfield" className="req_state_box" onChange={(e) => this.updateState(e.target.value)}>
                                            <option value="null">SELECT ONE</option>
                                            <option value="AL">Alabama</option>
                                            <option value="AK">Alaska</option>
                                            <option value="AZ">Arizona</option>
                                            <option value="AR">Arkansas</option>
                                            <option value="CA">California</option>
                                            <option value="CO">Colorado</option>
                                            <option value="CT">Connecticut</option>
                                            <option value="DE">Delaware</option>
                                            <option value="DC">District Of Columbia</option>
                                            <option value="FL">Florida</option>
                                            <option value="GA">Georgia</option>
                                            <option value="HI">Hawaii</option>
                                            <option value="ID">Idaho</option>
                                            <option value="IL">Illinois</option>
                                            <option value="IN">Indiana</option>
                                            <option value="IA">Iowa</option>
                                            <option value="KS">Kansas</option>
                                            <option value="KY">Kentucky</option>
                                            <option value="LA">Louisiana</option>
                                            <option value="ME">Maine</option>
                                            <option value="MD">Maryland</option>
                                            <option value="MA">Massachusetts</option>
                                            <option value="MI">Michigan</option>
                                            <option value="MN">Minnesota</option>
                                            <option value="MS">Mississippi</option>
                                            <option value="MO">Missouri</option>
                                            <option value="MT">Montana</option>
                                            <option value="NE">Nebraska</option>
                                            <option value="NV">Nevada</option>
                                            <option value="NH">New Hampshire</option>
                                            <option value="NJ">New Jersey</option>
                                            <option value="NM">New Mexico</option>
                                            <option value="NY">New York</option>
                                            <option value="NC">North Carolina</option>
                                            <option value="ND">North Dakota</option>
                                            <option value="OH">Ohio</option>
                                            <option value="OK">Oklahoma</option>
                                            <option value="OR">Oregon</option>
                                            <option value="PA">Pennsylvania</option>
                                            <option value="RI">Rhode Island</option>
                                            <option value="SC">South Carolina</option>
                                            <option value="SD">South Dakota</option>
                                            <option value="TN">Tennessee</option>
                                            <option value="TX">Texas</option>
                                            <option value="UT">Utah</option>
                                            <option value="VT">Vermont</option>
                                            <option value="VA">Virginia</option>
                                            <option value="WA">Washington</option>
                                            <option value="WV">West Virginia</option>
                                            <option value="WI">Wisconsin</option>
                                            <option value="WY">Wyoming</option>
                                        </select>
                                        <div className="req_info_title">Zip:</div><input id="inputfield7" className="req_zip_box" onChange={(e) => this.updateZip(e.target.value)} />
                                    </div>
                                    <button className="req_submit_button" onClick={() => { this.customerCheck(this.state) }}>NEXT</button>
                                </div>

                                {/* STEP TWO */}
                                <div className={this.state.custReqToggler === 2 ? "is_this_you_container show_req" : "request_info_container hide_req"}>
                                    <div className="step_two_title">IS THIS YOU?</div>
                                    {isThisYouCust}
                                    <button className="req_no_button" onClick={() => this.newCustomerApprove(this.state)}>NO, I'M NEW</button>
                                    <button className="req_submit_button" onClick={() => this.returningCustApprove(this.state.customerDisp[0].customer_id)}>YES</button>
                                </div>

                                {/* STEP THREE */}
                                <div className={this.state.custReqToggler === 3 ? "request_info_container show_req" : "request_info_container hide_req"}>
                                    <div className="req_row">
                                        <div className="req_info_title">Pickup Date:</div><input id="inputfield8" className="req_state_box" type="date" onChange={(e) => this.updateStartDate(e.target.value)} />
                                        <div className="req_info_title">Return Date:</div><input id="inputfield9" className="req_state_box" type="date" onChange={(e) => this.updateEndDate(e.target.value)} />
                                    </div>
                                    <div className="req_row">
                                        <div className="req_info_title">Paddleboards:</div><input id="inputfield10" type="number" min="0" className="req_state_box" onChange={(e) => this.updatePBCount(e.target.value)} />
                                        <div className="req_info_title">Kayaks:</div><input id="inputfield11" type="number" min="0" className="req_state_box" onChange={(e) => this.updateKayakCount(e.target.value)} />
                                    </div>
                                    <div className="req_row">
                                        <div className="req_info_title">Lifejackets:</div> <input id="inputfield12" type="number" min="0" className="req_state_box" onChange={(e) => this.updateLifeJacketCount(e.target.value)} />
                                        <div className="req_info_title">Roof Racks:</div> <input id="inputfield13" type="number" min="0" className="req_state_box" onChange={(e) => this.updateRoofRackCount(e.target.value)} />
                                    </div>
                                    <button className="req_submit_button" onClick={() => this.submitRentalRequest(this.state)}>SUBMIT</button>
                                </div>
                            </section>

                            <section className="weather_checker_container">
                                <div className="weather_getter_container">
                                    <div className="weather_title">10 Day Weather Forecast</div>
                                    <div className="weather_row"><div className="weather_cat">City:&nbsp;</div><input className="weather_box" onChange={(e) => this.updateWeatherCity(e.target.value)} /></div>
                                    <div className="weather_row"><div className="weather_cat">State:&nbsp;</div><select className="weather_box" onChange={(e) => this.updateWeatherState(e.target.value)}>
                                        <option value="null">SELECT ONE</option>
                                        <option value="AL">Alabama</option>
                                        <option value="AK">Alaska</option>
                                        <option value="AZ">Arizona</option>
                                        <option value="AR">Arkansas</option>
                                        <option value="CA">California</option>
                                        <option value="CO">Colorado</option>
                                        <option value="CT">Connecticut</option>
                                        <option value="DE">Delaware</option>
                                        <option value="DC">District Of Columbia</option>
                                        <option value="FL">Florida</option>
                                        <option value="GA">Georgia</option>
                                        <option value="HI">Hawaii</option>
                                        <option value="ID">Idaho</option>
                                        <option value="IL">Illinois</option>
                                        <option value="IN">Indiana</option>
                                        <option value="IA">Iowa</option>
                                        <option value="KS">Kansas</option>
                                        <option value="KY">Kentucky</option>
                                        <option value="LA">Louisiana</option>
                                        <option value="ME">Maine</option>
                                        <option value="MD">Maryland</option>
                                        <option value="MA">Massachusetts</option>
                                        <option value="MI">Michigan</option>
                                        <option value="MN">Minnesota</option>
                                        <option value="MS">Mississippi</option>
                                        <option value="MO">Missouri</option>
                                        <option value="MT">Montana</option>
                                        <option value="NE">Nebraska</option>
                                        <option value="NV">Nevada</option>
                                        <option value="NH">New Hampshire</option>
                                        <option value="NJ">New Jersey</option>
                                        <option value="NM">New Mexico</option>
                                        <option value="NY">New York</option>
                                        <option value="NC">North Carolina</option>
                                        <option value="ND">North Dakota</option>
                                        <option value="OH">Ohio</option>
                                        <option value="OK">Oklahoma</option>
                                        <option value="OR">Oregon</option>
                                        <option value="PA">Pennsylvania</option>
                                        <option value="RI">Rhode Island</option>
                                        <option value="SC">South Carolina</option>
                                        <option value="SD">South Dakota</option>
                                        <option value="TN">Tennessee</option>
                                        <option value="TX">Texas</option>
                                        <option value="UT">Utah</option>
                                        <option value="VT">Vermont</option>
                                        <option value="VA">Virginia</option>
                                        <option value="WA">Washington</option>
                                        <option value="WV">West Virginia</option>
                                        <option value="WI">Wisconsin</option>
                                        <option value="WY">Wyoming</option>
                                    </select></div>
                                    <button className="get_weather_button" onClick={() => this.getWeather(this.state)}>GET THE WEATHER</button>
                                </div>
                                <div className="req_divider_line"></div>

                                <div className="forecast_container">
                                    {forecast}
                                </div>
                            </section>
                        </section>
                    </section>
                </a>

                {/* CONTACT US */}
                <a id="contact">
                    <section id="contact_section" className="contact_us_section">
                        <div className="contact_header">
                            <div className="contact_heading">Get in touch</div>
                            <div className="contact_style_line"></div>
                        </div>

                        <section className="contact_module_container">
                            <div className="contact_info_container">
                                <div className="phone_container">
                                    <span className="phone_icon" role="img">&#128241;</span>
                                    <div className="phone_email_container">
                                        <div className="location_text_heading">Phone:</div>
                                        <div className="location_text">(818)294-1268</div>
                                    </div>
                                </div>

                                <div className="email_container">
                                    <span className="email_icon" role="img">&#128231;</span>
                                    <div className="phone_email_container">
                                        <div className="location_text_heading">Email:</div>
                                        <div className="location_text">fununderthesun801@gmail.com</div>
                                    </div>
                                </div>

                                <div className="social_container">
                                    <SocialIcon url="https://www.facebook.com/FunUnderTheSun801/" />
                                    <SocialIcon url="https://www.instagram.com/big_papi_adam/" />
                                    <SocialIcon url="https://www.linkedin.com/in/adam-grimaldo-081b7070/" />
                                </div>
                            </div>

                            <div className="contact_info_container">
                                <div className="location_text_heading">Address:</div>
                                <div className="location_text">346 N 300 W</div>
                                <div className="location_text">Bountiful, UT 84010</div>
                                <iframe className="location_map" title="map_to_place" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3016.022242636766!2d-111.88929868503628!3d40.89332503444037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8752f826ae621cdd%3A0xf29519b19d1e55c7!2s346+N+300+W%2C+Bountiful%2C+UT+84010!5e0!3m2!1sen!2sus!4v1506549432932" allowFullScreen></iframe>
                            </div>

                            <div className="contact_info_container">
                                <div className="location_text_heading">Name:</div>
                                <input className="name_email_box" />
                                <div className="location_text_heading">Email:</div>
                                <input className="name_email_box" />
                                <div className="location_text_heading">Message:</div>
                                <input className="message_box" />
                                <div className="location_text_heading">How did you hear about us?</div>
                                <select className="contact_select_box">
                                    <option value="null">SELECT ONE</option>
                                </select>
                                <button className="contact_submit_button">Submit</button>
                            </div>

                        </section>
                    </section>
                </a>
            </main>
        )
    }
}