/**
 * Created by opichou on 10/10/16.
 */
import React, { Component } from 'react'

class MenuItem extends Component {
    render() {
        return (
            <div>
                <a href={ this.props.rel }><li><i className="material-icons">{ this.props.icon }</i>{ this.props.name }</li></a>
            </div>
        )
    }
}

export default class Menu extends Component {
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
