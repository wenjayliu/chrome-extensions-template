console.log('inject.js')
console.log('inject.js-889966')
// ;(function () {
// })
import MessagePolyfill from './utils/fetchPolyfill'

window['messagePolyfill'] = new MessagePolyfill()
