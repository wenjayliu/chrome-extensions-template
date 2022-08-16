console.log('加载background.js')

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
