<template>
  <div class="product-page">
    <!-- 查询选择,输入框 -->
    <div class="query">
      <avue-form v-model="queryForm" :option="queryOption" @submit="handleAddGoodsSubmit" />
    </div>
    <!-- 添加商品 -->
    <div class="add-good" @click="handleShowAddGoods">
      <i class="el-icon-plus" />
      <span>添加商品</span>
    </div>
    <!-- 商品列表 -->
    <div class="goods-list">
      <el-row>
        <el-col v-for="(item, index) in goodsListData" :key="index" :span="12" :xl="8" :xs="24">
          <div class="goods-item">
            <div class="goods-info">
              <img :src="item.imgPathList[0]">
              <div class="right">
                <div class="top">
                  <div class="title">{{ item.name }}</div>
                  <div class="tag">
                    <el-tag size="mini" style="margin-right:10px" type="danger">推荐商品</el-tag>
                    <el-tag v-if="item.isNewest === 1" size="mini">新品</el-tag>
                  </div>
                </div>
                <div class="goods-tag">
                  <el-tag
                    v-for="(tagItem,tagIndex) in item.tags"
                    :key="tagIndex"
                    size="mini"
                    style="margin-right:10px"
                    type="danger"
                    effect="dark"
                  >{{ tagItem.name }}</el-tag>
                </div>
                <div class="num">编号：202008181022</div>
                <div class="price">
                  <span>单价：￥{{ item.price }}</span>
                  <span>折扣价：￥{{ item.discountPrice }}</span>
                  <span>库存：{{ item.stock }}</span>
                </div>
                <div class="desc">{{ item.desc }}</div>
                <!-- 下架，在售 -->
                <div class="status">
                  <el-tag size="mini" effect="dark">{{ item.status == 1?'在售':'下架' }}</el-tag>
                </div>
              </div>
            </div>
            <div class="footer">
              <div class="edit-goods" @click="handleEditGoods(item)">编辑</div>
              <div class="delete-goods" @click="handleDelGoods(item._id)">删除</div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 添加商品 -->
    <el-dialog title="添加商品" :visible.sync="showAddGoods" width="80%" class="avue-dialog">
      <avue-form v-model="addForm" :option="option" @submit="handleAddGoodsSubmit" />
    </el-dialog>
    <!-- 编辑商品 -->
    <el-dialog title="编辑商品" :visible.sync="showEditGoods" class="avue-dialog" width="80%">
      <avue-form v-model="editForm" :option="option" @submit="handleEditGoodsSubmit" />
    </el-dialog>
  </div>
</template>

