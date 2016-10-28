/**
 * Created by opichou on 10/7/16.
 */
import React, { Component } from 'react'
import cx from 'classnames'
import axios from 'axios'
import { Link } from 'react-router'

export default class Notif extends Component {
    state = {
        notification: null,
        isClosed: false,
        hidden: false,
        appConfig: {}
    }

    // componentDidMount = () => {
    //     setTimeout(this.dismiss, 5000)
    // }

    dismiss = (e) => {
        this.setState({isClosed: !this.state.isClosed})
        //setTimeout(() => this.props.removeNotif(this.state.notification.id), 250)
    }

    componentWillMount = () => {
        axios.get('/admin/appConfig').then(response => {
            console.log(response)
            this.setState({appConfig: response.data})

        })}

    componentWillReceiveProps = (newProps) => {
        this.setState({notification: newProps.notification})
    }

    componentDidMount() {
        setTimeout(() => this.setState({isClosed: true}), 8000)
        setTimeout(() => this.setState({hidden: true}), 8300)
    }

    render() {
        const {notification, isClosed, hidden, appConfig} = this.state

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
                    <div className={cx({
                        "notification-image": true,
                        "visible": image !== '',
                        "hidden": image === ''})}
                        style={{backgroundImage: `url('${appConfig.baseURL}/images/${image}')`}}>

                    </div>
                    <div className={cx({
                        'body': true,
                        'illustrated': image !== '',
                        'full': image === ''
                    })
                        }>
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