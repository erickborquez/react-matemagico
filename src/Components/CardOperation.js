import React from 'react'


const cardSize = 100;
const minHeight = 20;

function CardOpertation(props) {
    let { operations, movingDown } = props;
    let style, localHeight, totalHeight = 0;
    let operationCards = operations.map((op, pos) => {
        let { symbol, param, key } = op;
        let texContent = `${param[0]} ${symbol} ${param[1]}`;
        totalHeight += cardSize * pos / (operations.length - 1) + minHeight;
        if (movingDown) {
            let modif = (pos + 1) / (operations.length - 1);
            localHeight = cardSize * modif + minHeight;
            console.log(totalHeight)
            style = {
                color: `rgba(255,255,255,${modif * .85 + .15})`,
                height: `${localHeight}px`,
                fontSize: `${modif * 2 + .2}em`,
                transition: 'all .2s',
                transform: `translateY(0)`
            }
        } else {
            let modif = pos / (operations.length - 1)
            localHeight = cardSize * modif + minHeight;
            style = {
                color: `rgba(255,255,255,${modif * .85 + .15})`,
                height: `${localHeight}px`,
                fontSize: `${modif * 2 + .2}em`,
                transition: `none`,
                transform: `translateY(-${minHeight}px)`
            }

        }
        return (
            <div className='card' key={key} style={style}>
                <span>{texContent}</span>
            </div>
        )
    })
    let containerStyle = {
        height: `${totalHeight}px`
    }
    return (
        <div className='cardContainer' style={containerStyle} >
            {operationCards}
        </div>
    )
}


export default CardOpertation