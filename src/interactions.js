/**
 * Created by opichou on 10/7/16.
 */
import React, {Component} from 'react'
import cx from 'classnames'

export class InfoNotice extends Component {
    state = {icon: 'not interested', visible: false, badge: 0, newMessage: false, isNarrow: false}
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
                <div className="notif" >
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
        }
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

    }

    render() {

        let isUR = (unit) => (unit.read === true) ? '' : unit
        const notifsNb = this.state.notifications.matches.length
            + this.state.notifications.likes.length
            + this.state.notifications.visits.length
        const notifsUR = this.state.notifications.matches.concat(this.state.notifications.likes, this.state.notifications.visits).map(isUR).filter(p => p !== '')
        const notifications = {
            'icon': 'notifications',
            'visible': notifsNb > 0,
            'badge': notifsUR.length,
            'newMessage': this.state.notifications.newMessage,
            'isNarrow': true
        }
        const messagesNb = this.state.messages.messages.length
        const messagesUR = this.state.messages.messages.map(isUR).filter(p => p !== '')
        const messages = {
            'icon': 'chat',
            'visible': messagesNb > 0,
            'badge': messagesUR.length,
            'newMessage': this.state.messages.newMessage,
            'isNarrow': true
        }
        return (
            <div>
                <InfoNotice notification={notifications} click={this.toggleNotification}/>
                <InfoNotice notification={messages} click={this.toggleChat}/>
            </div>
        )
    }
}