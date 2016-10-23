/**
 * Created by opichou on 10/19/16.
 */
import React, { Component } from 'react'

export default class TagInput extends Component {
    state = {
        tags:[]
    }

    addTag = e => {
        e.preventDefault()
        if ((e.keyCode === 32 || e.keyCode === 13) && /^#{0,1}([A-Za-z0-9]*) {0,1}$/.test(e.target.value)) {
            const tag = /^#{0,1}([A-Za-z0-9]*) {0,1}$/.exec(e.target.value)[1] || ''
            if (this.state.tags.indexOf(tag) === -1 && tag !== ' ') {
                this.setState({tags: [...this.state.tags, tag]}, () => this.props.save(this.state.tags))
            }
            e.target.value = ''
        }
    }

    removeTag = e => {
        const tmp = this.state.tags
        const targetted = e.target.attributes.value || e.target.parentNode.attributes.value
        tmp.splice(this.state.tags.indexOf(targetted.value), 1)
        this.setState({tags: tmp}, this.props.save(this.state.tags))
    }

    render() {
        return(
            <div className="input-tags" id="input-tags">
                {this.state.tags.map((tag, i) => {
                    return(
                        <span className="input-tag" key={i} value={tag} onClick={this.removeTag}>
                        {'#' + tag + ' '}<div className="material-icons icon-small lower card-1-level">remove_circle</div>
                    </span>
                    )
                })}
                <input className="input-tags-search" type="search" onKeyUp={this.addTag} placeholder="Tags"/>
            </div>
        )
    }
}
