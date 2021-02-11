const numbers = [324, 7, 23, 5, 3243];

// 解构出数组前两项，分别放到变量a和b中，然后剩余的所有数据放到数组nums
// 1.过去写法：
const a = numbers[0], b = numbers[1], nums = numbers.slice(2);
console.log(a, b, nums);

// 2.解构写法：
const [a1, b1, ...nums1] = numbers;
console.log(a1, b1, nums1);
