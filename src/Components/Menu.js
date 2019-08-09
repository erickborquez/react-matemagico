import React, { Component } from 'react'

// function Menu(props) {
//     let { score } = props;
//     let menu;
//     if (score === 0) {
//         menu = (
//             <div className='menu' >
//                 <div className="menu__textContainer" >
//                     <h2 className="menu__title" > Matemagico </h2>
//                     <h3 className="menu__sub" > Bienvenido </h3>
//                 </div>
//                 <div className="menu__buttons" >
//                     <span className="menu__startButton" onClick={props.generateGame} > Comenzar </span>
//                 </div>
//             </div>
//         )
//     } else {
//         menu = (
//             <div className='menu' >
//                 <div className="menu__textContainer" >
//                     <h2 className="menu__title" > Matemagico </h2>
//                     <span className='menu__sub'> Tu puntaje fue de {score} </span>
//                 </div>
//                 <div className="menu__buttons" >
//                     <span className="menu__startButton" onClick={props.generateGame} > Jugar de nuevo </span>
//                 </div>
//             </div>
//         )
//     }
//     return menu
// }

class Menu extends Component {
    constructor(props) {
        super(props);
        this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
        this.handleClick = this.handleClick.bind(this);

        this.state = {
            fade: false
        }
    }

    componentDidMount() {
        setTimeout(() =>
            this.setState({
                fade: true
            }), 0)

    }
    handleTransitionEnd(generate = true) {
        if (this.state.fade === false) {
            this.props.startGame();
            this.setState({
                fade: true
            })
        }
    }
    handleClick() {
        this.setState({
            fade: false
        })
        this.props.generateGame()
    }

    render() {
        let menu, { score } = this.props;
        let className = 'menu ' + (this.state.fade ? 'menu__fade' : '');
        console.log(className);
        if (score === 0) {
            menu = (
                <div className={className} onTransitionEnd={() => this.handleTransitionEnd(false)}>
                    <div className="menu__textContainer" >
                        <h2 className="menu__title" > Matemagico </h2>
                        <h3 className="menu__sub" > Bienvenido </h3>
                    </div>
                    <div className="menu__buttons" >
                        <span className="menu__startButton" onClick={this.handleClick} > Comenzar </span>
                    </div>
                </div>
            )
        } else {
            menu = (
                <div className={className} onTransitionEnd={() => this.handleTransitionEnd(true)}>
                    <div className="menu__textContainer" >
                        <h2 className="menu__title" > Matemagico </h2>
                        <span className='menu__sub'> Tu puntaje fue de {score} </span>
                    </div>
                    <div className="menu__buttons" >
                        <span className="menu__startButton" onClick={this.handleClick} > Jugar de nuevo </span>
                    </div>
                </div>
            )
        }
        return menu
    }
}


export default Menu