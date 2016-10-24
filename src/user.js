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
        photo: ['girl.jpg'],
        username:'Anat78',
        bio:"Anat78 est un garçon sensible qui ratisse la pelouse de sa maman le dimanche et lit des livre de cuisine pour se détendre lorsqu'il est tendu. Anat78 est un garçon sensible qui ratisse la pelouse de sa maman le dimanche et lit des livre de cuisine pour se détendre lorsqu'il est tendu",
        id: 0,
        liked: false,
        chat: false,
        chatNb: 0,
        match: false,
        blocked: false,
        message: true,
        height: 187,
        weight: 88,
        Kg: false,
        M: false
    }

    conponentWillReceiveProps = newProps => {
        const user = newProps.user
        this.setState({user})
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
        axios.put('/block/'+ this.state.id)
            .then((response) => {
            console.log("response: ",response.data)
            if (response.data.success) {
                this.setState({blocked: !this.state.liked})
            }})
            .catch(error => console.log(error))
    }


    like = () => {
        console.log("like")
        axios.put('/like/'+ this.state.id)
        .then((response) => {
            console.log("response: ",response.data)
            if (response.data.success) {
                this.setState({liked: !this.state.liked})
            }})
        .catch(error => console.log(error))
    }


    chat = () => {
        console.log("chat")
    }


    render() {
        const {photo, username, bio, id, liked, match, blocked, message, Kg, M, weight, height} = this.state
        const weight_formated = Kg?weight + ' Kg':this.kToLbs(weight).pounds + ' Lbs ' + this.kToLbs(weight).onces + ' oz'
        const height_formated = M?height + 'cm':this.cmToFeetInch(height).feet + 'ft. ' + this.cmToFeetInch(height).inches + 'in.'
        return (
            <div className="user" id={id} onClick={console.log("user")}>
                <div className="profile-picture" style={{backgroundImage: `url('images/${photo[0]}')`}}>
                    {/*<img src={"images/" + photo[0]} role="presentation"/>*/}
                </div>
                <div className="user-container-1">
                    <div className="user-interactions">
                        <div className="small-container">
                            {match ? <div onClick={this.like}>
                                <i className={
                                    cx({
                                        'fa fa-heart-o': true,
                                        'icon-active': liked,
                                        'icon-match': match
                                    })
                                }/></div> :''}

                           <div className="user-block" onClick={this.block}> <i className={
                                cx({
                                    'material-icons': true,
                                    'icon-alarm': blocked
                                })
                            }>do_not_disturb</i></div>
                        </div>
                        {match ? <div className="user_pop_messenger" onClick={this.chat}><i className={
                            cx({
                                'material-icons': true,
                                'icon-middle': true,
                                'icon-active': message
                            })
                        }>message</i></div>:<div className="user_pop_messenger" onClick={this.like} ><i className={
                            cx({
                                'material-icons': true,
                                'icon-middle': true,
                                'higher': true,
                                'icon-active': liked
                            })
                        }>thumb_up</i></div>}
                    </div>
                    <Link to={`/user/${id}`}><div className="user-content-container">
                        <div className="user-details">{username}</div>
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

