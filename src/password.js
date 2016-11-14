import React, {Component} from 'react'
import axios from 'axios'
import {browserHistory} from 'react-router'
import {Form} from './subscribe'

axios.defaults.baseURL = 'http://' + window.location.hostname + ':8080'+ '/api'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

export class Password extends Component {
    state = {
        email: '',
        error: false
    }

    handleClick = () => {
        sessionStorage.setItem('email', this.state.email)
        axios.post('/retrieve-password', {email: this.state.email}).then(res => {
                if (res.data.success) {
                    browserHistory.push('/thank-you')
                } else {
                    this.setState({error: true})
                }
            }
        )
    }

    handleChange = e => {
        this.setState({email: e.target.value})
    }

    handleEnter = e => {
        if (e.target.value !== '' && e.keycode === 13) {
            this.handleChange()
        }
    }

    render() {
        return (
            <div className="Password-form">
                <div className="Password">
                    <div className="Password-text">Enter your email address to verify your account before resetting the
                        password.
                    </div>
                    <div><input type="text" name="email" placeholder="Email" value={this.state.email}
                                onChange={this.handleChange} onKeyUp={this.handleEnter}/></div>
                    <div className="Password-button" onClick={this.handleClick}>Require new password</div>
                </div>
            </div>
        )
    }
}

export class Password3 extends Component {
    state = {
        result: {},
        special: false,
        validating: false,
        error: false
    }

    updateUser = (_, name, value) => {
        this.setState({result: {[name]: value}})
    }

    handleSubmit = (user) => {
        this.setState({validating: true, result: user})
        axios.post('/change-password', {
            token: this.props.location.query.token,
            password: user.password,
            password2: user.password2
        }).then(response => {
            if (response.data.success) {
                this.setState({validating: false, error: false})
                browserHistory.push('/sign-in')

            } else {
                this.setState({validating: false, error: true})
            }
        })
    }



    render() {
        const before = ''
        return (
            <div>
                <Form form={'passform'} update={this.updateUser} submit={this.handleSubmit} before={before}
                      submitName={"Change password"} />
            </div>
        )
    }
}