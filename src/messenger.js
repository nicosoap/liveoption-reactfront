/**
 * Created by opichou on 10/7/16.
 */
import React, { Component } from 'react'

export default class Messenger extends Component {
    state = { messages: []} ///This requires the messages API

    componentWillReceiveProps = (newProps) => {
        this.socket = newProps.socket
        this.socket.on('message', message => {
            this.setState({messages: [message, ...this.state.messages]})
        })
    }

    render () {
        let isUR = (unit) => (unit.read === true) ? '':unit
        const messagesNb = this.state.messages.length
        const messagesUR = this.state.messages.map(isUR).filter(p => p !== '')
        console.log("messages :",messagesUR)

        const messages = messagesNb !== 0 ? <div id="messages" className="floating notif">
            <i className={messagesUR.length !== 0 ? "material-icons unread":"material-icons read"}>chat</i>
        </div> : ''
        return (
            <div>
                {messages}
            </div>
        )
    }
}