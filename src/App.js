import React, {Component} from 'react'
import ReactGA from 'react-ga'
import io from 'socket.io-client'
import './App.css'
import  Menu from './menu'
import axios from 'axios'
import {ExtendedSearch} from './search'
import {browserHistory} from 'react-router'


ReactGA.initialize('UA-85246703-1')

//localStorage.jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im9waWNob3UiLCJpYXQiOjE0NzUxNTk3OTJ9.Lcu-GyJVfBxU4H4esKkWntQS55niL8qaGnWRJu2dPeI'

if (!localStorage.jwt) {
    browserHistory.push('/sign-in')
}

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
        info: {
            messages: []
        },
        searchString: '',
        users: [],
        computedUsers: [],
        appConfig: {},
        login: '',
        user: {},
        chats: [],
        showChat: false,
        payload: {
            ageRange: {
                min: 18,
                max: 77,
            },
            popularRange: {
                min: 0,
                max: 100,
            },
            address: "",
            geocode: {
                Lat: 0,
                Lng: 0,
            },
            tags: "",
            netflix: false,
            rightNow: false,
            distanceRange: {
                max: 400075,
                min: 0,
            },
            ageSort: false,
            popularitySort: false,
            locationSort: false,
            tagsSort: false
        }
    }


    componentWillMount() {

        axios.defaults.baseURL = 'http://' + window.location.host + '/api'
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.jwt;
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


        axios.get('/i').then(res => {
            if (res.data.success) {
                axios.get('/user/' + res.data.login).then(reslt => {
                    if (reslt.data.success) {
                        this.setState({login: reslt.data.user.login, user: reslt.data.user})
                    }
                })
            } else {
                browserHistory.push('/sign-in')
            }
        })
        axios.get('/chats').then(res => {
            if (res.data.success) {
                this.setState({chats: res.data.chats})
            }
        })
    }

    componentDidMount() {


        this.setState({my_jwt: localStorage.jwt})

        axios.get('/chats').then(res => {
            if (res.data.success) {

                let chats = res.data.chats.map(e => {
                    if (e.messages) {
                        e.messages.map(f => {
                            f.read = true
                            return f
                        })
                    }

                    return e
                })
                this.setState({chats})
            } else {
            }
        })


        axios.get('/admin/appConfig').then(response => {
            this.setState({appConfig: response.data})
        })


        this.socket = io(window.location.origin, {
            'query': 'token=' + localStorage.jwt
        })
        this.setState({socket: this.socket})
        this.socket.on('message', message => {
            message.read = (message.from !== this.state.login)
            const user1 = message.from,
                user2 = message.to,
                chats = this.state.chats,
                index = chats.findIndex(e => {
                    return ((e.userId === user1 && e.otherId === user2) || (e.userId === user2 && e.otherId === user1))
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
                    messages: [{
                        from: message.from,
                        to: message.to,
                        body: (message.from + ': ' + message.body)
                    }, ...this.state.messages.messages],
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


    }

    updateSearch = (payload) => {
        let geocode = '',
            tags = '',
            netflix = '',
            rightNow = '',
            ageRange = '',
            popularRange = ''

        if (payload.geocode.Lat !== 0 || payload.geocode.Lng !== 0) {
            geocode = ' around-lat=' + payload.geocode.Lat +
                ' around-lng=' + payload.geocode.Lng
        }
        if (payload.tags[0]) {
            payload.tags.map(e => {
                    tags += ' #' + e
                    return 0
                }
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

        const computedUsers = this.sortResult(this.filterResults(this.state.users, payload), payload)
        this.setState({searchString, payload, computedUsers})
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
                let computedUsers = this.sortResult(this.filterResults(response.data.users, this.state.payload), this.state.payload)
                this.setState({users: response.data.users, computedUsers})
            })
    }

    toggleChat = () => {
        this.setState({showChat: !this.state.showChat})
        return true
    }

    updateChat = (otherId) => {
        let chats = this.state.chats
        const index = chats.findIndex(elem => {
            return elem.otherId === otherId
        })
        let chat = chats[index]
        chat.messages = chat.messages.map(e => {
            return {read: true, body: e.body, from: e.from}
        })
        chats.splice(index, 1, chat)
        this.setState({chat, chats, stored: !this.state.stored})
    }

    calculateAge = (birthday) => { // birthday is a date
        const ageDifMs = Date.now() - new Date(birthday).getTime();
        const ageDate = new Date(ageDifMs); // milliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    calculateDistance = (lat1, lon1, lat2, lon2) => {
        let radlat1 = Math.PI * lat1/180
        let radlat2 = Math.PI * lat2/180
        let theta = lon1-lon2
        let radtheta = Math.PI * theta/180
        let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist)
        dist *= 180/Math.PI
        dist *= 60 * 1.1515
        dist *= 1609.344
        return dist
    }

    filterResults = (users, query) => {
        const me = this.state.user
        if (!me || !me.login) {
            return users
        }
        try {
                const aMin = query.ageRange.min || 18,
                aMax = query.ageRange.max || 77,
                distanceMax = query.distanceRange.max || 40075,
                distanceMin = query.distanceRange.min || 0,
                popularityMin = query.popularRange.min || 0,
                popularityMax = query.popularRange.max || 100,
                tags = query.tags || [],
                tag_range = query.tagsRange || 0,
                myTags = query.netflix,
                onlyTags = query.rightNow,


                age = user => {
                    const age = this.calculateAge(user.birthDate)
                    return (age <= aMax && age >= aMin)
                },

                checkDistance = user => {
                    let Lat = query.geocode.Lat,
                        Lng = query.geocode.Lng
                    if (Lat === 0 && Lng === 0) {
                        Lat = me.Lat
                        Lng = me.Lng
                    }
                    const dst = this.calculateDistance(user.Lat, user.Lng, Lat, Lng)/1000
                    return (
                        dst <= distanceMax &&
                        dst >= distanceMin
                    )
                },

                tagFilter = user => {
                    let score = 0
                    let thisTags = user.tags
                    let searchTags = tags
                    let tag_length = tag_range
                    if (myTags) {
                        searchTags = searchTags.concat(me.tags)
                    }
                    if (onlyTags) {
                        tag_length = tags.length
                    }
                    thisTags.map(e => {
                        if (searchTags.indexOf(e) !== -1) {
                            score++
                        }
                        return 0
                    })
                    return (score >= tag_length)
                },

                popularityFilter = user => {
                    return (user.popularity <= popularityMax && user.popularity >= popularityMin)
                }

            return users.filter(age).filter(tagFilter).filter(popularityFilter).filter(checkDistance)
        }catch(err) {
            console.error("error", err)
        }
    }

    sortResult = (users, query) => {
        const me = this.state.user,
            byAge = query.ageSort,
            byLocation = query.locationSort,
            byPopularity = query.popularitySort,
            byTags = query.tagsSort,
            myTags = query.netflix,
            tags = query.tags

            const ageSort = (userA, userB) => {
                return userB.birthDate - userA.birthDate
            },
            locationSort = (userA, userB) => {
                let Lat = query.geocode.Lat,
                    Lng = query.geocode.Lng
                if (Lat === 0 && Lng === 0) {
                    Lat = me.Lat
                    Lng = me.Lng
                }
                return this.calculateDistance(userB.Lat, userB.Lng, Lat, Lng) - this.calculateDistance(userA.Lat, userA.Lng, Lat, Lng)
            },
            popularitySort = (userA, userB) => {
                return userB.popularity - userA.popularity

            },
            tagsSort = (userA, userB) => {
                let scoreA = 0
                let scoreB = 0
                let searchTags = tags
                if (myTags) {
                    searchTags = searchTags.concat(me.tags)
                }
                userA.tags.map(e => {
                    if (searchTags.indexOf(e) !== -1) {
                        scoreA++
                    }
                    return 0
                })
                userB.tags.map(e => {
                    if (searchTags.indexOf(e) !== -1) {
                        scoreB++
                    }
                    return 0
                })
                return (scoreB - scoreA)
            }


        if (byAge){
            users.sort(ageSort)
            return users
        } else if (byLocation) {
            return users.sort(locationSort)
        } else if (byPopularity) {
            return users.sort(popularitySort)
        } else if (byTags) {
            users.sort(tagsSort)
            return users
        } else {
            return users
        }
    }

    render() {
        const {notifications, messages, info, searchString, login, appConfig, user, chats} = this.state
        const users = this.state.computedUsers

        const childrenWithProps = React.Children.map(this.props.children,
            (child) => React.cloneElement(child, {
                users,
                login,
                appConfig,
                user,
                toggleChat: this.toggleChat,
                search: this.search
            })
        )
        return (
            <Menu notifications={ notifications }
                  messages={ messages }
                  info={info}
                  searchString={searchString}
                  simpleSearch={this.search}
                  socket={this.socket}
                  updateChat={this.updateChat}
                  updateNotification={this.updateNotification}
                  toggleChat={this.toggleChat}
                  chats={chats}
                  userId={user.login}
                  showChat={this.state.showChat}
            >
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
