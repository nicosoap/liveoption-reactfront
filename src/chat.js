/**
 * Created by opichou on 11/4/16.
 */

import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import cx from 'classnames'


class ChatMessage extends Component {
    render() {
        return (
            <div className={cx({
                'chatMessage': true,
                'right': !!this.props.right,
                'left': !this.props.right
            })}>
                {this.props.message}
            </div>
        )
    }
}


class Chatroom extends Component {
    state = {
        messages: [{from: 'olivier', body: 'Salut !'}, {from: 'nicosoap', body: 'Salut ;-P'}],
        userId: 'nicosoap',
        myId: 'olivier'
    }

    handleChat = (e) => {
        const body = e.target.value
        if (body && e.keyCode === 13) {
            const message = {
                body,
                from: this.state.myId
            }
            this.setState({messages: [...this.state.messages, message]})
            this.props.socket.emit('message', message)
            e.target.value = ''
        }
    }

    componentDidUpdate() {
        const chat = ReactDOM.findDOMNode(this)
        if (chat) {
            const messageList = chat.querySelector('div.discussion')
            if (messageList) {
                messageList.scrollTop = messageList.scrollHeight
                messageList.scrollLeft = messageList.scrollWidth
            }
        }
    }


    render() {
        const messages = this.state.messages.map((m, i) => {
                return <ChatMessage key={i} right={m.from === this.state.userId} message={m.body}/>
            }
        )
        return (
            <div className={cx({
                'chat-box': true,
                'store': this.props.stored
            })}>
                <div className="header" onClick={this.props.closeChat} >
                    {this.props.otherId}
                </div>
                <div className="discussion">
                    <div className="chatMessage"></div>
                    {messages}
                    <div className="text-in">
                        <input type="text" placeholder="Type here..." onKeyUp={this.handleChat}/>
                    </div>
                </div>
            </div>
        )
    }

}


class Chat extends Component {
    state = {
        chats: [{
            otherId: 'olivier',
            userId: 'nicosoap',
            messages: [{from: 'olivier', body: 'Salut !', read: false}, {from: 'nicosoap', body: 'Salut ;-P', read: false}]
        }],
        chat: {},
        stored: false,
        showChat: true
    }

    componentWillReceiveProps = newProps => {
        this.setState({showChat: newProps.showChat})
    }

    handleClick = (e) => {
        e.preventDefault()


            let chats = this.state.chats
            let messages = chats.map(e => { return [...e.messages]})
            let r = messages.reduce((a, b) => a.concat(b))
            console.log("messages", r)


        const otherId = e.target.attributes.id.value
        const index = chats.findIndex(elem => { return elem.otherId === otherId})
        let chat = chats[index]
        chat.messages = chat.messages.map(e => {
            return {read: true, body: e.body, from: e.from}
        })
        console.log("chat: ", chat)
        chats.splice(index, 1, chat)
        this.setState({chat , chats,  stored: !this.state.stored})
    }

    toggle = () => {
        this.setState({stored: !this.state.stored})
    }

    componentWillUpdate() {

    }

    render() {
        const menu = this.state.chats.map((e, i) => {
            let name = e.messages.filter(elem => {return !elem.read}).length

            return  <li key={i} onClick={this.handleClick} id={e.otherId} >{e.otherId} <span className="message_count">{name < 1? '': name}</span></li>
        })
        return (
            <div className={cx({
                    'chat': true,
                    'hidden': !this.state.showChat
                }
            )}
                 >
                <div className={cx({
                    'chatlist': true,
                    'store': this.state.stored
                })}>
                    <ul>
                        <li className="head" onClick={this.props.toggleChat} >
                            Chat
                        </li>
                        {menu}
                    </ul>
                </div>
                <Chatroom closeChat={this.props.toggleChat} socket={this.props.socket} stored={!this.state.stored} otherId={this.state.chat.otherId} userId={this.props.userId}
                          messages={this.state.chat.messages}/>
            <div className="menu-chat" onClick={this.toggle}><i className="material-icons">{this.state.stored?'arrow_back':'arrow_forward'}</i></div>
            </div>
        )
    }
}

export default Chat