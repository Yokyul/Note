async function async1() {
    console.log("async1 start");
    await async2();
    console.log("async1 end");
}

async function async2() {
    console.log("async2");
}

console.log("script start");

setTimeout(function () {
    console.log("setTimeout0");
}, 0);
setTimeout(function () {
    console.log("setTimeout3");
}, 3);

setImmediate(() => console.log("setImmediate"));
process.nextTick(() => console.log("nextTick"));

async1();

new Promise(function (resolve) {
    console.log("promise1");
    resolve();
    console.log("promise2");
}).then(function () {
    console.log("promise3");
});

console.log("script end");

/*
    输出：
        script start
        async1 start
        async2
        promise1
        promise2
        script end

        nextTick
        async1 end
        promise3

        setTimeout0
        setTimeout3
        setImmediate


    解析:
        - 先执行同步代码，即line 11 和 23
        - 再执行函数async1内部的同步代码，即async1 start
        - 执行async2()，即async2。并将async1 end 放入 promise队列。
        - 执行new Promise()这一同步代码。即：promise1，promise2。并将promise3 放入 promise队列。
        - 输出 script end。
        - 进入事件队列：
            - 清空 nextTick
            - 清空 promise
            - timers队列与check队列顺序不好说

*/
