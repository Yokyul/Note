

// 1.得到numbers下标为4的数组中的下标为2的数据，放到变量n中
const numbers1 = ["a", "b", "c", "d", [1, 2, 3, 4]];
const [, , , , [, , n]] = numbers1;
console.log(n)



// 2.得到numbers下标为4的数组的属性a，赋值给变量A
const numbers2 = ["a", "b", "c", "d", {
    a: 1,
    b: 2
}];

// 写法1
const [, , , , { a: A }] = numbers2;
console.log(A)

// 写法2
const { a: x } = numbers2[4];
console.log(x)