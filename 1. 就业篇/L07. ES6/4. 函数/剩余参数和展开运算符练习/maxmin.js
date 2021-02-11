
// 将文本框里的值放到数组numbers里去
function getValues() {
    const numbers = [];
    const inps = document.querySelectorAll("input")
    for (let i = 0; i < inps.length; i++) {
        numbers.push(+inps[i].value)            // + 是为了让inps[i].value转为数字类型，和parseInt()作用一样
    }
    return numbers;
}

const btn = document.querySelector("button")

btn.onclick = function () {
    const numbers = getValues();                // 得到文本框中的所有数字形成的数组
    spanmax.innerText = Math.max(...numbers)
    spanmin.innerText = Math.min(...numbers)
}