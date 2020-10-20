<template>
  <div class="tag-page">
    <avue-crud
      :option="option"
      :data="tagData"
      :page="page"
      @on-load="onLoad"
      @row-save="handleAddTagSave"
      @row-del="handleTagDel"
      @row-update="handleTagUpdata"
    >
      <!-- 状态 -->
      <template slot="status" slot-scope="scope">
        <el-tag
          :type="scope.row.status == 1 ? 'success' : 'danger'"
          effect="plain"
          size="small"
        >{{ scope.row.status == 1 ? "启用" : "禁用" }}</el-tag>
      </template>
      <!-- 时间 -->
      <template slot="createdAt" slot-scope="scope">
        {{ scope.row.createdAt | dateFormat }}
      </template>
      <!-- 操作栏 -->
      <template slot="menu" slot-scope="{ type, size, row }">
        <el-button
          icon="el-icon-refresh"
          :size="size"
          :type="type"
          :style="{ color: row.status == 1 ? 'red' : '' }"
          @click="handleTagStatus(row)"
        >{{ row.status == 1 ? "禁用" : "启用" }}</el-button>
      </template>
    </avue-crud>
  </div>
</template>

<script>
import {
  addTag,
  getTagList,
  updataTagInfo,
  deleteTag,
  changeTagStatus
} from '@/api/tag'
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
        addTitle: '添加标签',
        editTitle: '编辑标签',
        dialogWidth: '40%',
        column: [
          {
            width: 130,
            label: '标签名称',
            prop: 'name',
            span: 16,
            row: true,
            rules: [
              {
                required: true,
                message: '标签名称不能为空',
                trigger: 'blur'
              }
            ]
          },
          {
            label: '状态',
            prop: 'status',
            value: 1,
            slot: true,
            display: false
          },
          {
            label: '创建时间',
            prop: 'createdAt',
            span: 16,
            row: true,
            slot: true,
            display: false
          }
        ]
      },
      tagData: []
    }
  },
  created() {
    this.getTagListData()
  },
  methods: {
    // 获取标签数据
    getTagListData() {
      getTagList().then((res) => {
        this.tagData = res.data
      })
    },
    // 加载前
    onLoad() {},
    // 添加标签保存
    handleAddTagSave(row, done) {
      setTimeout(() => {
        addTag(row).then(() => {
          this.getTagListData()
          this.$message.success('添加成功')
          done()
        })
      }, 1000)
    },
    // 删除标签
    handleTagDel(row) {
      this.$confirm(`您确定要删除“${row.name}”该标签吗？`, '提示')
        .then(() => {
          deleteTag(row._id).then(() => {
            this.getTagListData()
            this.$message.success('删除成功')
          })
        })
        .catch(() => {
          console.log('您取消了操作')
        })
    },
    // 更新标签信息
    handleTagUpdata(row, index, done) {
      const data = { _id: row._id, name: row.name }
      setTimeout(() => {
        updataTagInfo(data).then(() => {
          this.getTagListData()
          this.$message.success('更新成功')
          done()
        })
      }, 1000)
    },
    // 改变标签状态
    handleTagStatus(row) {
      const data = { tagID: row._id, status: !row.status }
      this.$confirm(
        `您确定要“${row.status ? '禁用' : '启用'}”该标签吗？`,
        '提示'
      )
        .then(() => {
          changeTagStatus(data).then(() => {
            this.getTagListData()
            this.$message.success('状态更新成功')
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
.tag-page {
  padding: 30px;
}
</style>
