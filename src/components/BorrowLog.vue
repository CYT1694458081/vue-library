<!--借阅记录-->
<template>
  <div>
    <template >
      <div class="tb">
        <el-input style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)"
          placeholder="输入用户名或书名搜索" v-model="search">
          <el-button slot="append" icon="el-icon-search" @click="find">查找</el-button>
        </el-input>
      </div>
    </template>
  <el-table border
    :data="userdate" >
    <el-table-column
      label="记录"
       align="center" >
      <template>
        <el-image
          style="width: 65px; height: 65px"
          :src="require('../../static/image/log.jpg')"></el-image>
      </template>
    </el-table-column>
    <el-table-column
    label="记录序号"
    prop="log_id" align="center" >
  </el-table-column>
    <el-table-column
      label="用户名"
      prop="user_name" align="center">
    </el-table-column>
    <el-table-column
      label="书名"
      prop="book_name" align="center">
    </el-table-column>
    <el-table-column
      label="借阅时间"
      prop="date" align="center">
    </el-table-column>
  </el-table>
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next" :page-size="pageSize" :page-sizes="[10, 20, 50, 100]"
        :total="total"
        @size-change="handleSizeChange1"
        @current-change="handleCurrentChange1" :current-page="currentPage1">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import {postRequest} from '../main'

export default {
  data () {
    return {
      total: null,
      currentPage1: 1,
      dialogTableVisible: false,
      dialogTableVisible2: false,
      pageSize: 6,
      formLabelWidth: '80px',
      LogList: {
        log_id: '',
        user_id: '',
        user_name: '',
        book_id: '',
        book_name: '',
        date: ''
      },
      userdate: [],
      list: [],
      search: ''
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    // 从后台获取所有记录
    fetchData () {
      this.list = []
      postRequest('/api/public/getAllBorrowList', {}).then((result) => {
        if (result.data.code === 200) {
          // console.log(result)
          this.list = result.data.data
          // console.log(this.list)
          this.craetep()
        } else if (result.data.code === -1) {
          alert(result.data.msg)
        }
      }).catch(e => {
        console.log(e)
      })
    },
    craetep () {
      this.userdate = []
      let from = (this.currentPage1 - 1) * this.pageSize
      let to = this.currentPage1 * this.pageSize
      for (; from < to; from++) {
        if (this.list[from]) {
          // console.log(this.list[from])
          this.userdate.push(this.list[from])
        }
      }
      this.total = this.list.length
    },
    handleEdit (index, row) {
      this.dialogTableVisible = true
      this.LogList.log_id = row.log_id
      this.LogList.user_id = row.user_id
      this.LogList.user_name = row.user_name
      this.LogList.book_id = row.book_id
      this.LogList.book_name = row.book_name
      this.LogList.date = row.date
      console.log(index, row)
    },
    find () {
      // console.log(this.search)
      this.currentPage1 = 1
      postRequest('/api/public/getBorrowListByKey', {
        searchParam: this.search
      }).then((result) => {
        if (result.data.code === 200) {
          this.list = []
          this.list = result.data.data
          this.craetep()
          this.$message(`${result.data.msg}`)
        } else if (result.data.code === -1) {
          alert(`${result.data.msg}`)
        }
      }).catch(e => {
        console.log(e)
      })
      postRequest('/api/public/getBorrowListByKey', {key: this.search}).then((result) => {
        if (result.data.code === 200) {
          // console.log(result)
          this.list = result.data.data
          // console.log(this.list)
          this.userdate = []
          this.craetep()
        } else if (result.data.code === -1) {
          alert(result.data.msg)
        }
      }).catch(e => {
        console.log(e)
      })
    },
    handleSizeChange1: function (pageSize) {
      this.pageSize = pageSize
      this.handleCurrentChange1(this.currentPage1)
    },
    handleCurrentChange1: function (currentPage) {
      this.currentPage1 = currentPage
      this.currentChangePage(this.list, currentPage)
    }, // 分页方法（重点）
    currentChangePage (list, currentPage) {
      let from = (currentPage - 1) * this.pageSize
      let to = currentPage * this.pageSize
      this.userdate = []
      for (; from < to; from++) {
        if (list[from]) {
          this.userdate.push(list[from])
        }
      }
    }
  }
}
</script>

<style scoped>
  .el-table{
    height: 80vh;
    position: absolute;
    left: 0;
    top: 140px;
    width: 85vw;
    margin-left: 240px;
    box-shadow: 0px 0px 10px #babfbf;
  }
  .pagination{
    position: absolute;
    bottom: 10vh;
    right: 40vw;
  }
  .el-dialog{
    width: 120px;
    height: 200px;
  }
  .tb{
    width: 450px;
    position: absolute;
    left: 250px;
    top: 90px;
  }
</style>
