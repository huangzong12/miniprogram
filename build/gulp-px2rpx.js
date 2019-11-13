'use strict';

var util = require('gulp-util');
var PluginError = util.PluginError;
var through = require('through2');
var extend = require('extend');

var PLUGIN_NAME = 'gulp-px2rpx';

var defaultConfig = {
  unit: 'rpx', // 单位
  replaceUnit: 'px', // 被替换的
  screenWidth: 750, // 设计稿屏幕
  wxappScreenWidth: 750, // 微信小程序屏幕
  remPrecision: 6, // 小数精度, 默认6
  minPixelValue: 4 //设置要替换的最小像素值
};

function gulpPx2Rpx(options) {
  options = extend({}, defaultConfig, options);
  var reg = new RegExp('([\\d.]*\\d)' + options.replaceUnit, 'g');
  var ratio = options.wxappScreenWidth / options.screenWidth;
  var remPrecision = options.remPrecision;

  function getValue(val) {
    val = parseFloat(val.toFixed(remPrecision)); // control decimal precision of the calculated value
    return val == 0 ? val : val + options.unit;
  }

  return through.obj(function (file, enc, cb) {
    if (file.isNull()) {
      this.push(file);
      return cb();
    }

    if (file.isStream()) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'Streaming not supported'));
      return cb();
    }

    try {
      file.contents = Buffer.from(file.contents.toString().replace(reg, function (m, p1) {
        return p1 != 0 && p1 <= options.minPixelValue ? p1 + options.replaceUnit : getValue(p1 * ratio);
      }));
    } catch (err) {
      this.emit('error', new PluginError(PLUGIN_NAME, err));
    }

    this.push(file);

    return cb();
  });
}

module.exports = gulpPx2Rpx;
