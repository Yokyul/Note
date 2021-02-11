const arr = [3];
const arr2 = [5, 6, 7, 8];

arr2[Symbol.isConcatSpreadable] = false;

const result = arr.concat(56, arr2) 

// 原本结果：[3, 56, 5, 6, 7, 8]
// 现在结果：[3, 56, [5,6,7,8]]
console.log(result)