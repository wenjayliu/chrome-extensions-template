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
  console.group('收到一个postMessage2')
  console.log('内容', event)
  console.groupEnd()
  const { data } = event
  if (data.type === 'unidirectionFetch') {
      chrome.runtime.sendMessage(data)
  }

  if (data.type === 'fetch') {
    // askBackground(data)
  }
})
