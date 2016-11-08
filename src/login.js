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

axios.defaults.baseURL = 'http://localhost:8080'
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
            console.log(this.state.fingerprint)
            if (my_jwt && this.state.fingerprint) {
                this.handleSubmit()
            }
        })
    }

    updateUser = (id, name, value) => {
        console.log('!')
        this.setState({[name]: value})}

    handleSubmit = () => {
        if (!this.state.fingerprint || this.state.fingerprint === '') {
            console.log("A problem occured using fingerprint")
        }
        console.log('1')
        axios.post('/login', {
            login: this.state.username,
            password: this.state.password,
            fingerprint: sessionStorage.fingerprint,
            token: localStorage.jwt
        }).then(response => {
            console.log('2')
            if (response.data.auth && response.data.auth.success) {
                console.log(response.data.auth.token)
                console.log('3a')
                localStorage.jwt = response.data.auth.token
                console.log("JWT: ",localStorage.jwt)
                browserHistory.push('/')
            } else {
                console.log('3b')
                console.log("Authentication error:", response.data.auth.message)
                this.setState({error:true})
                setTimeout(() => this.setState({error:false}), 600)
                if (this.state.username === '') {

                    console.log('4')
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
                <div className="sign-up"><Link to="/sign-up">Register</Link></div>
            </div>
        )
    }
}