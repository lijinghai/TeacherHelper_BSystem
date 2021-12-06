<!-- 使用记录-->
<template>
  <div>

    <vxe-toolbar custom print :refresh="{query: findList}" :import="{name: '在'}" export>
      <template #buttons>
        <vxe-button @click="tableData = []">清空数据</vxe-button>
        <vxe-button @click="exportDataEvent">导出全部数据</vxe-button>
        <vxe-button @click="align = 'left'">居左</vxe-button>
        <vxe-button @click="align = 'center'">居中</vxe-button>
        <vxe-button @click="align = 'right'">居右</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      ref="xTable"
      :show-header="true"
      border
      show-footer
      height="500"
      :align="align"
      :loading="loading"
      :footer-method="footerMethod"
      :import-config="tableImport"
      :export-config="tableExport"
      :merge-cells="mergeCells"
      :merge-footer-items="mergeFooterItems"
      :data="tableData"
      :edit-config="{trigger: 'dblclick', mode: 'cell'}"
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
      <!--      <vxe-column field="学号" title="学号" />-->
      <!--      <vxe-column field="姓名" title="姓名" />-->
      <!--      <vxe-column field="联系电话" title="联系电话" />-->
      <!--      <vxe-column field="班级" title="班级" />-->

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
export default {
  data() {
    return {
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
    this.findList()
    this.loading = true
    setTimeout(() => {
      this.tableData = []
      this.loading = false
    }, 1000)
  },
  methods: {
    // tableImport() {
    //   this.$refs.xTable.importData(
    //     { types: ['xls', 'xlsx'] }
    //   )
    // },
    findList() {
      this.loading = true
      setTimeout(() => {
        this.tableData = []
        this.mergeFooterItems = [
          { row: 0, col: 1, rowspan: 2, colspan: 2 },
          { row: 1, col: 5, rowspan: 1, colspan: 3 }
        ]
        this.loading = false
      }, 100)
      console.log('this.tableData')
      console.log(this.tableData)
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

</style>
