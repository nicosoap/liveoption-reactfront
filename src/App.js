import React, { Component } from 'react';
import logo from './logo.svg';
import io from 'socket.io-client'
import './App.css';

class SocketIo2 extends Component {
    state = { messages: [] }

    componentDidMount() {
        this.socket = io('localhost:3001/')
        this.socket.on('message', message => {
            this.setState({messages: [message, ...this.state.messages] })
        })
    }

    handleSubmit = e => {
        const body = e.target.value
        if (e.keyCode === 13 && body) {
            console.log(body)
            const message = {
                body,
                from: 'Me'
            }
            this.setState({messages: [message, ...this.state.messages] })
            this.socket.emit('message', body)
            e.target.value = ""
        }
    }
    render () {
        const messages = this.state.messages.map((message, index) => {
            return <li key={index}><b>{message.from}:</b>{message.body}</li>
        })
        return (
            <div>
                {messages}
                <input type='text' placeholder='Enter a message... ' onKeyUp={this.handleSubmit} />
            </div>
        )
    }
}

class Lol extends Component {
  state = {
    subValue: 'connection',
  }

  login = (e) => {
      e.preventDefault();
      this.setState({subValue: 'coucou'});
  }

  render() {
    const { subValue } = this.state;
    return (
        <div>
          <form onSubmit={this.login}>
            username<input type="text" name="username"/>
            password<input type="password" name="password"/>
            <input type="submit" value={subValue} />
          </form>
        </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          <Lol />

        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
          <SocketIo2/>
      </div>
    );
  }
}
export default App;
