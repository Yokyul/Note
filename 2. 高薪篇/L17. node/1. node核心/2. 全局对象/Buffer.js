/*
    1.Buffer(缓冲区)
        - Buffer的结构和数组很像，操作的方法也和数组类似。
        - 数组不能存储二进制文件，而buffer就是专门用来存储二进制文件
        - 使用buffer不需要引入模块，直接使用即可
        - 在buffer中存储的都是二进制数据，但是在显示时都是以16进制显示
        - buffer中每一个元素的范围是从00 - ff 0 - 255
        - 00000000 - 11111111

    2.补充
        计算机 一个0 或一个1 我们称为1位（bit）
        8bit = 1Byte(字节)
        1024byte = 1KB
        1024KB = 1MB
        1024MB = 1GB
        1024GB = 1TB
        buffer中的一个元素占用内存的一个字节
        Buffer的大小一旦确定，则不能修改，Buffer实际上是对底层内存的直接操作。

    3.注意：只要数字在控制台或页面中输出一定是10进制
*/


// 1.Buffer.from(str)：将一个字符串转换为buffer
var str = "Hello 雪风";
var buf1 = Buffer.from(str);
console.log(buf1.length);    //12 (占用内存的大小)
console.log(str.length);     //8
console.log(buf1);           //<Buffer 48 65 6c 6c 6f 20 e9 9b aa e9 a3 8e>


/* 
    2.创建一个指定大小的Buffer
        方法1：Buffer.alloc(size)
        方法2：buffer的构造函数new Buffer(不推荐使用)
            var buf2 = new Buffer(1024);   //1KB 的buffer
*/
var buf2 = Buffer.alloc(10);
buf2[0] = 255;
buf2[1] = 0xaa;             //8进制
buf2[2] = 556;              //最大保存为255
console.log(buf2);          //<Buffer ff aa 2c 00 00 00 00 00 00 00>   2c超过范围，只取二进制后八位
console.log(buf2[1]);       //170  
console.log(buf2[1].toString(16));      //字母可以指定在控制台显示的进制


// 3.Buffer.toString()：将缓冲区中的数据转换为字符串
var buf3 = Buffer.from("我是一段文本数据");
console.log(buf3.toString());           //我是一段文本数据


// 4.Buffer.allocUnsafe(size)：创建一个指定大小的buffer，但是buffer中可能含有敏感数据
var buf4 = Buffer.allocUnsafe(10);
console.log(buf4.toString());

// 5.将两个buffer拼接在一起。
const result = Buffer.concat([headBuffer, bodyBuffer]);