import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin'
import App from './App'
import { Login } from './login'
import './index.css'
import {User, Users} from './user'
import {FullForm} from './subscribe'

injectTapEventPlugin();

ReactDOM.render((
    <Router history={ browserHistory }>
        <Route path="/" component={App} >
            <IndexRoute component={Users} />
            <Route path="profile" component={FullForm} />
            <Route path="users" component={Users} >
                <Route path="/user/:userId" component={User} />
            </Route>
        </Route>
        <Route path="/sign-in" component={Login} />
    </Router>
), document.getElementById('root'));
