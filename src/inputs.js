import React, { Component } from 'react'
import cx from 'classnames'

class Input extends Component {
    state = {
        value:''
    }
    handleChange = (e) =>
    {
        this.setState({value: e.target.value})
        this.props.update(e.target.id, e.target.name,  e.target.value)
    }
}

export class CheckboxInput extends Input {

    render() {
        const {id, name, type, placeholder, value, autocomplete, required, error} = this.props.params
        return(
            <div>
                <span className="error-message">{error}</span>

                <span className="checkboxInput">
                <input
                id={id}
                type={type}
                name={name}
                value={value}
                autoComplete={autocomplete}
                required={required}
                onChange={this.handleChange}
                />
                <label htmlFor={id}>
                    {placeholder}
                </label>
            </span>
                </div>
        )
    }
}

export class DateInput extends Input {

    render() {
        const {id, name, type, placeholder, value, autocomplete, required, error} = this.props.params
        return(
            <div>
                <span className="error-message">{error}</span>

                <input
                id={id}
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                autoComplete={autocomplete}
                required={required}
                className="textInput"
                onChange={this.handleChange}
            />
                </div>
        )
    }
}

export class EmailInput extends Input {

    render() {
        const {id, name, type, placeholder, value, autocomplete, required, valid, validating, error} = this.props.params
        return(
            <div>
                <span className="error-message">{error !== '' ? error:null}</span>

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
                    } onChange={this.handleChange} />
                </div>
        )
    }
}

export class HiddenInput extends Input {

    render() {
        const {id, name, type, value, required} = this.props.params
        return(
            <input
                id={id}
                type={type}
                name={name}
                value={value}
                required={required}
                onChange={this.handleChange}
            />
        )
    }
}

export class PasswordInput extends Input {

    render() {
        const {id, name, type, placeholder, value, autocomplete, required, valid, validating, error} = this.props.params
        return(
            <div>
                <span className="error-message">{error !== '' ? error:null}</span>

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
                } onChange={this.handleChange} />
                </div>
        )
    }
}

export class RadioInput extends Input {

    render() {
        const {name, value, required, error} = this.props.params
        return (
            <div>
                <span className="error-message">{error !== '' ? error:null}</span>
            <radiogroup name={name} className="radiogroupInput" required={required}>
                {value.map((e, i) => {
                return(
                <span className="radioInput"><radio
                key={i}
                id={e.value}
                label={e.label}
                selected={e.default}
                onChange={this.handleChange}
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
                </div>
        )
    }
}

export class TextAreaInput extends Input {

    render() {
        const {id, name, type, placeholder, required, validating, valid, error} = this.props.params
        const value = this.state.value
        return(
            <div>
                <span className="error-message">{error !== '' ? error:null}</span>
            <textarea
                id={id}
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                required={required}
                className={cx({
                    'textInput': true,
                    'validating': validating,
                    'valid': valid,
                    'error': error !== ''})
                }
                rows="8"
                maxlength="2500"
                onChange={this.handleChange}
            > </textarea>
                </div>
        )
    }
}

export class TextInput extends Input {
    render() {
        const {id, name, type, placeholder, autocomplete, required, valid, validating, error} = this.props.params
        const value = this.state.value
        return(
            <div className="input">
        <span className="error-message">{error !== '' ? error:null}</span>
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
                    } onChange={this.handleChange}/>
                <div className={cx({
                    "loading": true,
                    "validating" : validating,
                    'valid': valid,
                    "error" : error
                })}>
                    <div className="double-bounce1"></div>
                    <div className="double-bounce2"></div>
                </div>
                </div>
        )
    }
}

export class ButtonInput extends Component {
    state = {
        validating: false,
        error: false
    }
    componentWillReceiveProps = newProps => {
        this.setState({validating: newProps.validating, error: newProps.error})
    }
    handleClick = e => this.props.submit(e)

    render() {
        const { validating, error } = this.state
        return(
            <div className="button">
                <button className="md-close"
                        onClick={this.props.submit
                        }>{this.props.submitName}</button>
                <div className={cx({
                    "loading": true,
                    "validating" : validating,
                    "error" : error
                })}>
                    <div className="double-bounce1"></div>
                    <div className="double-bounce2"></div>
                </div>
            </div>
        )
    }
}
