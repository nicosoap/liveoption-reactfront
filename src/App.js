import React, { Component } from 'react'
import ReactGA from 'react-ga'
import cx from 'classnames'
import Notifications from './notifications'
import './App.css'
import  Menu from './menu'

ReactGA.initialize('UA-85246703-1')




class App extends Component {
  render() {
    return (
        <Menu>
            <div className="App">
                <Notifications/>
            </div>
        </Menu>

    );
  }
}
export default App;

