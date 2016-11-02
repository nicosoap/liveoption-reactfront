import axios from 'axios'
import {Form} from './subscribe'
import React, {Component} from 'react'

export class FullForm extends Component {
    state = {
        result: {}
    }

    componentWillMount() {
        axios.get('/i').then(res => {
            axios.get('/user/'+ res.data.login)
                .then(response => {
                    this.setState({user: response.data.data, result: response.data.data},
                        () => console.log("Recieved state: ", this.state))
                })
        })

    }

    updateUser = async (_, name, value, result) => {
        console.log("name: ", name, "value: ", value, "result: ", {result: {[name]: value}})
        let new_result = this.state.user
            new_result[name] = value
            this.setState({result: new_result}, () => {
            })
        if (name === 'photo') {
            console.log("final result before submiting to db : ", this.state.result)
            this.handleSubmit()
        }
    }

    handleSubmit = async () => {
        console.log("Result: ",this.state.result)
        return await axios.post('/user/update', this.state.result)
            .then(response => {
                if (response.data.success === true) {
                    console.log("success")
                    return response.data
                }
            })
    }

    content1 = "Your profile is the first thing people will see of you. It should reflect who you are and what you're looking for on liveoption."
    content3 = "We keep your personal informations personal! None of these will be published, but we'll provide the other users with the ability to filter search results by age."
    content4 = "You can use tags to specify your hobbies and passions. Tags are used to elaborate a matching profile"
    content5 = "You'll need at least 1 profile picture to be enabled interactions. Profiles with several pictures get up to twice more views"


    render() {
        const content1 = this.content1
        const content3 = this.content3
        const content4 = this.content4
        const content5 = this.content5
        return (
            <div>
                <div className="profile-handbar">
                    <div className="content-1">{content1}</div>
                    <div className="content-3">{content3}</div>
                    <div className="content-4">{content4}</div>
                    <div className="content-5">{content5}</div>
                </div>
            <Form form={'fullForm'} defaultValues={this.state.user} before={"Modify Profile"} update={this.updateUser} submit={this.handleSubmit} submitName={"Update Profile"}/></div>
        )
    }
}

