/**
 * Created by opichou on 10/19/16.
 */
import React, { Component } from 'react'

export default class TagInput extends Component {
    state = {
        tags:['lol', 'lil', 'lal']
    }
    render() {
        return(
            <div className="input-tags" id="input-tags">
                {this.state.tags.map((tag, i) => {
                    return(
                        <span className="input-tag" key={i}>
                        {'#' + tag + ' '}<i className="material-icons icon-small lower">remove_circle</i>
                    </span>
                    )
                })}
                <input className="input-tags-search" type="search" />
            </div>
        )
    }
}
