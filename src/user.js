/**
 * Created by opichou on 10/15/16.
 */
import React, {Component} from 'react'
import {Link, browserHistory} from 'react-router'
import axios from 'axios'
import cx from 'classnames'
import {PhotoViewer} from './photoviewer'
import {Like, Dislike, Connected, Disconnected, Visit, Chat, Match, Rating, Block, Report} from './interactionItems'
import dateFormat from 'dateformat'


//Cause I was the one that you found
// And if I know you, you'll find me someplace new
// I hope you never, I hope you never get to


export class User extends Component {
    state = {
        user: {
            Lat: 0,
            Lng: 0,
            bio: '',
            login: '',
            photo: []
        },
        liked: false,
        likes_me: false,
        popularity: 50,
        visited: false,
        enabled: false,
        connected: false
    }

    componentWillReceiveProps = newProps => {
        if (newProps.user && newProps.photo && newProps.photo[0]) {
            this.setState({enabled: true})
        }
    }



    componentWillMount() {
        axios.get('/user/' + this.props.params.userId).then(res => {
            if (res.data.success) {
                const {connected, lastConnection, liked, likes_me, user, visited, popularity} = res.data
                this.setState({connected, lastConnection, liked, likes_me, user, visited, popularity})
            }
        })
    }

    handleLike = () => {
        console.log("LIKE", this.state.enabled, this.state.liked, this.state.likes_me)
        if (this.state.enabled) {
            axios.get('/like/' + this.state.user.login).then(res =>{
                if (res.data.success) {
                    this.setState({liked: true})
                }
            })}

    }

    handleDislike = () => {
        console.log("DISLIKE")
        if (this.state.enabled) {
            axios.get('/dislike/' + this.state.user.login).then(res =>{
                if (res.data.success) {
                    this.setState({liked: false})
                }
            })}
    }

    handleChat = () => {
        console.log("CHAT", this.state.enabled, this.state.liked, this.state.likes_me)
        if (this.state.enabled && this.state.liked && this.state.likes_me) {
            this.props.chat(this.state.user.login)
        }

    }

    handleReport = () => {
        axios.get('/report/' + this.state.user.login)
    }

    handleBlock = () => {
        if (this.state.enabled) {
            axios.get('/block' + this.state.user.login).then(res => {
                if (res.data.success) {
                    browserHistory.push('/')
                }
            })}
    }

    render() {
        const {login, bio, photo} = this.state.user,
            {connected, lastConnection, liked, likes_me, user, visited, popularity} = this.state
        let interactions = []
        let he = "he"
        if (user.gender === 'female') {
            he = 'she'
        }
        if (this.state.enabled) {
            if (liked) {
                if (likes_me) {
                    interactions.push(<Chat click={this.handleChat} key={101}/>)
                } else {
                    interactions.push(<Dislike click={this.handleDislike} key={102}/>)
                }
            } else {
                interactions.push(<Like click={this.handleLike} key={103}/>)
            }
            if (visited) {
                interactions.push(<Visit click={this.handleVisit} info={he + ' has visited your profile'} key={104}/>)
            }
            if (connected) {
                interactions.push(<Connected key={105}/>)
            } else {
                interactions.push(<Disconnected key={106}
                                                info={"last connection: " + dateFormat(lastConnection, "dddd, mmmm, dS, h:MM:ss TT")}/>)
            }
            if (likes_me && liked) {
                interactions.push(
                    <Match />)
            }
        }
        return (
            <div className="profile card-2">
                <div className="profile-picture">
                    <PhotoViewer
                        photo={photo}
                        appConfig={this.props.appConfig}
                        login={login}
                    />
                </div>
                <div className="content">
                    <div className="user-name">{login}</div>
                    <div className='interaction' >
                            <span className="interactionItems">
                                {interactions}
                                <Block click={this.handleBlock}/>
                                <Report click={this.handleReport}/>
                                <Rating rate={popularity} key={107}/>
                            </span>
                        </div>


                        <div className="user-description">
                            {bio}
                        </div>
                    </div>
                </div>
        )
    }
}

