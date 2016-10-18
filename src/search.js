/**
 * Created by opichou on 10/14/16.
 */
import React, {Component} from 'react'
import InputRange from 'react-input-range'
import 'react-input-range/dist/react-input-range.css'
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete'

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
        return (
            <div className="floating search-form">
                <form name="searchForm" onSubmit={this.searchSubmit}>
                    <input className="search-input" type="search" name="search" id="search"
                           placeholder="I'm looking for someone like..."
                           onKeyUp={this.simpleSearch}/>
                    <button className="search-input" type="submit" name="submit"><i
                        className="material-icons icon-small">search</i></button>
                </form>
            </div>
        )
    }
}

export class ExtendedSearch extends Component {
    state = {
        ageRange: {
            min: 18,
            max: 77,
        },
        popularRange: {
            min: 0,
            max: 100,
        },
        address: "",
        geocode: {
            lat:0,
            lng:0,
        },
        tags: "",
        netflix: "false",
        rightNow: "false"
    }
    extendedSearch = e => {
        e.preventDefault()
        const body = e.target.value
        //this.props.extendedSearch(body)
    }
    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }
    handleValuesChange = (component, values) => {
        this.setState({
            ageRange: values,
        });
    }
    handlePopularChange = (component, values) => {
        this.setState({
            popularRange: values,
        });
    }
    handleAddressChange = address => {
        this.setState({address})
        geocodeByAddress(address,  (err, { lat, lng }) => {
            if (err) {
                console.log('Oh no!', err)
            }
            this.setState({geocode: {lat, lng}})
            console.log(this.state.geocode, this.state.address)
        })
    }

    render() {
        return (
            <div className="card-2 extended-search" id="extended-search">
                <form
                    name="extended-search"
                    onSubmit={this.extendedSearch}
                    onChange={this.handleChange}
                >
                    <label>Older than {this.state.ageRange.min} and younger than {this.state.ageRange.max}</label>
                    <InputRange
                        maxValue={77}
                        minValue={18}
                        value={this.state.ageRange}
                        onChange={this.handleValuesChange.bind(this)}
                    />
                    <label>With more than {this.state.popularRange.min} popularity rate, yet less than {this.state.popularRange.max}</label>
                    <InputRange
                        maxValue={100}
                        minValue={0}
                        value={this.state.popularRange}
                        onChange={this.handlePopularChange.bind(this)}
                    />
                    <label
                        htmlFor="around-me"
                    >
                        Around:
                    </label>
                    <PlacesAutocomplete
                        type="text"
                        name="address"
                        id="around-me"
                        value={this.state.address}
                        onChange={this.handleAddressChange}
                    />
                    <label
                        htmlFor="tags"
                    >
                        Matching those tags:
                    </label>
                    <input
                        type="text"
                        name="tags" id="tags" value={this.state.tags} onChange={this.handleChange}/>

                    <span>
                        <input
                            type="checkbox"
                            name="netflix"
                            id="netflix"
                            value={this.state.netflix}
                            onChange={this.handleChange}
                        />
                        <label
                            htmlFor="netflix"
                        >
                            Who owns a Netflix account
                        </label>
                    </span>
                < br/>
                    <span>
                        <input
                            type="checkbox"
                            name="rightNow"
                            id="right-now"
                            value={this.state.rightNow}
                            onChange={this.handleChange}
                        />
                        <label
                            htmlFor="right-nom"
                        >
                            Looking for right now
                        </label>
                    </span>
                </form>
            </div>
        )
    }
}