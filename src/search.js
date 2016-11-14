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


    simpleSearch = e => {
        if (e.keyCode === 13 && e.target.value) {
            this.props.simpleSearch(e.target.value + ' ' + this.props.searchString)
        }
    }

    handleChange = e => this.setState({searchString: e.target.value})

    searchSubmit = e => {
        e.preventDefault()
        const body = this.state.searchString + this.props.searchString
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
        distanceRange: {
            min: 0,
            max: 250,
        },
        address: "",
        geocode: {
            Lat: 0,
            Lng: 0,
        },
        tags: [],
        netflix: false,
        rightNow: false,
        ageSort: false,
        popularitySort: false,
        locationSort: false,
        tagsSort: false
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
    handleDistanceChange = (component, values) =>
        this.setState({
                distanceRange: values,
            },
            this.props.updateSearch(this.state))
    handleAddressChange = address => {
        geocodeByAddress(address, (err, {lat, lng}) => {
            this.setState({address, geocode: {Lat:lat, Lng:lng}}, () =>
                this.props.updateSearch(this.state))
        })
    }
    saveTags = (_, tags) => {
        this.updateTags(tags)
    }
    updateTags = tags => this.setState({tags}, () => this.props.updateSearch(this.state))

    openMenu = () => this.setState({menuOpen: !this.state.menuOpen})

    handleSortAge = () => {
        if (this.state.ageSort) {
            this.setState({ageSort: false, locationSort: false, popularitySort: false, tagsSort: false},
                () => this.props.updateSearch(this.state))
        } else {
            this.setState({ageSort: true, locationSort: false, popularitySort: false, tagsSort: false},
                () => this.props.updateSearch(this.state))
        }
    }

    handleSortPopularity = () => {
        if (this.state.popularitySort) {
            this.setState({ageSort: false, locationSort: false, popularitySort: false, tagsSort: false},
                () => this.props.updateSearch(this.state))
        } else {
            this.setState({ageSort: false, locationSort: false, popularitySort: true, tagsSort: false},
                () => this.props.updateSearch(this.state))
        }
    }

    handleSortDistance = () => {
        if (this.state.locationSort) {
            this.setState({ageSort: false, locationSort: false, popularitySort: false, tagsSort: false},
                () => this.props.updateSearch(this.state))
        } else {
            this.setState({ageSort: false, locationSort: true, popularitySort: false, tagsSort: false},
                () => this.props.updateSearch(this.state))
        }
    }

    handleSortTags = () => {
        if (this.state.tagsSort) {
            this.setState({ageSort: false, locationSort: false, popularitySort: false, tagsSort: false},
                () => this.props.updateSearch(this.state))
        } else {
            this.setState({ageSort: false, locationSort: false, popularitySort: false, tagsSort: true},
                () => this.props.updateSearch(this.state))
        }
    }

    render() {
        return (
            <div className="">
                <div className={cx({
                    "extended-search-button": true,
                    'openedExtendedSearch': this.state.menuOpen
                })} onClick={this.openMenu}
                >
                    <i className="material-icons">{this.state.menuOpen ? 'expand_less' : 'expand_more' }</i>
                    <span>Filters</span>
                </div>
                <div className={cx({
                    "card-2": this.state.menuOpen,
                    'extended-search-closed': !this.state.menuOpen,
                    'extended-search-open': this.state.menuOpen,
                    'extended-search': true
                })} id="extended-search">
                    <div className="sort">
                        sort by :
                        <div className={cx({
                            'ageSort': true,
                            'sortSelected':this.state.ageSort
                        })}
                        onClick={this.handleSortAge}>Age</div>
                        <div className={cx({
                            'locationSort': true,
                            'sortSelected':this.state.locationSort
                        })}
                             onClick={this.handleSortDistance}>Distance</div>
                        <div className={cx({
                            'popularitySort': true,
                            'sortSelected':this.state.popularitySort
                        })}
                             onClick={this.handleSortPopularity}>Popularity</div>
                        <div className={cx({
                            'tagsSort': true,
                            'sortSelected':this.state.tagsSort
                        })}
                             onClick={this.handleSortTags}>Tags</div>
                    </div>


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
                        <label>from {this.state.distanceRange.min}km to {this.state.distanceRange.max}km </label>
                        <InputRange
                            maxValue={250}
                            minValue={0}
                            value={this.state.distanceRange}
                            onChange={this.handleDistanceChange.bind(this)}
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

                        <TagInput id="tags" save={this.updateTags} update={this.saveTags} />


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
                                   Search these tags AND my tags
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
                                    Exclusively with these tags
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