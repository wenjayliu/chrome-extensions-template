console.log('加载content-scripts.js')
console.log('测试开发环境')
import { injectCustomJs } from './utils/index'

injectCustomJs('js/inject.js')


function askBackground(params) {
  chrome.runtime.sendMessage(params, (res) => {
    window.postMessage(res, '*')
  })
}

window.addEventListener('message', async (event) => {
  console.group('收到一个postMessage')
  console.log('内容', event)
  const { data } = event

  // 通知bg(background.js)
  if (data.responseId === '') {
    askBackground(data)
  }

  console.groupEnd()
})