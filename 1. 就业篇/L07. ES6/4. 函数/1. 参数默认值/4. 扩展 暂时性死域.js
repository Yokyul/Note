function test(a = b, b) {       // 先声明a，将b赋给a的时候，b还没有声明，还在暂时性死区中
    console.log(a, b);
}

test(undefined, 2);