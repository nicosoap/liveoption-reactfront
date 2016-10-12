/**
 * Created by opichou on 10/10/16.
 */
import React, { Component } from 'react'
import cx from 'classnames'
import { Notifications, MenuButton } from './notifications'


class MenuItem extends Component {
    render() {
        return (
            <div>
                <a href={ this.props.rel }><li><i className="material-icons">{ this.props.icon }</i>{ this.props.name }</li></a>
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
                icon: "edit",
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
    state = { isShown: false }

    toggleMenu = () => this.setState({isShown: !this.state.isShown})

    render() {
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
                        <Notifications />
                    </div>
                </div>
            </div>
        )
    }

}