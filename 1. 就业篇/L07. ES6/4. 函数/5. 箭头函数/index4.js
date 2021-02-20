// 细节1
const obj = {
    method() {
        const func = () => {
            console.log(this); //{ method: [Function: method] }
            console.log(arguments); //[Arguments] { '0': 234 }
        }
        func();
    }
}
obj.method(234);