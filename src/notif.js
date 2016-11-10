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

    dismiss = (e) => {
        this.setState({isClosed: true})
        setTimeout(() => this.setState({hidden: true}), 300)
    }

    componentWillMount() {
        axios.get('/admin/appConfig').then(response => {
            this.setState({appConfig: response.data})
        })

    }

    componentWillReceiveProps = (newProps) => {
        this.setState({notification: newProps.notification})
    }

    componentDidMount() {

        setTimeout(() => this.setState({isClosed: true}), 5000)
        setTimeout(() => this.setState({hidden: true}), 5300)
    }

    render() {
        const {notification, isClosed, hidden, appConfig} = this.state

        if (!this.state.notification) return (<div className={cx({
            'notif-card': true,
            'card-3': true,
            'on-screen': true
        })}>Loading...</div>)

        let {from, body, image, link} = notification
        console.log(from, body)
        from = from === undefined? '' : from + ': '
            body = from + this.state.notification.body

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
                        "visible": !!image,
                        "hidden": !image})}
                        style={{backgroundImage: `url('${appConfig.baseURL}/images/${!!image?image:'pixel.gif'}')`}}>

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
                <div onClick={this.dismiss} className="close-modal">
                    <i className="material-icons">close</i>
                </div>
            </div>
        )
    }
}