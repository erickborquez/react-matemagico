import React from 'react'


const maxCardSize = 100,
    minHeight = 20;

function CardOpertation(props) {
    let { operations, movingDown } = props;
    let style, localHeight, totalHeight = 0;
    let totalOperations = operations.length - 1;

    let operationCards = operations.map((op, pos) => {
        let { symbol, param, key } = op;

        let texContent = `${param[0]} ${symbol} ${param[1]}`;
        totalHeight += maxCardSize * pos / totalOperations + minHeight;

        if (movingDown) {
            let modifier = (pos + 1) / totalOperations;
            localHeight = maxCardSize * modifier + minHeight;
            style = {
                color: `rgba(255,255,255,${modifier * .9 + .1})`,
                height: `${localHeight}px`,
                fontSize: `${modifier * 2 + .1}em`,
                transition: 'all .2s',
                transform: `translateY(0)`
            }
        } else {
            let modifier = pos / totalOperations
            localHeight = maxCardSize * modifier + minHeight;
            style = {
                color: `rgba(255,255,255,${modifier * .9 + .1})`,
                height: `${localHeight}px`,
                fontSize: `${modifier * 2 + .1}em`,
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