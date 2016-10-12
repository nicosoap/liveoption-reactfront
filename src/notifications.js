import React, { Component } from 'react';

import io from 'socket.io-client'
import cx from 'classnames'
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

export class MenuButton extends Component {
render(){
    return(

        <div className="floating notif" onClick={this.props.toggleMenu}>
            <i className="material-icons">menu</i>
        </div>
    )
}
}

export class Notifications extends Component {

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

    newNotif = async (notification) => {
        await this.setState({ notifications: [...this.state.notifications, notification] })
        console.log(this.state.notifications)
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
                <Messenger socket={this.state.socket} name={"chat"} newNotif={this.newNotif}/>
                <Interactions socket={this.state.socket} name={"notifications"} newNotif={this.newNotif}/>
                <div className="notif-colon" id="notifications" >
                    { notificationsItem }
                </div>
            </div>
        )
    }
}