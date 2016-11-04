/**
 * Created by opichou on 10/12/16.
 */
import React, { Component } from 'react'
import axios from 'axios'
import cx from 'classnames'

export class Geoloc extends Component {
    state = {
        active: true,
        Lat:0,
        Lng:0
    }

    componentDidMount() {
        this.getLoc()
    }

    getLoc = async () => {
        if (navigator.geolocation) {
            await navigator.geolocation.getCurrentPosition(position => {
                this.setState({Lng: position.coords.latitude, Lat: position.coords.longitude}, () => {
                    this.savePos({Lng: position.coords.latitude, Lat: position.coords.longitude})
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
    savePos = (pos) => {
        const my_jwt = localStorage.jwt
        axios('/user/locate',{
            method: 'post',
            baseURL: 'http://localhost:8080',
            timeout: 1000,
            headers: {'Authorization' : 'Bearer ' + my_jwt, 'X-Custom-Header': 'application/x-www-form-urlencoded'},
            data: {Lat: pos.Lat, Lng: pos.Lng}
        }).then(res => {
            console.log(res.data.message)
            setTimeout(this.getLoc, 120000)
        })
    }

    handleClick = e => {
        e.preventDefault()
        this.setState({active: !this.state.active})
    }

    render() {
        const icon = this.state.active?'location_on':'location_off'
        return(
            <div className={cx({
                "geolocation": true,
                "hidden": this.props.hidden})}
                 onClick={this.handleClick
            }><i className="material-icons" >{icon}</i></div>
        )
    }
}
