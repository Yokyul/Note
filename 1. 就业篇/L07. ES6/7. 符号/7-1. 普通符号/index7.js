const syb = Symbol();

const obj = {
    [syb]: 1,
    a: 2,
    b: 3
}

// 符号属性是不能枚举的。因此在 for-in 循环中无法读取到符号属性，Object.keys 方法也无法读取到符号属性
for (const prop in obj) {
    console.log(prop)
}
console.log(Object.keys(obj))
console.log(Object.getOwnPropertyNames(obj))

// 得到的是一个符号属性的数组
const sybs = Object.getOwnPropertySymbols(obj);
console.log(sybs, sybs[0] === syb)