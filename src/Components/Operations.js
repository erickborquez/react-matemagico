function generateNumber(difficulty) {
    return Math.ceil(Math.random() * 5 * difficulty) + 1;
}

function createOperation({ symbol, evaluation }) {
    return (dif, key) => {
        let answer, param;
        do {
            param = Array(2)
                .fill(null)
                .map(() => generateNumber(dif))
                .sort((a, b) => b - a);
            answer = evaluation(...param);
        } while ((answer % 1) != 0);
        return { symbol: symbol, param: param, answer: answer, key: key }
    }
}

function selectRandomMethod(methods) {
    let keys = Object.keys(methods);
    let randomKey = Math.floor(Math.random() * keys.length)
    let method = (randomKey === keys.length) ? methods[keys[0]] : methods[keys[randomKey]];
    return method;
}
class Operation {
    static operations = {
        division: createOperation({
            symbol: '/',
            evaluation: (a, b) => a / b
        }),
        multiplication: createOperation({
            symbol: '*',
            evaluation: (a, b) => a * b
        }),
        sum: createOperation({
            symbol: '+',
            evaluation: (a, b) => a + b
        }),
        sub: createOperation({
            symbol: '-',
            evaluation: (a, b) => a - b
        })
    }
    static generateOperation({ key, dif }) {
        let { multiplication } = this.operations;
        let method = selectRandomMethod(this.operations);
        if (method == multiplication)
            dif = dif / 2;
        let operation = method(dif, key);
        return operation;
    }
}


export default Operation