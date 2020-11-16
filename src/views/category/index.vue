<template>
  <div class="test-page">
    <avue-crud
      :option="option"
      :data="categoryData"
      @row-update="handleCategoryUpdata"
      @row-save="handleCategoryAddSave"
      @row-del="handleCategoryDel"
      @row-edit="rowEdit"
    >
      <!-- 分类状态 -->
      <template slot="status" slot-scope="scope">
        <el-switch v-model="scope.row.status" size="small" />
      </template>
    </avue-crud>
  </div>
</template>

<script>
import {
  addCategory,
  addSubCategory,
  getCategoryList,
  updataCategoryInfo,
  updateSubCatagory,
  deleteCategory,
  deleteSubCategory
} from '@/api/category'
export default {
  data() {
    return {
      categoryData: [],
      option: {
        align: 'center',
        border: true,
        defaultExpandAll: false, // 默认不展开
        expandRowKeys: [1],
        rowKey: '_id',
        dialogWidth: '40%',
        column: [
          {
            label: '分类名称',
            prop: 'name',
            align: 'left',
            row: true,
            span: 12,
            rules: [
              {
                required: true,
                message: '分类名称不能为空！',
                trigger: 'blur'
              }
            ]
          },
          {
            label: '父级分类',
            prop: 'parentID',
            align: 'left',
            span: 12,
            row: true,
            showColumn: false,
            type: 'select',
            dicUrl: 'categories/list',
            props: {
              label: 'name',
              value: '_id'
            },
            editDisabled: true
          },
          {
            label: '类别图片',
            prop: 'pic',
            type: 'upload',
            span: 24,
            listType: 'picture-img',
            action: 'avatarUpload',
            // 注意:如返回(data:{url:'xxxx'}),则res配置为data
            propsHttp: {
              url: 'url'
            },
            tip: '只能上传jpg/png类别图片，且不超过500kb',
            // 图片上传接口
            rules: [
              {
                required: true,
                message: '类别图片不能为空',
                trigger: 'blur'
              }
            ]
          },
          {
            label: '排序',
            prop: 'sort',
            width: 120,
            type: 'number'
          },
          {
            label: '是否启用',
            prop: 'status',
            width: 200,
            span: 24,
            slot: true,
            type: 'switch',
            value: true
          }
        ]
      }
    }
  },
  mounted() {
    this.getCategoryData()
  },
  methods: {
    rowEdit(row, index) {
      console.log(row, index)
    },
    // 获取分类列表
    getCategoryData() {
      getCategoryList().then((res) => {
        this.categoryData = res.data
      })
    },
    // 新增分类
    handleCategoryAddSave(row, done) {
      // 一级分类
      if (!row.parentID) {
        delete row.parentID
        setTimeout(() => {
          addCategory(row).then(() => {
            this.getCategoryData()
            this.$message.success('添加成功')
            done()
          })
        }, 1000)
      } else {
        // 二级分类
        setTimeout(() => {
          addSubCategory(row).then(() => {
            this.getCategoryData()
            this.$message.success('添加成功')
            done()
          })
        }, 1000)
      }
    },
    // 编辑分类信息
    handleCategoryUpdata(row, index, done) {
      // 修改父级分类
      if (!row.parentID) {
        const data = {
          _id: row._id,
          name: row.name,
          pic: row.pic,
          sort: row.sort,
          status: row.status
        }
        setTimeout(() => {
          updataCategoryInfo(data).then(() => {
            this.getCategoryData()
            this.$message.success('更新成功')
            done()
          })
        }, 1000)
      } else {
        // 编辑更新二级分类
        const data = {
          _id: row._id,
          name: row.name,
          pic: row.pic,
          sort: row.sort,
          status: row.status,
          parentID: row.parentID
        }
        setTimeout(() => {
          updateSubCatagory(data).then(() => {
            this.getCategoryData()
            this.$message.success('更新成功')
            done()
          })
        }, 1000)
      }
    },
    // 删除分类
    handleCategoryDel(row) {
      if (!row.parentID) {
        // 如果父级含有子分类，将无法删除父级分类
        if (row.children.length) {
          return this.$message.error(`${row.name}包含子分类，无法删除！请先清空该分类子分类！`)
        }
        // 删除父级分类
        this.$confirm(`您确定要删除“${row.name}”该分类吗？`, '提示')
          .then(() => {
            deleteCategory(row._id).then(() => {
              this.getCategoryData()
              this.$message.success('删除成功')
            })
          })
          .catch(() => {
            console.log('您取消了操作')
          })
      } else {
        // 删除二级分类
        this.$confirm(`您确定要删除“${row.name}”该分类吗？`, '提示')
          .then(() => {
            deleteSubCategory({ subCatagoryID: row._id }).then(() => {
              this.getCategoryData()
              this.$message.success('删除成功')
            })
          })
          .catch(() => {
            console.log('您取消了操作')
          })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.test-page {
  padding: 20px;
}
</style>
