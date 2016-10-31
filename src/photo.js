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
        photo: []
    }

    componentDidMount() {
        if (this.state.photo.length < 1 && this.props.defaultValues) {
            this.setState({photo: this.props.defaultValues})
        }
    }
    componentWillReceiveProps = newProps => {
        const {id, name, type, placeholder, value, autocomplete, required, accept, defaultValues} = newProps.params
        this.setState({id, name, type, placeholder, value, autocomplete, required, accept, defaultValues})
    }

    handleDragOver = e => {
        e.preventDefault();
        e.stopPropagation();
        if (!this.state.isDragover) {
            this.setState({isDragover: true})
        }
    }

    handleDragLeave = e => {
        e.preventDefault();
        e.stopPropagation();
        if (this.state.isDragover) {
            this.setState({isDragover: false})
        }
    }

    handleDrop = e => {
        e.preventDefault();
        e.stopPropagation();
        this.handleDragLeave(e)
        if (/^image\/.*$/i.test(e.dataTransfer.files[0].type)) {
            let photo = this.state.photo
            photo.splice(4, 3)
            this.setState({
                photo: [...photo, e.dataTransfer.files[0]]
            },
                () => this.updateSelection
            )
        } else {
            console.log('invalid image format')
        }
    }

    handleChange = e => {
        const file = e.target.files[0]
        // e.preventDefault();
        // e.stopPropagation();
        if (/^image\/.*$/i.test(file.type)) {
            this.setState({
                photo: [...this.state.photo, file]
            })
        } else {
            console.log('invalid image format')
        }
    }

    setDefault = e => {
        let id = e.target.attributes.id.value,
            photo = this.state.photo
        console.log(this.state.photo)
        const image = photo.splice(id, 1)
        this.setState({photo: [image[0], ...photo]}, () => this.updateSelection)
    }

    setDelete = e => {
        console.log(e.target.attributes)
        let id = e.target.attributes.classID.value,
            photo = this.state.photo
        photo.splice(id, 1)
        this.setState({photo}, () => this.updateSelection)
    }

    updateSelection = () => {
        ///// CETTE FONCTION DOIT UPLOAD SUR LE SERVEUR,
        // RECUPERER LE FILENAME DU FICHIER ET LE STOCKER DANS LE STATE. C'EST LE TABLEAU DE FILENAMES
        // QU'ON VEUT STOCKER, PAS LES FILES EUX-MEMES


        let photo = this.state.photo
        photo.splice(this.props.maxLength, 10)
        this.setState({photo}, this.props.update((this.props.id, this.props.name, this.state.tags)))
    }


    render() {
        const {photo, accept, isDragover, uploadSupport} = this.state
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
                    <input className="box__file" type="file" name="files[]" id="file" accept={accept}  onChange={this.handleChange}/>
                    <label htmlFor="file"><i className="material-icons icon-huge">file_upload</i><br /><strong>Choose a file</strong>
                        <span className="box__dragndrop"> or drag it here</span>.</label>
                    <button className="box__button" >Upload</button>
                </div>
                <div className="box__uploading">Uploading&hellip;</div>
                <div className="box__success">Done!</div>
                <div className="box__error">Error!</div>
            </form>

                <div className="result-images">
                    { photo.map((e, i) => {
                        return(
                            <ProfilePicture key={i} file={e} id={i} setDefault={this.setDefault} setDelete={this.setDelete} />
                        )})}
                </div>
                </div>
        )
    }
}

class ProfilePicture extends Component {
    state = {}
    render() {
        return(
            <div className="profile-picture"
                 style={{backgroundImage: `url(${URL.createObjectURL(this.props.file)})`}}>
                <div className="promote" id={this.props.id} onClick={this.props.setDefault}></div>
                <div className="delete" classID={this.props.id} onClick={this.props.setDelete}></div>
            </div>
        )
    }
}































