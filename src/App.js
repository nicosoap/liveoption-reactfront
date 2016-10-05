import React, { Component } from 'react';
import logo from './logo.svg';
import Notifications from './notifications'
import ReactGA from 'react-ga'
import './App.css';

ReactGA.initialize('UA-85246703-1')


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
          <Notifications/>
      </div>
    );
  }
}
export default App;
