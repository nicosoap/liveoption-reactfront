/**
 * Created by opichou on 10/10/16.
 */
import React, { Component } from 'react'
import Search from './search'
import cx from 'classnames'
import { Link } from 'react-router'
import { Notifications, MenuButton } from './notifications'


class MenuItem extends Component {
    render() {
        return (
            <div className="menu-div">
                <Link to={ this.props.rel }><li><i className="material-icons">{ this.props.icon }</i>{ this.props.name }</li></Link>
            </div>
        )
    }
}


class MenuContent extends Component {
    state = {
        menuItems: [
            {
                name: "Around me",
                icon: "near_me",
                rel: "#"
            },
            {
                name: "Search",
                icon: "search",
                rel: "#"
            },
            {
                name: "Live options",
                icon: "bubble_chart",
                rel: "#"
            },
            {
                name: "Netflix & chill",
                icon: "weekend",
                rel: "#"
            },
            {
                name: "My profile",
                icon: "settings_applications",
                rel: "#"
            }
        ]

    }

    generateMenu = (arr) =>
        arr.map(({ rel, icon, name }, index) => (
            <MenuItem
                rel={rel}
                icon={icon}
                name={name}
                key={index}
            />
        ))

    render() {
        const { menuItems } = this.state
        const menu = this.generateMenu(menuItems)
        return (
            <div>
                <ul>
                    <li className="">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;liveoption.io</li>
                    {menu}
                </ul>
            </div>
        )
    }
}

export default class Menu extends Component {
    state = {
        isShown: false,
        messages: {
            newMessage: false,
            unread: false,
            messages: [{
                read: true,
                body: "Ceci est un vieux match",
                from: "olivier"
            }],
        },
        notifications: {
            newMessage: false,
            unread: false,
            matches: [{
                read: true,
                body: "Ceci est un vieux match",
                from: "olivier"
            }],
            likes: [],
            visits: [],
        },
        info:{
            messages: []
        }
    }

    toggleMenu = () => this.setState({isShown: !this.state.isShown})

    componentWillReceiveProps = (newProps) => this.setState({
        notifications: newProps.notifications,
        messages: newProps.messages,
        info: newProps.info
    })


    render() {
        const {notifications, messages, info } = this.state
        return (
            <div>
                <div className={cx({
                    'push-menu-menu': true,
                    'carved': true,
                    'stored': !this.state.isShown,
                    'expanded': !!this.state.isShown
                })}>
                    <MenuContent />
                </div>
                <div className={cx({
                    'push-menu-main': true,
                    'stalled': !this.state.isShown,
                    'pushed': !!this.state.isShown
                })}>
                    <div className="top-bar">
                        <MenuButton toggleMenu={ this.toggleMenu } />
                        <div className="float-right">
                            <Search socket={this.socket}/>
                            <Notifications notifications={notifications} messages={messages} info={info}/>
                        </div>
                    </div >
                    <div className="App">
                        { this.props.children }
                    </div>
                </div>
            </div>
        )
    }

}