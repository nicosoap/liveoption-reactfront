import React, { Component } from 'react'
import cx from 'classnames'

// If it was so fine, it was so good, oh you're unbelievable
// All this time I've been living without you boy, not your lying
// It felt so good, the world don't know, now they'll never find out
// All these years she must've been beside you boy

export class PhotoInput extends Component {
    state = {
        id:'',
        name:'',
        type:'date',
        placeholder:'',
        value:'',
        autocomplete:'',
        required:'',
        accept: '',
        isDragover: false,
        uploadSupport: true,
        photo: {},
        imageSource:''
    }

    componentWillReceiveProps = newProps => {
        const {id, name, type, placeholder, value, autocomplete, required, accept} = newProps.params
        this.setState({id, name, type, placeholder, value, autocomplete, required, accept})
    }

    handleDragOver = e => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({isDragover: true})

    }
    handleDragLeave = e => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({isDragover: false})
    }
    handleDrop = e => {
        e.preventDefault();
        e.stopPropagation();
        this.handleDragLeave(e)
        if (/^image\/.*$/i.test(e.dataTransfer.files[0].type)) {
            this.setState({photo: e.dataTransfer.files[0], imageSource: URL.createObjectURL(e.dataTransfer.files[0])})
        } else {
            console.log('invalid image format')
        }
    }


    render() {
        const {imageSource, accept, isDragover, uploadSupport} = this.state
        return(
            <div className="photoInput">
            <form className={cx({
                'box': true,
                'has-advanced-upload': uploadSupport,
                'is-dragover': isDragover
                })}
                  onDragOver={this.handleDragOver}
                  onDragEnter={this.handleDragOver}
                  onDragLeave={this.handleDragLeave}
                  onDragEnd={this.handleDragLeave}
                  onDrop={this.handleDrop}
            >
                <div className="box__input">
                    <input className="box__file" type="file" name="files[]" id="file" accept={accept}  />
                    <label htmlFor="file"><i className="material-icons icon-huge">file_upload</i><br /><strong>Choose a file</strong>
                        <span className="box__dragndrop"> or drag it here</span>.</label>
                    <button className="box__button" type="submit">Upload</button>
                </div>
                <div className="box__uploading">Uploading&hellip;</div>
                <div className="box__success">Done!</div>
                <div className="box__error">Error!</div>
            </form>

                <img src={imageSource} role="presentation"/>
                </div>
        )
    }
}