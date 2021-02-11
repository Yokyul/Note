
const obj = {
    a: 1,
    b: 2,
    [Symbol.for("c")]: 3
}

// 此时可以在外部使用符号属性，因为它没有私有化。
console.log(obj[Symbol.for("c")]);