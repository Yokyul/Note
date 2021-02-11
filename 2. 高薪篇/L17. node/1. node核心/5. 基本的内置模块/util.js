// 工具包对象
const util = require("util");

// 1.将异步模式函数，统统转为 callback模式。
async function delay1(duration = 1000) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(duration);
    }, duration);
  });
}
const delayCallback1 = util.callbackify(delay1);  // 将异步模式函数，统统转为 callback模式
delayCallback1(500, (err, d) => {                 // 回调函数的参数：第一个固定为error信息，第二个为参数。
  console.log(d);
});

// 2.将回调模式函数，统统转为 异步模式。
function delayCallBack2(duration, callback) {
  setTimeout(() => {
    callback(null, duration);
  }, duration);
}
const delay2 = util.promisify(delayCallBack2);    // 将回调模式，统统转为 异步模式。
// delay2(500).then(re => console.log(re))
(async () => {
  const r = await delay2(600);
  console.log(r);
})();


// 3.inherits(a, b) 表示 构造函数a 继承自 构造函数b。现在不用，用类。


// 4.比较两个对象是否 深度严格相等。
const obj1 = {
  a: 1,
  b: {
    c: 3,
    d: {
      e: 5
    }
  }
};

const obj2 = {
  a: 1,
  b: {
    c: 3,
    d: {
      e: 5,
      g: 6
    }
  }
};

console.log(util.isDeepStrictEqual(obj1, obj2));

console.log(util.isDeepStrictEqual({},{}))