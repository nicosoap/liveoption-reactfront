import React, { Component } from 'react'
import ReactGA from 'react-ga'
import './App.css'
import './menu.css'
import Notifications from './notifications'

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
            <div id="drawer" className="push-menu-menu stored">
                <ul>
                    <a href="#"><li className="card-1"><i className="material-icons">near_me</i>Around me</li></a>
                    <a href="#"><li className="card-1"><i className="material-icons">search</i>Search</li></a>
                    <a href="#"><li className="card-1"><i className="material-icons">bubble_chart</i>Live options</li></a>
                    <a href="#"><li className="card-1"><i className="material-icons">weekend</i>Netflix & chill</li></a>
                    <a href="#"><li className="card-1"><i className="material-icons">location_searching</i>Geolocation</li></a>
                    <a href="#"><li className="card-1"><i className="material-icons">edit</i>My profile</li></a>
                </ul>
            </div>
            <div id="pusher" className="push-menu-main stalled">
                <div className="top-bar">
                    <Notifications/>
                </div>
            </div>
        </div>
    );
  }
}
export default App;
