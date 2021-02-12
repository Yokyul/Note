importScripts('./math.js');         // 引入

this.onmessage = function (e) {
    console.log('****import***');
    console.log(getSum(1, 2));

    // console.log(e);
    let result = 0;
    for (let i = 0; i < e.data.count; i++) {
        result += i;
    }
    this.postMessage(result);
    this.close();
}