/**
 * Created by opichou on 10/12/16.
 */
import React, { Component } from 'react'
import {Form} from './subscribe'
import axios from 'axios'
import {browserHistory} from 'react-router'
import Fingerprint2 from 'fingerprintjs2'
import './App.css'


export class Login extends Component {
    state = {
        login: '',
        password: '',
        fingerprint: ''
    }

    componentDidMount() {
        new Fingerprint2().get(function(result, components){
            // this will use all available fingerprinting sources
            console.log(result);
            this.setState({fingerprint: result})
            // components is an array of all fingerprinting components used
            console.log(components);
        });
    }
    updateUser = (e) => {
        console.log(e.target.name, e.target.value)
        this.setState({[e.target.name]: e.target.value})}


    handleSubmit = () => {
        axios.post('/login', {
            login: this.state.login,
            password: this.state.password
        }).then(response => {
            if (response.data.success) {
                localStorage.jwt = response.data.token
                browserHistory.push('/')
            }
        })
    }

    render() {
        const before = ''
        return (
            <div className="Login">
                <Form form={'login'} update={this.updateUser} submit={this.handleSubmit} before={before} submitName={"Sign-in"}/>
            </div>
        )
    }
}