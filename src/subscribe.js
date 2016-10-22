/**
 * Created by opichou on 10/15/16.
 */
import React, { Component } from 'react'
import axios from 'axios'
import {PhotoInput} from './photo'
import {CheckboxInput, DateInput, EmailInput, HiddenInput, PasswordInput, RadioInput, TextAreaInput, TextInput } from './inputs'

let my_jwt = localStorage.jwt
if (!my_jwt) {
    console.log("Navigator not supported")
}

axios.defaults.baseURL = 'http://localhost:3001';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + my_jwt;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export class FullForm extends Component {
    state = {userForm:{}}

    updateUser = pl => this.setState(pl)

    componentDidMount() {
        axios.get('/admin/userForm')
            .then(response => this.setState({userForm: response.data}, console.log(this.state)))
    }

    render() {
        this.state.userForm.map((e, i) => {
            switch (e.type) {
                case 'text':
                    break
                case 'checkbox':
                    break
                case 'textArea':
                    break
                case 'radio':
                    break
                case 'photo':
                    break
                case 'date':
                    break
                case 'radio':
                    break
                default:
                    break

            }
        })
        return (
            <div className="userForm card-2">
                <div className="section-1">
                    <CheckboxInput/>
                    <DateInput/>
                    <EmailInput/>
                    <HiddenInput/>
                    <PasswordInput/>
                    <RadioInput/>
                    <TextAreaInput/>
                    <TextInput/>
                    <PhotoInput save={this.updateUser()}/>
                </div>
            </div>
        )
    }
}

