import React, { Component } from 'react'
import cx from 'classnames'

export class CheckboxInput extends Component {
    state = {
        value:''
    }


    render() {
        const {id, name, type, placeholder, value, autocomplete, required} = this.props.params
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
        value:''
    }

    render() {
        const {id, name, type, placeholder, value, autocomplete, required} = this.props.params
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
        value:''
    }


    render() {
        const {id, name, type, placeholder, value, autocomplete, required, valid, validating, error} = this.props.params
        return(
            <input
                id={id}
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                autoComplete={autocomplete}
                required={required}
                className={cx({
                    'emailInput': true,
                        'validating': validating,
                        'valid': valid,
                        'error': error !== ''})
                    } />
        )
    }
}

export class HiddenInput extends Component {
    state = {
        value:''
    }


    render() {
        const {id, name, type, value, required} = this.props.params
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
        value:''
    }

    render() {
        const {id, name, type, placeholder, value, autocomplete, required, valid, validating, error} = this.props.params
        return(
            <input
                id={id}
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                autoComplete={autocomplete}
                required={required}
                className={cx({
                    'passwordInput': true,
                    'validating': validating,
                    'valid': valid,
                    'error': error !== ''})
                } />
        )
    }
}

export class RadioInput extends Component {
    state = {
        value:''
    }

    render() {
        const {name, value, required} = this.props.params
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
        value:''
    }

    render() {
        const {id, name, type, placeholder, required} = this.props.params
        const value = this.state.value
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
            > </textarea>
        )
    }
}

export class TextInput extends Component {
    state = {
        value:''
    }

    render() {
        const {id, name, type, placeholder, autocomplete, required, valid, validating, error} = this.props.params
        const value = this.state.value
        return(
            <input
                id={id}
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                autoComplete={autocomplete}
                required={required}
                className={cx({
                    'textInput': true,
                        'validating': validating,
                        'valid': valid,
                        'error': error !== ''})
                    } />
        )
    }
}
