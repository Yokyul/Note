
const syb1 = Symbol("这是符号1");
const syb2 = Symbol("这是符号1");

console.log(syb1, syb2);

// 每次调用 Symbol 函数得到的符号永远不相等，无论符号描述是否相同
console.log(syb1 === syb2)