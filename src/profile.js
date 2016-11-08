import axios from 'axios'
import React, {Component} from 'react'
import PhotoInput from './photo'
import TagInput from './taginput'
import cx from 'classnames'
import * as _ from 'lodash-node'

export class FullForm extends Component {
    state = {
        result: {},
        userForm: {},
        user: {
            active: {
                value:false
            },
            login:{
                value:''
            },
            email:{
                value:'',
                error:'',
                validating: false,
                valid: true
            },
            firstName:{
                value:'',
                error:'',
                validating: false,
            },
            lastName:{
                value:'',
                error:'',
                validating: false,
            },
            gender:{
                value:'',
                error:'',
                validating: false,
            },
            birthDate:{
                value:'',
                error:'',
                validating: false,
            },
            attractedByMale:{
                value:'',
                error:'',
                validating: false,
            },
            attractedByOther:{
                value:'',
                error:'',
                validating: false,
            },
            attractedByFemale:{
                value:'',
                error:'',
                validating: false,
            },
            bio:{
                value:'',
                error:'',
                validating: false,
            },
            photo:{
                value:[],
                error:'',
                validating: false,
                maxLength: 5
            },
            tags:{
                value:[],
                error:'',
                validating: false,
            },
        }
    }

    componentWillMount() {
        axios.get('/i').then(res => {
            axios.get('/user/' + res.data.login)
                .then(response => {
                    if (response.data.success) {
                        let user = this.state.user
                        _.forOwn(response.data.user, (e, i) => {
                            user[i].value = e
                        })

                        this.setState({user})
                        }

                })
        })
        axios.get('/admin/userform?form=fullForm')
            .then(response => {
                if (response.status === 200) {
                    const userForm = response.data
                    this.setState({userForm})
                }
            })
    }

    handleEnter = e => {
        if (e.keyCode === 13) {
            this.handleSubmit()
        }
    }

    handleSubmit = async (name, value) => {
            axios.post('/user/update', {[name]: value})
                .then(response => {
                    return response.success
                })
    }
    handleChange = e => {
        let name = e.target.name,
            value = e.target.value,
            user = this.state.user
        user[name].value = value
        this.setState({user})
    }

    handleBlur =  async(e) => {
        let name = e.target.name,
            value = e.target.value,
            user = this.state.user
        user[name].validating = true
        this.setState({user})
        user[name].value = value
        const userForm = this.state.userForm,
            element = _.find(userForm, {'name': name}),
            validator_type = element.validator_type,
            validator = element.validator,
            update = () => {
                this.setState({user})
            },
            regex_val = {
                _1: /^.{8,48}$/,
                __1: "Password must be 8 characters long.",
                _2: /^(?=.*[a-z])(?=.*[A-Z][0-9]).{8,48}$/,
                __2: "Password must be 8 characters min with CAPS or numbers.",
                _3: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,48}$/,
                __3: "Password must be 8 characters min with CAPS and numbers."
            }

        if (value === '') {
            user[name].validating = false
            user[name].valid = false
            user[name].error = ''
            update()
            return
        }
        user[name].validating = false

        if (validator_type === "password") {
            if (regex_val['_' + validator].test(value)) {
                user[name].valid = true
                user[name].error = ''

            } else {
                user[name].valid = false
                user[name].error = regex_val["__" + validator]
            }
        }

        else if (validator_type === "echo") {
            if (value === user[validator]) {
                user[name].valid = true
                user[name].error = ''
            } else {
                user[name].valid = false
                user[name].error = 'Passwords must be the same'

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
            user[name].error = ''
        }

        update()
        return await this.updateUser(name, value)
    }

    handleCheckbox = e => {
        const name = e.target.name,
            user = this.state.user,
            value = !user[name].value
        user[name].value = value
        this.setState({user})
        this.updateUser(name, value)
    }

    handleRadio = e => {
        const name = e.target.name,
            user = this.state.user,
            value = e.target.id
        user[name].value = value
        this.setState({user})
        this.updateUser(name, value)

    }

    updateUser = async (name, value) => {
        let user = this.state.user
        user[name].value = value
        this.setState({user})
        return await this.handleSubmit(name, value)
    }


    content1 = "Your profile is the first thing people will see of you. It should reflect who you are and what you're looking for on liveoption."
    content3 = "We keep your personal informations personal! None of these will be published, but we'll provide the other users with the ability to filter search results by age."
    content4 = "You can use tags to specify your hobbies and passions. Tags are used to elaborate a matching profile"
    content5 = "You'll need at least 1 profile picture to be enabled interactions. Profiles with several pictures get up to twice more views"

