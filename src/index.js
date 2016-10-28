import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin'
import App from './App'
import { Login } from './login'
import './index.css'
import {User, Users} from './user'
import {FullForm, Subscribe} from './subscribe'

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
        <Route path="/sign-up" component={Subscribe} />
    </Router>
), document.getElementById('root'));
