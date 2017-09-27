import React, { Component } from 'react';
import './Landing.css';
import logo from '../../assets/FUTSRArtboard 1.svg';
import lakeVideo from '../../assets/Lake - 913.mp4';

export default class Login extends Component {
    render() {
        return (
            <main>
                <section className="landing_header">
                    <div className="landing_title">
                        <div>FUN UNDER THE SUN</div>
                        <div>RENTALS</div>
                    </div>
                    <div>
                        <a><button className="landing_header_button">ABOUT US</button></a>
                        <a><button className="landing_header_button">REQUEST A RESERVATION</button></a>
                        <a><button className="landing_header_button">CONTACT US</button></a>
                        <a href={process.env.REACT_APP_LOGIN}><button className="landing_header_button">LOGIN</button></a>
                    </div>
                </section>

                <div className="landing_img_container">
                    <img className="landing_img" src={logo} alt='logo' />
                </div>

                <div className="fullscreen-bg">
                    <div className="landing_transparency"></div>
                        <video loop mute autoPlay class="fullscreen-bg_video" type="video/mp4">
                            <source src={lakeVideo} type="video/mp4" />
                        </video>
                </div>



                {/* <section className="App">
                    <container className="transparency">
                    </container>
                </section> */}
            </main>
        )
    }
}

