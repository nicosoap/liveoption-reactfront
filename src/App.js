import React, { Component } from 'react'
import ReactGA from 'react-ga'
import io from 'socket.io-client'
import './App.css'
import  Menu from './menu'

ReactGA.initialize('UA-85246703-1')


class App extends Component {
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
        info:{
            messages: []
        }
    }

    componentDidMount = () => {
        let my_jwt = localStorage.jwt
        if (!my_jwt) {
            console.log("Navigator not supported")
        }

        this.socket = io('localhost:3001/', {
            'query': 'token=' + my_jwt
        })
        this.setState({socket: this.socket})
        this.socket.on('message', message => {
            this.setState({
                notifications: {
                    matches: this.state.notifications.matches,
                    likes: this.state.notifications.likes,
                    visits: this.state.notifications.visits,
                    unread: 'unread',
                    newMessage: this.state.notifications.newMessage
                },
                messages: {
                    messages: [message, ...this.state.messages.messages],
                    newMessage: true,
                    unread: 'unread'
                },
                info: {
                    messages: [...this.state.info.messages, message]
                }
            })


            setTimeout(() => this.setState({
                messages: {
                    messages: this.state.messages.messages,
                    unread: this.state.messages.unread,
                    newMessage: false
                }
            }), 250)
        })
        this.socket.on('match', match => {
            this.setState({
                notifications: {
                    matches: [match, ...this.state.notifications.matches],
                    likes: this.state.notifications.likes,
                    visits: this.state.notifications.visits,
                    unread: 'unread',
                    newMessage: true
                },
                messages: {
                    messages: this.state.messages.messages,
                    newMessage: this.state.messages.newMessage,
                    unread: 'unread'
                },
                info: {
                    messages: [...this.state.info.messages, match]
                }
            })

            setTimeout(() => this.setState({
                notifications: {
                    matches: this.state.notifications.matches,
                    likes: this.state.notifications.likes,
                    visits: this.state.notifications.visits,
                    unread: this.state.messages.unread,
                    newMessage: false
                }
            }), 250)
        })
        this.socket.on('like', like => {
            this.setState({
                notifications: {
                    likes: [like, ...this.state.notifications.likes],
                    visits: this.state.notifications.visits,
                    matches: this.state.notifications.matches,
                    unread: 'unread',
                    newMessage: true
                },
                info: {
                    messages: [...this.state.info.messages, like]
                }
            })
            setTimeout(() => this.setState({
                notifications: {
                    matches: this.state.notifications.matches,
                    likes: this.state.notifications.likes,
                    visits: this.state.notifications.visits,
                    unread: this.state.messages.unread,
                    newMessage: false
                }
            }), 250)
        })
        this.socket.on('visit', visit => {
            this.setState({
                notifications: {
                    visits: [visit, ...this.state.notifications.visits],
                    likes: this.state.notifications.likes,
                    matches: this.state.notifications.matches,
                    unread: 'unread',
                    newMessage: true
                },
                info: {
                    messages: [...this.state.info.messages, visit]
                }
            })
            setTimeout(() => this.setState({
                notifications: {
                    matches: this.state.notifications.matches,
                    likes: this.state.notifications.likes,
                    visits: this.state.notifications.visits,
                    unread: this.state.messages.unread,
                    newMessage: false
                }
            }), 250)
        })
    }

  render() {
      const { notifications, messages, info } = this.state
    return (
        <Menu notifications={ notifications } messages={ messages } info={info} >
            <div className="main-content">
            </div>
        </Menu>

    )
  }
}
export default App;