    render() {
        const content1 = this.content1,
            content3 = this.content3,
            content4 = this.content4,
            content5 = this.content5,
            {email, birthDate, firstName, lastName, photo, tags, attractedByMale, attractedByOther, attractedByFemale, bio, gender} = this.state.user
        return (
            <div>
                <div className="profile-handbar">
                    <div className="content-1">{content1}</div>
                    <div className="content-3">{content3}</div>
                    <div className="content-4">{content4}</div>
                    <div className="content-5">{content5}</div>
                </div>
                <div className='fullForm' >
                    <div className="section-1 ">
                        <div className="before-form">Modify Profile</div>
                        <div className="section" ></div>
                        <div className="input">
                            <span className="error-message">{email.error !== '' ? email.error : null}</span>
                            <input
                                id='email'
                                type='email'
                                name='email'
                                value={email.value}
                                placeholder='Email'
                                autoComplete='email'
                                required='true'
                                className={cx({
                                    'emailInput': true,
                                    'validating': email.validating,
                                    'valid': email.valid,
                                    'error': email.error !== ''
                                })
                                } onChange={this.handleChange}
                                onBlur={this.handleBlur}/>
                        </div>


                        <div className="section"></div>


                        <div className="input">
                            <span className="error-message">{firstName.error !== '' ? firstName.error : null}</span>
                            <input
                                id="firstName"
                                type='text'
                                name='firstName'
                                value={firstName.value}
                                defaultValue={firstName.defaultValue}
                                placeholder="First Name"
                                autoComplete='given-name'
                                className={cx({
                                    'textInput': true,
                                    'validating': firstName.validating,
                                    'valid': firstName.valid,
                                    'error': firstName.error !== ''
                                })
                                } onChange={this.handleChange}
                                onBlur={this.handleBlur}/>
                            <div className={cx({
                                "loading": true,
                                "validating": firstName.validating,
                                'valid': firstName.valid,
                                "error": firstName.error
                            })}>
                            </div>
                        </div>
                        <div className="input">
                            <span className="error-message">{lastName.error !== '' ? lastName.error : null}</span>
                            <input
                                type='text'
                                name='lastName'
                                value={lastName.value}
                                defaultValue={lastName.defaultValue}
                                placeholder="Last Name"
                                autoComplete='family-name'
                                className={cx({
                                    'textInput': true,
                                    'validating': lastName.validating,
                                    'valid': lastName.valid,
                                    'error': lastName.error !== ''
                                })
                                } onChange={this.handleChange}
                                onBlur={this.handleBlur}/>
                            <div className={cx({
                                "loading": true,
                                "validating": lastName.validating,
                                'valid': lastName.valid,
                                "error": lastName.error
                            })}>
                            </div>
                        </div>
                        <div className="select">
                            <span className="error-message">{gender.error !== '' ? gender.error : null}</span>
                            <span className="radioInput"
                                        >
                                <input type="radio"
                                    name="gender"
                                    id='female'
                                    label='Female'
                                    checked={(gender.value === 'female')}
                                    onChange={this.handleRadio}
                                />
                                <label
                                    htmlFor='female'
                                >
                                    Female
                                    </label>
                                </span>
                                <span className="radioInput"
                                >
                                    <input type="radio"
                                    name="gender"
                                    id='other'
                                    label='Other'
                                    checked={(gender.value === 'other')}
                                    onChange={this.handleRadio}
                                />
                                <label
                                    htmlFor='other'
                                >
                                    Other
                                    </label>
                                </span>
                                <span className="radioInput"
                                >
                                    <input type="radio"
                                    name="gender"
                                    id='male'
                                    label='Male'
                                    checked={(gender.value === 'male')}
                                    onChange={this.handleRadio}
                                />
                                <label
                                    htmlFor='male'
                                >
                                    Male
                                    </label>
                        </span>
                        </div>


                        <div className="input">
                            <span className="error-message">{birthDate.error}</span>
                            <label htmlFor='birthdate'>Birthdate:</label>
                            <input
                                type='date'
                                name='birthDate'
                                value={birthDate.value}
                                autoComplete='bday'
                                className="textInput"
                                onChange={this.handleChange}
                                onBlur={this.handleBlur}
                            />
                        </div>


                        <div className="input">
                            <span className="error-message">{attractedByFemale.error}</span>

                            <span className="checkboxInput">
                <input
                    id='attractedByFemale'
                    type='checkbox'
                    name='attractedByFemale'
                    value="true"
                    onChange={this.handleCheckbox}
                    checked={attractedByFemale.value}
                />
                <label htmlFor='attractedByFemale'>
                    I like women
                </label>
            </span>
                        </div>
                        <div className="input">
                            <span className="error-message">{attractedByOther.error}</span>

                            <span className="checkboxInput">
                <input
                    id='attractedByOther'
                    type='checkbox'
                    name='attractedByOther'
                    onChange={this.handleCheckbox}
                    checked={attractedByOther.value}
                />
                <label htmlFor='attractedByOther'>
                    I like other genders
                </label>
            </span>
                        </div>
                        <div className="input">
                            <span className="error-message">{attractedByMale.error}</span>

                            <span className="checkboxInput">
                <input
                    id='attractedByMale'
                    type='checkbox'
                    name='attractedByMale'
                    onChange={this.handleCheckbox}
                    checked={attractedByMale.value}

                />
                <label htmlFor='attractedByMale'>
                    I like men
                </label>
            </span>
                        </div>

                        <div className="section"></div>

                        <div className="textarea">
                            <span className="error-message">{bio.error !== '' ? bio.error : null}</span>
                            <textarea
                                id='bio'
                                name='bio'
                                value={bio.value}
                                placeholder='Tell us more about yourself...'
                                className={cx({
                                    'textInput': true,
                                    'validating': bio.validating,
                                    'valid': bio.valid,
                                    'error': bio.error !== ''
                                })
                                }
                                rows="8"
                                maxLength="2500"
                                onChange={this.handleChange}
                                onBlur={this.handleBlur}
                            ></textarea>
                        </div>
                        <TagInput params={tags}  update={this.updateUser} />
                        <div className="section"></div>
                        <PhotoInput params={photo}  update={this.updateUser}
                                    myBlur={this.handleBlur}/>
                    </div>
                </div>


            </div>
        )
    }
}

