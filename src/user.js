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
            photo: [],
            tags: []
        },
        liked: false,
        likes_me: false,
        popularity: 50,
        visited: false,
        enabled: false,
        connected: false,
        match: false
    }

    componentWillReceiveProps = newProps => {
        if (newProps.user && this.state.user && newProps.user.login === this.state.user.login) {
            browserHistory.push('/')
        }
        if (newProps.user && newProps.user.photo && newProps.user.photo[0]) {
            this.setState({enabled: true})
        }
    }



    componentWillMount() {
        axios.get('/user/' + this.props.params.userId).then(res => {
            if (res.data.success) {
                const {connected, lastConnection, liked, likes_me, user, visited, popularity} = res.data
                this.setState({connected, lastConnection, liked, likes_me, user, visited, popularity})
            } else if (res.data.blocked || (res.data.user && this.props.user && res.data.user.login === this.props.user.login)) {
                browserHistory.push('/')
            }
        })
    }

    handleLike = () => {
        if (this.state.enabled) {
            axios.get('/like/' + this.state.user.login).then(res =>{
                if (res.data.success) {
                    this.setState({liked: true, match: res.data.match})
                }
            })}

    }

    handleDislike = () => {
        if (this.state.enabled) {
            axios.get('/dislike/' + this.state.user.login).then(res =>{
                if (res.data.success) {
                    this.setState({liked: false})
                }
            })}
    }

    handleChat = () => {
        if (this.state.enabled && this.state.liked && this.state.likes_me) {
            this.props.chat(this.state.user.login)
        }

    }

    handleReport = () => {
        axios.get('/report/' + this.state.user.login)
    }

    handleBlock = () => {
        if (this.state.enabled) {
            axios.get('/block/' + this.state.user.login).then(res => {
                if (res.data.success) {
                    browserHistory.push('/')
                }
            })}
    }

    calculateAge = (birthday) => { // birthday is a date
        const ageDifMs = Date.now() - new Date(birthday).getTime();
        const ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    render() {
        let {login, bio, photo, birthDate, gender, tags } = this.state.user,
            {connected, lastConnection, liked, likes_me, user, visited, popularity, match} = this.state
        let interactions = []
        birthDate = birthDate || '2000-01-01'
        const age =  this.calculateAge(birthDate)
        tags = tags || []
        const tagList = tags.reduce((a, b) => { return a + ' #' + b}, '')
        let he = "he"
        if (user.gender === 'female') {
            he = 'she'
        }
        if (this.props.user && this.props.user.photo && this.props.user.photo[0]) {
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
            if (match) {
                interactions.push(
                    <Match key={1002}/>)
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


                        <div key={602} className="user-description">
                            <p key={601}>{bio}</p>
                            <ul>
                                <li key={501} >Age : {age}</li>
                                <li key={502} >Gender: {gender}</li>
                                <li key={503} >Tags: {tagList}</li>
                            </ul>

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

    componentWillReceiveProps = newProps => {

        const enabled = (!!newProps.me.photo && !!newProps.me.photo[0])
        this.setState({enabled, appConfig: newProps.appConfig})
    }

    componentDidMount() {
        let {photo, bio, login, liked, likes_me} = this.props.user
        this.setState({photo, bio, login, liked, likes_me, match: (liked && likes_me)})
    }

    handleLike = () => {
        if (this.props.me && this.props.me.photo && this.props.me.photo[0]) {
            axios.get('/like/' + this.state.login).then(res => {
                if (res.data.success) {
                    this.setState({liked: true, match: res.data.match})
                }
            })
        }
    }

    handleDislike = () => {
        if (this.props.me && this.props.me.photo && this.props.me.photo[0]) {
            axios.get('/dislike/' + this.state.login).then(res =>{
                if (res.data.success) {
                    this.setState({liked: false, match: false})
                }
            })}

    }


    handleChat = () => {
        if ((this.props.me && this.props.me.photo && this.props.me.photo[0]) && this.state.liked && this.state.likes_me) {
            this.props.chat(this.state.login)
        }

    }


    handleBlock = () => {
        if (this.props.me && this.props.me.photo && this.props.me.photo[0]) {
            axios.get('/block' + this.state.login).then(res => {
                if (res.data.success) {
                    this.setState({blocked: true})
                }
            })}
    }


    render() {
        let {photo, bio, login, liked, match, blocked, message} = this.state
        const enabled = (this.props.me && this.props.me.photo && this.props.me.photo[0])
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
                     style={{backgroundImage: `url('${this.props.appConfig.baseURL}/images/${image}')`}}>
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
        const enabled = (newProps.user && newProps.user.photo && newProps.user.photo[0])
        this.setState({users, user, login, enabled})
    }
    componentWillMount() {
        this.props.search('')
    }

    render() {

        let users = ''
        const {user, login} = this.state
        if (this.state.users.length > 0) {
            users = this.state.users.map(e => {
                return (
                    <UserCard user={e} key={e.key_id} me={user} login={login} appConfig={this.props.appConfig} chat={this.props.toggleChat}/>
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