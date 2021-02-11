setTimeout(() => {
    console.log("setTimeout");
}, 0);

setImmediate(() => {
    console.log("setImmediate");
});

/* 
    解析:
        正常来说，先走timers队列，所以先输出setTimeout
        但是由于电脑运行会卡顿，所以也可能先输出setImmediate

    注意：setTimeout( , 0) 最小为1ms。就算写的是 0，也当做 1。
*/