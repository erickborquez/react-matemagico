import React, { Component } from 'react'

class Answer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            answer: this.props.answer
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        this.setState({
            value: e.target.value
        })
        if (e.target.value === this.props.answer) {
            this.props.onSuccess();
            this.setState({
                value: ''
            })
        }
    }
    render() {
        return (
            <input className={'inputAnswer'} type="text" value={this.state.value} onChange={this.handleChange} />
        )
    }
}

export default Answer