<template>
  <div class="unit-page">
    <avue-crud
      :option="option"
      :data="unitData"
      :page="page"
      @row-save="handleAddUnitSave"
      @row-del="handleUnitDel"
      @row-update="handleUnitUpdata"
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
          @click="handleUnitStatus(row)"
        >{{ row.status == 1 ? "禁用" : "启用" }}</el-button>
      </template>
    </avue-crud>
  </div>
</template>

<script>
import { addUnit, getUnitList, deleteUnit, updateUnit, changeUnitStatus } from '@/api/unit'
export default {
  data() {
    return {
      page: {
        pageSize: 20
      },
      unitData: [],
      option: {
        border: true,
        index: true,
        menuWidth: 300,
        headerAlign: 'center',
        align: 'center',
        addTitle: '添加商品单位',
        editTitle: '编辑商品单位',
        dialogWidth: '40%',
        column: [
          {
            width: 130,
            label: '单位名称',
            prop: 'name',
            span: 16,
            row: true,
            rules: [
              {
                required: true,
                message: '商品单位名称不能为空',
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
      }
    }
  },
  mounted() {
    this.getUnitListData()
  },
  methods: {
    // 获取商品单位列表
    async getUnitListData() {
      const res = await getUnitList()
      this.unitData = res.data
    },
    // 添加商品单位
    async handleAddUnitSave(row, done) {
      await addUnit(row)
      try {
        this.getUnitListData()
        this.$message.success('添加成功')
        done()
      } catch (err) {
        this.$message.error(err)
      }
    },
    // 删除商品单位
    handleUnitDel(row) {
      this.$confirm(`您确定要删除“${row.name}”该单位吗？`).then(async() => {
        await deleteUnit(row._id)
        try {
          this.getUnitListData()
          this.$message.success('删除成功')
        } catch (err) {
          this.$message.error(err)
        }
      }).catch(() => {
        this.$message.info('您已经取消该操作！')
      })
    },
    // 更新标签信息
    async handleUnitUpdata(row, index, done) {
      const data = {
        _id: row._id,
        name: row.name
      }
      await updateUnit(data)
      try {
        this.getUnitListData()
        this.$message.success('更新成功')
        done()
      } catch (err) {
        this.$message.error(err)
      }
    },
    // 改变状态
    handleUnitStatus(row) {
      const data = {
        unitID: row._id,
        status: !row.status
      }
      this.$confirm(`您确定要“${row.status ? '禁用' : '启用'}”该商品单位吗？`,
        '提示').then(() => {
        changeUnitStatus(data).then(() => {
          this.getUnitListData()
          this.$message.success('状态更新成功')
        })
      }).catch(() => {
        this.$message.info('您已经取消了此操作！')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.unit-page {
  padding: 30px;
}
</style>
