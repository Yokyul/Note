// 业务逻辑层的初始化操作。此时只写了验证库的扩展。
const validate = require("validate.js");
const moment = require("moment");

/*
    由于birthday传入的格式很多，所以需要写个扩展将它统一转为时间戳。下面的扩展为全局扩展。
    validate.extend()：
        - 参数1：要扩展的验证器。
        - 参数2: 扩展的函数。
*/
validate.extend(validate.validators.datetime, {
  /**
   * 该函数会自动用于日期格式转换
   * 它会在验证时自动触发，它会将任何数据转换为时间戳返回。如果无法转换，返回NaN
   * @param {*} value 传入要转换的值
   * @param {*} options 针对某个属性的验证配置
   */
  parse(value, options) {       //使用moment库来写该函数。
    let formats = ["YYYY-MM-DD HH:mm:ss", "YYYY-M-D H:m:s", "x"];
    if (options.dateOnly) {
      formats = ["YYYY-MM-DD", "YYYY-M-D", "x"];
    }
    return +moment.utc(value, formats, true);
  },
  /**
   * 显示错误消息时，使用的显示字符串
   */
  format(value, options) {
    let format = "YYYY-MM-DD";
    if (!options.dateOnly) {
      format += " HH:mm:ss";
    }
    return moment.utc(value).format(format);
  },
});
