<template>
  <div class="user-mgn-container">
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
      :pagination="false"
      rowKey="id">
      <a-table-column key="order" title="编号">
        <template #default="{ index }">
          <span>{{index + 1}}</span>
        </template>
      </a-table-column>
      <a-table-column key="username" title="用户名" data-index="username" />
      <a-table-column key="realName" title="真实姓名" data-index="realName" />
      <a-table-column key="roleName" title="用户类型" data-index="roleName" />
      <a-table-column key="phoneNumber" title="联系电话" data-index="phoneNumber"/>
      <a-table-column key="email" title="邮箱" data-index="email"/>
      <a-table-column key="action" title="Action" width="260px">
        <template #default="{ record }">
          <span>
            <a-button type="primary" @click="onHandleView(record)">详情</a-button>
            <a-button style="margin-left: 10px;" type="primary" @click="onHandleEdit(record)">编辑</a-button>
            <a-button style="margin-left: 10px;" type="primary" @click="onHandleDelete(record)">删除</a-button>
          </span>
        </template>
      </a-table-column>
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
    <FormModel v-if="state.dialogVisible" :dialogVisible="state.dialogVisible" :type="state.dialogType" :currentRowData="state.currentRowData" @closeDialog="closeDialog"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, toRaw, createVNode } from 'vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { message, Modal } from 'ant-design-vue'
import * as API from '@/api/user-mgn'
import FormModel from './FormModel.vue'
export default defineComponent({
  components: { FormModel },
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
    getUserList()

    onMounted(() => {
      const win: any = window
      win.onresize = () => {
        state.tableHeight = document.body.clientHeight - 260
      }
    })
    // 搜索列表
    function onHandleSearch () {
      state.pager.pageNumber = 1
      getUserList()
    }
    // 获取用户列表
    function getUserList () {
      const { pageSize, pageNumber } = state.pager
      interface SearchParams {
        pageNumber: number,
        pageSize: number,
        username: string
      }
      const params: SearchParams = {
        pageSize,
        pageNumber,
        username: state.searchKey
      }
      API.getUserList(params).then(res => {
        const { code, rows, total, msg } = res
        if (code === 200) {
          state.data = rows
          state.pager.total = total
        } else {
          message.warning(msg)
        }
      })
    }
    // 分页每页显示条数切换
    function onShowSizeChange (pageNumber: number, pageSize: number) {
      state.pager.pageSize = pageSize
      state.pager.pageNumber = 1
      getUserList()
    }
    // 分页当前页切换
    function onShowPageChange (pageNumber: number) {
      state.pager.pageNumber = pageNumber
      getUserList()
    }
    // 详情
    function onHandleView (data: any) {
      state.dialogType = 'detail'
      state.currentRowData = toRaw(data)
      state.dialogVisible = true
    }
    // 编辑
    function onHandleEdit (data: any) {
      state.dialogType = 'edit'
      state.currentRowData = toRaw(data)
      console.log(state.currentRowData)
      state.dialogVisible = true
    }
    // 删除
    function onHandleDelete (data: any) {
      console.log(toRaw(data))
      Modal.confirm({
        title: '确认',
        icon: createVNode(ExclamationCircleOutlined),
        content: '数据删除后无法回复，您确定要删除吗？',
        okText: '确认',
        cancelText: '取消',
        maskStyle: {
          animation: 'none'
        },
        onOk () {
          message.success('删除成功！')
        },
        onCancel () {
          Modal.destroyAll()
        }
      })
    }
    // 关闭弹窗
    function closeDialog () {
      state.dialogVisible = false
    }
    return {
      state,
      onHandleSearch,
      onShowSizeChange,
      onShowPageChange,
      onHandleView,
      onHandleEdit,
      onHandleDelete,
      closeDialog
    }
  }

})
</script>

<style lang="scss" scoped>
.user-mgn-container{
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
