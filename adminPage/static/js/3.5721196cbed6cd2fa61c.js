webpackJsonp([3],{AynE:function(t,e){},qwjV:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o={name:"",data:function(){return{tableData:[],multiSelection:[],userId:[],pageSize:5,page:1,total:10}},methods:{getMsg:function(){var t=this;this.$axios.get("getMsg").then(function(e){t.tableData=e.data})},del:function(t){var e=this;this.$confirm("此操作将永久删除该内容, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.$axios.post("delMsg",{id:t}).then(function(t){200==t.code?(e.$message({type:"success",message:"删除成功!"}),setTimeout(function(){e.$router.go(0)},1e3)):e.$message({type:"error",message:"删除失败!"})})}).catch(function(){e.$message({type:"warning",message:"已取消删除"})})},selectionChange:function(t){this.multiSelection=t},toggleSelection:function(t){var e=this;if(t){for(var a in t)this.userId.push(t[a]._id);this.$axios.post("delManyMsg",{id:this.userId}).then(function(t){200==t.code&&e.$message({type:"success",message:"批量删除成功"})})}else this.$message({type:"warning",message:"没有选择"})},getNumber:function(){var t=this;this.$axios.get("getInteractionNum").then(function(e){t.total=e.data})},formatter:function(t){return t+(this.page-1)*this.pageSize+1},pageChange:function(t){var e=this;this.page=t,this.$axios.get("getMsg",{page:t,pageSize:this.pageSize}).then(function(t){e.tableData=t.data})}},created:function(){this.getMsg(),this.getNumber()}},n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"interaction"},[a("el-main",[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,stripe:""},on:{"selection-change":t.selectionChange}},[a("el-table-column",{attrs:{prop:"select",label:"",width:"50","show-overflow-tooltip":"",type:"selection"}}),t._v(" "),a("el-table-column",{attrs:{prop:"",label:"#",width:"100",type:"index",index:t.formatter,"show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"userName",label:"用户名",width:"150","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"content",label:"内容",width:"180","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"",label:"跟帖",width:"150","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"userAvatar",label:"头像",width:"180","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(t){return[a("img",{staticClass:"imgItem",attrs:{src:t.row.userAvatar,alt:""}})]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"createAt",label:"时间",width:"180","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){t.del(e.row._id)}}},[t._v("删除")])]}}])})],1)],1),t._v(" "),a("el-footer",[a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.toggleSelection(t.multiSelection)}}},[t._v("批量删除")]),t._v(" "),a("el-pagination",{attrs:{background:"",layout:"prev, pager, next,jumper",total:t.total,"current-page":t.page,"page-size":t.pageSize},on:{"current-change":t.pageChange}})],1)],1)},staticRenderFns:[]};var i=a("VU/8")(o,n,!1,function(t){a("AynE")},null,null);e.default=i.exports}});
//# sourceMappingURL=3.5721196cbed6cd2fa61c.js.map