/**
 * Created by opichou on 10/15/16.
 */
import React, {Component} from 'react'
import * as _ from 'lodash-node'
import axios from 'axios'
import TagInput from './taginput'
import {PhotoInput} from './photo'
import cx from 'classnames'
import {Terms} from './terms'
import {
    CheckboxInput,
    DateInput,
    EmailInput,
    HiddenInput,
    PasswordInput,
    RadioInput,
    TextAreaInput,
    TextInput,
    ButtonInput
} from './inputs'
import { browserHistory } from 'react-router'

// Clever lier, fooling us all, never thought I'd work it out
// How could I have known it was ever about you boy?
// Now there's nothing to say, there's no words and we're not talking anyhow
// You must have known I was never to doubt you boy


axios.defaults.baseURL = 'http://localhost:3001';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';



export class Form extends Component {
    state = {
        userForm: [],
        user: {},
        special: false
    }

    componentWillMount() {
        axios.get('/admin/userform?form=' + this.props.form)
            .then(response => {
                const userForm = response.data
                console.log(userForm)
                this.setState({userForm})
            })
    }

    // componentWillReceiveProps(newProps) {
    //     if (newProps.defaultValues && !this.state.def) {
    //         axios.get('/admin/userform?form=' + newProps.form)
    //             .then(response => {
    //             let userForm = response.data,
    //                 user = newProps.defaultValues
    //             userForm.map((e, i) => {
    //                     if (user[e.name]) {
    //                         userForm[i].defaultValue = user[e.name]
    //                     }
    //                 return 0
    //                 }
    //             )
    //             this.setState({userForm, user, def:true})
    //         })
    //     }
    // }


    handleEnter = e => {
        if (e.keyCode === 13) {this.handleSubmit()}
    }

    handleSubmit = () => {
        let userForm = this.state.userForm,
            master_error = [0]
        master_error = userForm.map((e ,i ) => {
            if (e.required === "true" && (this.state.user[e.name] === ('' || undefined) || e.error !== "")) {
                e.error = e.error === '' ? "This value must be provided" : e.error
                return (+1)
            } else return +0})
        this.setState({userForm: userForm})
        master_error = master_error.reduce((a, b) => (parseInt(a, 10) + parseInt(b, 10)), 0)
        if (master_error === 0) {
            this.props.submit(this.state.user)
        }
    }

    handleChange = async (id, name, value) => {

        console.log( id, name, value)
        const userForm = this.state.userForm,
            element = _.find(userForm, {'id': id})
        console.log(element)
            let element_id = userForm.indexOf(element)
        console.log("element id:", element_id)
            let validator_type = element.validator_type,
            validator = element.validator,
            update = () => {
                userForm.splice(element_id, 1, element)
                this.setState({userForm})
            },
            regex_val = {
            _1 : /^.{8,48}$/,
            __1 : "Password must be 8 characters long.",
            _2 : /^(?=.*[a-z])(?=.*[A-Z][0-9]).{8,48}$/,
            __2 : "Password must be 8 characters min with CAPS or numbers.",
            _3 : /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,48}$/,
            __3 : "Password must be 8 characters min with CAPS and numbers."},
            user = this.state.user
        user[name]=value
        this.setState({user:user})

        if (value === '') {
            element.validating = false
            element.valid = false
            element.error = ''
            update()
            return
        }

        element.validating = true
        update()
        element.validating = false

        if (validator_type === "password") {
            if (regex_val['_' + validator].test(value)) {
                element.valid = true
                element.error = ''

            } else {
                element.valid = false
                element.error = regex_val["__" + validator]
            }
        }

        else if (validator_type === "echo") {
            if (value === user[validator]) {
                element.valid = true
                element.error = ''
            } else {
                element.valid = false
                element.error = 'Passwords must be the same'

            }
        }

        else if (validator_type === "http") {
            let response = await axios.get(validator + value)

            if (response.data.valid) {
                element.valid = true
                element.error = ''

            } else if (response.data) {
                element.valid = false
                element.error = response.data.message
            }
        }

        else {
            element.error = ''
        }

