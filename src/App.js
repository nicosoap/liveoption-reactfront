import React, { Component } from 'react'
import ReactGA from 'react-ga'
import io from 'socket.io-client'
import Notifications from './notifications'
import './App.css'
import  Menu from './menu'

ReactGA.initialize('UA-85246703-1')


class App extends Component {
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

    componentDidMount = () => {
        console.log(localStorage.jwt || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im9saXZpZXIiLCJpYXQiOjE0NzUxNjU5NTN9.JBOsAaNdqn4ypElvMXiQzZdjNPPk3ooQlez8oc0XyX4")
        let my_jwt = localStorage.jwt
        if ( !my_jwt) {
            console.log("Navigator not supported")
        }

        this.socket = io('localhost:3001/', {
            'query': 'token=' + my_jwt
        })
        this.setState({socket: this.socket})
        this.socket.on('message', message => {
            this.setState({
                messages: {
                    messages: [message, ...this.state.messages.messages],
                    newMessage: true,
                    unread: 'unread'
                }
            })
            console.log("SOCKET",this.state.messages.messages)
            setTimeout(() => this.setState({messages: {newMessage: false}}), 250)
        })
        this.socket.on('match', match => {
            this.setState({
                notifications: {
                    matches: [match, ...this.state.notifications.matches],
                    unread: 'unread',
                    newMessage: true
                }
            })
            console.log("MATCHES",this.state.notifications.matches)
            setTimeout(() => this.setState({
                notifications: {newMessage: false}
            }), 250)
        })
        this.socket.on('like', like => {
            this.setState({
                notifications: {
                    likes: [like, ...this.state.notifications.likes],
                    unread: 'unread',
                    newMessage: true
                }
            })
            console.log("LIKES",this.state.notifications.likes)
            setTimeout(() => this.setState({
                notifications: {newMessage: false}
            }), 250)
        })
        this.socket.on('visit', visit => {
            this.setState({
                notifications: {
                    visits: [visit, ...this.state.notifications.visits],
                    unread: 'unread',
                    newMessage: true
                }
            })
            console.log("VISITS",this.state.notifications.visits)
            setTimeout(() => this.setState({
                notifications: {newMessage: false}
            }), 250)
        })
    }

  render() {
      const { notifications, messages } = this.state
    return (
        <Menu notifications={ notifications } messages={ messages } >
            <div >
                LOL
            </div>
        </Menu>

    )
  }
}
export default App;

