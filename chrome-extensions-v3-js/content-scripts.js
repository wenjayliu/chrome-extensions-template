/**
 * content_scripts
 * 注入页面的JS
 * 只能访问 extension、runtime等部分API	可以访问DOM	不可以js	不可以跨域
 * 多用于js间的通信
 */
// import test from './utils/test.js' // Cannot use import statement outside a module (at content-scripts.js:8:1)
console.log('加载content-scripts.js')

/******************************************************************可公共抽离的函数 */
/**
 * 异步等待某个值
 * @param {Function} prepare   监听函数
 * @param {Number} seconds     超时秒数;  默认6秒
 * @returns Promise
 *
 * eg. const res = await waitStart(() => window.aiCommonService, 0);
 */
async function waitStart(prepare, seconds = 6) {
  return new Promise((resolve, reject) => {
    let count = 0
    let timeOuter = null
    let timeInter = null

    if (typeof prepare !== 'function') {
      reject('第一个参数必须{Function}类型！')
      return
    }
    if (typeof seconds !== 'number') {
      reject('第一个参数必须{Number}类型！')
      return
    }
    if (!prepare) {
      reject('请设置参数！')
      return
    }
    if (!seconds || seconds <= 0) {
      reject('请设置超时秒数！')
      return
    }
    // 超时定时器
    timeOuter = setTimeout(() => {
      reject('timeout')
      clearInterval(timeInter)
    }, seconds * 1000)

    // 开启一个定时器(循环调用监听函数)
    timeInter = setInterval(() => {
      ++count
      if (prepare()) {
        clearInterval(timeInter)
        clearTimeout(timeOuter)
        resolve(prepare())
      }
    }, 100)
  })
}

/**
 * 注入页面js
 * @param {*} jsPath
 */
async function injectCustomJs(jsPath) {
  jsPath = jsPath || 'inject.js'
  var temp = document.createElement('script')
  temp.setAttribute('type', 'text/javascript')
  const url = chrome.runtime.getURL(jsPath)
  console.log('加载content-scripts.js-url', url)
  temp.src = url

  temp.onload = function () {
    // 放在页面不好看，执行完后移除掉
    // this.parentNode.removeChild(this)
  }
  await waitStart(() => document.head, 50)
  document.head.appendChild(temp)
}
/******************************************************************可公共抽离的函数end */

injectCustomJs('utils/AP.js') // 引入的文件需要加权限（web_accessible_resources）
injectCustomJs('inject.js') // 引入的文件需要加权限（web_accessible_resources）



function askBg(params) {
  chrome.runtime.sendMessage(params, (res) => {
    console.log('sendMessage返回值 ', res)
    window.postMessage({ type: 'askBgBack' }, '*')
  })
}

window.addEventListener('message', async (event) => {
  console.group('收到一个postMessage')
  console.log('内容', event)
  const { data } = event

  // 通知bg(background.js)
  if (data.type === 'tobg') {
    askBg(data)
  }

  console.groupEnd()
})
