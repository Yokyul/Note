const user = {
    name: "kevin",
    age: 11,
    sex: "男",
    address: {
        province: "四川",
        city: "成都"
    }
}

// 将user中的name, age, sex, address的值赋给变量name, age, sex, address

/* 1.过去写法：
let name, age, sex, address;
name = user.name;
age = user.age;
sex = user.sex;
address = user.address;
console.log(name, age, sex, address);
*/

/* 2.ES6的写法：
let name, age, sex, address;
({ name, age, sex, address } = user);//对象的解构语句。将user中的name, age, sex, address的值赋给前面{}里的同名变量。
console.log(name, age, sex, address);
*/

// 3.ES6写法的简写：
// let { name, age, sex, address } = user;
// console.log(name, age, sex, address);

// 4.先定义5个变量，然后从对象中读取同名属性，放到变量中。读取不到的使用默认值，如：abc = 123
let { name, age, sex, address, abc = 123 } = user
console.log(name, age, sex, address, abc);