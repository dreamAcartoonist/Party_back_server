webpackJsonp([7],{Jlfl:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=a("Dd8w"),s=a.n(o),n={name:"update",components:{editor:a("mBlC").a},data:function(){return{formData:{title:"",desc:"",type:"",img:"",content:""},editorInit:!1,token:"",options:[]}},methods:{getData:function(){var t=this;this.$axios.get("getNews",{id:this.$route.query.id}).then(function(e){t.formData=e.data})},getType:function(){var t=this;this.$axios.get("getNewsCate").then(function(e){t.options=e.data,console.log(t.options)})},getToken:function(){var t=this;this.$axios.qiniuGet().then(function(e){t.token=e.data})},upload:function(t){this.formData.img=t.url},submit:function(){var t=this,e=s()({},this.formData,{id:this.$route.query.id});this.$axios.post("updateNews",e).then(function(e){200==e.code?t.$message({message:""+e.msg,type:"success"}):t.$message({message:""+e.msg,type:"warning"}),setTimeout(function(){t.$router.push("/News")},1e3)})}},created:function(){this.getToken(),this.getData(),this.getType()}},i={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"updateNews"},[a("el-form",{attrs:{model:t.formData}},[a("el-form-item",{attrs:{label:"新闻标题"}},[a("el-input",{model:{value:t.formData.title,callback:function(e){t.$set(t.formData,"title",e)},expression:"formData.title"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"新闻描述"}},[a("el-input",{model:{value:t.formData.desc,callback:function(e){t.$set(t.formData,"desc",e)},expression:"formData.desc"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"新闻类型"}},[a("el-select",{attrs:{placeholder:"请选择类型"},model:{value:t.formData.type,callback:function(e){t.$set(t.formData,"type",e)},expression:"formData.type"}},t._l(t.options,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}))],1),t._v(" "),a("el-form-item",{attrs:{label:"新闻图片"}},[a("el-upload",{staticClass:"avatar-uploader",attrs:{action:"https://upload-z1.qiniup.com","show-file-list":!1,"on-success":t.upload,data:{token:t.token}}},[t.formData.img?a("img",{staticClass:"avatar",attrs:{src:t.formData.img}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),t._v(" "),a("el-form-item",{attrs:{label:"新闻内容"}},[a("editor",{attrs:{isChange:t.editorInit},model:{value:t.formData.content,callback:function(e){t.$set(t.formData,"content",e)},expression:"formData.content"}})],1),t._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",round:""},on:{click:t.submit}},[t._v("保存")])],1)],1)],1)},staticRenderFns:[]};var r=a("VU/8")(n,i,!1,function(t){a("cmvn")},null,null);e.default=r.exports},cmvn:function(t,e){}});
//# sourceMappingURL=7.7acf0919d070d76dc5d5.js.map