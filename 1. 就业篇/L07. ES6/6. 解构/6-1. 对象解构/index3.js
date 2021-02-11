const user = {
    name: "kevin",
    age: 11,
    sex: "男",
    address: {
        province: "四川",
        city: "成都"
    }
}


//解构出user中的对象address的属性province
const { address: { province } } = user;
console.log(province);


