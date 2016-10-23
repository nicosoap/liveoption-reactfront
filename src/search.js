/**
 * Created by opichou on 10/14/16.
 */
import React, {Component} from 'react'
import InputRange from 'react-input-range'
import cx from 'classnames'
import 'react-input-range/dist/react-input-range.css'
import PlacesAutocomplete, {geocodeByAddress} from 'react-places-autocomplete'
import TagInput from './taginput'

export default class Search extends Component {
    state = {
        searchString: ''
    }

    componentWillReceiveProps = (newProps) => this.setState({searchString: newProps.searchString})

    simpleSearch = e => {
        const body = e.target.value
        if (e.keyCode === 13 && body) {
            this.props.simpleSearch(body)
        }
    }

    handleChange = e => this.setState({searchString: e.target.value})

    searchSubmit = e => {
        e.preventDefault()
        const body = this.state.searchString
        if (body) {
            this.props.simpleSearch(body)
        }
    }

    render() {
        return (
            <div className="floating search-form">
                <form name="searchForm" onSubmit={this.searchSubmit}>
                    <input
                        className="search-input"
                            type="search"
                            name="search"
                            id="search"
                            placeholder="I'm looking for someone like..."
                            value={this.state.searchString}
                            onChange={this.handleChange}
                            onKeyUp={this.simpleSearch}
                    />
                    <button className="search-input" type="submit" name="submit"><i
                        className="material-icons icon-small">search</i></button>
                </form>
            </div>
        )
    }
}

export class ExtendedSearch extends Component {
    state = {
        menuOpen: false,
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
            lat: 0,
            lng: 0,
        },
        tags: "",
        netflix: false,
        rightNow: false
    }
    extendedSearch = e => {
        e.preventDefault()
        this.props.extendedSearch()
    }

    handleNetflixChange = () => {
        this.setState({netflix: !this.state.netflix},
            () => this.props.updateSearch(this.state))
    }
    handleRightNowChange = () => {
        this.setState({rightNow: !this.state.rightNow},
            () => this.props.updateSearch(this.state))
    }
    handleTagsChange = e => this.setState({tags: e.target.value},
            () => this.props.updateSearch(this.state))
    handleValuesChange = (component, values) => this.setState({
            ageRange: values,
        },
            () => this.props.updateSearch(this.state))
    handlePopularChange = (component, values) =>
        this.setState({
            popularRange: values,
        },
        this.props.updateSearch(this.state))
    handleAddressChange = address => {
        this.setState({address})
        geocodeByAddress(address, (err, {lat, lng}) => {
            if (err) {
                console.error(err)
            }
            this.setState({geocode: {lat, lng}}, () =>
                this.props.updateSearch(this.state))
        })
    }
    updateTags = tags => this.setState({tags}, () => this.props.updateSearch(this.state))

    openMenu = () => this.setState({menuOpen: !this.state.menuOpen})

    render() {
        return (
            <div className="">
                <div className={cx({
                    "extended-search-button": true,
                    'openedExtendedSearch': this.state.menuOpen
                })} onClick={this.openMenu}
                >
                    <i className="material-icons">{this.state.menuOpen ? 'expand_less' : 'expand_more' }</i>
                    <span>Advanced search</span>
                </div>
                <div className={cx({
                    "card-2": this.state.menuOpen,
                    'extended-search-closed': !this.state.menuOpen,
                    'extended-search-open': this.state.menuOpen,
                    'extended-search': true
                })} id="extended-search">
                    <form
                        name="extended-search"
                        onSubmit={this.extendedSearch}
                    >
                        <label htmlFor="around-me">
                            Around location:
                        </label>
                        <PlacesAutocomplete
                            type="text"
                            name="address"
                            id="around-me"
                            hideLabel
                            value={this.state.address}
                            onChange={this.handleAddressChange}
                        />
                        <label>Older than {this.state.ageRange.min} and younger than {this.state.ageRange.max}</label>
                        <InputRange
                            maxValue={77}
                            minValue={18}
                            value={this.state.ageRange}
                            onChange={this.handleValuesChange.bind(this)}
                        />
                        <label>With more than {this.state.popularRange.min} popularity rate, yet less
                            than {this.state.popularRange.max}</label>
                        <InputRange
                            maxValue={100}
                            minValue={0}
                            value={this.state.popularRange}
                            onChange={this.handlePopularChange.bind(this)}
                        />

                        <TagInput id="tags" save={this.updateTags} />


                            <div className="extended-search-checkboxes">
                                <span>
                                    <input
                                    type="checkbox"
                                    name="netflix"
                                    id="netflix"
                                    checked={this.state.netflix}
                                    onChange={this.handleNetflixChange}
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
                                    checked={this.state.rightNow}
                                    onChange={this.handleRightNowChange}
                                />
                                <label
                                    htmlFor="right-now"
                                >
                                    Looking for right now
                                </label>
                            </span></div>
                        <div className="extended-search-submit">
                            <input type="submit" value="Search"/>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}