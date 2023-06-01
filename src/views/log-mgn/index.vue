<template>
  <div class="log-mgn-container">
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
      <a-table-column key="order" title="order">
        <template #default="{ index }">
          <span>{{index + 1}}</span>
        </template>
      </a-table-column>
      <a-table-column key="operateUsername" title="用户名" data-index="operateUsername" />
      <a-table-column key="operateRealName" title="真实姓名" data-index="operateRealName" />
      <a-table-column key="operateRoleName" title="用户类型" data-index="operateRoleName" />
      <a-table-column key="moduleName" title="操作模块" data-index="moduleName" />
      <a-table-column key="ipAddr" title="用户IP" data-index="ipAddr" />
      <a-table-column key="createTime" title="操作时间" data-index="createTime" />
    </a-table>
    <div class="pager-section">
      <a-pagination
        show-size-changer
        v-model:current="state.pager.pageNumber"
        v-model:pageSize="state.pager.pageSize"
        :total="state.pager.total"
        :show-total="() => `共 ${state.pager.total} 条`"
        @showSizeChange="onShowSizeChange"
        @change="onShowPageChange"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue'
import { message } from 'ant-design-vue'
import * as API from '@/api/log-mgn'
export default defineComponent({
  setup () {
    const state = reactive({
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
      },
      // 是否显示弹窗
      dialogVisible: false,
      // 当前行数据
      currentRowData: {},
      // 弹窗类别
      dialogType: 'add'
    })
    // 获取用户列表
    getLogList()

    onMounted(() => {
      const win: any = window
      win.onresize = () => {
        state.tableHeight = document.body.clientHeight - 260
      }
    })
    // 搜索列表
    function onHandleSearch () {
      state.pager.pageNumber = 1
      getLogList()
    }
    // 获取用户列表
    function getLogList () {
      const { pageSize, pageNumber } = state.pager
      interface SearchParams {
        pageNumber: number,
        pageSize: number,
        keyword: string
      }
      const params: SearchParams = {
        pageSize,
        pageNumber,
        keyword: state.searchKey
      }
      API.getLogList(params).then(res => {
        const { code, data, msg } = res
        if (code === 200) {
          console.log(data.list)
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
      getLogList()
    }
    // 分页当前页切换
    function onShowPageChange (pageNumber: number) {
      state.pager.pageNumber = pageNumber
      getLogList()
    }
    return {
      state,
      onHandleSearch,
      onShowSizeChange,
      onShowPageChange
    }
  }

})
</script>

<style lang="scss" scoped>
.log-mgn-container{
  height: 100%;
  width: 100%;
  padding: 20px;
  overflow-y: auto;
  .search-section{
    padding-bottom: 20px;
  }
  .pager-section{
    margin-top: 20px;
    text-align: right;
  }
}
</style>
