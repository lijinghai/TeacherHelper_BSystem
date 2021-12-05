<!--用章管理-->
<template>
  <div>
    <vxe-table
      border
      :loading="loading"
      :data="tableData"
    >
      <vxe-column type="seq" width="60" />
      <vxe-column field="name" title="Name" />
      <vxe-column field="sex" title="Sex" />
      <vxe-column field="age" title="Age" />
      <vxe-column field="address" title="Address" show-overflow />
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
      tableData: []
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
