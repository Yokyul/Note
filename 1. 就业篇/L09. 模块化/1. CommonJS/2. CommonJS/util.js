
console.log("util模块执行了!")

let count = 0;      
let getNumber = function () {
    return count++;
}
exports.getNumber = getNumber;
exports.name = 'yuyu'

console.log(exports)

/* 
    exports = {
        name:'yuyu',
        getNumber: getNumber
    }
*/


// module.exports = {
//     abc: 123
// }