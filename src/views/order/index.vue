<template>
  <div class="order-page">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部" name="first">
        <el-row>
          <el-col :span="12" :xs="24">
            <el-button style="margin-right:10px" size="mini" type="primary">导出数据</el-button>
            <el-button size="mini" type="danger">批量删除</el-button>
          </el-col>
          <el-col v-if="!isOpenAdvancedSearch" :span="12" :xs="24" style="text-align: right;">
            <el-input size="mini" style="width:200px;margin-right:10px" placeholder="请输入搜索关键词" />
            <el-button style="margin-right:10px" size="mini" type="info">搜索</el-button>
            <el-button size="mini" @click="isOpenAdvancedSearch = true">高级搜索</el-button>
          </el-col>
        </el-row>
        <!-- 高级搜索 -->
        <el-card v-if="isOpenAdvancedSearch" class="advanced-search">
          <div slot="header" class="search-header">
            <span>高级搜索</span>
            <span @click="isOpenAdvancedSearch = false">收起</span>
          </div>
          <avue-form v-model="searchForm" :option="searchOption" />
        </el-card>
        <!-- 订单表格 -->
        <avue-crud :option="orderOption" :data="orderData">
          <!-- 商品信息 -->
          <template slot="goodsInfo">
            <el-row>
              <el-col :span="12">
                <span>订单编号:</span>
                <div style="font-weight: 600;">202008181515</div>
              </el-col>
              <el-col :span="12">
                <span>下单时间:</span>
                <div style="font-weight: 600;">2020-08-18 18:30</div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <img
                  width="60px"
                  height="60px"
                  src="https://m.360buyimg.com/babel/jfs/t1/116009/18/12401/112831/5f0ff020Eef4700e2/051b7cb8da2d8d5a.jpg!q70.jpg"
                  alt
                >
              </el-col>
              <el-col class="goods-title" :span="16">OPPO Reno4 超级夜景视频 65W超级闪充 视频超级防抖</el-col>
            </el-row>
          </template>
          <!-- 实付款 -->
          <template slot="actualPayment">
            <span>￥4399</span>
            <p>(含运费:￥0.00)</p>
          </template>
          <!-- 支付方式 -->
          <template slot="paymentMode">
            <el-tag size="mini" type="success" effect="dark">微信支付</el-tag>
          </template>
          <!-- 交易状态 -->
          <template slot="status">
            <div style="margin-bottom:5px">
              <span style="margin-right:5px">付款状态:</span>
              <el-tag size="mini" effect="dark">已支付</el-tag>
            </div>
            <div style="margin-bottom:5px">
              <span style="margin-right:5px">发货状态:</span>
              <el-tag size="mini" type="info" effect="dark">待发货</el-tag>
            </div>
            <div style="margin-bottom:5px">
              <span style="margin-right:5px">收货状态:</span>
              <el-tag size="mini" type="info" effect="dark">待收货</el-tag>
            </div>
          </template>
          <!-- 查看订单详情 -->
          <template slot="menu">
            <el-button type="primary" size="small" plain>订单详情</el-button>
          </template>
        </avue-crud>
      </el-tab-pane>
      <el-tab-pane label="待付款" name="second">待付款</el-tab-pane>
      <el-tab-pane label="待发货" name="third">待发货</el-tab-pane>
      <el-tab-pane label="已发货" name="fourth">已发货</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'first',
      searchForm: {
        num: '',
        time: '',
        name: '',
        phone: ''
      },
      isOpenAdvancedSearch: false,
      searchOption: {
        submitText: '搜索',
        column: [
          {
            label: '订单编号',
            prop: 'num'
          },
          {
            label: '下单时间',
            prop: 'time',
            type: 'daterange'
          },
          {
            label: '收货人',
            prop: 'name'
          },
          {
            label: '手机号码',
            prop: 'phone'
          }
        ]
      },
      orderOption: {
        addBtn: false,
        refreshBtn: false,
        columnBtn: false,
        editBtn: false,
        delBtn: false,
        border: true,
        headerAlign: 'center',
        column: [
          {
            label: '商品信息',
            prop: 'goodsInfo',
            slot: true,
            width: 250
          },
          {
            label: '实付款',
            prop: 'actualPayment',
            slot: true,
            align: 'center'
          },
          {
            label: '买家',
            prop: 'buyer',
            align: 'center'
          },
          {
            label: '支付方式',
            prop: 'paymentMode',
            slot: true,
            align: 'center'
          },
          {
            label: '配送方式',
            prop: 'shippingMode',
            align: 'center'
          },
          {
            label: '交易状态',
            prop: 'status',
            align: 'center',
            slot: true,
            width: 200
          }
        ]
      },
      orderData: [
        {
          goodsInfo: {},
          actualPayment: {},
          buyer: '张国荣',
          shippingMode: '顺丰快递'
        },
        {
          goodsInfo: {},
          actualPayment: {},
          buyer: '张国荣',
          shippingMode: '顺丰快递'
        },
        {
          goodsInfo: {},
          actualPayment: {},
          buyer: '张国荣',
          shippingMode: '顺丰快递'
        }
      ]
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>
<style lang="scss" scoped>
.order-page {
  padding: 10px 20px;
  .advanced-search {
    margin-top: 20px;
    .search-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        font-size: 14px;
        &:nth-child(2) {
          color: teal;
          cursor: pointer;
        }
      }
    }
  }
  .goods-title {
    padding-left: 5px;
    font-size: 14px;
    color: rgb(24, 144, 255);
    overflow: hidden;
  }
}
</style>
