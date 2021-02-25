import NumberTimer from "../util/number"
import appendNumber from "./appendNumber"

const n = new NumberTimer(100);
n.onNumberCreated = function (n, isPrime) {
    appendNumber(n, isPrime);
}

//该模块用于注册事件
const isStart = false; //默认没有开始
window.onclick = function () {
    if (isStart) {
        n.stop();
        isStart = false;
    }
    else {
        n.start();
        isStart = true;
    }
}