        update()

        let result = userForm.filter(e => e.name !== 'id').map(e => {
            return ({[e.name]: e.value})
        })
        return await this.props.update(id, name, value, result)
    }

    render() {
        const userForm = this.state.userForm
        // if (!this.props.defaultValues) return (<div></div>)
        return (
            <div className={this.props.form} onKeyUp={this.handleEnter}>
                <div className={"section-1 " + this.props.classes}>
                    <div className="before-form">{this.props.before}</div>
                    {
                        userForm.map((elem, i) => {
                            let e = elem
                            if (this.props.defaultValues) {
                                e.defaultValue = this.props.defaultValues[e.name]
                            }
                        switch (e.type) {
                            case 'checkbox':
                                return (
                                    <CheckboxInput params={e} key={i} update={this.handleChange}/>
                                )
                            case 'date':
                                return (
                                    <DateInput params={e} key={i} update={this.handleChange}/>
                                )
                            case 'email':
                                return (
                                    <EmailInput params={e} key={i} update={this.handleChange}/>
                                )
                            case 'hidden':
                                return (
                                    <HiddenInput params={e} key={i} update={this.handleChange}/>
                                )
                            case 'password':
                                return (
                                    <PasswordInput params={e} key={i} update={this.handleChange}/>
                                )
                            case 'radio':
                                return (
                                    <RadioInput params={e} key={i} update={this.handleChange}/>
                                )
                            case 'textArea':
                                return (
                                    <TextAreaInput params={e} key={i} update={this.handleChange}/>
                                )
                            case 'text':
                                return (
                                    <TextInput params={e} key={i} update={this.handleChange}/>
                                )
                            case 'photo':
                                return (
                                    <PhotoInput params={e} key={i} update={this.handleChange}/>
                                )
                            case 'tagInput':
                                return (
                                    <TagInput params={e} key={i} update={this.handleChange}/>
                                )
                            case 'spacer':
                                return (
                                    <div className="spacer" style={{height: e.value}} key={i}/>
                                )

                            case 'section':
                                return (
                                    <div className="section" key={i}>{e.value}</div>
                                )
                            default:
                                return (
                                    <div className="hidden">I'm always learning things the hardest way</div>
                                )
                        }
                    })}

                    {(this.props.submit !== "none")?<ButtonInput
                                 submit={this.handleSubmit}
                                 submitName={this.props.submitName}
                    />:''}
                </div>
            </div>
        )
    }
}


export class Subscribe extends Component {
    state = {
        result: {},
        special: false,
        validating: false,
        error: false
        }


    updateUser = (_, name, value) => {
        this.setState({result:{[name]:value}})
    }

    handleSubmit = (user) => {
        this.setState({result: user, special: true})
    }

    handleAgree = async () => {
        this.setState({validating: true})
        axios.post('/user/new', {
            login: this.state.result.username,
            email: this.state.result.email,
            password: this.state.result.password,
            password2: this.state.result.password2
        }).then(response => {
                if (response.data.success){
                    sessionStorage.setItem('email' , this.state.result.email)
                    browserHistory.push('/thank-you')
                this.setState({validating: false, error: false})
            } else {
                this.setState({validating: false, error: true, special: false})
            }
            })
    }

    handleClear = () => this.setState({special: false})



    render() {
        const before = ''
        const {validating, error, special} = this.state
        return(
            <div>
                <div className={cx({
                    'md-modal': true,
                    'md-effect-1': true,
                    'md-show': special
                })} id="modal-1">
                    <div className="md-content">
                        <h3>Terms & Conditions</h3>
                        <div className="terms-conditions">
                                <Terms />
                            <ButtonInput validating={validating}
                                         error={error}
                                         submit={this.handleAgree}
                                            submitName={"I Accept the Terms and Conditions"}
                            />
                        </div>
                    </div>
                </div>
                <div className="md-overlay" onClick={this.handleClear}></div>
                <Form form={'shortForm'} update={this.updateUser} submit={this.handleSubmit} before={before}
                      submitName={"Sign-up"}/>
            </div>
        )
    }
}
