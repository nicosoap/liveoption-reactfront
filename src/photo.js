import React, { Component } from 'react'
import cx from 'classnames'
import axios from 'axios'

// If it was so fine, it was so good, oh you're unbelievable
// All this time I've been living without you boy, not your lying
// It felt so good, the world don't know, now they'll never find out
// All these years she must've been beside you boy

let my_jwt = localStorage.jwt
if (!my_jwt) {
    console.log("Navigator not supported")
}

axios.defaults.baseURL = 'http://localhost:3001';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + my_jwt;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

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
        // if (this.state.photo.length < 1 && this.props.defaultValues) {
        //     let photo = this.props.defaultValues.map(e => {
        //         return ({file: null, picture: e})
        //     })
        //     this.setState({photo})
        // }
    }

    componentWillReceiveProps = newProps => {
        const {id, name, type, placeholder, defaultValue, autocomplete, required, accept} = newProps.params
        let photo = defaultValue.map(e => {
            return (
            {picture: e}
            )
        })
        this.setState({id, name, type, placeholder, value: defaultValue, autocomplete, required, accept, photo})
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

    handleDrop = async e => {
        e.preventDefault();
        e.stopPropagation();
        e.persist()
        let file = e.dataTransfer.files[0]
        this.handleDragLeave(e)
        if (/^image\/.*$/i.test(file.type)) {
            let photo = this.state.photo
            photo.splice(4, 3)
            let picture = await this.uploadPicture(file)
            console.log("DROPPICTURE: ", picture)
            if (picture) {this.setState({
                    photo: [...photo, {file: e.dataTransfer.files[0], picture}]
                },
                this.updateSelection
            )}

        } else {
            console.log('invalid image format')
        }
    }

    handleChange = async e => {
        const file = e.target.files[0]
        e.preventDefault();
        e.stopPropagation();
        if (/^image\/.*$/i.test(file.type)) {
            let picture = await this.uploadPicture(file)
            try {
                if (picture) {
                    this.setState({
                            photo: [...this.state.photo, {file, picture}]
                        },
                        this.updateSelection
                    )
                }
            } catch (err) {
                console.error(err)
            }
        } else {
            console.error('invalid image format')
        }
    }

    setDefault = e => {
        let id = e.target.attributes.id.value,
            photo = this.state.photo
        const image = photo.splice(id, 1)
        this.setState({photo: [image[0], ...photo]}, () => this.updateSelection)
    }

    setDelete = e => {
        let id = e.target.attributes.classID.value,
            photo = this.state.photo
        photo.splice(id, 1)
        this.setState({photo}, this.updateSelection)
    }

    uploadPicture = async photo => {
        let data = new FormData()
        data.append('picture', photo, photo.name);
        const config = ''
        return await axios.post('/image', data, config).then(res => {
            if (res.data.success) {
                return (res.data.name)
            } else {
                console.error("Image upload failed: " + res.data.message)
                return false
            }
        })
    }

    updateSelection = async () => {
        console.log(this.state.photo)
        let photo = this.state.photo
        if (photo.length > this.props.params.maxLength) {
            photo.splice(this.props.paramsmaxLength, this.props.params.maxLength - photo.length)
        }
        let picture = photo.map(e => {
            return e.picture
        })
        console.log("photo: ", photo, "picture: ", picture, "id: ", this.props.params.id, "name: ", this.props.params.name)
        this.setState({photo})
        console.log (await this.props.update(this.props.params.id, this.props.params.name, picture))
    }


    render() {
        const {photo, accept, isDragover, uploadSupport} = this.state

        console.log("PHOTO id: ", this.state.id)
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
                            <ProfilePicture key={i}
                                            file={e.file}
                                            url={ e.picture? ('http://localhost:3001/images/' + e.picture): URL.createObjectURL(e.file)}
                                            id={i}
                                            setDefault={this.setDefault}
                                            setDelete={this.setDelete} />
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
                 style={{backgroundImage: `url(${this.props.url})`}}>
                <div className="promote"
                     id={this.props.id}
                     onClick={this.props.setDefault}
                ></div>
                <div className="delete"
                     classID={this.props.id}
                     onClick={this.props.setDelete}
                ></div>
            </div>
        )
    }
}































