/**
 * Created by opichou on 10/15/16.
 */
import React, {Component} from 'react'
import { Link } from 'react-router'
import axios from 'axios'
import cx from 'classnames'
import {PhotoViewer} from './photoviewer'
import {UserChart} from './chart'



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

    handleLike = () => {

    }

    handleDislike = () => {

    }

    handleChat = () => {

    }

    handleReport = () => {

    }



    componentWillMount() {
        axios.get('/user/'+ this.props.params.userId).then(res => {
            if (res.data.success) {
                console.log(res.data)
                const {connected, lastConnection, liked, likes_me, user, visited, popularity} = res.data
                this.setState({connected, lastConnection, liked, likes_me, user, visited, popularity})
            }
        })
    }

    render() {
        const {login, bio, photo} = this.state.user,
            {connected, lastConnection, liked, likes_me, user, visited, popularity} = this.state
        return (
            <div className="profile">
                <div className="profile-picture">
                    <PhotoViewer
                        photo={photo}
                        appConfig={this.props.appConfig}
                        login={login}
                    /></div><div className="content">
                <div className="user-name">{login}</div>
                <div className={cx({
                    'interaction': true,
                    'hidden': !this.state.enabled
                })}>

                    <div className={cx({
                    "Like": true,
                        'hidden': !!liked
                    })} onClick={this.handleLike} >
                    <i className="material-icons">thumb_up</i>
                </div>

                <div className={cx({
                    'dislike': true,
                    'hidden': !liked}
                )
                } onClick={this.handleDislike} ><i className="material-icons">thumb_down</i></div>

                    <div className={cx({
                    'chat': true,
                        'hidden': !liked && !likes_me
                    })} onClick={this.handleChat}><i className="material-icons">chat</i></div>

                    <div className="report" onClick={this.handleReport}><i className="material-icons">report</i></div>

                    <div className={cx({
                    'visited': true,
                        'active': visited
                    })}><i className="material-icons">visibility</i></div>

                    <div className={cx({
                    'online': true,
                    'hidden': !this.state.online})} ><i className="material-icons">nature_people</i></div>

                    <div className={cx({
                        'offline': true,
                        'hidden': !!this.state.online})} ><i className="material-icons">nature</i></div>
                    </div>
                <div>{liked}</div>
                <div>{likes_me}</div>
                <div>{popularity}</div>
                <div className="user-description">< UserChart tags={this.state.tags} />{bio}</div>
            </div></div>
        )
    }
}

export class UserCard extends Component {
    state = {
        photo: ['anonymous.jpg'],
        bio:"Loading...",
        login: 'Loading...',
        liked: false,
        chat: false,
        chatNb: 0,
        match: false,
        blocked: false,
        message: true,
        height: 187,
        weight: 88,
        Kg: false,
        M: false,
        appConfig: {},
        enabled: true,
    }

    componentWillMount() {
        axios.get('/admin/appConfig').then(response => {
            this.setState({appConfig: response.data})

    })}

    componentWillReceiveProps = newProps => {
        if (newProps.user) {
            const {photo, bio, login} = newProps.user
            this.setState({photo, bio, login})
        }
        if (newProps.me) {
            const enabled = newProps.me.enabled
            this.setState({enabled})
        }
    }


    block = () => {
        console.log("block")
        axios.get('/block/'+ this.state.login)
            .then((response) => {
            if (response.data.success) {
                this.setState({blocked: !this.state.blocked})
            }})
            .catch(error => console.error(error))
    }


    like = () => {
        console.log("like")
        axios.get('/like/'+ this.state.login)
        .then(response => {
            if (response.data.success && response.data.match) {
                this.setState({
                    liked: true, match: true})
            } else if (response.data.success){
                this.setState({liked: true, match: false})
            }})
        .catch(error => console.error(error))
    }

    dislike = () => {
        axios.get('/dislike/'+ this.state.login)
            .then(response => {
                if (response.data.success) {
                    this.setState({liked: !this.state.liked,
                    match: false})
                }})
            .catch(error => console.error(error))
    }


    chat = () => {
        console.log("chat")
    }


    render() {
        const {photo, bio, login, liked, match, blocked, message, appConfig} = this.state
        let image = photo[0] || 'anonymous.jpg'


        return (
            <div className={cx({
                "user": true,
                "hidden": blocked})}
                 id={login} >
                <div className="profile-picture" style={{backgroundImage: `url('${appConfig.baseURL}/images/${image}')`}}>
                </div>
                <div className="user-container-1">
                    <div className="user-interactions">
                        <div className="small-container">
                            {match ? <div onClick={this.dislike}>
                                <i className={
                                    cx({
                                        'fa fa-heart-o': true,
                                        'user-unlike': true,
                                        'icon-active': liked,
                                        'icon-match': match
                                    })
                                }/></div> :''}

                           <div className="user-block" onClick={this.block}> <i className={
                                cx({
                                    'material-icons': true,
                                    'icon-alarm': blocked
                                })
                            } >do_not_disturb</i></div>
                        </div>
                        {match ? <div className="user_pop_messenger" onClick={this.chat}><i className={
                            cx({
                                'material-icons': true,
                                'icon-middle': true,
                                'icon-active': message
                            })
                        } >message</i></div>:<div className="user_pop_messenger" onClick={this.like} ><i className={
                            cx({
                                'material-icons': true,
                                'icon-middle': true,
                                'higher': true,
                                'icon-active': liked
                            })
                        }>thumb_up</i></div>}
                    </div>
                    <Link to={`/user/${login}`}><div className="user-content-container">
                        <div className="user-details">{login}</div>
                        <div className="user-details user-description hidden">
                        </div>
                        <div className="user-details user-description">{bio}</div>
                    </div></Link>
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
        const {users, user, login } = newProps
        this.setState({users, user, login})
    }

    render() {
        let users = ''
        const {user, login} = this.state

        if (this.state.users.length > 0) {users = this.state.users.map((e, i) => {
            return (
                <UserCard user={e} key={i} me={user} login={login} />
            )})}
        return (
            <div id="users">
                {users}
            </div>
        )
    }
}


