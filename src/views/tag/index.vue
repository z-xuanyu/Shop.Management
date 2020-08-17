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
          :type="scope.row.status == 1?'success':'danger'"
          effect="plain"
          size="small"
        >{{ scope.row.status == 1?'启用':'禁用' }}</el-tag>
      </template>
      <!-- 操作栏 -->
      <template slot="menu" slot-scope="{type,size,row}">
        <el-button
          icon="el-icon-refresh"
          :size="size"
          :type="type"
          :style="{color:row.status == 1?'red':''}"
          @click="handleTagStatus(row)"
        >{{ row.status == 1?'禁用':'启用' }}</el-button>
      </template>
    </avue-crud>
  </div>
</template>

<script>
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
            prop: 'creatTime',
            span: 16,
            row: true,
            display: false
          }
        ]
      },
      tagData: [
        {
          name: '热销',
          status: 1,
          creatTime: '2020-08-17'
        }
      ]
    }
  },
  methods: {
    // 加载前
    onLoad() {},
    // 添加标签保存
    handleAddTagSave() {},
    // 删除标签
    handleTagDel() {},
    // 更新标签信息
    handleTagUpdata() {},
    // 改变标签状态
    handleTagStatus() {}
  }
}
</script>
<style lang="scss" scoped>
.tag-page {
  padding: 30px;
}
</style>
