import React, { Component } from 'react';
import Operation from './Operations';
import CardOperation from './CardOperation'
import Answer from './Answer'

const maxOperations = 6;

class Game extends Component {
    constructor(props) {
        super(props);
        let initialOperations = Array(maxOperations).fill(null).map((_, i) => Operation.generateOperation({ key: i, dif: 1 }));
        this.onSuccess = this.onSuccess.bind(this);
        this.createNewOperation = this.createNewOperation.bind(this);
        this.state = {
            operations: initialOperations,
            keyCounter: initialOperations.length,
            movingDown: false,
            dif: 1,
            activeOperation: initialOperations[initialOperations.length - 1],
            delay: 1

        }
    }
    createNewOperation() {
        let { delay, keyCounter, dif } = this.state;
        let newOperation = Operation.generateOperation({ key: this.state.keyCounter, dif: this.state.dif });
        let operations = [newOperation, ...this.state.operations].slice(0, maxOperations);
        this.setState({
            operations: operations,
            keyCounter: keyCounter + 1,
            movingDown: false,
            dif: dif + 0.2,
            delay: delay - 1
        })
    }
    onSuccess() {
        let { operations, delay } = this.state;
        this.setState({
            movingDown: true,
            activeOperation: operations[operations.length - delay - 1],
            delay: delay + 1
        })
        setTimeout(() => {
            this.createNewOperation()
        }, 200);
    }

    render() {
        const { operations } = this.state;
        return (
            <div className={'gameContainer'}>
                <p>Juego</p>
                <CardOperation operations={this.state.operations} movingDown={this.state.movingDown} />
                <Answer answer={this.state.activeOperation.answer.toString()} onSuccess={this.onSuccess} />
            </div>
        )
    }
}
export default Game