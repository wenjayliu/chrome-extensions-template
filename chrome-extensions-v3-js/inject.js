// window['aiCommonService'] = {}
// var $ = document.querySelectorAll.bind(document);
;(function () {
  console.log('inject.js')

  /** ------------------------------------------------------------工具函数 */

  /**
   * 在某个元素下面创建元素，多用于创建容器为后期追加节点做准备
   * @param {*} ele          父元素
   * @param {*} eleId        创建元素的id
   */
  function creatDiv(ele, eleId) {
    var divDom = document.createElement('div')
    divDom.setAttribute('class', eleId)
    divDom.setAttribute('id', eleId)
    ele.appendChild(divDom)
  }

  function clickHanlde(id, callback) {
    let eleBtn = document.getElementById(id)
    eleBtn.addEventListener('click', callback, false)
  }
  /** ------------------------------------------------------------工具函数end */
  const bodyDom = document.querySelector('body') // 常用元素

  // 测试修改页面样式
  ;(function () {
    const scroll_cont = bodyDom.querySelector('#sb_form')
    if (scroll_cont && scroll_cont.style) {
      scroll_cont.style.backgroundColor = 'darkseagreen'
    }
  })()

  // 测试生成一个div
  creatDiv(bodyDom, 'test_container')
  const testContainerDom = document.querySelector('#test_container')

  // 测试获取生成的元素
  console.log('operateDom', testContainerDom)

  /**
   * 生成弹框和按钮
   * @param {*} data 
   */
  function updateTestContainerDom(data) {
    testContainerDom.innerHTML = `<div class="test_container_layout">
      <div id="tc_in">
        <h3>来自inject.js</h3>
        <button id="askContent">通知content</button>
        <button id="askBg">通知content + 通知bg</button>
        <button id="askBg">发送一个请求</button>
      </div>
    </div>`
  }

  updateTestContainerDom()

  // 通知content
  clickHanlde('askContent', () => {
    window.postMessage({ type: 'rawData' }, '*')
  })
  
  // 通知content + 通知bg
  clickHanlde('askBg', () => {
    window.postMessage({ type: 'tobg' }, '*')
  })

  window.addEventListener('message', async (event) => {
    console.group('inject-收到一个postMessage')
    console.log('event', event)
    console.groupEnd()
  })
})()
