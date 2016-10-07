/**
 * Created by opichou on 10/7/16.
 */
import React, { Component } from 'react';

export default class Interactions extends Component {
    state = {matches: [], likes: [], visits: []} ///This requires the Interactions API
    componentWillReceiveProps = (newProps) => {
        this.socket = newProps.socket
        this.socket.on('match', match => {
            this.setState({matches: [match, ...this.state.matches]})
        })
        this.socket.on('like', like => {
            this.setState({likes: [like, ...this.state.likes]})
        })
        this.socket.on('visit', visit => {
            this.setState({visits: [visit, ...this.state.visits]})
        })
    }

    render () {
        let isUR = (unit) => (unit.read === true) ? '':unit
        const notifsNb = this.state.matches.length + this.state.likes.length + this.state.visits.length
        const notifsUR = this.state.matches.concat(this.state.likes, this.state.visits).map(isUR).filter(p => p !== '')
        console.log("notifs :", notifsUR)

        const notifs = notifsNb !== 0 ? <div id="notifications" className="floating notif">
            <i className={notifsUR.length !== 0 ? "material-icons unread":"material-icons read"}>notifications</i>
        </div> : ''
        return (
            <div>
                {notifs}
            </div>
        )
    }
}