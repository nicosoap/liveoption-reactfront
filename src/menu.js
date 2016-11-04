/**
 * Created by opichou on 10/10/16.
 */
import React, { Component } from 'react'
import Search from './search'
import cx from 'classnames'
import { Link, browserHistory } from 'react-router'
import { Notifications, MenuButton } from './notifications'
import axios from 'axios'


class MenuItem extends Component {


    render() {

        return (
            <div className="menu-div">
                <Link to={ '/' + this.props.rel } >
                    <li><i className="material-icons">{ this.props.icon }</i>{ this.props.name }</li>
                </Link>
            </div>
        )
    }
}


class MenuContent extends Component {
    state = {menuItems:[]}

    componentDidMount() {
        axios.get('/config?param=menuItems')
            .then(response => {
                if (!response.data) {
                    browserHistory.push('/')
                } else {
                    this.setState({menuItems: response.data})
                }
            })
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
            messages: [],
        },
        notifications: {
            newMessage: false,
            unread: false,
            matches: [],
            likes: [],
            visits: [],
        },
        info:{
            messages: []
        },
        searchString: '',
        simpleSearch: null
    }

    toggleMenu = () => this.setState({isShown: !this.state.isShown})

    componentWillReceiveProps = (newProps) => this.setState({
        notifications: newProps.notifications,
        messages: newProps.messages,
        info: newProps.info,
        searchString: newProps.searchString,
        simpleSearch: newProps.simpleSearch
    })


    render() {
        const {notifications, messages, info } = this.state
        const childrenWithProps = React.Children.map(this.props.children,
            (child) => React.cloneElement(child, {
            })
        )
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
                        <Search searchString={this.state.searchString} simpleSearch={this.state.simpleSearch} />
                        <Notifications notifications={notifications} messages={messages} info={info}/>
                    </div >
                    <div className="App">
                        { this.props.children }
                    </div>
                </div>
            </div>
        )
    }

}