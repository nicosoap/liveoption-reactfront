import React, {Component} from 'react'
import { browserHistory } from 'react-router'


// localStorage.jwt = ''
// browserHistory.push('/sign-in')

export class Logout extends Component {
    state = {}

    componentWillMount() {
        localStorage.jwt = ''
        browserHistory.push('/sign-in')
    }
    render() {
        return(
            <div>Error !</div>
        )
    }
}