console.log('加载background.js')

// 监听来自content-script
chrome.runtime.onMessage.addListener(async function (
  data,
  sender,
  sendResponse
) {
  console.log('收到来自content-script的消息：', data, sender)
  if (data.url && APIs[data.url]) {
    const res = await APIs[data.url](data.data)
    sendResponse(res)
  } else {
    console.log('todo', data)
  }
})

// 接口
const APIs = {
  // {url: 'https://www.baidu.com'}
  chromeTabsCreate: (params) => {
    chrome.tabs.create(params)
  },
  reload: () => {
    chrome.runtime.reload()
  }
}
