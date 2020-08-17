<template>
  <div class="product-page">
    <!-- 查询选择,输入框 -->
    <el-row class="query">
      <el-col :span="8">
        <span>商品编号:</span>
        <el-input v-model="query.num" size="small" style="width:70%" placeholder="请输入编号" />
      </el-col>
      <el-col :span="8">
        <span>商品名称:</span>
        <el-input v-model="query.name" size="small" style="width:70%" placeholder="请输入商品名称" />
      </el-col>
      <el-col :span="8">
        <span>商品状态:</span>
        <avue-select
          v-model="query.status"
          style="width:70%"
          size="small"
          placeholder="请选择商品状态"
          type="tree"
          :dic="statusDic"
        />
      </el-col>
      <el-col :span="8">
        <span>商品类别:</span>
        <avue-select
          v-model="query.categoryID"
          size="small"
          style="width:70%"
          placeholder="请选择商品类别"
          type="tree"
          :dic="categoryDic"
        />
      </el-col>
      <el-col :span="8">
        <span>商品标签:</span>
        <avue-select
          v-model="query.tagID"
          size="small"
          style="width:70%"
          placeholder="请选择商品标签"
          type="tree"
          :dic="tagDic"
        />
      </el-col>
      <!-- 查询按钮 -->
      <el-col :span="8" class="query-btn">
        <el-button size="small" type="primary">查询</el-button>
        <el-button size="small">重置</el-button>
      </el-col>
    </el-row>

    <!-- 添加商品 -->
    <div class="add-good">
      <i class="el-icon-plus" />
      <span>添加商品</span>
    </div>
    <!-- 商品列表 -->
    <div class="goods-list">
      商品列表
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: {
        name: '皇家族纪念品',
        num: '20200820153',
        status: 1,
        categoryID: 1,
        tagID: 1
      },
      statusDic: [
        { label: '在售', value: 1 },
        { label: '已下架', value: 2 }
      ],
      categoryDic: [
        { label: '衣服', value: 1 },
        { label: '手机', value: 2 }
      ],
      tagDic: [
        { label: '热销', value: 1 },
        { label: '火爆', value: 2 }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.product-page {
  padding: 30px;
  background-color: #f4f4f4;
  // 查询
  .query {
    padding: 20px 20px 0;
    background-color: #ffffff;
    .el-col {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      span {
        margin-right: 10px;
        font-size: 14px;
      }
    }
    .query-btn{
      justify-content: flex-end;
      padding-right: 50px;
    }
  }
  // 添加商品
  .add-good{
    padding: 30px;
    background-color: #ffffff;
    margin-top: 30px;
    text-align: center;
    border: 1px dashed #dddddd;
    cursor: pointer;
    &:hover{
      border-color: #1890ff;
    }
    span{
      font-size: 14px;
      margin-left: 10px;
    }
  }
  // 商品列表
  .goods-list{
    margin-top: 30px;
  }
}
</style>
