/**
 * Created by opichou on 10/10/16.
 */
import React, { Component } from 'react'
import Search from './search'
import cx from 'classnames'
import { Link, browserHistory } from 'react-router'
import { Notifications, MenuButton } from './notifications'
import axios from 'axios'
import Chat from './chat'


class MenuItem extends Component {


    render() {

        return (
            <div className="menu-div">
                <Link to={ this.props.rel } >
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
        simpleSearch: null,
        showNotification: false
    }

    toggleMenu = () => this.setState({isShown: !this.state.isShown})

    toggleNotification = () => {
        this.setState({showNotification: !this.state.showNotification})
    }

    componentWillReceiveProps = (newProps) => this.setState({
        notifications: newProps.notifications,
        messages: newProps.messages,
        info: newProps.info,
        searchString: newProps.searchString,
        simpleSearch: newProps.simpleSearch
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
                        <MenuButton toggleMenu={ this.toggleMenu }/>
                        <Search searchString={this.state.searchString} simpleSearch={this.props.simpleSearch}/>
                        <Notifications notifications={notifications} messages={messages} info={info}
                                       toggleChat={this.props.toggleChat}
                                       toggleNotification={this.toggleNotification}/>
                    </div >
                    <div className="App">
                        { this.props.children }
                    </div>
                    <Chat socket={this.props.socket} messages={messages} userId={this.props.userId} toggleChat={this.props.toggleChat} showChat={this.props.showChat} chats={this.props.chats} updateChat={this.props.updateChat}/>
                </div>
            </div>
        )
    }

}