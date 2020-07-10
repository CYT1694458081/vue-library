<!--用户记录-->
<template>
  <div>
    <template >
      <div v-if="dialogTableVisible11" class="tb">
        <el-input style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)"
          placeholder="输入关键字搜索" v-model="search">
          <el-button slot="append" icon="el-icon-search" @click="find">查找</el-button>
        </el-input>
      </div>
      <div v-if="dialogTableVisible22" class="tb">
        <el-input style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)"
          placeholder="输入关键字搜索" v-model="search2">
          <el-button slot="append" icon="el-icon-search" @click="findBorrow">查找</el-button>
        </el-input>
      </div>
      <div v-if="dialogTableVisible33" class="tb">
        <el-input style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)"
          placeholder="输入关键字搜索" v-model="search3">
          <el-button slot="append" icon="el-icon-search" @click="findBack">查找</el-button>
        </el-input>
      </div>
    </template>
    <div v-if="dialogTableVisible1">
    <el-table
              :data="userdate"
      style="width: 85%;">
      <el-table-column align="center"
        label="用户ID"
        prop="user_id">
      </el-table-column>
      <el-table-column
      label="头像"
       align="center" >
      <template>
        <el-image
          style="width: 65px; height: 65px"
          :src="require('../../static/image/user.jpg')"></el-image>
      </template>
    </el-table-column>
      <el-table-column align="center"
        label="用户名"
        prop="user_name">
      </el-table-column>
      <el-table-column align="center"
        label="借阅记录数"
        prop="borrowLog_num">
      </el-table-column>
      <el-table-column align="center"
        label="归还记录数"
        prop="backLog_num">
      </el-table-column>
      <el-table-column align="center"
        label="选项">
        <template slot-scope="scope">
          <el-button
            @click="handleEdit(scope.$index, scope.row)" type="primary" plain round>查看借阅详细</el-button>
          <el-button
            @click="handleEdit2(scope.$index, scope.row)" type="success" plain round>查看归还详细</el-button>
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
      </div>
    </div>
    <!---->
    <div v-if="dialogTableVisible2">
    <el-table  height="83vh"  :data="list2"
              style="width: 80%">
      <el-table-column align="center"
        label="记录">
        <template>
          <el-image
            style="width: 65px; height: 65px"
            :src="require('../../static/image/log.jpg')"></el-image>
        </template>
      </el-table-column>
      <el-table-column align="center"
        label="记录序号"
        prop="log_id">
      </el-table-column>
      <el-table-column align="center"
        label="书名"
        prop="book_name">
      </el-table-column>
      <el-table-column align="center"
        label="借阅时间"
        prop="date">
      </el-table-column>
      <el-table-column
        align="right">
        <template slot="header">
          <el-button slot="append" @click=" reset" > 返回</el-button>
        </template>
      </el-table-column>
    </el-table>
      </div>
        <!---->
    <div v-if="dialogTableVisible3">
    <el-table  height="83vh"  :data="list3"
              style="width: 80%">
      <el-table-column align="center"
        label="记录">
        <template>
          <el-image
            style="width: 65px; height: 65px"
            :src="require('../../static/image/log.jpg')"></el-image>
        </template>
      </el-table-column>
      <el-table-column align="center"
        label="记录序号"
        prop="log_id">
      </el-table-column>
      <el-table-column align="center"
        label="书名"
        prop="book_name">
      </el-table-column>
      <el-table-column align="center"
        label="归还时间"
        prop="date">
      </el-table-column>
      <el-table-column
        align="right">
        <template slot="header">
          <el-button slot="append" @click=" reset" > 返回</el-button>
        </template>
      </el-table-column>
    </el-table>
      </div>
  </div>
</template>
<script>
import {postRequest} from '../main'
export default {
  data () {
    return {
      dialogTableVisible1: true,
      dialogTableVisible2: false,
      dialogTableVisible3: false,
      dialogTableVisible11: true,
      dialogTableVisible22: false,
      dialogTableVisible33: false,
      total: null,
      currentPage1: 1,
      pageSize: 7,
      formLabelWidth: '120px',
      LogNum: {
        user_id: '',
        user_name: '',
        borrowLog_um: '',
        back_num: ''
      },
      LogList: {
        log_id: '',
        user_id: '',
        user_name: '',
        book_id: '',
        book_name: '',
        date: ''
      },
      userid: '',
      username: '',
      list: [],
      list2: [],
      list3: [],
      search: '',
      search2: '',
      search3: '',
      userdate: []
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.list = []
      postRequest('/api/public/getAllUserLogNum', {}).then((result) => {
        if (result.data.code === 200) {
          // console.log(result)
          this.list = result.data.data
          this.craetep()
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
    handleEdit (index, row) {
      this.dialogTableVisible1 = false
      this.dialogTableVisible2 = true
      this.dialogTableVisible11 = false
      this.dialogTableVisible22 = true
      this.username = row.user_name
      postRequest('api/public/getBorrowListByName', {
        name: row.user_name
      }).then((result) => {
        if (result.data.code === 200) {
          this.list2 = result.data.data
          // console.log(this.list2)
        } else if (result.data.code === -1) {
        }
      }).catch(e => {
        console.log(e)
      })
    },
    handleEdit2 (index, row) {
      this.dialogTableVisible1 = false
      this.dialogTableVisible3 = true
      this.dialogTableVisible11 = false
      this.dialogTableVisible33 = true
      this.username = row.user_name
      postRequest('api/public/getBackListByName', {
        name: row.user_name
      }).then((result) => {
        if (result.data.code === 200) {
          this.list3 = result.data.data
          // console.log(this.list2)
        } else if (result.data.code === -1) {
        }
      }).catch(e => {
        console.log(e)
      })
    },
    reset () {
      this.dialogTableVisible2 = false
      this.dialogTableVisible3 = false
      this.dialogTableVisible1 = true
      this.dialogTableVisible22 = false
      this.dialogTableVisible33 = false
      this.dialogTableVisible11 = true
      this.list2 = []
      this.userdate2 = []
      this.fetchData()
    },
    find () {
      this.currentPage1 = 1
      postRequest('api/public/searchUserLogNumByKey', {
        key: this.search
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
    },
    findBorrow () {
      this.currentPage2 = 1
      postRequest('api/public/searchUserBorrowListByBook', {
        user: this.username,
        book: this.search2
      }).then((result) => {
        if (result.data.code === 200) {
          this.list2 = []
          this.list2 = result.data.data
          // console.log(this.list2)
        } else if (result.data.code === -1) {
          alert(`${result.data.msg}`)
        }
      }).catch(e => {
        console.log(e)
      })
    },
    findBack () {
      this.currentPage3 = 1
      postRequest('api/public/searchUserBackListByBook', {
        user: this.username,
        book: this.search3
      }).then((result) => {
        if (result.data.code === 200) {
          this.list3 = []
          this.list3 = result.data.data
          // console.log(this.list2)
        } else if (result.data.code === -1) {
          alert(`${result.data.msg}`)
        }
      }).catch(e => {
        console.log(e)
      })
    },
    deletep (index, row) {
      this.$message.error('权限不够，无法删除')
      console.log(index, row)
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
    top: 150px;
    /*width: 95vw;*/
    margin-left: 240px;
    box-shadow: 0px 0px 10px #babfbf;
  }
  .pagination{
    position: absolute;
    bottom: 10vh;
    right: 40vw;
  }
  .block{
    position: absolute;
    bottom: 10vh;
    right: 40vw;
  }
  .tb{
    width: 450px;
    position: absolute;
    left: 250px;
    top: 90px;
  }
</style>
