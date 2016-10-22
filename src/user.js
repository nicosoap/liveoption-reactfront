/**
 * Created by opichou on 10/15/16.
 */
import React, { Component } from 'react'
import axios from 'axios'

let my_jwt = localStorage.jwt
if (!my_jwt) {
    console.log("Navigator not supported")
}

axios.defaults.baseURL = 'http://localhost:3001';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + my_jwt;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export class User extends Component {
    state = {userForm:{}}

    componentDidMount() {
        axios.get('/admin/userForm')
            .then(response => this.setState({userForm: response.data}, console.log(this.state)))
    }

    render() {
        return (
            <div className="user card-2">
                <div className="profile-picture">
                    <div className="user-name">Olivier</div>
                    <div className="user-description">Salut c'est cool !</div>
                </div>
            </div>
        )
    }
}

