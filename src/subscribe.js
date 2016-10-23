/**
 * Created by opichou on 10/15/16.
 */
import React, {Component} from 'react'
import axios from 'axios'
import TagInput from './taginput'
import {PhotoInput} from './photo'
import {
    CheckboxInput,
    DateInput,
    EmailInput,
    HiddenInput,
    PasswordInput,
    RadioInput,
    TextAreaInput,
    TextInput
} from './inputs'

// Clever lier, fooling us all, never thought I'd work it out
// How could I have known it was ever about you boy?
// Now there's nothing to say, there's no words and we're not talking anyhow
// You must have known I was never to doubt you boy

let my_jwt = localStorage.jwt
if (!my_jwt) {
    console.log("Navigator not supported")
}

axios.defaults.baseURL = 'http://localhost:3001';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + my_jwt;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export class FullForm extends Component {
    state = {
        userForm: [],
        user: {}
    }

    updateUser = pl => this.setState(pl)

    componentDidMount() {
        axios.get('/admin/userForm')
            .then(response => this.setState({userForm: response.data}, console.log(this.state)))
    }

    render() {

        return (
            <div className="userForm card-2">
                <div className="section-1">
                    { this.state.userForm.map((e, i) => {
                        switch (e.type) {
                            case 'checkbox':
                                return (
                                    <CheckboxInput params={e} key={i} save={this.updateUser()}/>
                                )
                                break
                            case 'date':
                                return (
                                    <DateInput params={e} key={i} save={this.updateUser()}/>
                                )
                                break
                            case 'email':
                                return (
                                    <EmailInput params={e} key={i} save={this.updateUser()}/>
                                )
                                break
                            case 'hidden':
                                return (
                                    <HiddenInput params={e} key={i} save={this.updateUser()}/>
                                )
                                break
                            case 'password':
                                return (
                                    <PasswordInput params={e} key={i} save={this.updateUser()}/>
                                )
                                break
                            case 'radio':
                                return (
                                    <RadioInput params={e} key={i} save={this.updateUser()}/>
                                )
                                break
                            case 'textArea':
                                return (
                                    <TextAreaInput params={e} key={i} save={this.updateUser()}/>
                                )
                                break
                            case 'text':
                                return (
                                    <TagInput params={e} key={i} save={this.updateUser()}/>
                                )
                                break
                            case 'photo':
                                return (
                                    <PhotoInput params={e} key={i} save={this.updateUser()}/>
                                )
                                break
                            case 'tagInput':
                                return (
                                    <TagInput params={e} key={i} save={this.updateUser()}/>
                                )
                            default:
                                return (
                                    <div className="hidden">I'm always learning things the hardest way</div>
                                )
                                break
                        }

                    })}
                </div>
            </div>
        )
    }
}

