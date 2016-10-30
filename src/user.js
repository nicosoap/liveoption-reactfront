/**
 * Created by opichou on 10/15/16.
 */
import React, {Component} from 'react'
import { Link } from 'react-router'
import axios from 'axios'
import cx from 'classnames'

let my_jwt = localStorage.jwt
if (!my_jwt) {
    console.log("Navigator not supported")
}

axios.defaults.baseURL = 'http://localhost:3001';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + my_jwt;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

//Cause I was the one that you found
// And if I know you, you'll find me someplace new
// I hope you never, I hope you never get to

export class User extends Component {
    state = {userForm: {}}

    componentDidMount() {
        axios.get('/admin/userForm')
            .then(response => this.setState({userForm: response.data}))
    }

    render() {
        return (
            <div className="user">
                <div className="profile-picture">
                    <div className="user-name">Olivier</div>
                    <div className="user-description">Salut c'est cool !</div>
                </div>
            </div>
        )
    }
}

export class UserCard extends Component {
    state = {
        photo: [{filename: 'anonymous.jpg', front: true}],
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
        appConfig: {}
    }

    componentWillMount = () => {
        axios.get('/admin/appConfig').then(response => {
            this.setState({appConfig: response.data})

    })}

    componentWillReceiveProps = newProps => {
        const {photo, bio, login} = newProps.user
        this.setState({photo, login, bio})
    }

    kToLbs = (pK) => {
    const nearExact = pK/0.45359237
    const lbs = Math.floor(nearExact)
    const oz = (nearExact - lbs) * 16
    return {
        pounds: lbs,
        ounces: oz
    }
}

    cmToFeetInch = (hC) => {
        const totalInches=Math.round(hC/2.54)
        const inches=totalInches%12
        const feet=(totalInches-inches)/12
        return {
            feet: feet,
            inches: inches
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
        const {photo, bio, login, liked, match, blocked, message, Kg, M, weight, height, appConfig} = this.state
        const weight_formated = Kg?weight + ' Kg':this.kToLbs(weight).pounds + ' Lbs ' + this.kToLbs(weight).onces + ' oz'
        const height_formated = M?height + 'cm':this.cmToFeetInch(height).feet + 'ft. ' + this.cmToFeetInch(height).inches + 'in.'
        let image = {filename: 'anonymous.jpg'}
        if (!!photo && photo.filter(e => e.front).length > 0) {
            image = photo.filter(e => e.front)[0]
        } else if (!!photo) {
            image = photo[0]
        }
        return (
            <div className={cx({
                "user": true,
                "hidden": blocked})}
                 id={login} >
                <div className="profile-picture" style={{backgroundImage: `url('${appConfig.baseURL}/images/${image.filename}')`}}>
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
                            <p>height: {height_formated} &nbsp;
                            weight: {weight_formated}</p>
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
        users: []
    }

    componentWillReceiveProps = newProps => {
        const users = newProps.users
        this.setState({users})
    }

    render() {
        let users = ''
        if (this.state.users.length > 0) {users = this.state.users.map((e, i) => {
            return (
                <UserCard user={e} key={i}/>
            )})}
        return (
            <div id="users">
                {users}
            </div>
        )
    }
}


