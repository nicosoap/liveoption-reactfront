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


axios.defaults.baseURL = 'http://localhost:3001';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';



export class Form extends Component {
    state = {
        userForm: [],
        user: {}
    }

    updateUser = pl => this.setState(pl)

    componentDidMount() {
        axios.get('/admin/userform', {
            params: {
                form: this.props.form
            }
        })
            .then(response => {
                console.log(response)
                this.setState({userForm: response.data})

            })
    }

    render() {
        return (
            <div className={this.props.form}>
                <div className="section-1">
                    <div className="before-form">{this.props.before}</div>
                    {this.state.userForm.map((e, i) => {
                        switch (e.type) {
                            case 'checkbox':
                                return (
                                    <CheckboxInput params={e} key={i} save={this.updateUser}/>
                                )
                                break
                            case 'date':
                                return (
                                    <DateInput params={e} key={i} save={this.updateUser}/>
                                )
                                break
                            case 'email':
                                return (
                                    <EmailInput params={e} key={i} save={this.updateUser}/>
                                )
                                break
                            case 'hidden':
                                return (
                                    <HiddenInput params={e} key={i} save={this.updateUser}/>
                                )
                                break
                            case 'password':
                                return (
                                    <PasswordInput params={e} key={i} save={this.updateUser}/>
                                )
                                break
                            case 'radio':
                                return (
                                    <RadioInput params={e} key={i} save={this.updateUser}/>
                                )
                                break
                            case 'textArea':
                                return (
                                    <TextAreaInput params={e} key={i} save={this.updateUser}/>
                                )
                                break
                            case 'text':
                                return (
                                    <TextInput params={e} key={i} save={this.updateUser}/>
                                )
                                break
                            case 'photo':
                                return (
                                    <PhotoInput params={e} key={i} save={this.updateUser}/>
                                )
                                break
                            case 'tagInput':
                                return (
                                    <TagInput params={e} key={i} save={this.updateUser}/>
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


export class Subscribe extends Component {
    state = {
        result: {}
    }

    updateUser = pl => this.setState({result: pl})

    render() {
        const before = ''
        return(
            <Form form={'shortForm'} update={this.updateUser} submit={this.handleSubmit} before={before}/>
        )
    }
}

export class FullForm extends Component {
    state = {
        result: {}
    }

    updateUser = pl => this.setState({result: pl})

    render() {
        return (
            <Form form={'fullForm'} update={this.updateUser} submit={this.handleSubmit}/>
        )
    }
}

