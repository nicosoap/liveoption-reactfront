/**
 * Created by opichou on 10/7/16.
 */
import React, { Component } from 'react'
import cx from 'classnames'
import { Link } from 'react-router'

export default class Notif extends Component {
    state = {
        notification: null,
        isClosed: false,
        hidden: false
    }

    // componentDidMount = () => {
    //     setTimeout(this.dismiss, 5000)
    // }

    dismiss = (e) => {
        this.setState({isClosed: !this.state.isClosed})
        //setTimeout(() => this.props.removeNotif(this.state.notification.id), 250)
    }

    componentWillReceiveProps = (newProps) => {
        this.setState({notification: newProps.notification})
    }

    componentDidMount() {
        setTimeout(() => this.setState({isClosed: true}), 8000)
        setTimeout(() => this.setState({hidden: true}), 8300)
    }

    render() {
        const {notification, isClosed, hidden} = this.state

        if (!this.state.notification) return (<div className={cx({
            'notif-card': true,
            'card-3': true,
            'on-screen': true
        })}>Loading...</div>)

        const {body, image, link} = notification

        return (
            <div className={cx({
                'notif-card': true,
                'card-3': true,
                'on-screen': !isClosed,
                'off-screen': isClosed,
                'hidden': hidden
            })}>
                <Link to={ link }>
                    <div className="notification-image">
                        { image }
                    </div>
                    <div className="body">
                        { body }
                    </div>
                </Link>
                <div onClick={this.dismiss}>
                    <i className="material-icons">close</i>
                </div>
            </div>
        )
    }
}
