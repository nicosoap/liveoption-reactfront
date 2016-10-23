/**
 * Created by opichou on 10/15/16.
 */
import React, {Component} from 'react'
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
            .then(response => this.setState({userForm: response.data}, console.log(this.state)))
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
        photo: ['Aerial01.jpg'],
        username:'',
        bio:'',
        id:'',
        liked: false,
        chat: false,
        chatNb: 0,
        match: false
    }

    conponentWillReceiveProps = newProps => {
        const user = newProps.user
        this.setState({user})
    }

    render() {
        const {photo, username, bio, id, liked, match} = this.state
        return (
            <div className="user" id={id}>
                <div className="profile-picture">
                    <img src={"images/" + photo[0]} role="presentation" />
                </div>
                <div className="user-spacer">
                    <i className={cx({
                        'material-icons': true,
                        'icon-small': true,
                        'icon-active': liked,
                        'icon-match':match
                    })
                    }>{match?'thumb_up':'love'}</i>

                </div>
                    <div className="user-details">Olivier</div>
                    <div className="user-details user-description">Salut c'est cool !</div>
            </div>
        )
    }
}

export class Users extends Component {
    state = {
        userForm: {},
        users: []
    }

    componentWillReceiveProps = newProps => this.setState({users: newProps.users})

    render() {
        const user = {user:{photo:['']}}
        return (
            <div id="users">
                { this.state.users.map((e, i) => {
                    return (
                        <UserCard user={e} key={i}/>
                    )
                })}
                <UserCard />
                <UserCard />
                <UserCard />
                <UserCard />
                <UserCard />
                <UserCard />
                <UserCard />
                <UserCard />
                <UserCard />
                <UserCard />
            </div>
        )
    }
}

