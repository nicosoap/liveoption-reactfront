/**
 * Created by opichou on 10/7/16.
 */
import React, { Component } from 'react'

export default class Interactions extends Component {
    state = {matches: [], likes: [], visits: [], newMessage: '', unread: 'read'} ///This requires the Interactions API
    componentWillReceiveProps = (newProps) => {
        this.socket = newProps.socket
        this.socket.on('match', match => {
            this.setState({matches: [match, ...this.state.matches], newMessage: 'newMessage', unread: 'unread'})
            setTimeout(() => this.setState({ newMessage: '' }), 250)
            this.forceUpdate()
        })
        this.socket.on('like', like => {
            this.setState({likes: [like, ...this.state.likes], newMessage: 'newMessage', unread: 'unread'})
            setTimeout(() => this.setState({ newMessage: '' }), 250)
            this.forceUpdate()
        })
        this.socket.on('visit', visit => {
            this.setState({visits: [visit, ...this.state.visits], newMessage: 'newMessage', unread: 'unread'})
            setTimeout(() => this.setState({ newMessage: '' }), 250)
            this.forceUpdate()
        })
    }

    render () {
        let isUR = (unit) => (unit.read === true) ? '':unit
        const { newMessage, unread } = this.state
        const notifsNb = this.state.matches.length + this.state.likes.length + this.state.visits.length
        const notifsUR = this.state.matches.concat(this.state.likes, this.state.visits).map(isUR).filter(p => p !== '')
        const notifsURL = notifsUR.length > 9 ? "9+" : notifsUR.length
        const notifs = notifsNb !== 0 ? <a href="#">
            <div id="notifications" className="floating">
            <div className={`material-icons notif ${newMessage} ${unread}`}>notifications</div>
                <div className="lo-badge closer">{notifsURL}</div>
        </div></a> : ''
        return (
            <div>
                {notifs}
            </div>
        )
    }
}