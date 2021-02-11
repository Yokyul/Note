

const syb1 = Symbol("这是用于对象的一个属性");

const obj = {
    a: 1,
    b: 2,
    [syb1]: 3           // 通过[]变为可计算的, 此时syb1就不是字符串了，而是符号
}

console.log(obj);