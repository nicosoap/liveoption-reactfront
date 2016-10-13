import React, { Component } from 'react';

import {Interactions} from './interactions'
import Notif from './notif'

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
        messages: {
            newMessage: false,
            unread: false,
            messages: [{
                read: true,
                body: "Ceci est un vieux match",
                from: "olivier"
            }],
        },
        notifications: {
            newMessage: false,
            unread: false,
            matches: [{
                read: true,
                body: "Ceci est un vieux match",
                from: "olivier"
            }],
            likes: [],
            visits: [],
        }
    }

    componentWillReceiveProps = (newProps) => this.setState({
        notifications: newProps.notifications,
        messages: newProps.messages
    })

    newNotif = (notification) => {
        console.log(notification)
    }

    removeNotif = (i) => {
        console.log(i)
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
        return (
            <div>
                <Interactions notifications={this.state.notifications} messages={this.state.messages} newNotif={this.newNotif}/>
                <div className="notif-colon" id="notifications" >
                </div>
            </div>
        )
    }
}