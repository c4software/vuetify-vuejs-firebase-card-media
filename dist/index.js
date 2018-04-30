!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports["firebase-uploader"]=t():e["firebase-uploader"]=t()}(window,function(){return function(e){var t={};function i(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,i),a.l=!0,a.exports}return i.m=e,i.c=t,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},i.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=0)}([function(e,t,i){"use strict";i.r(t);var n=function(e,t,i,n,a,r,o,l){var s=typeof(e=e||{}).default;"object"!==s&&"function"!==s||(e=e.default);var f,d="function"==typeof e?e.options:e;if(t&&(d.render=t,d.staticRenderFns=i,d._compiled=!0),n&&(d.functional=!0),r&&(d._scopeId=r),o?(f=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),a&&a.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(o)},d._ssrRegister=f):a&&(f=l?function(){a.call(this,this.$root.$options.shadowRoot)}:a),f)if(d.functional){d._injectStyles=f;var u=d.render;d.render=function(e,t){return f.call(t),u(e,t)}}else{var c=d.beforeCreate;d.beforeCreate=c?[].concat(c,f):[f]}return{exports:e,options:d}}({name:"FirebaseUploader",data:function(){return{hasError:!1,loading:!1,defaultImage:"",hasFile:!1,filename:"",fileLink:""}},computed:{acceptedFileFormat:function(){return this.limitToType.join(",")}},created:function(){this.getMetaData(),this.previewImage&&(defaultImage=this.previewImage)},watch:{path:function(){this.getMetaData()},storage:function(){this.getMetaData()}},props:{createBtnLabel:{type:String,default:"Choose the cover"},modifyBtnLabel:{type:String,default:"Modify the cover"},unsuportedMediaTypeLabel:{type:String,default:"Unsuported Media Type. Please use a correct file format"},previewImage:{type:String,required:!1,default:void 0},coverSize:{type:String,required:!1,default:"200px"},path:{type:String,required:!0},storage:{type:Object,required:!0},targetFileName:{type:String,required:!0},limitToType:{type:Array,default:function(){return[]}}},methods:{targetPath:function(){return this.path+"/"+this.targetFileName},getFileRef:function(){return this.storage.ref().child(this.targetPath())},resetUpload:function(){var e=this.$refs.loader;e.replaceWith(e.val("").clone(!0))},onChangeLoader:function(){event.target.files[0]&&this.uploadFile(event.target.files[0])},getMetaData:function(){var e=this;this.loading=!0,this.getFileRef().getMetadata().then(function(t){e.filename=t.name,e.fileLink=t.downloadURLs[0],e.hasFile=!0,e.loading=!1,"file"===t.type&&-1!==t.contentType.indexOf("image/")&&(e.defaultImage=t.downloadURLs[0])}).catch(function(){e.loading=!1,e.defaultImage=previewImage,e.hasFile=!1,e.filename="",e.fileLink=""})},uploadFile:function(e){var t=this;if(this.limitToType.length>=1&&-1===this.limitToType.indexOf(e.type))return this.hasError=!0,!1;this.hasError=!1,this.loading=!0,this.getFileRef().put(e).then(function(){t.getMetaData(),t.loading=!1,t.$emit("onFileUpload",t.targetPath())}).catch(function(){t.$emit("onFileUploadError",t.targetPath()),t.loading=!1})},deleteFile:function(){var e=this;this.loading=!0,this.getFileRef().delete().then(function(){e.loading=!1,e.defaultImage=!1,e.hasFile=!1,e.filename="",e.fileLink="",e.$emit("onFileDelete",e.targetPath()),e.resetUpload()}).catch(function(){e.loading=!1})}}},function(){var e=this,t=this.$createElement,i=this._self._c||t;return i("v-card-media",{staticClass:"mb-1",attrs:{src:this.defaultImage,height:this.coverSize}},[i("input",{ref:"loader",attrs:{type:"file",accept:this.acceptedFileFormat,hidden:""},on:{change:this.onChangeLoader}}),this._v(" "),i("v-container",{attrs:{"fill-height":"",fluid:""}},[i("v-layout",{attrs:{"fill-height":""}},[i("v-flex",{attrs:{xs12:"","align-end":"","text-xs-right":"",flexbox:""}},[i("v-btn",{attrs:{loading:this.loading},on:{click:function(){return e.$refs.loader.click()}}},[this._v("\n          "+this._s(this.filename?this.modifyBtnLabel:this.createBtnLabel)+"\n        ")])],1)],1)],1)],1)},[],!1,null,null,null).exports;i.d(t,"firebaseCardMedia",function(){return n});t.default={install:function(e){e.component("firebaseCardMedia",n)}}}])});