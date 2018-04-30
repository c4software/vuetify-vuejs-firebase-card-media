<template>

  <v-card-media :src="this.defaultImage" class="mb-1" :height="coverSize">
    <input type="file" ref="loader" @change="onChangeLoader" v-bind:accept="acceptedFileFormat" hidden>
    <v-container fill-height fluid>
      <v-layout fill-height>
        <v-flex xs12 align-end text-xs-right flexbox>
          <v-btn @click="() => this.$refs.loader.click()" :loading="loading">
            {{this.filename?this.modifyBtnLabel:this.createBtnLabel}}
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card-media>
  
</template>

<script>
  export default {
    name: "FirebaseUploader",
    data: function() {
      return {
        hasError: false,
        loading: false,
        defaultImage: "",
        hasFile: false,
        filename: "",
        fileLink: ""
      }
    },
    computed: {
      acceptedFileFormat: function() {
        return this.limitToType.join(',');
      }
    },
    created: function() {
      this.getMetaData()
      if(this.previewImage){
        defaultImage = this.previewImage;
      }
    },
    watch: {
      path: function(){
        this.getMetaData()
      },
      storage: function(){
        this.getMetaData()
      }
    },
    props: {
      /**
       * Labels
       */
      createBtnLabel: {
        type: String,
        default: "Choose the cover"
      },
      modifyBtnLabel: {
        type: String,
        default: "Modify the cover"
      },
      unsuportedMediaTypeLabel: {
        type: String,
        default: "Unsuported Media Type. Please use a correct file format"
      },

      previewImage: {
        type: String,
        required: false,
        default: undefined
      },

      coverSize: {
        type: String,
        required: false,
        default: "200px"
      },

      /**
       * Firebase save path
       */
      path: {
        type: String,
        required: true,
      },
      /**
       * Firebase storage access
       */
      storage: {
        type: Object,
        required: true,
      },
      /**
       * Output filename
       */
      targetFileName: {
        type: String,
        required: true,
      },
      /**
       * Output filename
       */
      limitToType: {
        type: Array,
        default: function() {
          return []
        },
      }
    },
    methods:{
      targetPath: function(){
        return this.path + '/' + this.targetFileName
      },
      getFileRef: function(){
        return this.storage.ref().child(this.targetPath());
      },
      /**
       * Reset the file upload to allow multiple files upload (chain)
       */
      resetUpload: function(){
        let control = this.$refs.loader;
        control.replaceWith(control.val('').clone(true));
      },
      /**
       * Triggered on file selection.
       */
      onChangeLoader: function() {
        if(event.target.files[0]) {
          this.uploadFile(event.target.files[0]);
        }
      },
      getMetaData: function() {
        this.loading = true;
        this.getFileRef().getMetadata().then((m) => {
          this.filename = m.name;
          this.fileLink = m.downloadURLs[0];
          this.hasFile = true;
          this.loading = false;
          if(m.type === 'file' && m.contentType.indexOf('image/') !== -1){
            this.defaultImage = m.downloadURLs[0];
          }
        }).catch(() => {
          this.loading = false;
          this.defaultImage = previewImage;
          this.hasFile = false;
          this.filename = "";
          this.fileLink = "";
        });
      },
      /**
       * Upload a new file in firebase
       * @param file
       * @returns {boolean}
       */
      uploadFile: function (file) {
        if (this.limitToType.length >= 1 && this.limitToType.indexOf(file.type) === -1) {
          // File type not authorized
          this.hasError = true;
          return false;
        }else{
          this.hasError = false;
        }

        this.loading = true;

        /**
         * Upload file to firebase
         */
        this.getFileRef().put(file).then(() => {
          this.getMetaData();
          this.loading = false;
          this.$emit('onFileUpload', this.targetPath());
        }).catch(() => {
          this.$emit('onFileUploadError', this.targetPath());
          this.loading = false;
        });
      },
      /**
       * Remove file in Firebase Storage
       */
      deleteFile: function () {
        this.loading = true;
        this.getFileRef().delete().then(() => {
          this.loading = false;
          this.defaultImage = false;
          this.hasFile = false;
          this.filename = "";
          this.fileLink = "";
          this.$emit('onFileDelete', this.targetPath());
          this.resetUpload();
        }).catch(() => {
          this.loading = false;
        });
      }
    }
  }
</script>