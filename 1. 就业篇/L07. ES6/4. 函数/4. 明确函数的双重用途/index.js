const p1 = new Person("袁", "进");
console.log(p1.fullName); //袁进

const p2 = Person("袁", "进");
console.log(p2); //报错：该函数没有使用new来调用。

const p3 = Person.call(p1, "袁", "进")
console.log(p3); //报错：该函数没有使用new来调用。


function Person(firstName, lastName) {
    //判断是否是使用new的方式来调用的函数。
    //过去的判断方式：
    if (!(this instanceof Person)) {
        throw new Error("该函数没有使用new来调用");
    }
    //ES6的判断方式：
    if (new.target === undefined) {
        throw new Error("该函数没有使用new来调用");
    }
    
    this.firstName = firstName;
    this.lastName = lastName;
    this.fullName = `${firstName}${lastName}`;
}