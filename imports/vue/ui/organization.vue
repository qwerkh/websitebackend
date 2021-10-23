<template>
  <div>
    <v-row>
      <v-col cols="12" md="12" sm="12">

        {{ $t('body') }} (English , Khmer ,Chinese)
      </v-col>
      <v-col cols="12" md="4" sm="4">
        <vue-editor
            v-model="dataObj.body.en"
        >
        </vue-editor>
      </v-col>
      <v-col cols="12" md="4" sm="4">
        <vue-editor
            v-model="dataObj.body.km"
        >
        </vue-editor>
      </v-col>
      <v-col cols="12" md="4" sm="4">
        <vue-editor
            v-model="dataObj.body.cn"
        >
        </vue-editor>
      </v-col>
      <v-col cols="4" sm="4" md="4">
        <v-img
            :src="newUrl"
            style="height: 275px; width: auto;"
            aspect-ratio="1"
            required
            lazy-src="/images/avatar.png"
            class="grey lighten-2"
            @click="$refs.fileInput.click()"
        >
          <template v-slot:placeholder>
            <v-row
                class="fill-height ma-0"
                align="center"
                justify="center"
                v-show="isLoading"
            >
              <v-progress-circular indeterminate
                                   color="grey lighten-5"></v-progress-circular>
            </v-row>
          </template>
        </v-img>
        <input style="display: none !important;" type="file" @change="onFileSelected"
               ref="fileInput"></input>
      </v-col>
    </v-row>

    <br><br>
    <save-button :valid="valid" @saveForm="handleSubmit"></save-button>
  </div>
</template>

<script>
import SaveButton from "../components/saveButton";
import {Constants} from "../../libs/constant";
import {VueEditor} from "vue2-editor";
import {Meteor} from "meteor/meteor";
import firebase from "firebase/compat";
import "/imports/firebase/config";

const Compress = require('compress.js').default
export default{
  name: "Organization",
  components: {SaveButton, VueEditor},
  mounted() {
    this.$jQuery('body').off();
  },
  data() {
    return {
      valid: true,
      dense: this.$store.state.isDense,
      isLoading:false,
      dataObj: {
        _id: "",
        branchId: "",
        body: {
          en: "",
          km: "",
          cn: ""
        },
        url:""

      },
      selectedFile:"",
      newUrl:"",
      fileName:"",
      customToolbar: [
        ["bold", "italic", "underline"],
        [{list: "ordered"}, {list: "bullet"}],
        ["image", "code-block"]
      ]
    }
  },
  methods: {
    getOrganizationByBranchId() {
      let vm = this;
      Meteor.call("base_findOrganization", vm.$store.state.branchId, Constants.secret, (err, r) => {
        if (r) {
          vm.dataObj.body = r.body || vm.dataObj.body;
          vm.dataObj.url = r.url || vm.dataObj.url;
          vm.newUrl = r.url || vm.dataObj.url;

          vm.dataObj._id = r._id || "";

        }
      })
    },
    onFileSelected(e, num) {
      let vm = this;
      this.imgUrl = window.URL.createObjectURL(e.target.files[0]);
      vm.fileName = e.target.files[0].name;

      let tmpFile = [...e.target.files];
      const compress = new Compress();
      compress.compress(tmpFile, {
        size: 4, // the max size in MB, defaults to 2MB
        quality: 0.6, // the quality of the image, max is 1,
        maxWidth: 1920, // the max width of the output image, defaults to 1920px
        maxHeight: 1920, // the max height of the output image, defaults to 1920px
        resize: true // defaults to true, set false if you do not want to resize the image width and height
      }).then((data) => {
        data.forEach((obj) => {
          let img1 = obj;
          let base64str = img1.data;
          let imgExt = img1.ext;
          this.selectedFile = Compress.convertBase64ToFile(base64str, imgExt), obj.alt.split(".")[0];
        })
      })

      Meteor.setTimeout(function () {
        switch (num) {
          case "1":
            vm.newUrl1 = "a";
            vm.isLoading1 = true;

            break;
          case "2":
            vm.newUrl2 = "a";
            vm.isLoading2 = true;
            break;
          case "3":
            vm.newUrl3 = "a";
            vm.isLoading3 = true;
            break;
          case "4":
            vm.newUrl4 = "a";
            vm.isLoading4 = true;
            break;
          case "5":
            vm.newUrl5 = "a";
            vm.isLoading5 = true;
            break;
          default:
            vm.newUrl = "a";
            vm.isLoading = true;

            break;


        }
        vm.onUpload(num);
      }, 500);
    },
    onUpload(num) {
      let vm = this;
      const storageRef = firebase.storage().ref("newsAndEvents/" + moment().format("YYYYMMDDHHmmss") + this.fileName).put(this.selectedFile);
      storageRef.on(`state_changed`, snapshot => {
            this.uploadValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          }, error => {
            console.log(error.message)
          },
          () => {
            this.uploadValue = 100;
            storageRef.snapshot.ref.getDownloadURL().then((url) => {
              if (url) {

                switch (num) {
                  case "1":
                    vm.dataObj.url1 = url || "";
                    vm.newUrl1 = url;
                    vm.isLoading1 = false;

                    break;
                  case "2":
                    vm.dataObj.url2 = url || "";
                    vm.newUrl2 = url;
                    vm.isLoading2 = false;
                    break;
                  case "3":
                    vm.dataObj.url3 = url || "";
                    vm.newUrl3 = url;
                    vm.isLoading3 = false;
                    break;
                  case "4":
                    vm.dataObj.url4 = url || "";
                    vm.newUrl4 = url;
                    vm.isLoading4 = false;
                    break;
                  case "5":
                    vm.dataObj.url5 = url || "";
                    vm.newUrl5 = url;
                    vm.isLoading5 = false;
                    break;
                  default:
                    vm.dataObj.url = url || "";
                    vm.newUrl = url;
                    vm.isLoading = false;

                    break;
                }
              }
            });
          }
      );
    },
    handleSubmit() {
      let vm = this;
      vm.dataObj.branchId = vm.$store.state.branchId;
      if (vm.dataObj._id === "") {
        return new Promise((resolve, reject) => {
          Meteor.call("base_insertOrganization", vm.dataObj, Constants.secret, (err, result) => {
            if (!err) {
              vm.$message({
                message: this.$t('successNotification'),
                showClose: true,
                type: 'success'
              });

              resolve(result);
            } else {
              console.log(err.message);
              vm.$message({
                message: err.message,
                showClose: true,
                type: 'error'
              });
              reject(err.message);
            }
          })
        });
      } else {
        return new Promise((resolve, reject) => {
          Meteor.call("base_updateOrganization", vm.dataObj._id, vm.dataObj, Constants.secret, (err, result) => {
            if (!err) {
              vm.$message({
                message: this.$t('successNotification'),
                showClose: true,
                type: 'success'
              });
              resolve(result);
            } else {
              console.log(err.message);
              this.$message({
                message: err.message,
                showClose: true,
                type: 'error'
              });
              reject(err.message);
            }
          })
        });
      }
    }
  }
  ,
  created() {
    this.$nextTick((() => {
      this.getOrganizationByBranchId();
    }))

  }
}
</script>


<style scoped>

</style>