const user = {
    name: "kevin",
    age: 11,
    sex: "男",
    address: {
        province: "四川",
        city: "成都"
    }
}

// 解构出name，然后将剩余的所有属性，放到新的对象obj中。如下：
// name: kevin
// obj : {age:11, sex:"男", address:{...}}
const { name, ...obj } = user;
console.log(name, obj);