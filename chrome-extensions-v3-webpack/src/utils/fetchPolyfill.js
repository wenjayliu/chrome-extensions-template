/**
 * 用于插件js间通信的工具类
 * 这是个非常消耗性能的东西，个人开发测试用
 */
 export default class MessagePolyfill {
  constructor() {
    this.version = '1.0.0'
  }

  /** 单项通信，不需要获取返回值
   * @描述 通常用于触发chrome API   *
   * @param {*} url    模拟接口的地址
   * @param {*} data   发送的参数
   */
  unidirectionFetch(url, data) {
    const fetchOptions = {
      type: 'unidirectionFetch',
      url,
      data,
      requestId: '',
      responseId: '',
    }
    window.postMessage(fetchOptions, '*')
  }
  
  /**
   * postMessage通信的简单封装
   * @param {*} params
   * @returns
   */
  fetch(params, data) {
    return new Promise((resolve, reject) => {
      if (typeof params === 'string') {
        const fetchOptions = {
          type: 'fetch',
          url: params,
          data,
          requestId: '',
          responseId: '',
        }
        window.postMessage(fetchOptions, '*')
      }
    })
  }
}
