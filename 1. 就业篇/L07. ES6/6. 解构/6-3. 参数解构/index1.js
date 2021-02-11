
// 解构最常用于函数的参数解构。见下

// 1.之前的写法
function print(user) {
    console.log(`姓名：${user.name}`)
    console.log(`年龄：${user.age}`)
    console.log(`性别：${user.sex}`)
    console.log(`身份：${user.address.province}`)
    console.log(`城市：${user.address.city}`)
}


// 2.使用参数解构的写法
function print({ name, age, sex, address: {
    province,
    city
} }) {
    console.log(`姓名：${name}`)
    console.log(`年龄：${age}`)
    console.log(`性别：${sex}`)
    console.log(`身份：${province}`)
    console.log(`城市：${city}`)
}

const user = {
    name: "kevin",
    age: 11,
    sex: "男",
    address: {
        province: "四川",
        city: "成都"
    }
}
print(user)