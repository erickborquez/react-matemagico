import React, { Component } from 'react';
import Operation from './Operations';
import CardOperation from './CardOperation'
import Answer from './Answer'
import Menu from './Menu'

const maxOperations = 6,
    difficultyModifier = 0.15;
let keyCounter = 0;
class Game extends Component {
    constructor(props) {
        super(props);
        this.onSuccess = this.onSuccess.bind(this);
        this.createNewOperation = this.createNewOperation.bind(this);
        this.startCounter = this.startCounter.bind(this);
        this.handleLose = this.handleLose.bind(this);
        this.getStartingState = this.getStartingState.bind(this);
        this.generateGame = this.generateGame.bind(this);
        this.startGame = this.startGame.bind(this);

        this.state = this.getStartingState();
    }

    componentDidMount() {
        this.setState({
            isPlaying: false,
            maxScore: localStorage.getItem('maxScore') || 0
        })
    }

    getStartingState(difficulty = 1) {
        let initialOperations = [];
        for (let i = 0; i < maxOperations; i++) {
            let operation = Operation.generateOperation({ key: keyCounter++, difficulty: difficulty });
            initialOperations.push(operation);
        }
        return {
            operations: initialOperations,
            movingDown: false,
            difficulty: difficulty,
            activeOperation: initialOperations[initialOperations.length - 1],
            delay: 1,
            timeLeft: 5000,
            score: 0,
            isPlaying: false,
            isCounting: false
        }
    }

    startCounter() {
        let lastTime = (new Date()).getTime();
        this.setState({
            isCounting: true
        })
        let timeCounter = setInterval(() => {
            let time = (new Date()).getTime()
            let step = time - lastTime;
            let timeLeft = this.state.timeLeft - step;
            if (timeLeft < 0) {
                this.handleLose();
                clearInterval(timeCounter);
                timeLeft = 0;
            }
            this.setState(() => {
                return {
                    timeLeft: timeLeft
                }
            })
            lastTime = time;
        }, 100)
    }
    handleLose() {
        let { maxScore } = this.state;
        this.setState({
            isPlaying: false
        })
        if (maxScore > localStorage.getItem('maxScore')) {
            localStorage.setItem('maxScore', maxScore)
        }
    }
    createNewOperation() {
        let { delay, difficulty, operations } = this.state;
        let newOperation = Operation.generateOperation({ key: keyCounter++, difficulty: difficulty });
        let newOperations = [newOperation, ...operations].slice(0, maxOperations);
        this.setState({
            operations: newOperations,
            difficulty: difficulty + difficultyModifier,
            movingDown: false,
            delay: delay - 1
        })
    }
    onSuccess() {
        let { operations, delay, timeLeft, score, maxScore, isCounting } = this.state;
        let newScore = score + 20;
        if (newScore > maxScore) {
            maxScore = newScore;
        }
        if (!isCounting) {
            this.startCounter();
        }
        this.setState({
            movingDown: true,
            activeOperation: operations[operations.length - delay - 1],
            delay: delay + 1,
            timeLeft: timeLeft + 1000,
            score: newScore,
            maxScore: maxScore
        })
        setTimeout(() => {
            this.createNewOperation()
        }, 200);
    }

    generateGame() {
        this.setState(this.getStartingState());
    }

    startGame() {
        this.setState({
            isPlaying: true
        })
    }

    render() {
        const { operations, movingDown, activeOperation, timeLeft, isPlaying, score, maxScore } = this.state;
        let time = Math.ceil(timeLeft / 1000);
        return (
            <div className='container'>
                {!isPlaying ? (
                    <Menu isPlaying={isPlaying} score={score} generateGame={this.generateGame} startGame={this.startGame} />
                ) : (null)}
                <div className="gameContainer">
                    <div className="time-left">
                        <div className="stats__container">
                            <span className="stats__sub">Time left</span>
                            <span className="stats__main">{time}</span>
                        </div>
                    </div>
                    <div className="score">
                        <div className="stats__container">
                            <span className="stats__sub">Max score</span>
                            <span className="stats__main">{maxScore}</span>
                        </div>
                        <div className="stats__container">
                            <span className="stats__sub">Score</span>
                            <span className="stats__main">{score}</span>
                        </div>
                    </div>
                    <div className="game__content">
                        <CardOperation operations={operations} movingDown={movingDown} />
                        <Answer answer={activeOperation.answer.toString()} onSuccess={this.onSuccess} />
                    </div>
                </div>

            </div>
        )
    }
}
export default Game