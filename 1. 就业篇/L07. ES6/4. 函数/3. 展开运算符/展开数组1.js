const numbers = getRandomNumbers(10);
console.log(sum(...numbers)); //相当于传递了10个参数
console.log(sum(1, 3, ...numbers, 3, 5)); 


/**
 * 对所有数字求和
 * @param  {...any} args 
 */
function sum(...args) {
    let sum = 0;
    for (let i = 0; i < args.length; i++) {
        sum += args[i];
    }
    return sum;
}

/**
 * 获取一个指定长度的随机数组成的数组
 * @param {*} length 
 */
function getRandomNumbers(length) {
    const arr = [];
    for (let i = 0; i < length; i++) {
        arr.push(Math.random());
    }
    return arr;
}