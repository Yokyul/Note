const text = "𠮷"; //占用了两个码元（32位）

console.log("字符串长度：", text.length); //2
console.log("使用正则测试：", /^.$/u.test(text)); //true
console.log("得到第一个码元：", text.charCodeAt(0)); //55362
console.log("得到第二个码元：", text.charCodeAt(1)); //57271

//𠮷：\ud842\udfb7
console.log("得到第一个码点：", text.codePointAt(0)); //134071
console.log("得到第二个码点：", text.codePointAt(1)); //57271

console.log("𠮷是否是32位的：", is32bit("𠮷", 0)); //true
console.log("ab𠮷ab的码点长度：", getLengthOfCodePoint("ab𠮷ab")); //5


/**
 * 判断字符串char，是32位，还是16位。如果码点大于了16位二进制的最大值，则其是32位的。
 * @param {*} char 
 * @param {*} i 
 */
function is32bit(char, i) {
    return char.codePointAt(i) > 0xffff;
}

/**
 * 得到一个字符串的真实长度。(一个码点代表一个字符)
 * @param {*} str 
 */
function getLengthOfCodePoint(str) {
    let len = 0;
    for (let i = 0; i < str.length; i++) {
        if (is32bit(str, i)) {
            //当前字符串，在i这个位置，占用了两个码元
            i++;
        }
        len++;
    }
    return len;
}