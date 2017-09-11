import React, { Component } from 'react';
import './Login.css';
import logo from '../../assets/logo.jpg';

export default class Login extends Component {
    render() {
        return (
            <main className="App">
                <container className="transparency">
                    <img className="landing_img" src={logo} alt='logo' />
                    <a><button className="login_button">Login</button></a>
                </container>
            </main>
        )
    }
}