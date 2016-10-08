import React, { Component } from 'react';

import io from 'socket.io-client'
import Messenger from './messenger'
import Interactions from './interactions'

let my_jwt = localStorage.jwt
if ( !my_jwt) {
    console.log("Navigator not supported")
}

export default class Notifications extends Component {

    state = {
        socket: null
    }

    componentDidMount() {
        this.socket = io('localhost:3001/', {
            'query' : 'token=' + my_jwt
        })
        this.setState({socket : this.socket})
    }

    render () {
        console.log(this.state.socket)
        return (
            <div>
                <a href="#" >
                    <div id="notifications" className="floating notif">
                    <i className="material-icons">menu</i>
                </div>
                </a>
                <Messenger socket={this.state.socket} name={"chat"} />
                <Interactions socket={this.state.socket} name={"notifications"} />
            </div>
        )
    }
}