<script>
import {
  addGoods,
  getGoodsList,
  deleteGoods,
  getGoodsInfo,
  updataGoodsInfo
} from '@/api/goods'
export default {
  data() {
    return {
      showAddGoods: false,
      showEditGoods: false,
      goodsListData: [],
      queryForm: {
        name: '',
        num: '',
        status: null,
        categoryID: null,
        tagID: null
      },
      queryOption: {
        submitText: '搜索',
        column: [
          {
            label: '商品编号',
            prop: 'num',
            span: 8
          },
          {
            label: '商品名称',
            prop: 'name',
            span: 8
          },
          {
            label: '商品状态',
            prop: 'status',
            type: 'select',
            dicData: [
              {
                label: '在售',
                value: 1
              },
              {
                label: '下架',
                value: 2
              }
            ],
            span: 8
          },
          {
            label: '商品类别',
            prop: 'categoryID',
            span: 8,
            type: 'select',
            dicUrl: 'categories/list',
            props: {
              label: 'name',
              value: '_id'
            }
          },
          {
            label: '商品标签',
            prop: 'tagID',
            span: 8,
            type: 'select',
            multiple: true,
            dicUrl: 'tags/list',
            props: {
              label: 'name',
              value: '_id'
            }
          }
        ]
      },
      addForm: {
        bannerPathList: [],
        name: '',
        stock: null,
        price: null,
        discountPrice: null,
        categories: '',
        unit: '',
        tags: [],
        isRecommend: null,
        isNewest: null,
        status: null,
        desc: '',
        imgPathList: []
      },
      editForm: null,
      option: {
        submitText: '确定',
        column: [
          {
            label: '轮播图',
            prop: 'bannerPathList',
            type: 'upload',
            span: 24,
            dataType: 'array',
            listType: 'picture-card',
            tip: '只能上传jpg/png文件，且不超过500kb',
            propsHttp: {
              url: 'url'
            },
            action: 'avatarUpload',
            rules: [
              {
                required: true,
                message: '轮播图不能为空',
                trigger: 'blur'
              }
            ]
          },
          {
            label: '名称',
            prop: 'name',
            span: 12,
            rules: [
              {
                required: true,
                message: '名称不能为空',
                trigger: 'blur'
              }
            ]
          },
          {
            label: '库存',
            prop: 'stock',
            type: 'number',
            span: 6,
            rules: [
              {
                required: true,
                message: '库存不能为空',
                trigger: 'blur'
              }
            ]
          },
          {
            label: '定价',
            prop: 'price',
            span: 6,
            type: 'number',
            rules: [
              {
                required: true,
                message: '定价不能为空',
                trigger: 'blur'
              }
            ]
          },
          {
            label: '类别',
            prop: 'categories',
            span: 12,
            type: 'select',
            dicUrl: 'categories/list',
            props: {
              label: 'name',
              value: '_id'
            },
            rules: [
              {
                required: true,
                message: '类别不能为空',
                trigger: 'blur'
              }
            ]
          },
          {
            label: '折扣价',
            prop: 'discountPrice',
            span: 6,
            type: 'number',
            rules: [
              {
                required: true,
                message: '折扣价不能为空',
                trigger: 'blur'
              }
            ]
          },
          {
            label: '单位',
            prop: 'unit',
            span: 6,
            type: 'select',
            dicUrl: 'unit/list',
            props: {
              label: 'name',
              value: '_id'
            },
            rules: [
              {
                required: true,
                message: '单位不能为空',
                trigger: 'blur'
              }
            ]
          },
          {
            label: '标签',
            prop: 'tags',
            span: 12,
            type: 'select',
            multiple: true,
            dicUrl: 'tags/list',
            props: {
              label: 'name',
              value: '_id'
            },
            rules: [
              {
                required: true,
                message: '标签不能为空',
                trigger: 'blur'
              }
            ]
          },
          {
            label: '推荐',
            prop: 'isRecommend',
            span: 6,
            type: 'select',
            dicData: [
              {
                label: '是',
                value: 1
              },
              {
                label: '否',
                value: 2
              }
            ],
            rules: [
              {
                required: true,
                message: '推荐不能为空',
                trigger: 'blur'
              }
            ]
          },
          {
            label: '新品',
            prop: 'isNewest',
            span: 6,
            type: 'select',
            dicData: [
              {
                label: '是',
                value: 1
              },
              {
                label: '否',
                value: 2
              }
            ],
            rules: [
              {
                required: true,
                message: '新品不能为空',
                trigger: 'blur'
              }
            ]
          },
          {
            label: '状态',
            prop: 'status',
            span: 6,
            type: 'select',
            dicData: [
              {
                label: '在售',
                value: 1
              },
              {
                label: '下架',
                value: 2
              }
            ],
            rules: [
              {
                required: true,
                message: '状态不能为空',
                trigger: 'blur'
              }
            ]
          },
          {
            label: '商品描述',
            prop: 'desc',
            type: 'textarea',
            minRows: 5,
            maxlength: 200,
            span: 24,
            showWordLimit: true,
            rules: [
              {
                required: true,
                message: '商品描述不能为空',
                trigger: 'blur'
              }
            ]
          },
          {
            label: '详情图',
            prop: 'imgPathList',
            type: 'upload',
            dataType: 'array',
            span: 24,
            listType: 'picture-card',
            tip: '只能上传jpg/png文件，且不超过500kb',
            propsHttp: {
              url: 'url'
            },
            action: 'avatarUpload',
            rules: [
              {
                required: true,
                message: '商品详情图不能为空',
                trigger: 'blur'
              }
            ]
          }
        ]
      }
    }
  },
  created() {
    this.getGoodsListData()
  },
  methods: {
    // 获取商品列表
    getGoodsListData() {
      getGoodsList().then((res) => {
        this.goodsListData = res.data
      })
    },
    // 显示添加商品弹出层
    handleShowAddGoods() {
      this.showAddGoods = true
    },
    // 添加商品提交
    handleAddGoodsSubmit(row, done) {
      delete row.$categories
      delete row.$isNewest
      delete row.$isRecommend
      delete row.$status
      delete row.$tags
      delete row.$unit
      setTimeout(() => {
        addGoods(row).then(() => {
          this.getGoodsListData()
          done()
          this.showAddGoods = false
          this.$message.success('添加成功')
        })
      }, 1000)
    },
    // 编辑商品
    handleEditGoods(item) {
      const id = item._id
      getGoodsInfo(id).then((res) => {
        this.editForm = res
        this.showEditGoods = true
      })
    },
    // 编辑商品修改提交
    handleEditGoodsSubmit(row, done) {
      delete row.$categories
      delete row.$isNewest
      delete row.$isRecommend
      delete row.$status
      delete row.$tags
      delete row.$unit
      setTimeout(() => {
        updataGoodsInfo(row).then(() => {
          this.getGoodsListData()
          done()
          this.showEditGoods = false
          this.$message.success('更新成功')
        })
      }, 1000)
    },
    // 删除商品
    handleDelGoods(id) {
      this.$confirm(`您确定要删除该商品吗？`, '提示')
        .then(() => {
          deleteGoods(id).then(() => {
            this.getGoodsListData()
            this.$message.success('删除成功!')
          })
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
        &:hover {
          box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.1);
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
            overflow: hidden;
            .top {
              width: 90%;
              display: flex;
              margin-bottom: 10px;
              .title {
                margin-right: 5px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              .tag {
                display: flex;
                margin-right: 10px;
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
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 3;
              overflow: hidden;
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
