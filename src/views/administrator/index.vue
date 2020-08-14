<template>
  <div class="administrator-page">
    <avue-crud
      :option="option"
      :data="adminData"
      :page="page"
      @on-load="onLoad"
      @row-save="handleSave"
      @row-del="handleDel"
      @row-update="handleUpdata"
    >
      <!-- 管理员状态 -->
      <template slot="status" slot-scope="scope">
        <el-tag
          :type="scope.row.status == 1?'success':'danger'"
          effect="plain"
          size="small"
        >{{ scope.row.status == 1?'启用':'禁用' }}</el-tag>
      </template>
      <!-- 是否超级管理员 -->
      <template slot="isSuper" slot-scope="scope">
        <el-tag
          effect="dark"
          :type="scope.row.isSuper?'':'danger'"
          size="small"
        >{{ scope.row.isSuper?'是':'否' }}</el-tag>
      </template>
      <!-- 操作栏 -->
      <template slot="menu" slot-scope="{type,size,row}">
        <el-button
          icon="el-icon-refresh"
          :size="size"
          :type="type"
          :style="{color:row.status == 1?'red':''}"
          @click="handleChangeStatus(row)"
        >{{ row.status == 1?'禁用':'启用' }}</el-button>
        <el-button
          icon="el-icon-refresh"
          :size="size"
          :type="type"
          @click="handleResetPassword(row)"
        >重置密码</el-button>
      </template>
    </avue-crud>
    <!-- 重置密码 -->
    <el-dialog
      v-dialogdrag
      title="重置管理员密码"
      :visible.sync="showResetPassword"
      class="avue-dialog"
      width="40%"
    >
      <el-form :model="newPasswordForm" label-width="70px">
        <el-form-item
          label="新密码"
          prop="password"
          :rules="[
            { required: true, message: '新密码不能为空'}
          ]"
        >
          <el-input
            v-model="newPasswordForm.password"
            style="width:80%"
            type="password"
            size="small"
            autocomplete="off"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="showResetPassword = false">取消</el-button>
        <el-button size="small" type="primary" @click="handleResetPasswordSubmit">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getAdminList,
  updataAdminInfo,
  addAdmin,
  deleteAdminInfo,
  changeStatusAdmin,
  resetPasswordAdmin
} from '@/api/admin'
export default {
  data() {
    return {
      showResetPassword: false,
      newPasswordForm: {
        password: '',
        userID: ''
      },
      page: {
        pageSize: 20
      },
      option: {
        border: true,
        index: true,
        menuWidth: 300,
        headerAlign: 'center',
        align: 'center',
        addTitle: '添加管理员',
        editTitle: '编辑管理员',
        dialogWidth: '40%',
        column: [
          {
            width: 130,
            label: '用户名',
            prop: 'username',
            span: 16,
            row: true,
            rules: [
              {
                required: true,
                message: '用户名不能为空',
                trigger: 'blur'
              }
            ]
          },
          {
            width: 200,
            span: 16,
            label: '邮箱',
            prop: 'email',
            row: true,
            editDisabled: true,
            rules: [
              {
                required: true,
                message: '邮箱不能为空',
                trigger: 'blur'
              }
            ]
          },
          {
            label: '密码',
            span: 16,
            prop: 'password',
            row: true,
            rules: [
              {
                required: true,
                message: '密码不能为空',
                trigger: 'blur'
              }
            ],
            editDisplay: false,
            showColumn: false,
            type: 'password'
          },
          {
            label: '头像',
            prop: 'avatar',
            type: 'upload',
            span: 24,
            listType: 'picture-img',
            action: 'avatarUpload',
            // 注意:如返回(data:{url:'xxxx'}),则res配置为data
            propsHttp: {
              url: 'url'
            },
            tip: '只能上传jpg/png用户头像，且不超过500kb',
            // 图片上传接口
            rules: [
              {
                required: true,
                message: '头像不能为空',
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
            label: '超级管理员',
            prop: 'isSuper',
            slot: true,
            value: false,
            display: false
          }
        ]
      },
      adminData: []
    }
  },
  created() {
    this.getAdminData()
  },
  methods: {
    // 获取管理员列表
    getAdminData() {
      getAdminList().then((res) => {
        this.adminData = res
      })
    },
    onLoad(page) {
      this.page.total = 40
    },
    // 改变管理员状态
    handleChangeStatus(row) {
      this.$confirm(
        `您确定要“${row.status === 1 ? '禁用' : '启用'}”“${
          row.username
        }”管理员权限？`,
        '提示'
      )
        .then(() => {
          if (row.isSuper) {
            this.$notify.error({
              title: '危险提示：',
              message: '对不起！您不能禁用超级管理员权限！'
            })
            return
          }
          changeStatusAdmin({
            userID: row._id,
            status: row.status === 1 ? 2 : 1
          })
            .then(() => {
              this.getAdminData()
              this.$message.success('状态更改成功！')
            })
            .catch(() => {
              this.$message.error('状态更改失败！')
            })
        })
        .catch(() => {
          console.log('操作已取消!')
        })
    },
    // 删除管理员
    handleDel(row) {
      this.$confirm(`您确定要删除“${row.username}”该管理员吗？`, '危险提示:')
        .then(() => {
          if (row.isSuper) {
            this.$notify.error({
              title: '危险提示：',
              message: '您不能删除超级管理员哦！'
            })
          } else {
            deleteAdminInfo(row._id)
              .then(() => {
                this.getAdminData()
                this.$message.success('删除成功!')
              })
              .catch(() => {
                this.$message.error('删除失败!')
              })
          }
        })
        .catch(() => {
          console.log('您取消了操作')
        })
    },
    // 添加保存管理员
    handleSave(row, done) {
      setTimeout(() => {
        addAdmin(row)
          .then(() => {
            this.getAdminData()
            done()
            this.$message.success('添加成功!')
          })
          .catch(() => {
            this.$message.error('添加失败!')
          })
      }, 1000)
    },

    // 更新管理员信息
    handleUpdata(row, index, done) {
      const data = { username: row.username, avatar: row.avatar, _id: row._id }
      setTimeout(() => {
        updataAdminInfo(data)
          .then(() => {
            this.getAdminData()
            done()
            this.$message.success('更新成功！')
          })
          .catch(() => {
            this.$message.error('更新失败!')
          })
      }, 1000)
    },

    // 弹出重置密码
    handleResetPassword(row) {
      this.showResetPassword = true
      this.newPasswordForm.userID = row._id
    },

    // 重置密码
    handleResetPasswordSubmit() {
      resetPasswordAdmin({
        userID: this.newPasswordForm.userID,
        password: this.newPasswordForm.password
      })
        .then(() => {
          this.getAdminData()
          this.showResetPassword = false
          this.$message.success('重置成功！')
        })
        .catch(() => {
          this.$message.error('重置失败！')
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.administrator-page {
  padding: 30px;
}
</style>
