<template>
  <div class="product-page">
    <!-- 查询选择,输入框 -->
    <el-row class="query">
      <el-col :span="12" :xs="24">
        <span>商品编号:</span>
        <el-input v-model="query.num" size="small" style="width:70%" placeholder="请输入编号" />
      </el-col>
      <el-col :span="12" :xs="24">
        <span>商品名称:</span>
        <el-input v-model="query.name" size="small" style="width:70%" placeholder="请输入商品名称" />
      </el-col>
      <el-col :span="12" :xs="24">
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
      <el-col :span="12" :xs="24">
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
      <el-col :span="12" :xs="24">
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
      <el-col :span="12" :xs="24" class="query-btn">
        <el-button style="margin-right:10px" size="small" type="primary">查询</el-button>
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
      <el-row>
        <el-col v-for="item in 6" :key="item" :span="12">
          <div class="goods-item">
            <div class="goods-info">
              <img
                src="https://alpsimpleshop.blob.core.windows.net/images/commodity/c3d7b38ec7ef442ca0cba6bc607733b1.jpg"
              >
              <div class="right">
                <div class="top">
                  <div class="title">皇家族纪念品</div>
                  <div class="tag">
                    <el-tag size="mini" style="margin-right:10px" type="danger">推荐商品</el-tag>
                    <el-tag size="mini">新品</el-tag>
                  </div>
                </div>
                <div class="goods-tag">
                  <el-tag size="mini" style="margin-right:10px" type="success">液体</el-tag>
                  <el-tag size="mini">热销</el-tag>
                </div>
                <div class="num">编号：202008181022</div>
                <div class="price">
                  <span>单价：￥299</span>
                  <span>折扣价：￥159</span>
                  <span>库存：99</span>
                </div>
                <div class="desc">商品描述定金十说定金十九点就的角商品描述说定金十九点就的角色商品描述说定金十九点就的角色色</div>
                <!-- 下架，在售 -->
                <div class="status">
                  <el-tag size="mini" effect="dark">在售</el-tag>
                </div>
              </div>
            </div>
            <div class="footer">
              <div class="edit-goods" @click="handleEditGoods">编辑</div>
              <div class="delete-goods" @click="handleDelGoods">删除</div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 添加商品 -->
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
  },
  methods: {
    // 编辑商品
    handleEditGoods() {},
    // 删除商品
    handleDelGoods() {
      this.$confirm(`您确定要删除该商品吗？`, '提示')
        .then(() => {
          this.$message.success('删除成功!')
        })
        .catch(() => {
          console.log('您取消了操作')
        })
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
    .query-btn {
      justify-content: flex-end;
      padding-right: 50px;
    }
  }
  // 添加商品
  .add-good {
    padding: 30px;
    background-color: #ffffff;
    margin-top: 30px;
    text-align: center;
    border: 1px dashed #dddddd;
    cursor: pointer;
    &:hover {
      border-color: #1890ff;
    }
    span {
      font-size: 14px;
      margin-left: 10px;
    }
  }
  // 商品列表
  .goods-list {
    margin-top: 10px;
    .el-col {
      padding: 20px;
      .goods-item {
        background-color: #ffffff;
        &:hover{
          box-shadow: 10px 10px 10px rgba(0,0,0,.1);
          transform: translateY(-5px) scale(1.05);
          transition: all 0.2s ease-in;
          border-radius: 5px;
          overflow: hidden;
        }
        .goods-info {
          display: flex;
          border-bottom: 1px solid #eeeeee;
          img {
            width: 35%;
          }
          .right {
            padding: 10px;
            position: relative;
            .top {
              width: 90%;
              display: flex;
              margin-bottom: 10px;
              .title {
                margin-right: 5px;
              }
            }
            .goods-tag {
              margin-bottom: 10px;
            }
            .num {
              color: #999999;
              font-size: 14px;
              margin-bottom: 10px;
            }
            .price {
              color: #999999;
              font-size: 14px;
              margin-bottom: 10px;
              span {
                margin-right: 10px;
              }
            }
            .desc {
              color: #999999;
              font-size: 14px;
            }
            .status {
              position: absolute;
              top: 10px;
              right: 10px;
            }
          }
        }
        .footer {
          display: flex;
          font-size: 14px;
          .edit-goods {
            cursor: pointer;
            padding: 15px;
            width: 50%;
            text-align: center;
            border-right: 1px solid #eeeeee;
          }
          .delete-goods {
            cursor: pointer;
            padding: 15px;
            width: 50%;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
