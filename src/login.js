/**
 * Created by opichou on 10/12/16.
 */
import React, { Component } from 'react'
import {Form} from './subscribe'
import axios from 'axios'
import {browserHistory, Link} from 'react-router'
import Fingerprint2 from 'fingerprintjs2'
import './App.css'


let my_jwt = localStorage.jwt

axios.defaults.baseURL = 'http://' + window.location.hostname + ':8080'+ '/api'
if (my_jwt) {axios.defaults.headers.common['Authorization'] = 'Bearer ' + my_jwt}
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

export class Login extends Component {
    state = {
        username: '',
        password: '',
        error: false
    }


    componentDidMount() {
        new Fingerprint2().get((res, cmp) => {
            sessionStorage.setItem('fingerprint', res)
        })
        this.setState({fingerprint: sessionStorage.fingerprint}, () => {
            if (my_jwt && this.state.fingerprint) {
                this.handleSubmit()
            }
        })
    }

    updateUser = (id, name, value) => {
        this.setState({[name]: value})}

    handleSubmit = () => {

        axios.post('/login', {
            login: this.state.username,
            password: this.state.password,
            fingerprint: sessionStorage.fingerprint,
            token: localStorage.jwt
        }).then(response => {
            if (response.data.auth && response.data.auth.success) {
                localStorage.jwt = response.data.auth.token
                browserHistory.push('/')
            } else {
                this.setState({error:true})
                setTimeout(() => this.setState({error:false}), 600)
                if (this.state.username === '') {
                    localStorage.removeItem('jwt')
                }
            }
        })
    }

    render() {
        const {error, username, password} = this.state,
            classes = error?'error':'',
            before = ''
        return (
            <div className="Login">
                <Form classes={classes} form={'login'} update={this.updateUser} username={username} password={password} submit={this.handleSubmit} before={before} submitName={"Sign-in"}/>
                <div className="sign-up"><Link to="/sign-up"><div>Register</div></Link>
                    <Link to="/retrieve-password"><div>Retrieve password</div></Link></div>
            </div>
        )
    }
}