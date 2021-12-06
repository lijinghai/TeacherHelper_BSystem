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

import XEUtils from 'xe-utils'
import {

  // 功能模块
  Icon,
  Filter,
  Menu,
  Edit,
  Export,
  Keyboard,
  Validator,
  Header,
  Footer,

  // 可选组件
  // Column,
  // Colgroup,
  // Grid,
  // Toolbar,
  // Pager,
  // Checkbox,
  // CheckboxGroup,
  // Radio,
  // RadioGroup,
  // RadioButton,
  // Input,
  // Textarea,
  // Button,
  // Modal,
  // Tooltip,
  // Form,
  // FormItem,
  // FormGather,
  // Select,
  // Optgroup,
  // Option,
  // Switch,
  // List,
  // Pulldown,

  // 表格
  Table
} from 'vxe-table'

import zhCN from 'vxe-table/lib/locale/lang/zh-CN'

// 按需加载的方式默认是不带国际化的，自定义国际化需要自行解析占位符 '{0}'，例如：
VXETable.setup({
  size: null, // 全局尺寸
  zIndex: 999, // 全局 zIndex 起始值，如果项目的的 z-index 样式值过大时就需要跟随设置更大，避免被遮挡
  version: 0, // 版本号，对于某些带数据缓存的功能有用到，上升版本号可以用于重置数据
  table: {
    showHeader: true,
    keepSource: false,
    delayHover: 250,
    showOverflow: null,
    showHeaderOverflow: null,
    showFooterOverflow: null,
    size: null,
    resizable: false,
    autoResize: false,
    stripe: false,
    border: false,
    round: false,
    emptyText: '暂无数据',
    radioConfig: {
      trigger: 'default'
    },
    checkboxConfig: {
      strict: false,
      highlight: false,
      range: false,
      trigger: 'default'
    },
    sortConfig: {
      remote: false,
      trigger: 'default',
      orders: ['asc', 'desc', null],
      sortMethod: null
    },
    filterConfig: {
      remote: false,
      filterMethod: null
    },
    expandConfig: {
      trigger: 'default',
      showIcon: true
    },
    treeConfig: {
      children: 'children',
      hasChild: 'hasChild',
      indent: 20,
      showIcon: true
    },
    tooltipConfig: {
      theme: 'dark',
      enterable: false
    },
    menuConfig: {
      visibleMethod() {}
    },
    rowId: '_X_ID', // 行数据的唯一主键字段名
    editConfig: {
      mode: 'cell',
      showAsterisk: true
    },
    importConfig: {
      modes: ['insert', 'covering']
    },
    exportConfig: {
      modes: ['current', 'selected']
    },
    customConfig: {
      storage: false
    },
    scrollX: {
      gt: 60
    },
    scrollY: {
      gt: 100
    }
  },
  grid: {
    size: null,
    zoomConfig: {
      escRestore: true
    },
    pagerConfig: {
      perfect: false
    },
    toolbarConfig: {
      perfect: false
    },
    proxyConfig: {
      autoLoad: true,
      message: true,
      props: {
        list: null, // 用于列表，读取响应数据
        result: 'result', // 用于分页，读取响应数据
        total: 'page.total' // 用于分页，读取总条数
      },
      beforeItem: null,
      beforeColumn: null,
      beforeQuery: null,
      afterQuery: null,
      beforeDelete: null,
      afterDelete: null,
      beforeSave: null,
      afterSave: null
    }
  },
  pager: {
    size: null,
    autoHidden: false,
    perfect: true,
    pageSize: 10,
    pagerCount: 7,
    pageSizes: [10, 15, 20, 50, 100],
    layouts: ['PrevJump', 'PrevPage', 'Jump', 'PageCount', 'NextPage', 'NextJump', 'Sizes', 'Total']
  },
  form: {
    preventSubmit: false,
    validConfig: {
      autoPos: true
    },
    size: null,
    colon: false,
    titleAsterisk: true
  },
  input: {
    size: null,
    transfer: false,
    parseFormat: 'yyyy-MM-dd HH:mm:ss.SSS',
    labelFormat: '',
    valueFormat: '',
    startDay: 1,
    digits: 2,
    controls: true
  },
  textarea: {
    size: null,
    autosize: {
      minRows: 1,
      maxRows: 10
    }
  },
  select: {
    size: null,
    transfer: false,
    multiCharOverflow: 8
  },
  toolbar: {
    size: null,
    import: {
      mode: 'covering'
    },
    export: {
      types: ['xlsx', 'csv', 'html', 'xml', 'txt']
    },
    custom: {
      isFooter: true
    },
    buttons: [],
    tools: []
  },
  button: {
    size: null,
    transfer: false
  },
  radio: {
    size: null
  },
  checkbox: {
    size: null
  },
  switch: {
    size: null
  },
  modal: {
    // size: null,
    minWidth: 340,
    minHeight: 200,
    lockView: true,
    mask: true,
    duration: 3000,
    marginSize: 0,
    dblclickZoom: true,
    showTitleOverflow: true,
    storage: false
  },
  list: {
    scrollY: {
      gt: 100
    }
  },
  i18n: (key, args) => XEUtils.toFormatString(XEUtils.get(zhCN, key), args)
})
// 表格功能
Vue.use(Header)
  .use(Footer)
  .use(Icon)
  .use(Filter)
  .use(Edit)
  .use(Menu)
  .use(Export)
  .use(Keyboard)
  .use(Validator)

// 可选组件
// .use(Column)
// .use(Colgroup)
// .use(Grid)
// .use(Toolbar)
// .use(Pager)
// .use(Checkbox)
// .use(CheckboxGroup)
// .use(Radio)
// .use(RadioGroup)
// .use(RadioButton)
// .use(Input)
// .use(Textarea)
// .use(Button)
// .use(Modal)
// .use(Tooltip)
// .use(Form)
// .use(FormItem)
// .use(FormGather)
// .use(Select)
// .use(Optgroup)
// .use(Option)
// .use(Switch)
// .use(List)
// .use(Pulldown)

  // 安装表格
  .use(Table)

// 给 vue 实例挂载内部对象，例如：
Vue.prototype.$XModal = VXETable.modal
Vue.prototype.$XPrint = VXETable.print
Vue.prototype.$XSaveFile = VXETable.saveFile
Vue.prototype.$XReadFile = VXETable.readFile

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
