/**
 * Created by opichou on 10/7/16.
 */
import React, {Component} from 'react'
import cx from 'classnames'

export class InfoNotice extends Component {
    state = {
        icon: 'not interested',
        visible: false,
        badge: 0,
        newMessage: false,
        isNarrow: false,
        showNotifications: false,
        notifications: []
    }

    componentWillReceiveProps = (newProps) => {
        const notifications = newProps.notification
        this.setState(notifications)
    }

    click = () => {
        this.props.click()
    }

    render() {
        const tmpBadge = this.state.badge > 9 ? "9+" : this.state.badge

        return (
            <div className={cx({
                "floating": true,
                'hidden': !this.state.visible,
            })}
                 onClick={this.click}
            >
                <div className="notif">
                    <div className={cx({
                        'material-icons': true,
                        'icon-large': true,
                        'newMessage': !!this.state.newMessage,
                        'unread': this.state.badge !== 0
                    })}>
                        {this.state.icon}
                    </div>
                </div>
                <div className={cx({
                    "lo-badge": true,
                    "closer": !!this.state.isNarrow,
                    "hidden": this.state.badge === 0
                })}> { tmpBadge } </div>
                <div className={cx({
                    'notificationMenu': true,
                    'visible': this.state.showNotifications,
                    'hidden': this.state.hideNotifs
                })}>{this.state.notifications.map((e, i) =>
                    <div className="notificationItem" key={i}>
                        {e.body}
                    </div>)}
                </div>
            </div>
        )
    }
}

export class Interactions extends Component {

    state = {
        notifications: {
            newMessage: false,
            unread: false,
            matches: [],
            likes: [],
            visits: [],
        },
        messages: {
            newMessage: false,
            unread: false,
            messages: [],
        },
        showNotification: false,
        hideNotifs: true
    } ///This requires the Interactions API

    componentWillReceiveProps = (newProps) => {
        this.setState({
            messages: newProps.messages,
            notifications: newProps.notifications
        })
    }

    toggleChat = () => {
        if (this.props.toggleChat()) {
            let messages = this.state.messages.messages.map(e => {
                return (
                {from: e.from, body: e.body, read: true}
                )
            })
            this.setState({messages: {messages, unread: false, newMessage: false}})
        }
    }

    toggleNotification = () => {
        const {visits, matches, likes } = this.state.notifications
        visits.map(e => {
            e.read = true
            return e
        })
        matches.map(e => {
            e.read = true
            return e
        })
        likes.map(e => {
            e.read = true
            return e
        })
        const notifications = this.state.notifications
        notifications.likes = likes
        notifications.visits = visits
        notifications.matches = matches
        this.setState({
            notifications,
                showNotifications: !this.state.showNotifications,
                hideNotifs: !this.state.hideNotifs
            })
        }

        render()
        {

            let isUR = (unit) => (unit.read === true) ? '' : unit,
                notificationsRedux = this.state.notifications.likes.concat(this.state.notifications.matches.concat(this.state.notifications.visits || []) || []) || []
            const notifsUR = notificationsRedux.map(isUR).filter(p => p !== '')
            const notifications = {
                'icon': 'notifications',
                'visible': true,
                'badge': notifsUR.length,
                'newMessage': this.state.notifications.newMessage,
                'isNarrow': true,
                'notifications': notificationsRedux,
                'showNotifications': this.state.showNotifications,
                'hideNotifs': this.state.hideNotifs
            }
            const messagesUR = this.state.messages.messages.map(isUR).filter(p => p !== '')
            const messages = {
                'icon': 'chat',
                'visible': true,
                'badge': messagesUR.length,
                'newMessage': this.state.messages.newMessage,
                'isNarrow': true,
                'notifications': [],
                'hideNotifs': true
            }
            return (
                <div>
                    <InfoNotice notification={notifications} click={this.toggleNotification}/>
                    <InfoNotice notification={messages} click={this.toggleChat}/>
                </div>
            )
        }
    }