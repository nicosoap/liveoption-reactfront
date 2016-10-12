/**
 * Created by opichou on 10/12/16.
 */
import React, { Component } from 'react'
import ReactGA from 'react-ga'
import './App.css'

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
                    username< input className="carved" type="text" name="username"/>
                    password< input className="carved" type="password" name="password"/>
                    <input type="submit" value={subValue} />
                </form>
            </div>
        )
    }
}

export class Login extends Component {
    render() {
        return (
            <div className="Login">< Lol />
            </div>

        );
    }
}