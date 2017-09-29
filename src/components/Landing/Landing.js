import React, { Component } from 'react';
import './Landing.css';
import logo from '../../assets/FUTSRArtboard 1.svg';
import lakeVideo from '../../assets/Lake - 913.mp4';
import { SocialIcon } from 'react-social-icons';

export default class Login extends Component {
    render() {
        return (
            <main>
                {/* HEADER */}
                <section className="landing_header">
                    <div className="landing_title">
                        <div>FUN UNDER THE SUN<br />RENTALS</div>
                    </div>
                    <div>
                        <a><button className="landing_header_button">ABOUT US</button></a>
                        <a><button className="landing_header_button">RENT</button></a>
                        <a><button className="landing_header_button">CONTACT US</button></a>
                        <a href={process.env.REACT_APP_LOGIN}><button className="landing_header_button">LOGIN</button></a>
                    </div>
                </section>

                {/* LANDING */}
                <div className="landing_img_container">
                    <img className="landing_img" src={logo} alt='logo' />
                </div>

                <div className="fullscreen-bg">
                    <video loop autoPlay className="fullscreen-bg_video" type="video/mp4">
                        <source src={lakeVideo} type="video/mp4" />
                    </video>
                </div>

                {/* ABOUT US */}
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


                {/* REQUEST A RESERVATION */}
                <section id="reservation_section" className="reservation_section">
                    <div className="reservation_header">
                        <div className="reservation_style_line"></div>
                        <div className="reservation_heading">Request a rental</div>
                    </div>
                    <section className="request_container">
                        <section className="main_request_container">
                            <div className="request_info_container">
                                <div className="req_row">
                                    <div className="req_info_title">First Name:</div> <input className="req_name_box" />
                                    <div className="req_info_title">Last Name:</div> <input className="req_name_box" />
                                </div>
                                <div className="req_row">
                                    <div className="req_info_title">Phone:</div> <input className="req_name_box" />
                                    <div className="req_info_title">Email:</div> <input className="req_name_box" />
                                </div>
                                <div className="req_row">
                                    <div className="req_info_title">Address:</div> <input className="req_address_box" />
                                </div>
                                <div className="req_row">
                                    <div className="req_info_title">City:</div> <input className="req_name_box" />
                                    <div className="req_info_title">State:</div>
                                    <select className="req_state_box">
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

                                    <div className="req_info_title">Zip:</div><input />
                                </div>
                            </div>

                            <div className="req_divider_line"></div>

                            <div className="request_info_container">
                                <div className="req_row">
                                    <div className="req_info_title">Pickup Date:</div><input className="req_state_box" type="date" />
                                    <div className="req_info_title">Return Date:</div><input className="req_state_box" type="date" />
                                </div>
                                <div className="req_row">
                                    <div className="req_info_title">Paddleboards:</div><input type="number" min="0" className="req_state_box" />
                                    <div className="req_info_title">Kayaks:</div><input type="number" min="0" className="req_state_box" />
                                </div>
                                <div className="req_row">
                                    <div className="req_info_title">Lifejackets:</div> <input type="number" min="0" className="req_state_box" />
                                    <div className="req_info_title">Roof Racks:</div> <input type="number" min="0" className="req_state_box" />
                                </div>
                            </div>
                            <button className="req_submit_button">SUBMIT</button>
                        </section>

                        <section className="weather_checker_container">
                            
                        </section>
                    </section>
                </section>

                {/* CONTACT US */}
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
                            <iframe className="location_map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3016.022242636766!2d-111.88929868503628!3d40.89332503444037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8752f826ae621cdd%3A0xf29519b19d1e55c7!2s346+N+300+W%2C+Bountiful%2C+UT+84010!5e0!3m2!1sen!2sus!4v1506549432932" allowFullScreen></iframe>
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
            </main>
        )
    }
}

