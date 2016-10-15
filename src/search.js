/**
 * Created by opichou on 10/14/16.
 */
import React, { Component } from 'react'
import cx from 'classnames'

class SearchBar extends Component {
    render() {
        return(
            <div className="search-form">
                <div className="material-icons notif search-label">search</div>
                <input className="search-input" type="search" name="search" id="search" />
            </div>
        )
    }

}

export default class Search extends Component {

    render() {
        return(
            <div className="floating">
                <SearchBar />
            </div>
        )
    }
}