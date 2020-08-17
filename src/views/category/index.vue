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
            row: true
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
      categoryData: [
        {
          name: '衣服',
          pic:
            'https://wxt.sinaimg.cn/large/007XivJ0gy1g93mawj6coj30qn0qnabt.jpg',
          sort: 1,
          creatTime: '2020-08-17'
        }
      ]
    }
  },
  methods: {
    // 处理分页加载
    onLoad() {},
    // 添加分类保存
    handleCategoryAddSave() {},
    // 删除分类
    handleCategoryDel() {},
    // 分类更新
    handleCategoryUpdata() {}
  }
}
</script>

<style lang="scss" scoped>
.category-page {
  padding: 30px;
}
</style>