export class UserCard extends Component {
    state = {
        loaded: false,
        users: [],
        photo: ['anonymous.jpg'],
        bio: "Loading...",
        login: 'Loading...',
        liked: false,
        likes_me: false,
        chat: false,
        chatNb: 0,
        match: false,
        blocked: false,
        message: true,
        height: 0,
        weight: 0,
        Kg: false,
        M: false,
        appConfig: {},
        enabled: false,
    }

    componentWillMount() {
        axios.get('/admin/appConfig').then(response => {
            this.setState({appConfig: response.data})

        })
    }

    componentWillReceiveProps = newProps => {

        const enabled = (!!newProps.me.photo && !!newProps.me.photo[0])
        this.setState({enabled})
    }

    componentDidMount() {
        let {photo, bio, login, liked, likes_me} = this.props.user
        this.setState({photo, bio, login, liked, likes_me, match: (liked && likes_me)})
    }

    handleLike = () => {
        if (this.state.enabled) {
            axios.get('/like/' + this.state.login).then(res => {
                if (res.data.success) {
                    this.setState({liked: true, match: res.data.match})
                }
            })
        }
    }

    handleDislike = () => {
        if (this.state.enabled) {
            axios.get('/dislike/' + this.state.login).then(res =>{
                if (res.data.success) {
                    this.setState({liked: false, match: false})
                }
            })}

    }


    handleChat = () => {
        if (this.state.enabled && this.state.liked && this.state.likes_me) {
            this.props.chat(this.state.login)
        }

    }


    handleBlock = () => {
        if (this.state.enabled) {
            axios.get('/block' + this.state.login).then(res => {
                if (res.data.success) {
                    this.setState({blocked: true})
                }
            })}
    }


    render() {
        let {photo, bio, login, liked, match, blocked, message, appConfig, enabled} = this.state
        let image = 'anonymous.jpg'
        if (photo && photo[0])
        {
            image = photo[0]
        }
        if (!bio || bio === ''){
            bio = "this user hasn't written his bio yet."
        }



        return (
            <div className={cx({
                "user": true,
                "hidden": blocked
            })}
                 id={login}>
                <div className="profile-picture"
                     style={{backgroundImage: `url('${appConfig.baseURL}/images/${image}')`}}>
                </div>
                <div className="user-container-1">
                    <div className="user-interactions">
                        <div className="small-container">
                           <div className="user-block" onClick={this.handleBlock}><i className={
                                cx({
                                    'material-icons': true,
                                    'icon-alarm': blocked
                                })
                            }>do_not_disturb</i></div>
                        </div>
                        {enabled ? (match ? <div className="user_pop_messenger" onClick={this.handleChat}><i className={
                            cx({
                                'material-icons': true,
                                'icon-middle': true,
                                'icon-active': message
                            })
                        }>message</i></div> : (liked ?<div className="user_pop_messenger" onClick={this.handleDislike}><i className={
                            cx({
                                'material-icons': true,
                                'icon-middle': true,
                                'higher': true,
                                'icon-active': liked
                            })
                        }>thumb_down</i></div>:<div className="user_pop_messenger" onClick={this.handleLike}><i className={
                            cx({
                                'material-icons': true,
                                'icon-middle': true,
                                'higher': true,
                                'icon-active': liked
                            })
                        }>thumb_up</i></div>)):<div></div>}
                    </div>
                    <Link to={`/user/${login}`}>
                        <div className="user-content-container">
                            <div className="user-details">{login}</div>
                            <div className="user-details user-description hidden">
                            </div>
                            <div className="user-details user-description">{bio}</div>
                        </div>
                    </Link>
                </div>
            </div>
        )
    }
}

export class Users extends Component {
    state = {
        userForm: {},
        users: [],
        user: {},
        login: ''
    }

    componentWillReceiveProps = newProps => {
        const {users, user, login} = newProps
        this.setState({users, user, login})
    }

    render() {

        let users = ''
        const {user, login} = this.state
        if (this.state.users.length > 0) {
            users = this.state.users.map((e, i) => {
                return (
                    <UserCard user={e} key={i} me={user} login={login}/>
                )
            })
        }
        return (
            <div id="users">
                {users}
            </div>
        )
    }
}


