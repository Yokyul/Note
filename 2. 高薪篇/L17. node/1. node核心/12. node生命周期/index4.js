setImmediate(() => {
    console.log(1);
});

process.nextTick(() => {
    console.log(2);
    process.nextTick(() => {
        console.log(6);
    });
});

console.log(3);

Promise.resolve().then(() => {
    console.log(4);
    process.nextTick(() => {
        console.log(5);
    });
});

/*
    输出：
        3
        2
        6
        4
        5
        1

    解析：
        之前所说的 timers队列，poll队列，check队列 都可以看作宏队列。而 nextTick和Promise 算是微队列。
        其中 nextTick 优先级高于 Promise 。
        宏队列的每个回调执行之前，都必须先清空 微队列的任务。
*/