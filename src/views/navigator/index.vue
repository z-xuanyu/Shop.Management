<template>
  <div class="navigator-page">
    <avue-crud
      :option="navigatorOption"
      :data="navigatorData"
      @row-save="handleNavigatorAddSave"
      @row-del="handleNavigatorDel"
      @row-update="handleNavigatorUpdata"
      @search-change="searchChange"
    >
      <!-- 分类状态 -->
      <template slot="status" slot-scope="scope">
        <el-switch v-model="scope.row.status" size="small" />
      </template>

      <!-- 时间 -->
      <template slot="createdAt" slot-scope="scope">
        {{ scope.row.createdAt | dateFormat }}
      </template>
    </avue-crud>
  </div>
</template>

<script>
import { addNavigator, getNavigatorList, updateNavigatorInfo, deleteNavigator } from '@/api/navigator'
export default {
  data() {
    return {
      navigatorOption: {
        index: true,
        border: true,
        align: 'center',
        dialogWidth: '40%',
        column: [
          {
            labelWidth: 100,
            width: 200,
            label: '导航图标',
            prop: 'icon',
            type: 'upload',
            span: 24,
            listType: 'picture-img',
            action: 'avatarUpload',
            // 注意:如返回(data:{url:'xxxx'}),则res配置为data
            propsHttp: {
              url: 'url'
            },
            tip: '只能上传jpg/png类别图片，且不超过500kb'
          },
          {
            labelWidth: 100,
            label: '导航名称',
            prop: 'name',
            span: 10,
            row: true,
            search: true
          },
          {
            labelWidth: 100,
            label: '链接地址',
            prop: 'url',
            span: 10,
            row: true
          },
          {
            labelWidth: 100,
            label: '排序',
            prop: 'sort',
            type: 'number',
            span: 10,
            row: true
          },
          {
            labelWidth: 100,
            label: '是否开启',
            prop: 'status',
            span: 10,
            row: true,
            slot: true,
            type: 'switch',
            value: true
          },
          {
            labelWidth: 100,
            label: '创建时间',
            prop: 'createdAt',
            span: 10,
            type: 'date',
            slot: true,
            display: false
          }
        ]
      },
      navigatorData: []
    }
  },
  mounted() {
    this.getNavigatorListInfo()
  },
  methods: {
    // 关键词搜索
    searchChange(params, done) {
      done()
      this.$message.success(JSON.stringify(params))
    },
    // 获取导航列表
    getNavigatorListInfo() {
      getNavigatorList().then((res) => {
        this.navigatorData = res.data
      })
    },
    // 添加navigator
    handleNavigatorAddSave(row, done) {
      addNavigator(row).then((res) => {
        this.$message.success('添加成功')
        this.getNavigatorListInfo()
        done()
      })
    },
    // 编辑更新navigator信息
    handleNavigatorUpdata(row, index, done) {
      delete row.$index
      setTimeout(() => {
        updateNavigatorInfo(row).then(() => {
          this.getNavigatorListInfo()
          this.$message.success('更新成功')
          done()
        })
      }, 1000)
    },
    // 删除navigator
    handleNavigatorDel(row) {
      this.$confirm(`您确定要删除“${row.name}”该标签吗？`, '提示')
        .then(() => {
          deleteNavigator(row._id).then(() => {
            this.getNavigatorListInfo()
            this.$message.success('删除成功')
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
.navigator-page {
  padding: 30px;
}
</style>
