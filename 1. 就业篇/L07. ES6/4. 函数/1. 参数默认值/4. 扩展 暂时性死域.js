function test(a = b, b) {
    console.log(a, b); //报错：Cannot access 'b' before initialization。因为是先声明a，将b赋给a的时候，b还没有声明，还在暂时性死区中。
}

test(undefined, 2);