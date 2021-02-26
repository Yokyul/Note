//1.成员速写
function createUser(loginId, loginPwd, nickName) {
    const sayHello = function () {
        console.log("Id：", this.loginId, ", name：", this.nickName);
    }
    return {
        loginId, //原来写法：loginId：loginId
        loginPwd,
        nickName,
        say: sayHello,
        id: Math.random()
    }
}
const u = createUser("abc", "123", "aaa");
u.say();


//2.方法速写
const user1 = {
    name: "姬成",
    age: 100,
    sayHello(){ //原来写法：sayHello: function(){}
        console.log(this.name, this.age)
    }
}
user1.sayHello();


//3.计算属性名
const prop1 = "name2";
const prop2 = "age2";
const prop3 = "sayHello2";
const user2 = {
    [prop1]: "姬成",
    [prop2]: 100,
    [prop3](){
        console.log(this[prop1], this[prop2]);
    }
}
user2[prop3]();
console.log(user2);