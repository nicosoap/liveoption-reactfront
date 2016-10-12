/**
 * Created by opichou on 10/7/16.
 */
import React, { Component } from 'react'
import cx from 'classnames'

export default class Messenger extends Component {
    state = {
        messages: [],
        newMessage: '',
        unread: 'read',
    } ///This requires the messages API

    componentWillReceiveProps = (newProps) => {
        if (this.socket) return (null)
        this.socket = newProps.socket
        this.socket.on('message', message => {
            this.setState({ messages: [message, ...this.state.messages], newMessage: 'newMessage', unread: 'unread'})
            this.props.newNotif(message);
            setTimeout(() => this.setState({ newMessage: '' }), 250)
        })
    }

    render () {
        let isUR = (unit) => (unit.read === true) ? '':unit
        const { newMessage, unread } = this.state
        const messagesNb = this.state.messages.length
        const messagesUR = this.state.messages.map(isUR).filter(p => p !== '')
        const messagesURL = messagesUR.length > 9 ? "9+" : messagesUR.length
        const messages = messagesNb !== 0 ?
            <div id="messages" className="floating">
                <a href="#">
                    <div className="notif">
                            <div className={`material-icons ${newMessage} ${unread}`} >chat</div>
                    </div>
                </a>
                <div className="lo-badge">{messagesURL}</div>
            </div> : ''
        return (
            <div>
                {messages}
            </div>
        )
    }
}