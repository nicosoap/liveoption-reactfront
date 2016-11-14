/**
 * Created by opichou on 10/19/16.
 */
import React, { Component } from 'react'
import axios from 'axios'

export default class TagInput extends Component {
    state = {
        tags:[],
        suggestion: [],
        id: '',
        inputValue: ''
    }

    componentWillReceiveProps = newProps => {
        if (newProps.params && newProps.params.value) {
            this.setState({tags: newProps.params.value})
        }
    }

    onChange= e => {
        this.setState({inputValue: e.target.value})
    }

    addSuggestion = e => {
        const tag = /^#{0,1}([A-Za-z0-9]*) {0,1}$/.exec(e.target.attributes.value.value)[1] || ''
        if (this.state.tags.indexOf(tag) === -1 && tag !== ' ') {
            this.setState({
                tags: [...this.state.tags, tag],
                suggestion: [],
                inputValue: ''
            }, () => this.updateTags())
        } else {
            this.setState({suggestion: [], inputValue: ''})
        }
    }

    addTag = e => {
        e.preventDefault()
        if ((e.keyCode === 32 || e.keyCode === 13) && /^#{0,1}([A-Za-z0-9]*) {0,1}$/.test(e.target.value)) {
            const tag = /^#{0,1}([A-Za-z0-9]*) {0,1}$/.exec(e.target.value)[1] || ''
            if (this.state.tags.indexOf(tag) === -1 && tag !== ' ' && tag !== '') {
                this.setState({tags: [...this.state.tags, tag], suggestion:[], inputValue: ''},
                    this.updateTags())
            } else { this.setState({suggestion:[], inputValue:''})}
        } else if (e.target.value.length > 1) {
            axios.get('/tags?tag=' + e.target.value).then(res => {
                let suggestion = res.data
                if (suggestion.length > 0) {
                    this.setState({suggestion})
                }
            })
        } else {
            this.setState({suggestion:[]})
        }
    }

    removeTag = e => {
        const tmp = this.state.tags
        const targetted = e.target.attributes.value || e.target.parentNode.attributes.value
        tmp.splice(this.state.tags.indexOf(targetted.value), 1)
        this.setState({tags: tmp}, this.updateTags())
    }

    updateTags = () => {
        let tags = this.state.tags.length
        setTimeout(() => {
            if (this.state.tags.length === tags) {
                this.props.update('tags', this.state.tags)
            } else {
                let tags = this.state.tags.length
                setTimeout(() => {
                    if (this.state.tags.length === tags) {
                        this.props.update('tags', this.state.tags)
                    }
                }, 2000)
            }
        }, 2000)
    }

    render() {
        return (
            <div className="tagTool">
                <div className="input-tags" id="input-tags">
                    {this.state.tags.map((tag, i) => {
                        return (
                            <span className="input-tag" key={i} value={tag} onClick={this.removeTag}>
                        {'#' + tag + ' '}
                                <div className="material-icons icon-small lower card-1-level">remove_circle</div>

                        </span>
                        )
                    })}
                    <input className="input-tags-search" type="search" onKeyUp={this.addTag} onChange={this.onChange} placeholder="Tags" value={this.state.inputValue} />

                </div>
                <ul className="suggestions">{this.state.suggestion.map((tag, i) => {
                    return (
                        <li onClick={this.addSuggestion} key={i} value={tag.label}>{tag.label}</li>
                    )
                })}</ul>
            </div>
        )
    }
}
