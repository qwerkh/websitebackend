<template>
  <div id="base-home">
    <!--    <v-textarea-->
    <!--        :label="$t('intro')"-->
    <!--        v-model="data.intro.en"-->
    <!--    ></v-textarea>-->
    <v-row>
      <v-col cols="12" sm="12" md="12">
        <v-text-field
            v-model="newUrl4List"
            @click="$refs.fileInputSlide.click()"
            :label="$t('uploadPhotoSlide')"
            outlined
            rounded
            :suffix="dataObj.slideImgList && dataObj.slideImgList.length+' ' + $t('photo')"
            hide-details
        >

        </v-text-field>

        <input style="display: none !important;" type="file"
               @change="onFileSelectedList($event,5)"
               multiple
               ref="fileInputSlide"/>

      </v-col>
      <v-col cols="12" sm="12" md="12" style="padding-top: 0px !important;padding-bottom: 0px !important;">
        <v-row>
          <v-col
              v-for="(imgUrl,i) in dataObj.slideImgList"
              :key="imgUrl"
              class="d-flex child-flex"
              cols="3"
          >
            <v-img
                :src="imgUrl"
                lazy-src="/images/no-image-icon.png"
                aspect-ratio="1"
                class="grey lighten-2"
            >
              <remove-button @removeImg="removeImg(dataObj,imgUrl,5)" valid="false"
                             style="float: right;z-index: 9999"></remove-button>

              <template v-slot:placeholder>
                <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                >
                  <v-progress-circular
                      indeterminate
                      color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>

            </v-img>

          </v-col>
        </v-row>
      </v-col>

      <br><br>
      <hr>
      <br><br>
      <hr>
      <v-col cols="12" md="12" sm="12">

        {{ $t('info') }} (English , Khmer ,Chinese)
      </v-col>
      <v-col cols="12" md="4" sm="4">
        <!--        <div id="infoEn"></div>-->
        <vue-editor
            v-model="dataObj.intro.en"
        >
        </vue-editor>
      </v-col>
      <v-col cols="12" md="4" sm="4">
        <!--        <div id="infoKm"></div>-->
        <vue-editor
            v-model="dataObj.intro.km"
        >
        </vue-editor>
      </v-col>
      <v-col cols="12" md="4" sm="4">
        <!--        <div id="infoCn"></div>-->
        <vue-editor
            v-model="dataObj.intro.cn"
        >
        </vue-editor>
      </v-col>
      <v-col cols="4" sm="4" md="4">
        {{ $t('banner') }}
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
    <hr>
    <br><br>
    <save-button :valid="valid" @saveForm="handleSubmit"></save-button>
  </div>
</template>

<script>

import SaveButton from "../components/saveButton";
import {Constants} from "../../libs/constant";
import {VueEditor} from "vue2-editor";
import firebase from "firebase/compat";
import "/imports/firebase/config";
import {Meteor} from "meteor/meteor";
import RemoveButton from "../components/removeButton"

