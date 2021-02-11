class Test {

    @Obsolete           // 装饰器：本质上是函数
    print() {
        console.log("print方法")
    }
}

function Obsolete(target, methodName, descriptor) {
    // function Test
    // print
    // { value: function print(){}, ... }
    // console.log(target, methodName, descriptor);
    const oldFunc = descriptor.value
    descriptor.value = function (...args) {
        console.warn(`${methodName}方法已过时`);
        oldFunc.apply(this, args);
    }
}
