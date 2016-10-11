/**
 * Created by opichou on 10/7/16.
 */
import React, { Component } from 'react'
import cx from 'classnames'

export default class Notif extends Component {
    state = {
        notification: null,
        isClosed: false,
        key: null
    }

    // componentDidMount = () => {
    //     setTimeout(this.dismiss, 5000)
    // }

    dismiss = (e) => {
        console.log(e.target)
        // console.log('will be removed : ', this.state.key)
        this.setState({isClosed: !this.state.isClosed})
        setTimeout(() => this.props.removeNotif(this.state.notification.id), 250)
    }

    componentWillReceiveProps = (newProps) => {
        console.log('props received', newProps.ket)
        this.setState({notification: newProps.notification })
    }

    render() {
        const { notification, isClosed } = this.state

        if (!this.state.notification) return (<div className={cx({
            'notif-card': true,
            'card-3': true,
            'on-screen': true
        })}>Loading...</div>)

        const {body, image, link} = notification

        return(
        <div className={cx({
                'notif-card': true,
                'card-3': true,
                'on-screen': !isClosed,
                'off-screen': isClosed
            })}>
                <a href={ link }>
                    <div className="notification-image" onClick={this.dismiss}>
                        { image }
                    </div>
                    <div className="body">
                        { body }
                    </div>
                </a>
                <i className="material-icons" onClick={this.dismiss}>close</i>
            </div>
        )
    }
}
