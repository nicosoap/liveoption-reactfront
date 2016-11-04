import React, {Component} from 'react'

export class Like extends Component {
    state = {}

    render() {
        return(
            <div className="Like" onClick={this.props.click} >
                <i className="material-icons">thumb_up</i>
            </div>
        )
    }
}

export class Dislike extends Component {
    state = {}

    render() {
        return(
            <div className="Like" onClick={this.props.click} >
                <i className="material-icons">thumb_down</i>
            </div>
        )
    }
}

export class Chat extends Component {
    state = {}

    render() {
        return(
            <div className='chat' onClick={this.props.click}>
                <i className="material-icons">chat</i>
            </div>
        )
    }
}

export class Visit extends Component {
    state = {}

    render() {
        return(
            <div className='visited' onClick={this.props.click} title={this.props.info}>
                <i className="material-icons">visibility</i>
            </div>
        )
    }
}

export class Connected extends Component {
    state = {}

    render() {
        return(
            <div className='online' onClick={this.props.click} title="Connected" >
                <i className="material-icons">nature_people</i>
            </div>
        )
    }
}

export class Disconnected extends Component {
    state = {}

    render() {
        return(
            <div className='offline' onClick={this.props.click} title={this.props.info}>
                <i className="material-icons">nature</i>
            </div>
        )
    }
}

export class Report extends Component {
    state = {}

    render() {
        return(
            <div className='report' onClick={this.props.click} title="Report user">
                <i className="material-icons">report</i>
            </div>
        )
    }
}

export class Block extends Component {
    state = {}

    render() {
        return(
            <div className='block' onClick={this.props.click} title="Block user">
                <i className="material-icons">block</i>
            </div>
        )
    }
}

export class Match extends Component {
    state = {}

    render() {
        return(
            <div className='match' onClick={this.props.click} title="You matched !">
                <i className="material-icons">stars</i>
            </div>
        )
    }
}

export class Rating extends Component {
    render () {
        let rating = []

        for (let i = 1; i < this.props.rate / 20 ; i++) {
            rating.push(<Star key={10+i} />)
        }
        if (this.props.rate / 20 % 1 >= 0.5) {
            rating.push(<StarHalf key={20} />)
        } else {
            rating.push(<StarBorder key={20} />)
        }
        for (let i = 1; i < 5 - this.props.rate / 20; i ++) {
            rating.push(<StarBorder key={30+i}/>)
        }

        return <Stars>{rating}</Stars>
    }
}

class Stars extends Component {
    render() {
        return (
            <div className='stars' onClick={this.props.click} >
                <span className="interaction-rating" >{this.props.children}</span>
            </div>
        )
    }
}

class Star extends Component {
    state = {}

    render() {
        return (
            <i className="material-icons">star</i>
        )

    }
}

class StarHalf extends Component {
    state = {}

    render() {
        return (
            <i className="material-icons">star_half</i>
        )

    }
}

class StarBorder extends Component {
    state = {}

    render() {
        return (
            <i className="material-icons">star_border</i>
        )

    }
}