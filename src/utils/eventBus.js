import Vue from 'vue'

// 直接导出一个空的 Vue 实例
export default new Vue()
// a给b发送数据
// b注册通信事件
/**
 * import eventBus from ..
 * eventBUs.$on('fnName', (data) => {
 *    some code
 * })
 */

// a发布通信事件
/**
 * import 同上
 * eventBus.$emit('fnName', data)
 */
