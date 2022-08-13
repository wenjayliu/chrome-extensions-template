console.log('加载background.js')

let color = 'red'

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color }) // 无法直观看到
  console.log('set storage color ', `color${color}`)
})

// 无法访问 window 对象，无法直接接受inject的事件
// window.addEventListener('message', async(event) => {
//     console.group('收到一个postMessage')
//     console.log('内容', event)
// })

// 监听来自content-script
chrome.runtime.onMessage.addListener(function (data, sender, sendResponse) {
  console.group('收到来自content-script的消息：', data, sender)
  let res = {}
  if (data.type === 'tobg') {
    res = {
      code: 200,
      data: 'up form background.js',
    }
  }
  sendResponse(res)
  console.groupEnd()
})
