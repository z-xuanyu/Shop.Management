<template>
  <div class="category-page">
    <avue-crud
      :option="option"
      :data="categoryData"
      :page="page"
      @on-load="onLoad"
      @row-save="handleCategoryAddSave"
      @row-del="handleCategoryDel"
      @row-update="handleCategoryUpdata"
    />
  </div>
</template>

<script>
import {
  getCategoryList,
  addCategory,
  updataCategoryInfo,
  deleteCategory
} from '@/api/category'
export default {
  data() {
    return {
      page: {
        pageSize: 20
      },
      option: {
        border: true,
        index: true,
        menuWidth: 300,
        headerAlign: 'center',
        align: 'center',
        addTitle: '添加类别',
        editTitle: '编辑类别',
        dialogWidth: '40%',
        column: [
          {
            width: 130,
            label: '类别名称',
            prop: 'name',
            span: 16,
            row: true,
            rules: [
              {
                required: true,
                message: '类别名称不能为空',
                trigger: 'blur'
              }
            ]
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
            label: '类别排序',
            prop: 'sort',
            span: 16,
            row: true,
            type: 'number'
          },
          {
            label: '创建时间',
            prop: 'createdAt',
            span: 16,
            row: true,
            display: false
          }
        ]
      },
      categoryData: []
    }
  },
  created() {
    this.getCategoryData()
  },
  methods: {
    // 获取分类列表数据
    getCategoryData() {
      getCategoryList().then((res) => {
        this.categoryData = res.data
      })
    },
    // 处理分页加载
    onLoad() {},
    // 添加分类保存
    handleCategoryAddSave(row, done) {
      setTimeout(() => {
        addCategory(row).then(() => {
          this.getCategoryData()
          this.$message.success('添加成功')
          done()
        })
      }, 1000)
    },
    // 删除分类
    handleCategoryDel(row) {
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
    },
    // 分类更新
    handleCategoryUpdata(row, index, done) {
      const data = {
        _id: row._id,
        name: row.name,
        pic: row.pic,
        sort: row.sort
      }
      setTimeout(() => {
        updataCategoryInfo(data).then(() => {
          this.getCategoryData()
          this.$message.success('更新成功')
          done()
        })
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
.category-page {
  padding: 30px;
}
</style>
