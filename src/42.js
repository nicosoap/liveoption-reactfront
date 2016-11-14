
import React, {Component} from 'react'
import axios from 'axios'


export class Sujet42 extends Component {
    state = {
        likes: [],
        visits: [],
        matches: [],
        login: ''
    }

    componentDidMount() {
        axios.get('/sujet42').then(res => {
            if (res.data.success) {
                this.setState({
                    likes: res.data.likes,
                    visits: res.data.visits,
                    matches: res.data.chats,
                    login: res.data.userId
                })
            }
        })
    }

    render() {
        const visits = this.state.visits.map((e, i) => {
            return (<li key={i}> {e.userId} visited your profile on {new Date(e.date).toDateString()} </li>)
        })
        const matches = this.state.matches.map((e, i) => {
            const name = e.userId === this.state.login ? e.otherId : e.userId
            return (<li key={i}> You matched {name}</li>)
        })
        const likes = this.state.likes.filter(e => {
            return e.like
        }).map((e, i) => {
            return (<li key={i}> {e.userId} likes you</li>)
        })
        return (
            <div>
                <ul>
                    {visits}
                    {likes}
                    {matches}
                </ul>
            </div>
        )
    }
}