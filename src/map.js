import React, {Component} from 'react'

export class Map extends Component {
    render () {
        if (!this.props.loaded) {
            return <div>Loading...</div>
        }
        return (
            <div>Map will go here</div>
        )
    }
}
