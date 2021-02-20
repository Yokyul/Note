function sum(a, b, ...args) {
    //args 是收集所有参数形成的一个数组。
    let sum = 0;
    for (let i = 0; i < args.length; i++) {
        sum += args[i];
    }
    return sum;
}

console.log(sum(0, 0)); //0
console.log(sum(0, 0, 1)); //1
console.log(sum(0, 0, 1, 2)); //3
console.log(sum(0, 0, 1, 2, 3)); //6
console.log(sum(0, 0, 1, 2, 3, 4)); //10