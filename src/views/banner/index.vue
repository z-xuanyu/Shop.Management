<template>
  <div class="banner-page">
    <avue-crud
      :option="bannerOption"
      :data="bannerData"
      @row-save="handleBannerAddSave"
      @row-del="handleBannerDel"
      @row-update="handleBannerUpdata"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      bannerOption: {
        index: true,
        border: true,
        align: 'center',
        column: [
          {
            width: '200',
            labelWidth: 100,
            label: 'Banner名称',
            prop: 'name',
            span: 10,
            row: true
          },
          {
            labelWidth: 100,
            label: 'Banner图片',
            prop: 'bannerPath',
            span: 24,
            type: 'upload',
            listType: 'picture-img',
            action: 'avatarUpload',
            // 注意:如返回(data:{url:'xxxx'}),则res配置为data
            propsHttp: {
              url: 'url'
            },
            tip: '只能上传jpg/png类别图片，且不超过500kb'
          },
          {
            label: 'URL',
            prop: 'targetUrl',
            span: 10,
            row: true
          },
          {
            label: '创建时间',
            prop: 'createdAt',
            span: 10,
            type: 'date'
          }
        ]
      },
      bannerData: [
        {
          name: '首页Banner图片',
          bannerPath:
            'http://nestshop.oss-cn-shenzhen.aliyuncs.com/92a3e86eeca9ed0d4be8b509a8eeaaf2.png',
          bannerType: 1,
          targetUrl: 'http://www.zhouxuanyu.com',
          commodityID: '测试商品',
          createdAt: '2020-08-21 11:32'
        },
        {
          name: '首页Banner图片',
          bannerPath:
            'http://nestshop.oss-cn-shenzhen.aliyuncs.com/92a3e86eeca9ed0d4be8b509a8eeaaf2.png',
          bannerType: 1,
          targetUrl: 'http://www.zhouxuanyu.com',
          commodityID: '测试商品',
          createdAt: '2020-08-21 11:32'
        }
      ]
    }
  },
  methods: {
    // 添加banner
    handleBannerAddSave() {},
    // 编辑更新banner信息
    handleBannerUpdata() {},
    // 删除banner
    handleBannerDel() {}
  }
}
</script>
<style lang="scss" scoped>
.banner-page {
  padding: 30px;
}
</style>
