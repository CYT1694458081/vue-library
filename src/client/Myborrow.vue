<!--我的借阅情况界面-->
<template>
  <div>
    <template >
      <div class="tb">
        <el-input style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)"
          placeholder="输入关键字搜索" v-model="search">
          <el-button slot="append" icon="el-icon-search" @click="find">查找</el-button>
        </el-input>
      </div>
    </template>
    <el-table
      :data="userdate" style=" z-index:-1;"  v-loading="loading" >
      <el-table-column
        label="记录序号"
        prop="log_id" align="center">
      </el-table-column>
      <el-table-column
        label="外观" align="center">
        <template>
          <el-image
            style="width: 65px; height: 65px"
            :src="require('../../static/image/log.jpg')"></el-image>
        </template>
      </el-table-column>
      <el-table-column
        label="书名"
        prop="book_name" align="center">
      </el-table-column>
      <el-table-column
        label="借阅日期"
        prop="date" align="center">
      </el-table-column>
      <el-table-column
        label="选项" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="back(scope.$index, scope.row)" type="success"  plain round>归还</el-button>
        </template>
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
    </div> <img src="../../static/image/CYT.png" height="80px" width="230px" style="float: right;margin-top: 65vh; z-index:9999"/>
  </div>
</template>
<script>
import {postRequest} from '../main'
export default {
  data () {
    return {
      log: {
        log_id: '',
        user_id: '',
        user_name: '',
        book_id: '',
        book_name: '',
        date: ''
      },
      search: '',
      list: [],
      total: null,
      currentPage1: 1,
      dialogTableVisible: false,
      pageSize: 5,
      formLabelWidth: '80px',
      userdate: [],
      loading: true
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.list = []
      postRequest('/api/public/getBorrowListByName', {name: JSON.parse(window.localStorage.getItem('user')).name}).then((result) => {
        if (result.data.code === 200) {
          // console.log(result)
          this.list = result.data.data
          this.craetep()
          this.loading = false
          // console.log(this.list)
        } else if (result.data.code === -1) {
          alert(result.data.msg)
        }
      }).catch(e => {
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
    back (index, row) {
      let borrowlog = {
        borrow_id: row.log_id,
        user_id: JSON.parse(window.localStorage.getItem('user')).user_id,
        book_id: row.book_id,
        date: ''
      }
      postRequest('/api/public/backBook/', borrowlog).then((result) => {
        console.log(result)
        if (result.data.code === 200) {
          this.$message(`${result.data.msg}`)
          this.fetchData()
        } else if (result.data.code === -1) {
          alert(`${result.data.msg}`)
        }
      }).catch(e => {
        console.log(e)
      })
      this.dialogTableVisible = false
      // this.$router.go(0)
      // this.$message({
      //   message: '修改了！',
      //   type: 'success'
      // })
    },
    find () {
      this.loading = true
      this.currentPage1 = 1
      postRequest('api/public/searchUserBorrowListByBook', {
        user: JSON.parse(window.localStorage.getItem('user')).name,
        book: this.search
      }).then((result) => {
        if (result.data.code === 200) {
          this.list = result.data.data
          this.craetep()
          this.loading = false
          // console.log(this.list2)
        } else if (result.data.code === -1) {
          alert(`${result.data.msg}`)
        }
      }).catch(e => {
        console.log(e)
      })
      // console.log(this.search)
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
    height: 70vh;
    position: absolute;
    top: 220px;
    margin-left: 10px;
    box-shadow: 0px 0px 10px #babfbf;
    width: 98%;
  }
  .pagination{
    position: absolute;
    bottom: 17vh;
    right: 90vh;
    top: 85vh;
  }
.tb{
    width: 450px;
    position: absolute;
    margin-left: 10px;
    top: 160px;
  }
</style>
