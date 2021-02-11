function A() {

}

// 改写instanceof
Object.defineProperty(A, Symbol.hasInstance, {
    value: function (obj) {
        return false;
    }
})

const obj = new A();

console.log(obj instanceof A);      // 本来是true， 现在变成了false
console.log(A[Symbol.hasInstance](obj));    // false