webpackJsonp([15],{XtBG:function(a,t){},ngna:function(a,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=e("Dd8w"),o=e.n(s),r={name:"update",data:function(){return{formData:{userName:"",idCard:"",pwd:"",avatar:"",phone:"",sex:"",joinTime:"",status:""},token:""}},methods:{getData:function(){var a=this;this.$axios.get("getUsers",{id:this.$route.query.id}).then(function(t){a.formData=t.data,console.log(t.data)})},getToken:function(){var a=this;this.$axios.qiniuGet().then(function(t){a.token=t.data})},upload:function(a){this.formData.avatar=a.url},submit:function(){var a=this,t=o()({},this.formData,{id:this.$route.query.id});this.$axios.post("updateUsers",t).then(function(t){200==t.code?(a.$message({message:""+t.msg,type:"success"}),setTimeout(function(){a.$router.push("/users")},1500)):a.$message({message:""+t.msg,type:"warning"})})}},created:function(){this.getToken(),this.getData()}},i={render:function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("div",{staticClass:"updateUsers"},[e("el-form",{attrs:{model:a.formData,"label-width":"80px"}},[e("el-form-item",{attrs:{label:"用户名"}},[e("el-input",{model:{value:a.formData.userName,callback:function(t){a.$set(a.formData,"userName",t)},expression:"formData.userName"}})],1),a._v(" "),e("el-form-item",{attrs:{label:"身份证"}},[e("el-input",{model:{value:a.formData.idCard,callback:function(t){a.$set(a.formData,"idCard",t)},expression:"formData.idCard"}})],1),a._v(" "),e("el-form-item",{attrs:{label:"密码"}},[e("el-input",{model:{value:a.formData.pwd,callback:function(t){a.$set(a.formData,"pwd",t)},expression:"formData.pwd"}})],1),a._v(" "),e("el-form-item",{attrs:{label:"手机号"}},[e("el-input",{model:{value:a.formData.phone,callback:function(t){a.$set(a.formData,"phone",t)},expression:"formData.phone"}})],1),a._v(" "),e("el-form-item",{attrs:{label:"性别"}},[e("el-radio",{attrs:{label:"1"},model:{value:a.formData.sex,callback:function(t){a.$set(a.formData,"sex",t)},expression:"formData.sex"}},[a._v("男")]),a._v(" "),e("el-radio",{attrs:{label:"0"},model:{value:a.formData.sex,callback:function(t){a.$set(a.formData,"sex",t)},expression:"formData.sex"}},[a._v("女")])],1),a._v(" "),e("el-form-item",{attrs:{label:"入党时间"}},[e("el-date-picker",{attrs:{type:"date",placeholder:"选择日期"},model:{value:a.formData.joinTime,callback:function(t){a.$set(a.formData,"joinTime",t)},expression:"formData.joinTime"}})],1),a._v(" "),e("el-form-item",{attrs:{label:"政治面貌"}},[e("el-input",{model:{value:a.formData.status,callback:function(t){a.$set(a.formData,"status",t)},expression:"formData.status"}})],1),a._v(" "),e("el-form-item",{attrs:{label:"图片"}},[e("el-upload",{staticClass:"avatar-uploader",attrs:{action:"https://upload-z1.qiniup.com","show-file-list":!1,"on-success":a.upload,data:{token:a.token}}},[a.formData.avatar?e("img",{staticClass:"avatar",attrs:{src:a.formData.avatar}}):e("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),a._v(" "),e("el-form-item",[e("el-button",{attrs:{type:"primary",round:""},on:{click:a.submit}},[a._v("保存")])],1)],1)],1)},staticRenderFns:[]};var l=e("VU/8")(r,i,!1,function(a){e("XtBG")},null,null);t.default=l.exports}});
//# sourceMappingURL=15.7951c159ff7edfc6878b.js.map