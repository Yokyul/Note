// 2.check队列
let i = 0;
console.time();

function test() {
    i++;
    if (i < 1000) {
        setImmediate(test);
    } else {
        console.timeEnd();
    }
}
test();

/* 
    解析:
        本质上，在timers队列检查是否有回调函数的方法是：将所有开启的计时器线程一个个检查是否有回调，较为耗时。而check队列就是将回调添加到这，不会有额外开销。
        因此，setTimeout(,0) 比 setImmediate() 耗的时间会多。

    例如：
        setTimeout(() => {
            console.log("setTimeout");
        }, 0);

        setImmediate(() => {
            console.log("setImmediate");
        });
*/