import React, { Component } from 'react'
import ReactGA from 'react-ga'
import io from 'socket.io-client'
import './App.css'
import  Menu from './menu'
import axios from 'axios'
import {ExtendedSearch} from './search'
import {browserHistory} from 'react-router'
import {Geoloc} from './geolocate'

ReactGA.initialize('UA-85246703-1')

 //localStorage.jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im9waWNob3UiLCJpYXQiOjE0NzUxNTk3OTJ9.Lcu-GyJVfBxU4H4esKkWntQS55niL8qaGnWRJu2dPeI'




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
        },
        searchString: '',
        users: [],
        appConfig: {},
        login: '',
        user: {},
        chats: []
    }


    componentWillMount() {
        axios.get('/i').then(res => {
            if (res.data.success) {
                axios.get('/user/' + res.data.login).then(reslt => {
                    if (reslt.data.success) {
                        this.setState({login: reslt.data.user.login, user: reslt.data.user})
                    } else {
                        console.log("Backend is too busy to manage secondary requests right now")
                    }
                })
            }else {
                browserHistory.push('/sign-in')
            }
        })
        axios.get('/chats').then(res => {
            if (res.data.success) {
                this.setState({chats: res.data.chats})
            }
        })
    }

    componentWillReceiveProps() {
    }

    componentDidMount() {


        axios.defaults.baseURL = 'http://localhost:8080';
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.jwt;
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


        this.setState({my_jwt:localStorage.jwt}, () =>{
            if (!this.state.my_jwt) {
                browserHistory.push('/sign-in')
            }})

        axios.get('/chats').then(res => {
            if (res.data.success) {
                this.setState({chats: res.data.chats})
            } else {
            }
        })


        axios.get('/admin/appConfig').then(response => {
            this.setState({appConfig: response.data})
        })



        this.socket = io('http://localhost:8080' || window.location.origin, {
            'query': 'token=' + localStorage.jwt
        })
        this.setState({socket: this.socket})
        this.socket.on('message', message => {
            console.log(message)
            const user1 = message.from,
                user2 = message.to,
                chats = this.state.chats,
                index = chats.findIndex(e => {
                        if ((e.userId === user1 && e.otherId === user2) || (e.userId === user2 && e.otherId === user1)){
                            return true
                        }
                    })
                chats[index].messages = chats[index].messages || []
                chats[index].messages.push(message)

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
                },
                chats
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
        this.socket.on('chatroom', chatroom => {
            this.setState({chats: [chatroom, ...this.state.chats]})
        })


        // initialize state with suggestion. Suggestions are search without option.
        this.search('')

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
        if (payload.tags[0]) {
            payload.tags.map(e =>{
            tags += ' #' + e
            return null}
        )
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
            .then((response) => {
                this.setState({users: response.data.users})
            })
            .catch(error => console.error(error))
    }

    mergeChats = () => {
        let chats = this.state.chats
        let messages = chats.map(e => { return [...e.messages]})
    }

    updateChat = (otherId) => {
        let chats = this.state.chats
        const index = chats.findIndex(elem => { return elem.otherId === otherId})
        let chat = chats[index]
        chat.messages = chat.messages.map(e => {
            return {read: true, body: e.body, from: e.from}
        })
        chats.splice(index, 1, chat)
        this.setState({chat , chats,  stored: !this.state.stored})
    }

  render() {
      const {notifications, messages, info, searchString, users, login, appConfig, user, chats} = this.state
      const childrenWithProps = React.Children.map(this.props.children,
          (child) => React.cloneElement(child, {
              users,
              login,
              appConfig,
              user
          })
      )
          return (
              <Menu notifications={ notifications }
                    messages={ messages }
                    info={info}
                    searchString={searchString}
                    simpleSearch={this.simpleSearch}
                    socket={this.socket}
                    updateChat={this.updateChat}
                    updateNotification={this.updateNotification}
                    chats={chats}
                    userId={user.login}
              >
                  < Geoloc hidden={true}/>
                  <div className="main-content">
                      <ExtendedSearch
                          updateSearch={this.updateSearch}
                          extendedSearch={this.extendedSearch}
                      />
                      {childrenWithProps}
                  </div>
              </Menu>

          )

  }

}

export default App;
