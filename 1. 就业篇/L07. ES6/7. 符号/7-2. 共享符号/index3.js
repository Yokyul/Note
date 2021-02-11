
// 共享符号实现原理：
const SymbolFor = (() => {
    const global = {};          //用于记录有哪些共享符号
    return  (name)=> {
        console.log(global)
        if (!global[name]) {
            global[name] = Symbol(name);
        }
        console.log(global);
        return global[name];
    }
})();

const syb1 = SymbolFor("abc");      // 第一次调用自动创建一个符号

const syb2 = SymbolFor("abc");      // 第二次调用直接将第一次的符号给变量

console.log(syb1 === syb2);