<!--申请记录-->
<template>
  <div>
    <vxe-toolbar>
      <template #buttons>
        <vxe-button @click="clearDataEvent">清空数据</vxe-button>
        <vxe-button @click="exportDataEvent">导出数据</vxe-button>
        <vxe-button @click="importDataEvent">导入数据</vxe-button>
      </template>
    </vxe-toolbar>

    <!--    <vxe-table-->
    <!--      highlight-hover-row-->
    <!--      ref="xTable"-->
    <!--      height="400"-->
    <!--      :export-config="{}"-->
    <!--      :data="tableData">-->
    <!--&lt;!&ndash;      <vxe-column type="seq" width="60"></vxe-column>&ndash;&gt;-->
    <!--      <vxe-column field="学号" title="学号"></vxe-column>-->
    <!--      <vxe-column field="姓名" title="姓名"></vxe-column>-->
    <!--      <vxe-column field="性别" title="性别" sortable></vxe-column>-->
    <!--      <vxe-column field="联系电话" title="联系电话" sortable></vxe-column>-->
    <!--      <vxe-column field="班级" title="班级" show-overflow></vxe-column>-->
    <!--      <template #empty>-->
    <!--            <span style="color: red;">-->
    <!--              <img src="/img/img2.gif">-->
    <!--              <p>没有更多数据了！</p>-->
    <!--            </span>-->
    <!--      </template>-->
    <!--    </vxe-table>-->

    <vxe-table
      ref="xTable"
      highlight-hover-row
      height="400"
      :export-config="{}"
      border
      resizable
      show-overflow
      :data="tableData"
      :edit-config="{trigger: 'dblclick', mode: 'cell'}"
    >
      <!--      <vxe-column type="seq" width="60"></vxe-column>-->
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
          <vxe-input v-model="row.性别" type="number" placeholder="请输入性别" />
        </template>
      </vxe-column>
      <vxe-column field="联系电话" title="联系电话" :edit-render="{}">
        <template #edit="{ row }">
          <vxe-input v-model="row.联系电话" type="number" placeholder="请输入联系电话" />
        </template>
      </vxe-column>
      <vxe-column field="班级" title="班级" :edit-render="{}">
        <template #edit="{ row }">
          <vxe-input v-model="row.性别" type="number" placeholder="请输入班级" />
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

      <!--      <vxe-column field="address" title="Address" :edit-render="{}">-->
      <!--        <template #edit="{ row }">-->
      <!--          <vxe-input v-model="row.address" type="text"></vxe-input>-->
      <!--        </template>-->
      <!--      </vxe-column>-->
      <!--      <vxe-column field="sex" title="Sex" :edit-render="{}">-->
      <!--        <template #default="{ row }">-->
      <!--          <span>{{ formatSex(row.sex) }}</span>-->
      <!--        </template>-->
      <!--        <template #edit="{ row }">-->
      <!--          <vxe-select v-model="row.sex" transfer>-->
      <!--            <vxe-option v-for="item in sexList" :key="item.value" :value="item.value" :label="item.label"></vxe-option>-->
      <!--          </vxe-select>-->
      <!--        </template>-->
      <!--      </vxe-column>-->
      <!--      <vxe-column field="sex2" title="多选下拉" :edit-render="{}">-->
      <!--        <template #default="{ row }">-->
      <!--          <span>{{ formatMultiSex(row.sex2) }}</span>-->
      <!--        </template>-->
      <!--        <template #edit="{ row }">-->
      <!--          <vxe-select v-model="row.sex2" multiple transfer>-->
      <!--            <vxe-option v-for="item in sexList" :key="item.value" :value="item.value" :label="item.label"></vxe-option>-->
      <!--          </vxe-select>-->
      <!--        </template>-->
      <!--      </vxe-column>-->

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
      tableData: [
        // { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, address: 'test abc' },
        // { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, address: 'Guangzhou' },
        // { id: 10003, name: 'Test3', role: 'PM', sex: '1', age: 32, address: 'Shanghai' },
        // { id: 10004, name: 'Test4', role: 'Designer', sex: '0', age: 23, address: 'test abc' },
        // { id: 10005, name: 'Test5', role: 'Develop', sex: '0', age: 30, address: 'Shanghai' },
        // { id: 10006, name: 'Test6', role: 'Designer', sex: '0', age: 21, address: 'test abc' },
        // { id: 10007, name: 'Test7', role: 'Test', sex: '1', age: 29, address: 'test abc' },
        // { id: 10008, name: 'Test8', role: 'Develop', sex: '1', age: 35, address: 'test abc' }
      ]
    }
  },
  created() {
    this.loading = true
    setTimeout(() => {
      this.tableData = []
      this.loading = false
    }, 1000)
  },
  methods: {
    clearDataEvent() {
      this.tableData = []
    },
    exportDataEvent() {
      this.$refs.xTable.openExport({
        // 默认勾选源
        original: true
      })
    },
    importDataEvent() {
      this.$refs.xTable.importData(
        { types: ['xls', 'xlsx'] }
      )
    }
  }
}
</script>

<style scoped>

</style>
