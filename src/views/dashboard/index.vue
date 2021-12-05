<!--首页-->
<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import editorDashboard from './editor'

export default {
  name: 'Dashboard',
  components: { adminDashboard, editorDashboard },
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    if (!this.roles.includes('admin')) {
      this.currentRole = 'editorDashboard'
    }
    console.log(' __    _         _   _                       __               _')
    console.log('[  |  (_)       (_) (_)                     [  |             (_)')
    console.log(' | |  __        __  __   _ .--.   .--./)     | |--.   ,--.   __')
    console.log(' | | [  |      [  |[  | [ `.-. | / /`\;       | .-. | ``_\ : [  |')
    console.log(' | |  | |    _  | | | |  | | | | \ \._//       | | | | // | |, | |')
    console.log('[___][___]  [ \_| |[___][___||__].,__`       [___]|__]\`-;__/[___]')
    console.log('             \____/             ( ( __))')
    console.log(' ')
    console.log('my Email : lijinghailjh@163.com')
    console.log('my Github: https://github.com/lijinghailjh')
    console.log('( ͡° ͜ʖ ͡°)✧ *************************************************************')
    console.log(' ')
  }
}
</script>
