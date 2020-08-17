<template>
  <div class="member-page">
    <avue-crud
      :option="option"
      :data="memberData"
      :page="page"
      @on-load="onLoad"
      @row-save="handleAddMemberSave"
      @row-del="handleMemberDel"
      @row-update="handleMemberUpdata"
    >
      <!-- 会员性别 -->
      <template slot="gender" slot-scope="scope">
        <el-tag
          effect="dark"
          :type="scope.row.gender === 1?'':'danger'"
          size="small"
        >{{ scope.row.gender === 1?'男':'女' }}</el-tag>
      </template>
      <!-- 操作栏 -->
      <template slot="menu" slot-scope="{type,size,row}">
        <el-button
          icon="el-icon-refresh"
          :size="size"
          :type="type"
          @click="editMemberAddress(row)"
        >编辑收货地址</el-button>
        <el-button
          icon="el-icon-refresh"
          :size="size"
          :type="type"
          @click="handleResetPassword(row)"
        >重置密码</el-button>
      </template>
    </avue-crud>
    <!-- 会员收货地址 -->
    <el-dialog
      v-dialogdrag
      title="会员收货地址"
      :visible.sync="showMemberAddress"
      class="avue-dialog"
      width="80%"
    >
      <avue-crud
        :option="memberAddressOption"
        :data="memberAddressData"
        @row-save="handleAddMemberAddressSave"
        @row-del="handleMemberAddressDel"
        @row-update="handleMemberAddressUpdata"
      >
        <!-- 改变默认地址 -->
        <template slot="isDefaule" slot-scope="scope">
          <el-switch v-model="scope.row.isDefaule" />
        </template>
      </avue-crud>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="showMemberAddress = false">取消</el-button>
        <el-button size="small" type="primary" @click="showMemberAddress = false">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showMemberAddress: false, // 显示会员收货地址 弹出层
      page: {
        pageSize: 20
      },
      // 会员配置项
      option: {
        border: true,
        index: true,
        menuWidth: 320,
        headerAlign: 'center',
        align: 'center',
        addTitle: '添加会员',
        editTitle: '编辑会员',
        dialogWidth: '40%',
        column: [
          {
            width: 130,
            label: '名称',
            prop: 'name',
            span: 16,
            row: true,
            rules: [
              {
                required: true,
                message: '会员名称不能为空',
                trigger: 'blur'
              }
            ]
          },
          {
            label: '电话',
            prop: 'phone',
            span: 16,
            row: true,
            editDisabled: true,
            rules: [
              {
                required: true,
                message: '手机号码不能为空',
                trigger: 'blur'
              }
            ]
          },
          {
            label: '邮箱',
            prop: 'email',
            span: 16,
            row: true,
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
            label: '性别',
            prop: 'gender',
            span: 16,
            row: true,
            slot: true,
            type: 'select',
            dicData: [
              {
                label: '男',
                value: 1
              },
              {
                label: '女',
                value: 2
              }
            ],
            rules: [
              {
                required: true,
                message: '性别不能为空',
                trigger: 'blur'
              }
            ]
          },
          {
            label: '头像',
            prop: 'avatarImg',
            type: 'upload',
            span: 24,
            listType: 'picture-img',
            action: 'avatarUpload',
            // 注意:如返回(data:{url:'xxxx'}),则res配置为data
            propsHttp: {
              url: 'url'
            },
            tip: '只能上传jpg/png类型图片，且不超过500kb',
            // 图片上传接口
            rules: [
              {
                required: true,
                message: '会员头像不能为空',
                trigger: 'blur'
              }
            ]
          }
        ]
      },
      memberData: [
        {
          name: '张国荣',
          phone: '15800021934',
          email: '812006298@qq.com',
          gender: 1,
          avatarImg:
            'https://wxt.sinaimg.cn/large/007XivJ0gy1g93mawj6coj30qn0qnabt.jpg'
        }
      ],

      // 会员收货地址配置项
      memberAddressOption: {
        menuWidth: 320,
        headerAlign: 'center',
        align: 'center',
        addTitle: '添加会员地址',
        editTitle: '编辑会员地址',
        dialogWidth: '40%',
        column: [
          {
            label: '姓名',
            prop: 'name',
            span: 16,
            row: true,
            rules: [
              {
                required: true,
                message: '姓名不能为空',
                trigger: 'blur'
              }
            ]
          },
          {
            label: '电话',
            prop: 'phone',
            span: 16,
            row: true,
            rules: [
              {
                required: true,
                message: '电话不能为空',
                trigger: 'blur'
              }
            ]
          },
          {
            label: '地址',
            prop: 'address',
            width: 250,
            span: 16,
            row: true,
            rules: [
              {
                required: true,
                message: '地址不能为空',
                trigger: 'blur'
              }
            ]
          },
          {
            label: '邮编',
            prop: 'postalCode',
            span: 16,
            row: true,
            rules: [
              {
                required: true,
                message: '邮编不能为空',
                trigger: 'blur'
              }
            ]
          },
          {
            label: '默认',
            prop: 'isDefaule',
            span: 16,
            row: true,
            display: false,
            slot: true
          }
        ]
      },
      memberAddressData: [
        {
          name: '张国荣',
          phone: '15800021934',
          address: '广东省广州市天河区龙洞河陂南七巷一号',
          postalCode: '520000',
          isDefaule: false
        }
      ]
    }
  },
  methods: {
    // 会员收货地址
    editMemberAddress() {
      this.showMemberAddress = true
    },
    // 会员密码重置
    handleResetPassword() {},
    // 处理加载分页
    onLoad(page) {
      this.page.total = 40
    },
    // 会员添加保存
    handleAddMemberSave() {},
    // 删除会员
    handleMemberDel() {},
    // 更新会员信息
    handleMemberUpdata() {},
    // 添加会员收货地址保存
    handleAddMemberAddressSave() {},
    // 删除会员收货地
    handleMemberAddressDel() {
      this.$confirm(`您确定要删除该地址吗？`, '提示')
        .then(() => {
          this.$message.success('删除成功!')
        })
        .catch(() => {
          console.log('您取消了操作')
        })
    },
    // 更新会员收货地址信息
    handleMemberAddressUpdata() {}
  }
}
</script>

<style lang="scss" scoped>
.member-page {
  padding: 30px;
}
</style>
