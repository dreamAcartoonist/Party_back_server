webpackJsonp([9],{"30tl":function(t,a){},"CDO+":function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var o=e("Dd8w"),s=e.n(o),i={name:"",data:function(){return{formData:{title:"",url:"",sort:"",isShow:"",img:""},token:""}},methods:{getData:function(){var t=this;this.$axios.get("getCarousels",{id:this.$route.query.id}).then(function(a){t.formData=a.data[0]})},getToken:function(){var t=this;this.$axios.qiniuGet().then(function(a){t.token=a.data})},upload:function(t){this.formData.img=t.url},submit:function(){var t=this,a=s()({},this.formData,{id:this.$route.query.id});this.$axios.post("updateCarousels",a).then(function(a){200==a.code?t.$message({message:""+a.msg,type:"success"}):t.$message({message:""+a.msg,type:"warning"}),setTimeout(function(){t.$router.push("/carousel")},1500)})}},created:function(){this.getToken(),this.getData()}},r={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"update"},[e("el-form",{attrs:{model:t.formData,"label-width":"80px"}},[e("el-form-item",{attrs:{label:"标题"}},[e("el-input",{model:{value:t.formData.title,callback:function(a){t.$set(t.formData,"title",a)},expression:"formData.title"}})],1),t._v(" "),e("el-form-item",{attrs:{label:"链接"}},[e("el-input",{model:{value:t.formData.url,callback:function(a){t.$set(t.formData,"url",a)},expression:"formData.url"}})],1),t._v(" "),e("el-form-item",{attrs:{label:"顺序"}},[e("el-input",{model:{value:t.formData.sort,callback:function(a){t.$set(t.formData,"sort",a)},expression:"formData.sort"}})],1),t._v(" "),e("el-form-item",{attrs:{label:"状态"}},[e("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},model:{value:t.formData.isShow,callback:function(a){t.$set(t.formData,"isShow",a)},expression:"formData.isShow"}})],1),t._v(" "),e("el-form-item",{attrs:{label:"缩略图"}},[e("el-upload",{staticClass:"avatar-uploader",attrs:{action:"https://upload-z1.qiniup.com","show-file-list":!1,"on-success":t.upload,data:{token:t.token}}},[t.formData.img?e("img",{staticClass:"avatar",attrs:{src:t.formData.img}}):e("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),t._v(" "),e("el-form-item",[e("el-button",{attrs:{type:"primary",round:""},on:{click:t.submit}},[t._v("保存")])],1)],1)],1)},staticRenderFns:[]};var l=e("VU/8")(i,r,!1,function(t){e("30tl")},null,null);a.default=l.exports}});
//# sourceMappingURL=9.242771bf490d9da08a17.js.map