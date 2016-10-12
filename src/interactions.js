/**
 * Created by opichou on 10/7/16.
 */
import React, {Component} from 'react'
import {Notifications, MenuButton} from './notifications'
import cx from 'classnames'

class InfoNotice extends Component {
    state = {icon: 'notification', visible: false, badge: 0, newMessage: false, isNarrow: false}
    componentWillReceiveProps = (newProps) => {
        const notification = newProps.notification
        this.setState(notification)
    }

    render() {
        const tmpBadge = this.state.badge > 9 ? "9+" : this.state.badge

        return (
            <div className={cx({
                "floating": true,
                'hidden': !!this.state.visible,
            })}>
                <div className="notif">
                    <div className={cx({
                        'material-icons': true,
                        'newMessage': !!this.state.newMessage,
                        'unread': tmpBadge !== 0
                    })}>{this.state.icon}
                    </div>
                </div>
                <div className={cx({
                    "lo-badge": true,
                    "closer": !!this.state.isNarrow,
                    "hidden": this.state.badge > -1
                })}> { tmpBadge } </div>
            </div>
        )
    }
}
export default class Interactions extends Component {
    state = {
        matches: [{
            read: true,
            body: "Ceci est un vieux match",
            from: "olivier"
        }],
        likes: [],
        visits: [],
        newMessage: '',
        unread: 'read',
        notification: {newMessage: false}
    } ///This requires the Interactions API
    componentWillReceiveProps = (newProps) => {
        if (this.socket) return (null);
        this.socket = newProps.socket
        this.socket.on('match', match => {
            this.setState({
                matches: [match, ...this.state.matches], newMessage: 'newMessage', unread: 'unread',
                notification: {newMessage: true}
            })
            this.props.newNotif(match);
            setTimeout(() => this.setState({
                newMessage: '',
                notification: {newMessage: false}
            }), 250)
        })
        this.socket.on('like', like => {
            this.setState({
                likes: [like, ...this.state.likes], newMessage: 'newMessage', unread: 'unread',
                notification: {newMessage: true}
            })
            this.props.newNotif(like);
            setTimeout(() => this.setState({
                newMessage: '',
                notification: {newMessage: false}
            }), 250)
        })
        this.socket.on('visit', visit => {
            this.setState({
                visits: [visit, ...this.state.visits], newMessage: 'newMessage', unread: 'unread',
                notification: {newMessage: true}
            })
            this.props.newNotif(visit);
            setTimeout(() => this.setState({
                newMessage: '',
                notification: {newMessage: false}
            }), 250)
        })
    }

    render() {
        let isUR = (unit) => (unit.read === true) ? '' : unit
        const notifsNb = this.state.matches.length + this.state.likes.length + this.state.visits.length
        const notifsUR = this.state.matches.concat(this.state.likes, this.state.visits).map(isUR).filter(p => p !== '')
        const notifsURL = notifsUR.length > 9 ? "9+" : notifsUR.length
        const notification = {
            'icon': 'notifications',
            'visible': notifsNb > 0,
            'badge': notifsUR.length,
            'newMessage': this.state.notification.newMessage,
            'isNarrow': false
        }
        return (
            <div>
                <InfoNotice notification={notification}/>
            </div>
        )
    }
}