<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item el-breadcrumb-item :to="{ path: '/home' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <el-row>
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>
    </el-card>
    <!-- 订单列表数据 -->
    <el-table :data="orderList" border stripe>
      <el-table-column type="index"></el-table-column>
      <el-table-column label="订单编号" prop="order_number"></el-table-column>
      <el-table-column label="订单价格" prop="order_price"></el-table-column>
      <el-table-column label="是否付款" prop="order_pay">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.order_pay === '1'" type="success">已付款</el-tag>
          <el-tag v-if="scope.row.order_pay === '0'" type="danger">未付款</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="是否发货" prop="is_send"></el-table-column>
      <el-table-column label="下单时间" prop="create_time">
        <template slot-scope="scope">
          {{scope.row.create_time*1000 | dateFormat}}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="warning" size="mini" icon="el-icon-edit" @click="showBox(scope.row)">编辑</el-button>
          <el-button type="success" size="mini" icon="el-icon-delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页区域 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <!-- 修改地址对话框 -->
    <el-dialog
      title="修改地址"
      :visible.sync="addressVisible"
      width="50%">
      <el-form :model="addressForm" :rules="addressFormRules" ref="addressFormRef" label-width="100px" class="demo-ruleForm">
        <el-form-item label="省市区/县" prop="address1">
          <el-input v-model="addressForm.address1"></el-input>
        </el-form-item>
        <el-form-item label="详细地址" prop="address2">
          <el-input v-model="addressForm.address2"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addressVisible = false">取 消</el-button>
        <el-button type="primary" @click="addressVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      queryInfo:{
        query: '',
        pagenum: 1,
        pagesize: 5,
      },
      orderList: [],
      total: 0,
      addressVisible: false,
      addressForm:{
        address1: [],
        address2: ''
      },
      addressFormRules: {
        address1:[{required: true, message: '请选择省市区/县', trigger: 'blur'}],
        address2:[{required: true, message: '请选择详细地址', trigger: 'blur'}]
      }
    }
  },
  created() {
    this.getOrderList()
  },
  methods: {
    async getOrderList() {
      const { data:res} = await this.$http.get('orders',{params:this.queryInfo})
      if (res.meta.status !== 200) {
        return this.$message.error('获取订单列表失败！')
      }
      this.total = res.data.total
      this.orderList = res.data.goods
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getOrderList()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getOrderList()
    },
    showBox() {
      this.addressVisible = true
    }
  }
}
</script>

<style lang="less" scoped>

</style>
