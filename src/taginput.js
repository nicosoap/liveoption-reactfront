/**
 * Created by opichou on 10/19/16.
 */
import React, { Component } from 'react'

export default class TagInput extends Component {
    state = {
        tags:['lol', 'lil', 'lal']
    }

    addTag = e => {
        e.preventDefault()
        if ((e.keyCode === 32 || e.keyCode === 13) && /^#{0,1}([A-Za-z0-9]*) {0,1}$/.test(e.target.value)) {
            const tag = /^#{0,1}([A-Za-z0-9]*) {0,1}$/.exec(e.target.value)[1] || ''
            console.log(tag)
            if (this.state.tags.indexOf(tag) === -1) {
                this.setState({tags: [...this.state.tags, tag]})
            }
            e.target.value = ''
        }
    }

    removeTag = e => {
        const tmp = this.state.tags
        tmp.splice(this.state.tags.indexOf(e.target.attributes.value.value), 1)
        this.setState({tags: tmp})
    }

    render() {
        return(
            <div className="input-tags" id="input-tags">
                {this.state.tags.map((tag, i) => {
                    return(
                        <span className="input-tag" key={i} value={tag} onClick={this.removeTag}>
                        {'#' + tag + ' '}<i className="material-icons icon-small lower">remove_circle</i>
                    </span>
                    )
                })}
                <input className="input-tags-search" type="search" onKeyUp={this.addTag} />
            </div>
        )
    }
}
