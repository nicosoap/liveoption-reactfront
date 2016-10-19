/**
 * Created by opichou on 10/19/16.
 */
import React, { Component } from 'react'
import { WithContext as ReactTags } from 'react-tag-input'

export default class TagInput extends Component {
    state = {
            tags: [ {id: 1, text: "Apples"} ],
            suggestions: ["Banana", "Mango", "Pear", "Apricot"]
        }
    handleDelete(i) {
        let tags = this.state.tags
        tags.splice(i, 1)
        this.setState({tags})
    }
    handleAddition(tag) {
        let tags = this.state.tags
        tags.push({
            id: tags.length + 1,
            text: tag
        })
        this.setState({tags})
    }
    handleDrag(tag, currPos, newPos) {
        let tags = this.state.tags

        // mutate array
        tags.splice(currPos, 1)
        tags.splice(newPos, 0, tag)

        // re-render
        this.setState({ tags: tags }, () => this.props.changeTags(tags))
    }
    render() {
        let { tags, suggestions } = this.state
        return (
            <div>
                <ReactTags tags={tags}
                           suggestions={suggestions}
                           placeholder="Matching those tags"
                           handleDelete={this.handleDelete}
                           handleAddition={this.handleAddition}
                           handleDrag={this.handleDrag} />
            </div>
        )
    }
}