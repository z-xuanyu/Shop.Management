<template>
  <div class="banner-page">
    <avue-crud
      :option="bannerOption"
      :data="bannerData"
      @row-save="handleBannerAddSave"
      @row-del="handleBannerDel"
      @row-update="handleBannerUpdata"
    >
      <!-- 时间 -->
      <template slot="createdAt" slot-scope="scope">
        {{ scope.row.createdAt | dateFormat }}
      </template>
    </avue-crud>
  </div>
</template>

<script>
import { addBanner, getBannerList, updateBanner, deleteBanner } from '@/api/banner'
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
            prop: 'url',
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
            label: '创建时间',
            prop: 'createdAt',
            span: 10,
            type: 'date',
            slot: true,
            display: false
          }
        ]
      },
      bannerData: []
    }
  },
  created() {
    this.getBannerListInfo()
  },
  methods: {
    // 获取banner列表
    async getBannerListInfo() {
      try {
        const res = await getBannerList()
        this.bannerData = res.data
      } catch (err) {
        this.$message.error('数据获取失败')
      }
    },
    // 添加banner
    async handleBannerAddSave(row, done) {
      try {
        const res = await addBanner(row)
        if (res) {
          this.getBannerListInfo()
          this.$message.success('添加成功')
          done()
        }
      } catch (error) {
        this.$message.error('添加失败')
      }
    },
    // 编辑更新banner信息
    async handleBannerUpdata(row, index, done) {
      delete row.$index
      try {
        const res = await updateBanner(row)
        if (res) {
          this.$message.success('更新成功！')
          this.getBannerListInfo
          done()
        }
      } catch (error) {
        this.$message.error('更新失败！')
      }
    },
    // 删除banner
    handleBannerDel(row) {
      this.$confirm(`您确定要删除“${row.name}”该标签吗？`, '提示')
        .then(() => {
          deleteBanner(row._id).then(() => {
            this.getBannerListInfo()
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
.banner-page {
  padding: 30px;
}
</style>
