webpackJsonp([10],{mj1H:function(e,t){},plt2:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s={name:"",data:function(){return{formData:{userName:"",pwd:""}}},methods:{submit:function(){var e=this;this.$axios.post("login",this.formData).then(function(t){if(200==t.code){var a=t.data;localStorage.setItem("token",a),e.$message({message:""+t.msg,type:"success"}),setTimeout(function(){e.$router.push("/")},1e3)}else e.$message({message:""+t.msg,type:"warning"})})}}},r={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"login"},[a("el-form",{staticClass:"demo-ruleForm",attrs:{model:e.formData,"status-icon":"","label-width":"100px"}},[a("el-form-item",{attrs:{label:"用户名",prop:"userName"}},[a("el-input",{attrs:{type:"password"},model:{value:e.formData.userName,callback:function(t){e.$set(e.formData,"userName",t)},expression:"formData.userName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"密码",prop:"pwd"}},[a("el-input",{attrs:{type:"password"},model:{value:e.formData.pwd,callback:function(t){e.$set(e.formData,"pwd",t)},expression:"formData.pwd"}})],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:e.submit}},[e._v("登录")])],1)],1)],1)},staticRenderFns:[]};var o=a("VU/8")(s,r,!1,function(e){a("mj1H")},null,null);t.default=o.exports}});
//# sourceMappingURL=10.c0ed625de16a06af1f2b.js.map