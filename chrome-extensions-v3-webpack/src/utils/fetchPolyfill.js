
/**
 * postMessage通信的简单封装
 * @param {*} params 
 * @returns 
 */
export function fetchPolyfill(params) {
  return new Promise((resolve, reject) => {
    if (typeof params === 'string') {
      const fetchOptions = {
        url: params,
        requestId: '',
        responseId: ''
      }
      window.postMessage(fetchOptions, '*')
    }
  })
}
