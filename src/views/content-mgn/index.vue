<template>
  <div class="content-mgn-container">
    <div class="left-section">
      <a-tree
        v-model:selectedKeys="selectedKeys"
        show-line
        :tree-data="state.treeData"
        :defaultExpandAll="true"
        :replaceFields="replaceFields"
        @select="onSelectTreeNode"
      >
        <template #switcherIcon><down-outlined /></template>
      </a-tree>
    </div>
    <div class="right-section">
      <div class="search-section">
        <a-row>
          <a-col :span="8">
            <a-input v-model:value="state.searchKey" placeholder="请输入" />
          </a-col>
          <a-col :span="8">
            <a-button type="primary" style="margin-left: 10px" @click="onHandleSearch">搜索</a-button>
          </a-col>
        </a-row>
      </div>
      <a-table
      :data-source="state.data"
      :scroll="{ y: state.tableHeight }"
      rowKey="id"
      :pagination="false">
      <a-table-column key="order" title="序号">
        <template #default="{ index }">
          <span>{{index + 1}}</span>
        </template>
      </a-table-column>
      <a-table-column key="title" title="标题" data-index="title" />
      <a-table-column key="createTime" title="时间" data-index="createTime" />
      <a-table-column key="createBy" title="创建人" data-index="createBy" />
    </a-table>
    <div class="pager-section">
      <a-pagination
        show-size-changer
        v-model:current="state.pager.pageNumber"
        v-model:pageSize="state.pager.pageSize"
        :total="state.pager.total"
        :show-total="(total: any) => `共 ${total} 条`"
        @showSizeChange="onShowSizeChange"
        @change="onShowPageChange"
      />
    </div>
    </div>
  </div>
</template>
<script lang="ts">
import { DownOutlined } from '@ant-design/icons-vue'
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import * as API from '@/api/content-mgn'
export default defineComponent({
  components: {
    DownOutlined
  },
  setup () {
    const replaceFields = {
      children: 'childrenList',
      title: 'moduleName',
      key: 'id'
    }
    const selectedKeys = ref<string[]>(['0-0-0'])
    const state = reactive({
      treeData: [],
      // 搜索条件
      searchKey: '',
      // 表格数据
      data: [],
      // 表格高度
      tableHeight: document.body.clientHeight - 260,
      // 分页信息
      pager: {
        pageNumber: 1,
        pageSize: 10,
        total: 0
      }
    })
    // 获取栏目树
    function getMenuTreeData () {
      API.getMenuTreeList().then(res => {
        const { code, data, msg } = res
        if (code === 200) {
          state.treeData = data
        } else {
          message.warning(msg)
        }
      })
    }
    // 获取栏目树
    getMenuTreeData()
    // 选中节点
    function onSelectTreeNode (selectedKeys: Array<string>, e: any) {
      if (selectedKeys && selectedKeys.length > 0) {
        console.log(e.selectedNodes[0].props)
      }
    }
    // 获取新闻列表
    getNewsList()

    onMounted(() => {
      const win: any = window
      win.onresize = () => {
        state.tableHeight = document.body.clientHeight - 260
      }
    })

    // 搜索列表
    function onHandleSearch () {
      state.pager.pageNumber = 1
      getNewsList()
    }
    // 获取新闻列表
    function getNewsList () {
      const { pageSize, pageNumber } = state.pager
      interface SearchParams {
        pageNumber: number,
        pageSize: number,
        moduleId: string
      }
      const params: SearchParams = {
        pageSize,
        pageNumber,
        moduleId: state.searchKey
      }
      API.getNewsListData(params).then(res => {
        const { code, data, msg } = res
        if (code === 200) {
          state.data = data.list
          state.pager.total = data.total
        } else {
          message.warning(msg)
        }
      })
    }
    // 分页每页显示条数切换
    function onShowSizeChange (pageNumber: number, pageSize: number) {
      state.pager.pageSize = pageSize
      state.pager.pageNumber = 1
      getNewsList()
    }
    // 分页当前页切换
    function onShowPageChange (pageNumber: number) {
      state.pager.pageNumber = pageNumber
      getNewsList()
    }
    return {
      selectedKeys,
      replaceFields,
      state,
      onSelectTreeNode,
      onHandleSearch,
      onShowSizeChange,
      onShowPageChange
    }
  }
})
</script>

<style lang="scss" scoped>
.content-mgn-container{
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  .left-section{
    width: 200px;
    height: 100%;
    overflow-y: auto;
  }
  .right-section{
    margin-left: 20px;
    flex: 1;
    .search-section{
      padding-bottom: 20px;
    }
    .pager-section{
      margin-top: 20px;
      text-align: right;
    }
  }
}
</style>
