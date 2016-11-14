/**
 * Created by opichou on 10/12/16.
 */
import React, { Component } from 'react'
import axios from 'axios'
import cx from 'classnames'
import PlacesAutocomplete, {geocodeByAddress} from 'react-places-autocomplete'

export class Geoloc extends Component {
    state = {
        active: true,
        address:'',
        Lat:0,
        Lng:0
    }

    componentDidMount() {
        this.getLoc()
    }

    getLoc = async () => {
        if (this.state.active) {
            if (navigator.geolocation) {
                await navigator.geolocation.getCurrentPosition(position => {
                    this.setState({Lat: position.coords.latitude, Lng: position.coords.longitude}, () => {
                        this.savePos({Lat: position.coords.latitude, Lng: position.coords.longitude})
                    })
                })
            } else {
                await axios('', {
                    baseURL: 'http://ipinfo.io',
                    timeout: 1000,
                    headers: {'X-Custom-Header': 'application/x-www-form-urlencoded'}
                }).then(res => {
                    const pos = res.data.loc.split(',')
                    this.setState({Lng: pos[1], Lat: pos[0]}, () => {
                        this.savePos({Lng: pos[1], Lat: pos[0]})
                    })
                })
            }
        }
    }

    savePos = (pos) => {
        const my_jwt = localStorage.jwt
        axios('/user/locate',{
            method: 'post',
            baseURL: 'http://' + window.location.hostname + ':8080'+ '/api',
            timeout: 1000,
            headers: {'Authorization' : 'Bearer ' + my_jwt, 'X-Custom-Header': 'application/x-www-form-urlencoded'},
            data: {Lat: pos.Lat, Lng: pos.Lng}
        })
    }

    handleClick = e => {
        e.preventDefault()
        this.setState({active: !this.state.active}, this.getLoc)
    }

    handleAddressChange = address => {
        this.setState({address})
        geocodeByAddress(address, (err, {lat, lng}) => {
                this.savePos({Lng: lng, Lat: lat})
        })
    }

    render() {
        const icon = this.state.active?'location_on':'location_off'
        return(
            <div>
                <div className={cx({
                    "geolocation": true,
                    "hidden": this.props.hidden
                })}
                     onClick={this.handleClick
                     }><i className="material-icons">{icon}</i>
                </div>
                <div className={cx({
                    'find_location': true,
                    'hidden': this.state.active
                })}>
                    <PlacesAutocomplete
                        type="text"
                        name="address"
                        id="around-me"
                        hideLabel
                        value={this.state.address}
                        onChange={this.handleAddressChange}
                    />
                </div>
            </div>
        )
    }
}
