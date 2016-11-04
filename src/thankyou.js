/**
 * Created by opichou on 10/30/16.
 */

import React, {Component} from 'react'
import axios from 'axios'
import {browserHistory} from 'react-router'

export class Thankyou extends Component {
    state={}

    render() {
        return (
            <div className="ty">
            <div className='thankyou'>
                <div className="section-1">
                    <div className="before-form">{''} </div>
                    <h3>Thank you!</h3>
                    <p>You have successfully registered to liveoption.io <br/> Please check {sessionStorage.email} to activate your account.</p>
                    </div>
                </div>
                </div>
        )
    }
}


export class Validate extends Component {
    state={token: ''}

    componentDidMount() {
        console.log(this.props.location.query.token)
        this.setState({token: this.props.location.query.token}, () => {

            axios.defaults.baseURL = 'http://localhost:8080';
            console.log("Token exists: ", !!this.state.token)
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.state.token;


            axios.get('/activate_account').then(res => {
                if (res.data.success) {
                    console.log("JWT: ", res.data.user.token)
                    localStorage.jwt = res.data.user.token
                    browserHistory.push('/profile')
                } else {
                    console.log(res.data)
                    browserHistory.push('/sign-up')
                }
            })
        })
    }

    render() {
        return (
            <div className="ty">
            </div>
        )
    }
}