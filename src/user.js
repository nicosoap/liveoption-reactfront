/**
 * Created by opichou on 10/15/16.
 */
import React, { Component } from 'react'


export class User extends Component {
    state = {
        userPicture: {},
        userName: "",
        userDescription: ""
    }
    render() {
        const {userPicture, userName, userDescription} = this.state
        return (
            <div className="user card-2">
                <div className="profile-picture"><UserPictures pictures={userPicture}/>
                    <div className="user-name">{userName}</div>
                    <div className="user-description">{userDescription}</div>
                </div>
            </div>
        )
    }
}

export class UserForm extends Component {

}