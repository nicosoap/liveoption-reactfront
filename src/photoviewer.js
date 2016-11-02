/**
 * Created by opichou on 10/15/16.
 */
import React, {Component} from 'react'
import { Link } from 'react-router'
import axios from 'axios'
import cx from 'classnames'

export class PhotoViewer extends Component {
    render() {
        return(
            <div>
        { this.props.photo.map((e, i) => {
            const url = this.props.appConfig.baseURL + '/images/' + e
            return (<PhotoViewerItem url={url} login={this.props.login} key={i} hover={this.handleHover} click={this.handleClick} /> )
        })}
        </div>
        )
    }
}

class PhotoViewerItem extends Component {
    state = {selected: false}
    handleClick = () => {
        this.setState({selected: !this.state.selected})
    }
    render() {
        return (
            <div className={cx({
                "imageHolder": true,
                "selected": this.state.selected})}
                 style={{backgroundImage: `url('${this.props.url}')`}}
                    onClick={this.handleClick}>
            </div>
        )
    }
}