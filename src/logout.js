import React, {Component} from 'react'
import { browserHistory } from 'react-router'
import axios from 'axios'


// localStorage.jwt = ''
// browserHistory.push('/sign-in')

export class Logout extends Component {
    state = {}

    componentWillMount() {
        axios.get('/sign-out').then(res => {
            if (!res.data.success){
            } else {
                localStorage.jwt = ''
                browserHistory.push('/sign-in')
            }
        })
    }
    render() {
        return(
            <div>signing-out...</div>
        )
    }
}