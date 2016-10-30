/**
 * Created by opichou on 10/30/16.
 */

import React, {Component} from 'react'

export class Thankyou extends Component {
    state={email: ''}

    componentDidMount() {
        this.setState({email: sessionStorage.email})
    }
    render() {
        return (
            <div className="ty">
            <div className='thankyou'>
                <div className="section-1">
                    <div className="before-form">{''} </div>
                    <h3>Thank you!</h3>
                    <p>You have successfully registered to liveoption.io <br/> Please check {this.state.email} to activate your account.</p>
                    </div>
                </div>
                </div>
        )
    }
}