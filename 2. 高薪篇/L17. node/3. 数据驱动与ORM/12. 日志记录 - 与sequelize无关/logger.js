const log4js = require("log4js");
const path = require("path");
 
log4js.configure({
    // 1.配置出口。名称自定义
    appenders: {
        sql: {          //定义sql日志出口
            type: "dateFile",           //与file 几乎一样。dateFile 会在文件名中加上时间
            filename: path.resolve(__dirname, "logs", "sql", "logging.log"),
            maxLogSize: 1024 * 1024,    //配置文件的最大字节数
            keepFileExt: true,          //保持日志文件后缀不变。不然加时间或数字是在文件后缀后加的。
            
            layout: {                   //配置日志内容的书写格式
                type: "pattern",
                pattern: "%c [%d{yyyy-MM-dd hh:mm:ss}] [%p]: %m%n",
            },
        },
        default: {      //定义默认日志出口
            type: "stdout",
        },
    },
    // 2.配置日志类别。名称自定义，最好与出口对应。
    categories: {
        sql: {
            appenders: ["sql"], //该分类使用出口sql的配置写入日志
            level: "all",       //日志级别，只有该等级及以上才会被记录到该类别日志。
        },
        default: {
            appenders: ["default"],
            level: "all",
        },
    },
});

process.on("exit", () => {
    log4js.shutdown();      // log4js 库推荐写。可以避免 服务器突然死机导致日志没有记录完。
});

const sqlLogger = log4js.getLogger("sql");      //日志出口为 sql
const defaultLogger = log4js.getLogger();       //不写参数，默认日志出口为 default。

sqlLogger.error('Cheese is too ripe!');         //**写错误信息**

exports.sqlLogger = sqlLogger;
exports.logger = defaultLogger;