import React, { Component } from 'react'
import cx from 'classnames'

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
        this.setState({newProps})
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
        this.setState({photo: e.dataTransfer.files[0], imageSource: URL.createObjectURL(e.dataTransfer.files[0])})
    }


    render() {
        const {id, name, type, placeholder, value, autocomplete, required, photo, imageSource, accept, isDragover, uploadSupport} = this.state

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

                <img src={imageSource}/>
                </div>
        )
    }
}