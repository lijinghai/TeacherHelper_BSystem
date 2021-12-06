import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import i18n from './lang' // internationalization
import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters

import 'xe-utils' // 导入vwe-table
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

Vue.use(VXETable)

// 导入vxe-table-plugin-export-xlsx
import VXETablePluginExportXLSX from 'vxe-table-plugin-export-xlsx'
VXETable.use(VXETablePluginExportXLSX)

VXETable.setup({
  icon: {
    // table
    TABLE_SORT_ASC: 'vxe-icon--caret-top',
    TABLE_SORT_DESC: 'vxe-icon--caret-bottom',
    TABLE_FILTER_NONE: 'vxe-icon--funnel',
    TABLE_FILTER_MATCH: 'vxe-icon--funnel',
    TABLE_EDIT: 'vxe-icon--edit-outline',
    TABLE_TREE_LOADED: 'vxe-icon--refresh roll',
    TABLE_TREE_OPEN: 'vxe-icon--caret-right rotate90',
    TABLE_TREE_CLOSE: 'vxe-icon--caret-right',
    TABLE_EXPAND_LOADED: 'vxe-icon--refresh roll',
    TABLE_EXPAND_OPEN: 'vxe-icon--arrow-right rotate90',
    TABLE_EXPAND_CLOSE: 'vxe-icon--arrow-right',

    // button
    BUTTON_DROPDOWN: 'vxe-icon--arrow-bottom',
    BUTTON_LOADING: 'vxe-icon--refresh roll',

    // select
    SELECT_OPEN: 'vxe-icon--caret-bottom rotate180',
    SELECT_CLOSE: 'vxe-icon--caret-bottom',

    // pager
    PAGER_JUMP_PREV: 'vxe-icon--d-arrow-left',
    PAGER_JUMP_NEXT: 'vxe-icon--d-arrow-right',
    PAGER_PREV_PAGE: 'vxe-icon--arrow-left',
    PAGER_NEXT_PAGE: 'vxe-icon--arrow-right',
    PAGER_JUMP_MORE: 'vxe-icon--more',

    // input
    INPUT_CLEAR: 'vxe-icon--close',
    INPUT_PWD: 'vxe-icon--eye-slash',
    INPUT_SHOW_PWD: 'vxe-icon--eye',
    INPUT_PREV_NUM: 'vxe-icon--caret-top',
    INPUT_NEXT_NUM: 'vxe-icon--caret-bottom',
    INPUT_DATE: 'vxe-icon--calendar',
    INPUT_SEARCH: 'vxe-icon--search',

    // modal
    MODAL_ZOOM_IN: 'vxe-icon--square',
    MODAL_ZOOM_OUT: 'vxe-icon--zoomout',
    MODAL_CLOSE: 'vxe-icon--close',
    MODAL_INFO: 'vxe-icon--info',
    MODAL_SUCCESS: 'vxe-icon--success',
    MODAL_WARNING: 'vxe-icon--warning',
    MODAL_ERROR: 'vxe-icon--error',
    MODAL_QUESTION: 'vxe-icon--question',
    MODAL_LOADING: 'vxe-icon--refresh roll',

    // toolbar
    TOOLBAR_TOOLS_REFRESH: 'fa fa-refresh',
    TOOLBAR_TOOLS_REFRESH_LOADING: 'vxe-icon--refresh roll',
    TOOLBAR_TOOLS_IMPORT: 'fa fa-upload',
    TOOLBAR_TOOLS_EXPORT: 'fa fa-download',
    TOOLBAR_TOOLS_ZOOM_IN: 'fa fa-arrows-alt',
    TOOLBAR_TOOLS_ZOOM_OUT: 'fa fa-expand',
    TOOLBAR_TOOLS_CUSTOM: 'fa fa-cog',

    // form
    FORM_PREFIX: 'vxe-icon--info',
    FORM_SUFFIX: 'vxe-icon--info',
    FORM_FOLDING: 'vxe-icon--arrow-top rotate180',
    FORM_UNFOLDING: 'vxe-icon--arrow-top'
  }
})

// 导入iconfont
import './assets/icon/css/font-awesome.min.css'

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
