<template>
  <div class="administrator-page">
    <avue-crud
      :option="option"
      :data="adminData"
      :page="page"
      @on-load="onLoad"
      @row-save="handleSave"
      @row-del="handleDel"
    >
      <!-- 管理员状态 -->
      <template slot="status" slot-scope="scope">
        <el-tag type="success" size="small">{{ scope.row.status }}</el-tag>
      </template>
      <template slot="isSuper" slot-scope="scope">
        <el-tag size="small">{{ scope.row.isSuper }}</el-tag>
      </template>
      <!-- 操作栏 -->
      <template slot="menu" slot-scope="{type,size}">
        <el-button icon="el-icon-refresh" :size="size" :type="type">禁用</el-button>
        <el-button icon="el-icon-refresh" :size="size" :type="type">重置密码</el-button>
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
        addTitle: '添加管理员',
        editTitle: '编辑管理员',
        dialogWidth: '50%',
        column: [
          {
            width: 130,
            label: '用户名',
            prop: 'name',
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
            label: '邮箱',
            prop: 'email',
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
            type: 'select',
            dicData: [
              {
                label: '开启',
                value: 1
              },
              {
                label: '禁用',
                value: 2
              }
            ],
            row: true,
            span: 8,
            slot: true,
            editDisplay: false,
            rules: [
              {
                required: true,
                message: '状态不能为空',
                trigger: 'blur'
              }
            ]
          },
          {
            label: '超级管理员',
            prop: 'isSuper',
            row: true,
            slot: true,
            editDisplay: false,
            span: 8,
            type: 'select',
            dicData: [
              {
                label: '开启',
                value: 1
              },
              {
                label: '禁用',
                value: 2
              }
            ]
          }
        ]
      },
      adminData: [
        {
          id: '1',
          name: 'xuanyu',
          email: '812006298@qq.com',
          avatar:
            'http://demo.cssmoban.com/cssthemes5/twts_236_rage/assets/images/background/header.jpg',
          status: '开启',
          isSuper: '是'
        },
        {
          id: '2',
          name: 'ayuer',
          email: '812006298@qq.com',
          avatar:
            'http://demo.cssmoban.com/cssthemes5/twts_236_rage/assets/images/background/header.jpg',
          status: '开启',
          isSuper: '是'
        }
      ]
    }
  },
  methods: {
    onLoad(page) {
      this.page.total = 40
    },
    // 删除管理员
    handleDel(row, index) {
      console.log(row, index)
    },
    // 保存管理员
    handleSave(row) {
      console.log(row)
    }
  }
}
</script>
<style lang="scss" scoped>
.administrator-page {
  padding: 30px;
}
</style>
