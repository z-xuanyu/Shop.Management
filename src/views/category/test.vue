<template>
  <div class="test-page">
    <avue-crud
      :option="option"
      :data="categoryData"
      @row-update="handleCategoryUpdata"
      @row-save="handleCategoryAddSave"
    >
      <!-- 分类状态 -->
      <template slot="status" slot-scope="scope">
        <el-switch v-model="scope.row.status" size="small" />
      </template>
    </avue-crud>
  </div>
</template>

<script>
import { addCategory, addSubCategory, getCategoryList } from '@/api/category'
export default {
  data() {
    return {
      categoryData: [],
      data: [
        {
          pic:
            'https://7478-tx-cloud-mix-mall-d6944c-1302673523.tcb.qcloud.la/1596116018858263039.jpg',
          id: 1,
          name: '宠物用品',
          status: true,
          sort: 1,
          children: [
            {
              pic:
                'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-mix-mall-admin/d701daf1-d4fd-48de-ab60-f2916f9e6777.jpg',
              id: 2,
              name: '皇家狗粮',
              status: true,
              sort: 1
            },
            {
              pic:
                'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-mix-mall-admin/95d87ef5-57eb-4fd2-80d9-23d44d1bc461.jpg',
              id: 3,
              name: '德国Live',
              status: true,
              sort: 1
            },
            {
              pic:
                'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-mix-mall-admin/9b4d7040-9d14-40ac-bf7b-69713d8c5e09.jpg',
              id: 4,
              name: '美味肉肉',
              status: true,
              sort: 1
            }
          ]
        },
        {
          pic:
            'https://7478-tx-cloud-mix-mall-d6944c-1302673523.tcb.qcloud.la/1596116018858263039.jpg',
          id: 5,
          name: '宠物用品',
          status: true,
          sort: 1,
          children: [
            {
              pic:
                'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-mix-mall-admin/d701daf1-d4fd-48de-ab60-f2916f9e6777.jpg',
              id: 6,
              name: '皇家狗粮',
              status: true,
              sort: 1
            },
            {
              pic:
                'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-mix-mall-admin/95d87ef5-57eb-4fd2-80d9-23d44d1bc461.jpg',
              id: 7,
              name: '德国Live',
              status: true,
              sort: 1
            },
            {
              pic:
                'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-mix-mall-admin/9b4d7040-9d14-40ac-bf7b-69713d8c5e09.jpg',
              id: 8,
              name: '美味肉肉',
              status: true,
              sort: 1
            }
          ]
        }
      ],
      option: {
        headerAlign: 'center',
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
            }
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
      console.log(row, index, done)
    }
  }
}
</script>
<style lang="scss" scoped>
.test-page {
  padding: 20px;
}
</style>
