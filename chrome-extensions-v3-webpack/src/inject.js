console.log('inject.js')
console.log('inject.js-889966')
// ;(function () {
// })
import { fetchPolyfill } from './utils/fetchPolyfill'

window[fetchPolyfill] = fetchPolyfill
