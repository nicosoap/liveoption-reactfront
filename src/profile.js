import axios from 'axios'
import {Form} from './subscribe'
import React, {Component} from 'react'

export class FullForm extends Component {
    state = {
        result: {}
    }

    componentDidMount() {
    }

    componentWillReceiveProps(newProps) {
        if (newProps.login && !this.state.user) {
            axios.get('/user/' + newProps.login || 'error')
                .then(res => {
                    this.setState({user: res.data.data})
                })
        }
    }

    updateUser = (_, name, value) => {
            this.setState({result: {[name]: value}})
    }

    handleSubmit = () => {
        axios.post('/user/update', this.state.result)
            .then(response => {
                if (response.data.success === true) {

                }
            })
    }

    content1 = "Your profile is the first thing people will see of you. It should reflect who you are and what you're looking for on liveoption."
    content2 = "Your Login will be used as a nickname. You might modify it but please keep in mind that other users will try to find you back using your nickname"
    content3 = "We keep your personal informations personal. None of these will be published, but we'll provide the other users with the ability to filter search results by age."
    content4 = "You can use tags to specify your hobbies and passions. Tags are used to elaborate a matching profile"
    content5 = "You'll need at least 1 profile picture to be enabled interactions. Profiles with more pictures get more than 50% more views"


    render() {
        const content1 = this.content1
        const content2 = this.content2
        const content3 = this.content3
        const content4 = this.content4
        const content5 = this.content5
        return (
            <div>
                <div className="profile-handbar">
                    <div className="content-1"> {content1}</div>
                    <div className="content-2"> {content2}</div>
                    <div className="content-3"> {content3}</div>
                    <div className="content-4"> {content4}</div>
                    <div className="content-5"> {content5}</div>
                </div>
            <Form form={'fullForm'} defaultValues={this.state.user} before={"Modify Profile"} update={this.updateUser} submit={this.handleSubmit}
                  submitName={"Update profile"}/></div>
        )
    }
}

