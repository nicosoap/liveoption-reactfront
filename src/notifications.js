import React, { Component } from 'react';

import io from 'socket.io-client'
import Messenger from './messenger'
import Interactions from './interactions'
import Notif from './notif'

let my_jwt = localStorage.jwt | "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im9saXZpZXIiLCJpYXQiOjE0NzUxNjU5NTN9.JBOsAaNdqn4ypElvMXiQzZdjNPPk3ooQlez8oc0XyX4"
if ( !my_jwt) {
    console.log("Navigator not supported")
    localStorage.jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im9saXZpZXIiLCJpYXQiOjE0NzUxNjU5NTN9.JBOsAaNdqn4ypElvMXiQzZdjNPPk3ooQlez8oc0XyX4"
    my_jwt = localStorage.jwt
    console.log(my_jwt)
}

export default class Notifications extends Component {

    state = {
        socket: null,
        notifications: []
    }

    componentDidMount() {
        this.socket = io('localhost:3001/', {
            'query' : 'token=' + my_jwt
        })
        this.setState({socket : this.socket})
    }

    openDrawer = (e) => {
        e.preventDefault()
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

    newNotif = async (notification) => {
        await this.setState({ notifications: [...this.state.notifications, notification] })
        console.log(this.state.notifications)
        chrome.notifications.create(notification.id, {type: "basic", } , function callback)
    }


    removeNotif = (i) => {
        this.setState({notifications: this.state.notifications.splice(this.state.notifications.indexOf(i), 1)})
    }

    popNotifications = (arr) => {
        return (arr.map((notification, i) => {
            return (
                <Notif
                    notification={ notification }
                    removeNotif={this.removeNotif}
                    key={notification.id}
                />
            )
        }))
    }

    render () {
        const { notifications } = this.state
        const notificationsItem = this.popNotifications(notifications)
        return (
            <div>
                <a href="#" onClick={this.openDrawer} >
                    <div id="notifications" className="floating notif">
                    <i className="material-icons">menu</i>
                </div>
                </a>
                <Messenger socket={this.state.socket} name={"chat"} newNotif={this.newNotif}/>
                <Interactions socket={this.state.socket} name={"notifications"} newNotif={this.newNotif}/>
                <div className="notif-colon" id="notifications" >
                    { notificationsItem }
                </div>
            </div>
        )
    }
}