const Compress = require('compress.js').default
export default {
  name: "Home",
  components: {SaveButton, VueEditor, RemoveButton},
  mounted() {
    this.$jQuery('body').off();
    // this.$nextTick(() => {
    //   this.quillInfo = new Quill('#info', {
    //     theme: 'snow'
    //   });
    // })

    // this.$nextTick(() => {
    //   tinymce.init({
    //     selector: 'textarea#editor',
    //     menubar: false,
    //     statusbar: false,
    //     plugins: 'autoresize anchor autolink charmap code codesample directionality fullpage help hr image imagetools insertdatetime link lists media nonbreaking pagebreak preview print searchreplace table template textpattern toc visualblocks visualchars',
    //     toolbar: 'h1 h2 bold italic strikethrough blockquote bullist numlist backcolor | link image media | removeformat help fullscreen ',
    //     skin: 'bootstrap',
    //     toolbar_drawer: 'floating',
    //     min_height: 200,
    //     autoresize_bottom_margin: 16,
    //     setup: (editor) => {
    //       editor.on('init', () => {
    //         editor.getContainer().style.transition = "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out"
    //       });
    //       editor.on('focus', () => {
    //         editor.getContainer().style.boxShadow = "0 0 0 .2rem rgba(0, 123, 255, .25)",
    //             editor.getContainer().style.borderColor = "#80bdff"
    //       });
    //       editor.on('blur', () => {
    //         editor.getContainer().style.boxShadow = "",
    //             editor.getContainer().style.borderColor = ""
    //       });
    //     }
    //   });
    // })
  },
  data() {
    return {
      valid: true,
      isLoading: false,
      dense: this.$store.state.isDense,
      // quillInfo: {
      //   en: "",
      //   km: "",
      //   cn: "",
      // },
      // quillMessageFromChairman: {
      //   en: "",
      //   km: "",
      //   cn: "",
      // },
      dataObj: {
        _id: "",
        branchId: "",
        establishIn: "",
        studentStudying: "",
        cooperation: "",
        studentGraduateRate: "",
        intro: {
          en: "ddd",
          km: "",
          cn: ""
        },
        url: "",
        messageFromChairman: {
          en: "",
          km: "",
          cn: "",
          url: ""
        },
        slideImgList: [],
        preface1: {
          en: "",
          km: "",
          cn: "",
        },
        timeStudy: {
          en: "",
          km: "",
          cn: "",
        },
        preface1ImgList: [],
        preface2: {
          en: "",
          km: "",
          cn: "",
        },
        preface2ImgList: [],

        preface3: {
          en: "",
          km: "",
          cn: "",
        },
        preface3ImgList: [],

        preface4: {
          en: "",
          km: "",
          cn: "",
        },
        preface4ImgList: [],

      },
      customToolbar: [
        ["bold", "italic", "underline"],
        [{list: "ordered"}, {list: "bullet"}],
        ["image", "code-block"]
      ],
      newUrl: "",
      imgUrl: "",
      fileName: "",
      newSlideList: [],
      newUrl1List: [],
      newUrl2List: [],
      newUrl3List: [],
      newUrl4List: [],

    }
  },
  methods: {
    getHomeByBranchId() {
      let vm = this;
      Meteor.call("base_findHome", vm.$store.state.branchId, Constants.secret, (err, r) => {
        if (r) {
          // vm.quillInfo.en.root.innerHTML = r.intro.en;
          // vm.quillInfo.km.root.innerHTML = r.intro.km;
          // vm.quillInfo.cn.root.innerHTML = r.intro.cn;

          vm.dataObj.intro = r.intro || vm.dataObj.intro;
          vm.dataObj.url = r.url || vm.dataObj.url;
          vm.newUrl = r.url || vm.dataObj.url;
          vm.dataObj.messageFromChairman = r.messageFromChairman || vm.dataObj.messageFromChairman;
          vm.dataObj.preface1 = r.preface1 || vm.dataObj.preface1;
          vm.dataObj.preface1ImgList = r.preface1ImgList || vm.dataObj.preface1ImgList;
          vm.newUrl1List = r.preface1ImgList || vm.dataObj.preface1ImgList;

          vm.dataObj.preface2 = r.preface2 || vm.dataObj.preface2;
          vm.newUrl2List = r.preface2ImgList || vm.dataObj.preface2ImgList;
          vm.dataObj.preface2ImgList = r.preface2ImgList || vm.dataObj.preface2ImgList;

          vm.dataObj.preface3 = r.preface3 || vm.dataObj.preface3;
          vm.newUrl3List = r.preface3ImgList || vm.dataObj.preface3ImgList;
          vm.dataObj.preface3ImgList = r.preface3ImgList || vm.dataObj.preface3ImgList;

          vm.dataObj.preface4 = r.preface4 || vm.dataObj.preface4;
          vm.newUrl4List = r.preface4ImgList || vm.dataObj.preface4ImgList;
          vm.dataObj.preface4ImgList = r.preface4ImgList || vm.dataObj.preface4ImgList;
          vm.dataObj.timeStudy = r.timeStudy || vm.dataObj.timeStudy;


          vm.newSlideList = r.slideImgList || vm.dataObj.slideImgList;
          vm.dataObj.slideImgList = r.slideImgList || vm.dataObj.slideImgList;
          vm.dataObj.establishIn = r.establishIn || vm.dataObj.establishIn;
          vm.dataObj.studentStudying = r.studentStudying || vm.dataObj.studentStudying;
          vm.dataObj.studentGraduateRate = r.studentGraduateRate || vm.dataObj.studentGraduateRate;
          vm.dataObj.cooperation = r.cooperation || vm.dataObj.cooperation;


          // vm.quillMessageFromChairman.en.root.innerHTML = r.messageFromChairman.en;
          // vm.quillMessageFromChairman.km.root.innerHTML = r.messageFromChairman.km;
          // vm.quillMessageFromChairman.cn.root.innerHTML = r.messageFromChairman.cn;
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
        vm.newUrl = "a";
        vm.isLoading = true;

        vm.onUpload();
      }, 500);
    },
    onUpload() {
      let vm = this;
      const storageRef = firebase.storage().ref("post/" + moment().format("YYYYMMDDHHmmss") + this.fileName).put(this.selectedFile);
      storageRef.on(`state_changed`, snapshot => {
            this.uploadValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          }, error => {
            console.log(error.message)
          },
          () => {
            this.uploadValue = 100;
            storageRef.snapshot.ref.getDownloadURL().then((url) => {
              if (url) {
                vm.dataObj.url = url || "";
                vm.newUrl = url;
                vm.isLoading = false;
              }
            });
          }
      );
    },
    onFileSelectedList(e, num) {
      let vm = this;
      vm.isLoadingImg = true;
      vm.isLoading = true;
      vm.fileName = e.target.files[0] && e.target.files[0].name || "";
      if (vm.fileName !== "") {
        const files = [...e.target.files];
        vm.rawFileImageList = files;
        const compress = new Compress();
        compress.compress(files, {
          size: 4, // the max size in MB, defaults to 2MB
          quality: 0.6, // the quality of the image, max is 1,
          maxWidth: 1920, // the max width of the output image, defaults to 1920px
          maxHeight: 1920, // the max height of the output image, defaults to 1920px
          resize: true // defaults to true, set false if you do not want to resize the image width and height
        }).then((data) => {
          vm.newUrlList = [];
          data.forEach((obj) => {
            let img1 = obj;
            let base64str = img1.data;
            let imgExt = img1.ext;
            vm.onUploadList(Compress.convertBase64ToFile(base64str, imgExt), obj.alt.split(".")[0], num);
          })
        })
      }
    },
    onUploadList(selectedFile, fileName, num) {
      let vm = this;
      const storageRef = firebase.storage().ref((num === 5 ? "home/" : "preface/") + moment().format("YYYYMMDD") + "/" + moment().format("YYYYMMDDHHmmss") + fileName).put(selectedFile);
      storageRef.on(`state_changed`, snapshot => {
            this.uploadValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          }, error => {
            console.log(error.message)
          },
          () => {
            this.uploadValue = 100;
            storageRef.snapshot.ref.getDownloadURL().then((url) => {
              if (url) {
                if (num === 1) {
                  vm.dataObj.preface1ImgList = vm.dataObj.preface1ImgList || [];
                  vm.dataObj.preface1ImgList.unshift(url);
                  vm.newUrl1List = [];
                } else if (num === 2) {
                  vm.dataObj.preface2ImgList = vm.dataObj.preface2ImgList || [];
                  vm.dataObj.preface2ImgList.unshift(url);
                  vm.newUrl2List = [];
                } else if (num === 3) {
                  vm.dataObj.preface3ImgList = vm.dataObj.preface3ImgList || [];
                  vm.dataObj.preface3ImgList.unshift(url);
                  vm.newUrl3List = [];
                } else if (num === 4) {
                  vm.dataObj.preface4ImgList = vm.dataObj.preface4ImgList || [];
                  vm.dataObj.preface4ImgList.unshift(url);
                  vm.newUrl4List = [];
                } else if (num === 5) {
                  vm.dataObj.slideImgList = vm.dataObj.slideImgList || [];
                  vm.dataObj.slideImgList.unshift(url);
                  vm.newSlideList = [];
                }
                vm.isLoading = false;
                vm.isLoadingImg = false;

              }
            });
          }
      );
    },
    removeImg(row, url, num) {
      let vm = this;
      vm.$confirm(this.$t('messageWarning'), this.$t('warning'), {
        confirmButtonText: this.$t('ok'),
        cancelButtonText: this.$t('cancel'),
        type: 'warning'
      }).then(() => {
        if (num === 1) {
          vm.dataObj.preface1ImgList = vm.dataObj.preface1ImgList.filter(v => v !== url);
        } else if (num === 2) {
          vm.dataObj.preface2ImgList = vm.dataObj.preface2ImgList.filter(v => v !== url);

        } else if (num === 3) {
          vm.dataObj.preface3ImgList = vm.dataObj.preface3ImgList.filter(v => v !== url);

        } else if (num === 4) {
          vm.dataObj.preface4ImgList = vm.dataObj.preface4ImgList.filter(v => v !== url);

        } else if (num === 5) {
          vm.dataObj.slideImgList = vm.dataObj.slideImgList.filter(v => v !== url);

        }
      }).catch(() => {
        vm.$message({
          type: 'info',
          message: this.$t('removeCancel')
        });
      });
    },
    handleSubmit() {
      let vm = this;
      // vm.dataObj.intro.en = vm.quillInfo.en.root.innerHTML;
      // vm.dataObj.intro.km = vm.quillInfo.km.root.innerHTML;
      // vm.dataObj.intro.cn = vm.quillInfo.cn.root.innerHTML;
      //
      // vm.dataObj.messageFromChairman.en = vm.quillMessageFromChairman.en.root.innerHTML;
      // vm.dataObj.messageFromChairman.km = vm.quillMessageFromChairman.km.root.innerHTML;
      // vm.dataObj.messageFromChairman.cn = vm.quillMessageFromChairman.cn.root.innerHTML;

      vm.dataObj.branchId = vm.$store.state.branchId;
      if (vm.dataObj._id === "") {
        return new Promise((resolve, reject) => {
          Meteor.call("base_insertHome", vm.dataObj, Constants.secret, (err, result) => {
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
          Meteor.call("base_updateHome", vm.dataObj._id, vm.dataObj, Constants.secret, (err, result) => {
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
      this.getHomeByBranchId();
    }))
    // let module = {
    //   toolbar: [{'size': Constants.fontSizeArr}],
    // };
    // this.$nextTick(() => {
    //   this.quillInfo.en = new Quill('#infoEn', {
    //     module: module,
    //     theme: 'snow'
    //   });
    //   this.quillInfo.km = new Quill('#infoKm', {
    //     module: module,
    //     theme: 'snow'
    //   });
    //   this.quillInfo.cn = new Quill('#infoCn', {
    //     module: module,
    //     theme: 'snow'
    //   });
    //
    //   this.quillMessageFromChairman.en = new Quill('#messageFromChairmanEn', {
    //     module: module,
    //     theme: 'snow'
    //   });
    //
    //   this.quillMessageFromChairman.km = new Quill('#messageFromChairmanKm', {
    //     module: module,
    //     theme: 'snow'
    //   });
    //
    //   this.quillMessageFromChairman.cn = new Quill('#messageFromChairmanCn', {
    //     module: module,
    //     theme: 'snow'
    //   });
    //   this.getHomeByBranchId();
    //
    // })

  }
}
</script>


<style scoped>
/*#base-home {
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/login1.jpg');
    !*background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('/images/login.jpg');*!
    background-position: center center;
    background-size: cover;

    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: inherit;
    !*z-index: 1;*!
    !*width: 0;*!
    !*height: 0;*!
    background-size: cover;
}*/
</style>