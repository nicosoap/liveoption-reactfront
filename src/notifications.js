import React, { Component } from 'react';

import io from 'socket.io-client'

let my_jwt = localStorage.jwt
if ( !my_jwt) {
    console.log("Navigator not supported")
}

export default class Notifications extends Component {
    state = { messages: [] , matches: [] , likes: [], visits: []}

    componentDidMount() {
        this.socket = io('localhost:3001/', {
            'query' : 'token=' + my_jwt
        })
        this.socket.on('message', message => {
            this.setState({messages: [message, ...this.state.messages] })
        })
        this.socket.on('match', match => {
            this.setState({matches: [match, ...this.state.matches] })
        })
        this.socket.on('like', like => {
            this.setState({likes: [like, ...this.state.likes] })
        })
        this.socket.on('visit', visit => {
            this.setState({visits: [visit, ...this.state.visits] })
        })
    }
    handleSubmit = e => {
        const body = e.target.value
        if (e.keyCode === 13 && body) {
            const message = {
                body,
                from: 'Me'
            }
            this.socket.emit('message', body)
            this.setState({messages: [message, ...this.state.messages]})
            e.target.value = ""
        }
        }
    render () {
        const messages = this.state.messages.length
        console.log(messages)
        const matches = this.state.matches.length
        const likes = this.state.likes.length
        const visits = this.state.visits.length
        return (
            <div>
                messages:{messages}, matches: {matches}, likes: {likes}, visits: {visits}.
                <input type='text' placeholder='Enter a message... ' onKeyUp={this.handleSubmit} />
            </div>
        )
    }
}