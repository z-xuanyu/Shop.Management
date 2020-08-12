<template>
  <div class="administrator-page">
    <avue-crud
      :option="option"
      :data="adminData"
      :page="page"
      @on-load="onLoad"
    />
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
        headerAlign: 'center',
        align: 'center',
        addTitle: '添加管理员',
        dialogWidth: '50%',
        column: [
          {
            width: 130,
            label: '用户名',
            prop: 'name',
            span: 24,
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
            span: 24,
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
            listType: 'picture-img',
            span: 24,
            // 图片地址前缀
            propsHttp: {
              home: 'http://demo.cssmoban.com'
            },
            tip: '只能上传jpg/png用户头像，且不超过500kb',
            // 图片上传接口
            action: '/imgupload',
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
            type: 'switch',
            span: 24,
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
            span: 24,
            type: 'switch'
          }
        ]
      },
      adminData: [
        {
          id: '1',
          name: 'xuanyu',
          email: '812006298@qq.com',
          avatar:
            '/cssthemes5/twts_236_rage/assets/images/background/header.jpg',
          status: '开启',
          isSuper: '是'
        },
        {
          id: '2',
          name: 'ayuer',
          email: '812006298@qq.com',
          avatar:
            '/cssthemes5/twts_236_rage/assets/images/background/header.jpg',
          status: '开启',
          isSuper: '是'
        }
      ]
    }
  },
  methods: {
    onLoad(page) {
      this.page.total = 40
    }
  }
}
</script>
<style lang="scss" scoped>
.administrator-page {
  padding: 30px;
}
</style>
