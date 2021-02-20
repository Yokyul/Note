const arr1 = [3, 67, 8, 5];
const arr2 = [0, ...arr1, 1];

console.log(arr2); //[ 0, 3, 67, 8, 5, 1 ]
console.log(arr1 === arr2); //false