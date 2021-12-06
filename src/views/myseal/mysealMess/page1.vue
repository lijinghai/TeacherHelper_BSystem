<!--用章管理-->
<template>
  <div>
    <vxe-grid v-bind="gridOptions">
      <template #name_edit="{ row }">
        <vxe-input v-model="row.name" />
      </template>
      <template #nickname_edit="{ row }">
        <vxe-input v-model="row.nickname" />
      </template>
      <template #role_edit="{ row }">
        <vxe-input v-model="row.role" />
      </template>
      <template #address_edit="{ row }">
        <vxe-input v-model="row.address" />
      </template>
      <template #empty>
        <span style="color: red;">
          <img src="/img/img2.gif">
          <p>没有更多数据了！</p>
        </span>
      </template>
    </vxe-grid>
  </div>
</template>

<script>
export default {
  data() {
    return {
      gridOptions: {
        border: true,
        resizable: true,
        keepSource: true,
        height: 500,
        printConfig: {},
        importConfig: {},
        exportConfig: {},
        pagerConfig: {
          perfect: true,
          pageSize: 15
        },
        editConfig: {
          trigger: 'click',
          mode: 'row',
          showStatus: true
        },
        toolbarConfig: {
          buttons: [
            { code: 'insert_actived', name: '新增', status: 'perfect', icon: 'fa fa-plus' },
            { code: 'mark_cancel', name: '标记/取消', status: 'perfect', icon: 'fa fa-trash-o' },
            { code: 'save', name: '保存', status: 'perfect', icon: 'fa fa-save' }
          ],
          perfect: true,
          refresh: {
            icon: 'fa fa-refresh',
            iconLoading: 'fa fa-spinner fa-spin'
          },
          import: {
            icon: 'fa fa-upload'
          },
          export: {
            icon: 'fa fa-download'
          },
          print: {
            icon: 'fa fa-print'
          },
          zoom: {
            iconIn: 'fa fa-arrows-alt',
            iconOut: 'fa fa-expand'
          },
          custom: {
            icon: 'fa fa-cog'
          }
        },
        proxyConfig: {
          props: {
            result: 'result',
            total: 'page.total'
          },
          ajax: {
            // 接收 Promise
            query: ({ page }) => {
              return new Promise(resolve => {
                setTimeout(() => {
                  const list = []
                  resolve({
                    page: {
                      total: list.length
                    },
                    result: list.slice((page.currentPage - 1) * page.pageSize, page.currentPage * page.pageSize)
                  })
                }, 100)
              })
            },
            // body 对象： { removeRecords }
            delete: () => {
              return new Promise(resolve => {
                setTimeout(() => {
                  resolve({})
                }, 100)
              })
            },
            // body 对象： { insertRecords, updateRecords, removeRecords, pendingRecords }
            save: () => {
              return new Promise(resolve => {
                setTimeout(() => {
                  resolve({})
                }, 100)
              })
            }
          }
        },
        columns: [
          { type: 'checkbox', width: 50 },
          { type: 'seq', width: 60 },
          { field: '学号', title: '学号', editRender: { autofocus: '.vxe-input--inner' }, slots: { edit: 'name_edit' }},
          { field: '姓名', title: '姓名', editRender: {}, slots: { edit: 'nickname_edit' }},
          { field: '性别', title: '性别', editRender: {}, slots: { edit: 'role_edit' }},
          { field: '联系电话', title: '联系电话', showOverflow: true, editRender: {}, slots: { edit: 'address_edit' }},
          { field: '班级', title: '班级', showOverflow: true, editRender: {}, slots: { edit: 'address_edit' }}
        ]
      }
    }
  },
  created() {
    this.loading = true
    setTimeout(() => {
      this.tableData = []
      this.loading = false
    }, 1000)
  }
}

</script>

<style scoped>

</style>
