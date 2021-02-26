<template>
  <el-button type="info" @click="logout">退出</el-button>
</template>

<script>
    export default {
      name: "Home",
      methods: {
        logout() {
          window.sessionStorage.clear()
          console.log("这是token:" + window.sessionStorage.getItem('token'))
          this.$router.push('/login')
        }
      }
    }
</script>

<style lang="less" scoped>

</style>
