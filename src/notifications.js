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

    openDrawer = () => {
        if (document.getElementById('drawer').classList.contains('stored')) {
            document.getElementById('drawer').classList.remove('stored')
            document.getElementById('drawer').classList.add('expanded')
            document.getElementById('pusher').classList.remove('stalled')
            document.getElementById('pusher').classList.add('pushed')
        } else {
            document.getElementById('drawer').classList.add('stored')
            document.getElementById('drawer').classList.remove('expanded')
            document.getElementById('pusher').classList.add('stalled')
            document.getElementById('pusher').classList.remove('pushed')
        }
    }

    render () {
        console.log(this.state.socket)
        return (
            <div>
                <a href="#" onClick={this.openDrawer}>
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