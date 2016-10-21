import React, { Component } from 'react'
import ReactGA from 'react-ga'
import io from 'socket.io-client'
import './App.css'
import  Menu from './menu'
import axios from 'axios'
import {ExtendedSearch} from './search'

ReactGA.initialize('UA-85246703-1')

localStorage.jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im9waWNob3UiLCJpYXQiOjE0NzUxNTk3OTJ9.Lcu-GyJVfBxU4H4esKkWntQS55niL8qaGnWRJu2dPeI'

let my_jwt = localStorage.jwt
if (!my_jwt) {
    console.log("Navigator not supported")
}

axios.defaults.baseURL = 'http://localhost:3001';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + my_jwt;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

class App extends Component {
    state = {
        messages: {
            newMessage: false,
            unread: false,
            messages: [{body: "lol", from: "olivier", read: true}],
        },
        notifications: {
            newMessage: false,
            unread: false,
            matches: [{body: "lol", from: "olivier", read: true}],
            likes: [],
            visits: [],
        },
        info:{
            messages: []
        },
        searchString: ''
    }

    componentDidMount = () => {
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

    updateSearch = (payload) => {
        let geocode = '',
            tags = '',
            netflix = '',
            rightNow = '',
            ageRange = '',
            popularRange = ''

        if (payload.geocode.lat !== 0 || payload.geocode.lng !== 0) {
            geocode = ' around-lat=' + payload.geocode.lat +
                ' around-lng=' + payload.geocode.lng
        }
        if (payload.tags !== '') {
            tags = ' ' + payload.tags + ' '
        }
        if (payload.netflix === true) {
            netflix = ' netflix'
        }
        if (payload.rightNow === true) {
            rightNow = ' rightnow'
        }
        if (payload.popularRange.min !== 0 || payload.popularRange.max !== 100) {
            popularRange = ' popularity-from=' + payload.popularRange.min +
                ' popularity-to=' + payload.popularRange.max
        }
        if (payload.ageRange.min !== 18 || payload.ageRange.max !== 77) {
            ageRange = ' age-from=' + payload.ageRange.min +
            ' age-to=' + payload.ageRange.max
        }
        const searchString = tags +
            netflix +
            rightNow +
            ageRange +
            popularRange +
            geocode
        this.setState({searchString})
    }

    simpleSearch = query => this.search(query)

    extendedSearch = () => this.search(this.state.searchString)

    search = (query) => {
        axios.get('/user', {
            params: {
                query: query
            }
        })
            .then(response => console.log("response: ",response.message))
    }

  render() {
      const { notifications, messages, info, searchString } = this.state
    return (
        <Menu notifications={ notifications }
              messages={ messages }
              info={info}
              searchString={searchString}
              simpleSearch={this.simpleSearch}
        >
            <div className="main-content">
                <ExtendedSearch
                    updateSearch={this.updateSearch}
                    extendedSearch={this.extendedSearch}
                />
            </div>
        </Menu>

    )
  }
}
export default App;

