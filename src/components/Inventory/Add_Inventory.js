import React, { Component } from 'react';
import axios from 'axios';


export default class Add_Inventory extends Component {
    componentDidMount(){
        axios.get('/auth/authorized').then(user => {
            console.log('the response user', user)
            if(user.data.user === false) {
                this.props.history.push('/')
            } else {
                console.log('did this work?!?!?!?!?')
                this.setState({
                    user: user.data
                })
            }
        })
    }

    render(){
        return (
            <div>
                ADD INVENTORY PAGE
            </div>
        )
    }
}