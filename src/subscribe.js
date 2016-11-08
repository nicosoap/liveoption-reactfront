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
import {browserHistory} from 'react-router'
import Fingerprint2 from 'fingerprintjs2'

// Clever lier, fooling us all, never thought I'd work it out
// How could I have known it was ever about you boy?
// Now there's nothing to say, there's no words and we're not talking anyhow
// You must have known I was never to doubt you boy


export class Form extends Component {
    state = {
        userForm: [],
        user: {},
        special: false
    }

    componentWillMount() {
        axios.defaults.baseURL = 'http://localhost:8080';
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

        axios.get('/admin/userform?form=' + this.props.form || 'shortForm')
            .then(response => {
                if (response.status === 200) {
                    const userForm = response.data
                    this.setState({userForm})
                } else {
                    console.log("ERROR")
                }
            })

    }


    handleEnter = e => {
        if (e.keyCode === 13) {
            this.handleSubmit()
        }
    }

    handleSubmit = () => {
        let userForm = this.state.userForm,
            master_error = [0]
        master_error = userForm.map(e => {
            if (e.required === "true" && (this.state.user[e.name] === ('' || undefined) || e.error !== "")) {
                e.error = e.error === '' ? "This value must be provided" : e.error
                return (+1)
            } else return +0
        })
        this.setState({userForm: userForm})
        master_error = master_error.reduce((a, b) => (parseInt(a, 10) + parseInt(b, 10)), 0)
        if (master_error === 0) {
            this.props.submit(this.state.user)
        }
    }

    handleBlur = (event) => {
        console.log("save ?")
        if (this.props.blur) {
            console.log("saving")
            let userForm = this.state.userForm,
                user = {}
            userForm.map((e, i) => {
                if (e.required === "true" && (this.state.user[e.name] === ('' || undefined) || e.error !== "")) {
                    console.log(e.name, this.state.user[e.name])
                } else {
                    user[e.name] = this.state.user[e.name]
                }
            })
            this.props.submit(user)
        }
    }

    handleChange = async(id, name, value) => {
        const userForm = this.state.userForm,
            element = _.find(userForm, {'id': id})
        let element_id = userForm.indexOf(element)
        let validator_type = element.validator_type,
            validator = element.validator,
            update = () => {
                userForm.splice(element_id, 1, element)
                this.setState({userForm})
            },
            regex_val = {
                _1: /^.{8,48}$/,
                __1: "Password must be 8 characters long.",
                _2: /^(?=.*[a-z])(?=.*[A-Z][0-9]).{8,48}$/,
                __2: "Password must be 8 characters min with CAPS or numbers.",
                _3: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,48}$/,
                __3: "Password must be 8 characters min with CAPS and numbers."
            },
            user = this.state.user
        user[name] = value
        this.setState({user: user})

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
        console.log(this.props.user, userForm)
        return (
            <div className={this.props.form} onKeyUp={this.handleEnter}>
                <div className={"section-1 " + this.props.classes}>
                    <div className="before-form">{this.props.before}</div>
                    {
                        userForm.map((elem, i) => {
                            let e = elem
                            if (this.props.user && !e.value){
                                e.value = this.props.user[e.name]
                            }
                            switch (e.type) {
                                case 'checkbox':
                                    return (
                                        <CheckboxInput params={e} key={i} update={this.handleChange}
                                                       myBlur={this.handleBlur}/>
                                    )
                                case 'date':
                                    return (
                                        <DateInput params={e} key={i} update={this.handleChange}
                                                   myBlur={this.handleBlur}/>
                                    )
                                case 'email':
                                    return (
                                        <EmailInput params={e} key={i} update={this.handleChange}
                                                    myBlur={this.handleBlur}/>
                                    )
                                case 'hidden':
                                    return (
                                        <HiddenInput params={e} key={i} update={this.handleChange}
                                                     myBlur={this.handleBlur}/>
                                    )
                                case 'password':
                                    return (
                                        <PasswordInput params={e} key={i} update={this.handleChange}
                                                       myBlur={this.handleBlur}/>
                                    )
                                case 'radio':
                                    return (
                                        <RadioInput params={e} key={i} update={this.handleChange}
                                                    myBlur={this.handleBlur}/>
                                    )
                                case 'textArea':
                                    return (
                                        <TextAreaInput params={e} key={i} update={this.handleChange}
                                                       myBlur={this.handleBlur}/>
                                    )
                                case 'text':
                                    return (
                                        <TextInput params={e} key={i} update={this.handleChange}
                                                   myBlur={this.handleBlur}/>
                                    )
                                case 'photo':
                                    return (
                                        <PhotoInput params={e} key={i} update={this.handleChange}
                                                    myBlur={this.handleBlur}/>
                                    )
                                case 'tagInput':
                                    return (
                                        <TagInput params={e} key={i} update={this.handleChange} save={this.handleChange}
                                                  myBlur={this.handleBlur}/>
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

                    {(this.props.submit !== "none") ? <ButtonInput
                        submit={this.handleSubmit}
                        submitName={this.props.submitName}
                    /> : ''}
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

    componentDidMount() {
        new Fingerprint2().get((res, cmp) => {
            sessionStorage.setItem('fingerprint', res)
        })
        this.setState({fingerprint: sessionStorage.fingerprint})
    }


    updateUser = (_, name, value) => {
        this.setState({result: {[name]: value}})
    }

    handleSubmit = (user) => {
        this.setState({result: user, special: true})
    }

    handleAgree = async() => {
        this.setState({validating: true})
        axios.post('/user/new', {
            login: this.state.result.username,
            email: this.state.result.email,
            password: this.state.result.password,
            password2: this.state.result.password2,
            fingerprint: this.state.fingerprint
        }).then(response => {
            if (response.data.success) {
                sessionStorage.setItem('email', this.state.result.email)
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
        return (
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
