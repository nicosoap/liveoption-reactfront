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
        e.preventDefault()
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

export class ExtendedSearch extends Component {
    state = {}
    extendedSearch = e => {
        e.preventDefault()
        const body = e.target.value
        //this.props.extendedSearch(body)
    }
    render() {
        return (
            <div className="card-2 extended-search" id="extended-search">
                <form name="extended-search" onSubmit={this.extendedSearch} >
                    <input type="search" name="search" placeholder="Search..." />
                    <input type="checkbox" name="around-me" id="around-me" value="true" /><label htmlFor="around-me">Around me</label>
                    <input type="checkbox" name="chat" id="chat" /><label htmlFor="chat">Disscussion</label>
                    <input type="checkbox" name="coffee" id="coffee" /><label htmlFor="coffee">Coffee or drinks</label>
                    <input type="checkbox" name="lunch" id="lunch" /><label htmlFor="lunch">Lunch or diner</label>
                    <input type="checkbox" name="netflix" id="netflix" /><label htmlFor="netflix">Netflix & chill</label>
                    <input type="checkbox" name="right-now" id="right-now" /><label htmlFor="right-nom">Right now</label>
                </form>
            </div>
        )
    }
}