function test(a, b = 1) {
    console.log("arugments：", arguments[0], arguments[1]); //arugments： 1 2
    console.log("a:", a, "b:", b); //a: 1 b: 2
    
    a = 3;
    console.log("arugments：", arguments[0], arguments[1]); //arugments： 1 2
    console.log("a:", a, "b:", b); //a: 3 b: 2
}

test(1, 2);