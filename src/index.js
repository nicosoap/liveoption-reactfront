import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin'
import App from './App'
import { Login } from './login'
import './index.css'

injectTapEventPlugin();

ReactDOM.render((
    <Router history={ browserHistory }>
        <Route path="/" component={App} >
        </Route>
        <Route path="/sign-in" component={Login} />
    </Router>
), document.getElementById('root'));
