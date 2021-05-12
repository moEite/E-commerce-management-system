<template>
  <el-container>
    <el-header>
      <div>
        <img src="../assets/images/heima.png" alt="">
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button></el-header>
    <el-container>
<!--      侧边栏-->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
<!--        侧边栏菜单区域-->
        <el-menu
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#409eff"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          default-active="/users"
        >
<!--          一级菜单-->
          <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
<!--            一级菜单的模板区域-->
            <template slot="title" >
<!--              图标-->
              <i :class="iconsObj[item.id]"></i>
<!--              文本-->
              <span>{{item.authName}}</span>
            </template>
<!--            二级菜单-->
            <el-menu-item :index="'' + subItem.path + ''" v-for="subItem in item.children" :key="subItem.id" @click="saveNavState('/' + subItem.path)">
              <template slot="title">
<!--                图标-->
                <i class="el-icon-location"></i>
<!--                文本-->
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
<!--      右侧内容主题-->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
    export default {
      name: "Home",
      data() {
        return {
          menuList: [],
          iconsObj: {
            '125': 'iconfont icon-user',
            '103': 'iconfont icon-tijikongjian',
            '101': 'iconfont icon-shangpin',
            '102': 'iconfont icon-danju',
            '145': 'iconfont icon-baobiao'
          },
          // 是否折叠
          isCollapse: false,
          // 被激活的链接地址
          activePath: ''
        }
      },
      created() {
        this.getMenuList()
        this.activePath = window.sessionStorage.getItem('activePath')
      },
      methods: {
        logout() {
          window.sessionStorage.clear()
          console.log("这是token:" + window.sessionStorage.getItem('token'))
          this.$router.push('/login')
        },
        async getMenuList() {
          const result = await this.$http.get('menus')
          if (result.data.meta.status != 200)
            return this.$message.error(result.data.meta.msg)
          this.menuList = result.data.data
          console.log(this.menuList)
          // console.log(result.data)
        },
        //点击按钮切换菜单的折叠与展开
        toggleCollapse() {
          this.isCollapse=!this.isCollapse
        },
        // 保存链接的激活状态
        saveNavState(activePath){
          window.sessionStorage.setItem('activePath',activePath)
          this.activePath = activePath
        }
      }
    }
</script>

<style lang="less" scoped>
  .el-container{
    height: 100%;
  }
  .el-header{
    display: flex;
    justify-content: space-between;
    background-color: #373d41;
    align-items: center;
    color: #fff;
    font-size: 20px;
    >div{
      display: flex;
      align-items: center;
      span{
        margin-left: 15px;
      }
    }
  }
  .el-aside{
    background-color: #333744;
    .el-menu{
      border-right: none;
    }
  }
  .el-main{
    background-color: #eaedf1;
  }
  .iconfont{
    margin-right: 10px;
  }
  .toggle-button{
    background-color: #4a5064;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
  }
</style>
