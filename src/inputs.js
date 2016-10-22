import React, { Component } from 'react'


export class CheckboxInput extends Component {
    state = {
        id:'',
        name:'',
        type:'checkbox',
        placeholder:'',
        value:'',
        autocomplete:'',
        required:''
    }

    componentWillReceiveProps = newProps => {
        this.setState({newProps})
    }

    render() {
        const {id, name, type, placeholder, value, autocomplete, required} = this.state
        return(
            <span className="checkboxInput">
                <input
                id={id}
                type={type}
                name={name}
                value={value}
                autoComplete={autocomplete}
                required={required}
                />
                <label htmlFor={id}>
                    {placeholder}
                </label>
            </span>
        )
    }
}

export class DateInput extends Component {
    state = {
        id:'',
        name:'',
        type:'date',
        placeholder:'',
        value:'',
        autocomplete:'',
        required:''
    }

    componentWillReceiveProps = newProps => {
        this.setState({newProps})
    }

    render() {
        const {id, name, type, placeholder, value, autocomplete, required} = this.state
        return(
            <input
                id={id}
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                autoComplete={autocomplete}
                required={required}
                className="textInput" />
        )
    }
}

export class EmailInput extends Component {
    state = {
        id:'',
        name:'',
        type:'email',
        placeholder:'',
        value:'',
        autocomplete:'',
        required:''
    }

    componentWillReceiveProps = newProps => {
        this.setState({newProps})
    }

    render() {
        const {id, name, type, placeholder, value, autocomplete, required} = this.state
        return(
            <input
                id={id}
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                autoComplete={autocomplete}
                required={required}
                className="emailInput" />
        )
    }
}

export class HiddenInput extends Component {
    state = {
        id:'',
        name:'',
        type:'hidden',
        value:'',
        required:''
    }

    componentWillReceiveProps = newProps => {
        this.setState({newProps})
    }

    render() {
        const {id, name, type, value, required} = this.state
        return(
            <input
                id={id}
                type={type}
                name={name}
                value={value}
                required={required}/>
        )
    }
}

export class PasswordInput extends Component {
    state = {
        id:'',
        name:'',
        type:'password',
        placeholder:'',
        value:'',
        autocomplete:'',
        required:''
    }

    componentWillReceiveProps = newProps => {
        this.setState({newProps})
    }

    render() {
        const {id, name, type, placeholder, value, autocomplete, required} = this.state
        return(
            <input
                id={id}
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                autoComplete={autocomplete}
                required={required}
                className="passwordInput" />
        )
    }
}

export class RadioInput extends Component {
    state = {
        id:'',
        name:'',
        type:'radio',
        placeholder:'',
        value:[],
        autocomplete:'',
        required:''
    }

    componentWillReceiveProps = newProps => {
        this.setState({newProps})
    }

    render() {
        const {name, value, required} = this.state
        return (
            <radiogroup name={name} className="radiogroupInput" required={required}>
                {value.map((e, i) => {
                return(
                <span className="radioInput"><radio
                key={i}
                id={e.value}
                label={e.label}
                selected={e.default}
                />
                <label
                    htmlFor={e.value}
                    >
                    {e.label}
                    </label>
                </span>
                )
            })
                }
            </radiogroup>
        )
    }
}

export class TextAreaInput extends Component {
    state = {
        id:'',
        name:'',
        type:'textArea',
        placeholder:'',
        value:'',
        required:''
    }

    componentWillReceiveProps = newProps => {
        this.setState({newProps})
    }

    render() {
        const {id, name, type, placeholder, value, required} = this.state
        return(
            <textarea
                id={id}
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                required={required}
                className="textAreaInput"
                rows="8"
                maxlength="2500"
            ></textarea>
        )
    }
}

export class TextInput extends Component {
    state = {
        id:'',
        name:'',
        type:'text',
        placeholder:'',
        value:'',
        autocomplete:'',
        required:''
    }

    componentWillReceiveProps = newProps => {
        this.setState({newProps})
    }

    render() {
        const {id, name, type, placeholder, value, autocomplete, required} = this.state
        return(
            <input
                id={id}
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                autoComplete={autocomplete}
                required={required}
                className="textInput" />
        )
    }
}
