const moment = require("moment");
moment.locale("zh-cn");         //导入语言包。以下输出都为中文

/*
    注：在服务器中，最好约定只写utc时间，不用本地时间的写法。

    1.无参数。表示得到当前时间。
        - moment(): 得到当前本地时间
        - moment.utc()：得到当前utc时间

    2.有参数。
        - 参数1：传入的时间。格式会被参数2检查。
        - 参数2(选)：指定时间格式。如下：
            - xxxx-xx-xx
            - xxxx/xx/xx
            - h min s
            - 时间戳
        - 参数3(选)：布尔值。是否严格检查。true: 不符合就报错

    3.moment 有日期令牌，就是规定好的时间格式。
*/


//1.得到当前时间
console.log(moment().toString());           //类似Date对象的 toString()，将对象输出为字符串
console.log(moment.utc().toString());

//2.得到当前时间戳, 有以下两种写法。 
console.log(moment().valueOf(), +moment());     //+是变为数字，就会调用 valueOf()
console.log(moment.utc().valueOf(), +moment.utc());

//3.根据指定的时间格式得到时间
console.log(moment(0).toString(), +moment(0));  //参数为时间戳
console.log(moment.utc(0).toString(), +moment.utc(0));
const value = "1970-01-01 00:00:00";
console.log(moment(value).toString(), +moment(value));
console.log(moment.utc(value).toString(), +moment.utc(value));

//4.使用日期令牌转换。令牌是一个格式化的字符串，例如： "YYYY-MM-DD HH:mm:ss"
const formats = ["YYYY-MM-DD HH:mm:ss", "YYYY-M-D H:m:s", "x"];     //多个令牌写成数组。
console.log(moment.utc("1970-01-01 00:00:00", formats, true).toString());
console.log(moment.utc("1970-1-1 0:0:0", formats, true).toString());
console.log(moment.utc(0, formats, true).toString());
const invalidMoment = moment.utc("Thu Jan 01 1970 00:00:00 GMT+0000", formats, true);
console.log(invalidMoment.toString());  //报错，无效数据。因为格式不符
console.log(+invalidMoment);    //NaN
console.log(invalidMoment.isValid());   //false 判断是否是一个有效日期。


// 5.将一个moment对象友好的显示出来（一般是在客户端显示）
const m = moment.utc("2015-1-5 23:00:01", formats, true);
console.log(m.isUTC());     //判断当前moment对象是否为utc时间
console.log(m.local());     //将utc时间转为本地时间。
console.log(m.utc());       //将本地时间转为utc时间。
console.log(m.local().format("YYYY年MM月DD日 HH点mm分ss秒"));   //format() 显示的还是 utc 时间。
console.log(m.utc().format("YYYY-MM-DD HH:mm:ss"));

const m2 = moment.utc("2020-4-14 9:00:01", formats, true);
console.log(m2.local().fromNow());   //fromNow() 距离现在多久
