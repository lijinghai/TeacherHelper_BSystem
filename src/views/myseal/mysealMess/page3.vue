<!-- 使用记录-->
<template>
  <div>

    <vxe-toolbar custom print :refresh="{query: findList}" import export>
      <template #buttons>
        <vxe-button @click="tableData = []">清空数据</vxe-button>
        <vxe-button @click="exportDataEvent">导出全部数据</vxe-button>
        <vxe-button @click="align = 'left'">居左</vxe-button>
        <vxe-button @click="align = 'center'">居中</vxe-button>
        <vxe-button @click="align = 'right'">居右</vxe-button>

        <vxe-button icon="fa fa-plus" status="perfect" content="新增" @click="insertEvent" />
        <vxe-button icon="fa fa-trash-o" status="perfect" content="删除" @click="getInsertEvent" />
        <vxe-button icon="fa fa-save" status="perfect" content="保存" @click="saveEvent" />
        <vxe-input v-model="filterName" type="search" placeholder="试试全表搜索" @keyup="searchEvent1" />
      </template>
    </vxe-toolbar>

    <vxe-table
      ref="xTable"
      highlight-current-row
      :show-header="true"
      border
      show-footer
      height="500"
      :align="align"
      :loading="loading"
      :import-config="tableImport"
      :export-config="tableExport"
      :merge-cells="mergeCells"
      :merge-footer-items="mergeFooterItems"
      :data="list1"
      :edit-config="{trigger: 'dblclick', mode: 'cell'}"
      :keyboard-config="{isArrow: true}"
      :row-config="{isHover: true}"
    >
      <vxe-column type="checkbox" width="60" />
      <vxe-column field="学号" title="学号" :edit-render="{autofocus: '.vxe-input--inner'}">
        <template #edit="{ row }">
          <vxe-input v-model="row.学号" type="text" />
        </template>
      </vxe-column>
      <vxe-column field="姓名" title="姓名" :edit-render="{}">
        <template #edit="{ row }">
          <vxe-input v-model="row.姓名" type="text" placeholder="请输入姓名" />
        </template>
      </vxe-column>
      <vxe-column field="性别" title="性别" :edit-render="{}">
        <template #edit="{ row }">
          <vxe-input v-model="row.性别" type="text" placeholder="请输入性别" />
        </template>
      </vxe-column>
      <vxe-column field="联系电话" title="联系电话" :edit-render="{}">
        <template #edit="{ row }">
          <vxe-input v-model="row.联系电话" type="text" placeholder="请输入联系电话" />
        </template>
      </vxe-column>
      <vxe-column field="班级" title="班级" :edit-render="{}">
        <template #edit="{ row }">
          <vxe-input v-model="row.班级" type="text" placeholder="请输入班级" />
        </template>
      </vxe-column>
      <vxe-column field="date12" title="Date" :edit-render="{}">
        <template #edit="{ row }">
          <vxe-input v-model="row.date12" type="date" placeholder="请选择日期" transfer />
        </template>
      </vxe-column>
      <vxe-column field="date13" title="Week" :edit-render="{}">
        <template #edit="{ row }">
          <vxe-input v-model="row.date13" type="week" placeholder="请选择日期" transfer />
        </template>
      </vxe-column>
      <vxe-column title="操作" width="500">
        <template #default="{ row }">
          <vxe-button type="text" status="primary" @click="insertRow(row, 'current')">插入节点</vxe-button>
          <vxe-button type="text" status="primary" @click="insertRow(row, 'top')">顶部插入节点</vxe-button>
          <vxe-button type="text" status="primary" @click="insertRow(row, 'bottom')">尾部插入子节点</vxe-button>
          <vxe-button type="text" status="primary" @click="removeRow(row)">删除节点</vxe-button>
        </template>
      </vxe-column>

      <template #empty>
        <span style="color: red;">
          <img src="/img/img2.gif">
          <p>没有更多数据了！</p>
        </span>
      </template>
    </vxe-table>

  </div>
</template>

<script>

import XEUtils from 'xe-utils'

