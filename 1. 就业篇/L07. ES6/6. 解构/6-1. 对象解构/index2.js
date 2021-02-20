const user = {
    name: "yuyu",
    age: 18,
    sex: "男",
    address: {
        province: "四川",
        city: "成都"
    },
}
// 非同名属性解构：

// 1.先定义4个变量：name、age、gender、address，再从对象user中读取同名属性赋值（其中gender读取的是sex属性）
// let { name, age, sex: gender, address } = user;
// console.log(name, age, gender, address);

// 2.从对象中读取同名属性，读取不到的使用默认值
let { name, age, sex: gender, address, like: love = "guyu" } = user;
console.log(name, age, gender, address, love); //yuyu 18 男 { province: '四川', city: '成都' } guyu

