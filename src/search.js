/**
 * Created by opichou on 10/14/16.
 */
import React, { Component } from 'react'

export default class Search extends Component {
    simpleSearch = e => {
        e.preventDefault()
        const body = e.target.value
        if (e.keyCode === 13 && body) {
            // this.props.simpleSearch(body)
        }
    }

    searchSubmit = e => {
        const body = e.target.value
        //this.props.simpleSearch(body)
    }

    render() {
        return(
            <div className="floating search-form">
                <form name="searchForm" onSubmit={this.searchSubmit}>
                    <input className="search-input" type="search" name="search" id="search" placeholder="Search..."
                           onKeyUp={this.simpleSearch}/>
                    <button className="search-input" type="submit" name="submit" ><i className="material-icons icon-small">search</i></button>
                </form>
            </div>
        )
    }
}