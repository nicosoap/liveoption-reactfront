import React, { Component } from 'react'
import {Interactions} from './interactions'
import Notif from './notif'

export class MenuButton extends Component {
render(){
    return(

        <div className="floating notif" onClick={this.props.toggleMenu}>
            <i className="material-icons icon-large">menu</i>
        </div>
    )
}
}

export class Notifications extends Component {

    state = {
        messages: {
            newMessage: false,
            unread: false,
            messages: [],
        },
        notifications: {
            newMessage: false,
            unread: false,
            matches: [],
            likes: [],
            visits: [],
        },
        info: {
            messages: []
        }
    }

    componentWillReceiveProps = (newProps) => {
        this.setState({
            notifications: newProps.notifications,
            messages: newProps.messages,
            info: newProps.info,
        })
    }

    render () {

        const {notifications, messages, info} = this.state
        const infos = info.messages.map((notification, i) => < Notif notification={notification} key={i}
                                                                     toggleChat={this.props.toggleChat}
                                                                     toggleNotification={this.props.toggleNotification}/>)

        return (
            <div className="floating">
                <Interactions notifications={notifications} messages={messages} toggleChat={this.props.toggleChat}
                              toggleNotification={this.props.toggleNotification}/>
                <div className="notif-colon" id="notifications">
                    {infos}
                </div>
            </div>
        )
    }
}