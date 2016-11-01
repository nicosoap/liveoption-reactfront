/**
 * Created by opichou on 10/30/16.
 */

import React, {Component} from 'react'
import axios from 'axios'
import {browserHistory} from 'react-router'

export class Thankyou extends Component {
    state={email: ''}

    componentDidMount() {
        this.setState({email: sessionStorage.email})
    }
    render() {
        return (
            <div className="ty">
            <div className='thankyou'>
                <div className="section-1">
                    <div className="before-form">{''} </div>
                    <h3>Thank you!</h3>
                    <p>You have successfully registered to liveoption.io <br/> Please check {this.state.email} to activate your account.</p>
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

            axios.defaults.baseURL = 'http://localhost:3001';
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.state.token;


            axios.get('/activate_account').then(res => {
                console.log(res)
                if (res.data.success) {
                    localStorage.jwt = res.data.token
                    browserHistory.push('/')
                } else {
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