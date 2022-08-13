
;(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? (module.exports = factory())
    : typeof define === 'function' && define.amd
    ? define(factory)
    : ((global = global || self), (global.AP = factory()))
})(this, function () {
  'use strict'
  console.log('init-AP')
  /**
   * 初始化一个公共类
   * @param {*} options 
   */
  function AP(options) {
    if (!(this instanceof AP)) {
      warn('AP is a constructor and should be called with the `new` keyword')
    }
    // this._init(options);
  }

  AP.version = '0.0.1';
  return AP
})
