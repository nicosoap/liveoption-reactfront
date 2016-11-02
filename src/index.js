import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin'
import App from './App'
import { Login } from './login'
import './index.css'
import {User, Users} from './user'
import {Subscribe} from './subscribe'
import {Thankyou, Validate} from './thankyou'
import {FullForm} from './profile'
import {Logout} from './logout'

injectTapEventPlugin();

ReactDOM.render((
    <Router history={ browserHistory }>
        <Route path="/" component={App} >
            <IndexRoute component={Users} />
            <Route path="profile" component={FullForm} />
            <Route path="users" component={Users} />
            <Route path="/user/:userId" component={User} />
            <Route path="logout" component={Logout} />
        </Route>
        <Route path="/sign-in" component={Login} />
        <Route path="/thank-you" component={Thankyou} />
        <Route path="/validate" component={Validate} />
        <Route path="/sign-up" component={Subscribe} />
    </Router>
), document.getElementById('root'));