export default {
  data() {
    return {
      list1: [],
      filterName: '',
      loading: false,
      align: null,
      tableData: [],
      tableImport: {
        // 自定义类型
        types: ['xlsx']
      },
      tableExport: {
        // 默认选中类型
        type: 'xlsx',
        // 自定义类型
        types: ['xlsx', 'csv', 'html', 'xml', 'txt']
      },
      mergeCells: [],
      mergeFooterItems: []
    }
  },
  created() {
    this.searchEvent1()
    this.findList()
    this.loading = true
  },
  methods: {
    searchEvent1() {
      const filterName = XEUtils.toValueString(this.filterName).trim().toLowerCase()
      if (filterName) {
        const filterRE = new RegExp(filterName, 'gi')
        const searchProps = ['name', 'role', 'age', 'address']
        // const searchProps = ['学号', '姓名', '班级', '联系电话', 'data12', 'date13']
        const rest = this.tableData.filter(item => searchProps.some(key => XEUtils.toValueString(item[key]).toLowerCase().indexOf(filterName) > -1))
        this.list1 = rest.map(row => {
          const item = Object.assign({}, row)
          searchProps.forEach(key => {
            item[key] = XEUtils.toValueString(item[key]).replace(filterRE, match => `<span class="keyword-lighten">${match}</span>`)
          })
          return item
        })
      } else {
        this.list1 = this.tableData
      }
    },
    // 数据展示
    findList() {
      this.loading = true
      return new Promise(resolve => {
        setTimeout(() => {
          this.tableData = []
          // this.mergeFooterItems = [
          //   { row: 0, col: 1, rowspan: 2, colspan: 2 },
          //   { row: 1, col: 5, rowspan: 1, colspan: 3 }
          // ]
          this.loading = false
          resolve()
        }, 100)
      })
    },
    // 新增数据
    insertEvent() {
      const $table = this.$refs.xTable
      const newRow = {
        name: '新数据',
        date: XEUtils.toDateString(new Date(), 'yyyy-MM-dd')
      }
      $table.insert(newRow).then(({ row }) => $table.setActiveRow(row))
    },
    async insertRow(currRow, locat) {
      const $table = this.$refs.xTable
      // 如果 null 则插入到目标节点顶部
      // 如果 -1 则插入到目标节点底部
      // 如果 row 则有插入到效的目标节点该行的位置
      if (locat === 'current') {
        const record = {
          name: '新数据',
          id: Date.now(),
          parentId: currRow.parentId, // 父节点必须与当前行一致
          date: XEUtils.toDateString(new Date(), 'yyyy-MM-dd')
        }
        const { row: newRow } = await $table.insertAt(record, currRow)
        await $table.setActiveRow(newRow) // 插入子节点
      } else if (locat === 'top') {
        const record = {
          name: '新数据',
          id: Date.now(),
          parentId: currRow.id, // 需要指定父节点，自动插入该节点中
          date: XEUtils.toDateString(new Date(), 'yyyy-MM-dd')
        }
        const { row: newRow } = await $table.insert(record)
        await $table.setTreeExpand(currRow, true) // 将父节点展开
        await $table.setActiveRow(newRow) // 插入子节点
      } else if (locat === 'bottom') {
        const record = {
          name: '新数据',
          id: Date.now(),
          parentId: currRow.id, // 需要指定父节点，自动插入该节点中
          date: XEUtils.toDateString(new Date(), 'yyyy-MM-dd')
        }
        const { row: newRow } = await $table.insertAt(record, -1)
        await $table.setTreeExpand(currRow, true) // 将父节点展开
        await $table.setActiveRow(newRow) // 插入子节点
      }
    },
    async removeRow(row) {
      const $table = this.$refs.xTable
      await $table.remove(row)
    },
    reload() {
      const $table = this.$refs.xTable
      // 清除所有状态
      $table.clearAll()
      return this.findList()
    },
    getInsertEvent() {
      const $table = this.$refs.xTable
      const insertRecords = $table.getInsertRecords()
      this.$XModal.alert(insertRecords.length)
    },
    getRemoveEvent() {
      const $table = this.$refs.xTable
      const removeRecords = $table.getRemoveRecords()
      this.$XModal.alert(removeRecords.length)
    },
    getUpdateEvent() {
      const $table = this.$refs.xTable
      const updateRecords = $table.getUpdateRecords()
      this.$XModal.alert(updateRecords.length)
    },
    saveEvent() {
      const $table = this.$refs.xTable
      const { insertRecords, removeRecords, updateRecords } = $table.getRecordset()
      this.$XModal.alert(`insertRecords=${insertRecords.length} removeRecords=${removeRecords.length} updateRecords=${updateRecords.length}`)
    },
    formatterSex({ cellValue }) {
      return cellValue ? (cellValue === '1' ? '男' : '女') : ''
    },
    exportDataEvent() {
      this.$refs.xTable.exportData({
        filename: '导出',
        sheetName: 'Sheet1',
        type: 'xlsx'
      })
    },
    meanNum(list, field) {
      let count = 0
      list.forEach(item => {
        count += Number(item[field])
      })
      return count / list.length
    },
    sumNum(list, field) {
      let count = 0
      list.forEach(item => {
        count += Number(item[field])
      })
      return count
    }
    // footerMethod({ columns, data }) {
    //   const means = []
    //   const sums = []
    //   columns.forEach((column, columnIndex) => {
    //     if (columnIndex === 0) {
    //       means.push('平均')
    //       sums.push('和值')
    //     } else {
    //       let meanCell = '-'
    //       let sumCell = '-'
    //       switch (column.property) {
    //         case 'rate':
    //         case 'num':
    //         case 'num1':
    //         case 'num2':
    //           meanCell = parseInt(this.meanNum(data, column.property))
    //           sumCell = this.sumNum(data, column.property)
    //           break
    //       }
    //       means.push(meanCell)
    //       sums.push(sumCell)
    //     }
    //   })
    //   // 返回一个二维数组的表尾合计
    //   return [means, sums]
    // }
  }
}

</script>

<style scoped>
.keyword-lighten {
  color: #000;
  background-color: #FFFF00;
}

</style>
