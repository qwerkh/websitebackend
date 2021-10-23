<template>
  <div id="base-home">
    <!--    <v-textarea-->
    <!--        :label="$t('intro')"-->
    <!--        v-model="data.intro.en"-->
    <!--    ></v-textarea>-->
    <v-row>
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
    </v-row>
    <br><br>
    <v-row>

      <v-col cols="12" md="12" sm="12">
        {{ $t('messageFromChairman') }} (English , Khmer ,Chinese)
      </v-col>
      <v-col cols="12" md="4" sm="4">
<!--        <div id="messageFromChairmanEn"></div>-->
        <vue-editor
            v-model="dataObj.messageFromChairman.en"
        >
        </vue-editor>
      </v-col>
      <v-col cols="12" md="4" sm="4">
<!--        <div id="messageFromChairmanKm"></div>-->
        <vue-editor
            v-model="dataObj.messageFromChairman.km"
        >
        </vue-editor>
      </v-col>
      <v-col cols="12" md="4" sm="4">
<!--        <div id="messageFromChairmanCn"></div>-->
        <vue-editor
            v-model="dataObj.messageFromChairman.cn"
        >
        </vue-editor>
      </v-col>


      <v-col cols="12" md="12" sm="12">
        {{ $t('preface1') }} (English , Khmer ,Chinese)
      </v-col>
      <v-col cols="12" md="4" sm="4">
        <vue-editor
            v-model="dataObj.preface1.en"
        >
        </vue-editor>
      </v-col>
      <v-col cols="12" md="4" sm="4">
        <vue-editor
            v-model="dataObj.preface1.km"
        >
        </vue-editor>
      </v-col>
      <v-col cols="12" md="4" sm="4">
        <vue-editor
            v-model="dataObj.preface1.cn"
        >
        </vue-editor>
      </v-col>


      <v-col cols="12" md="12" sm="12">
        {{ $t('preface2') }} (English , Khmer ,Chinese)
      </v-col>
      <v-col cols="12" md="4" sm="4">
        <vue-editor
            v-model="dataObj.preface2.en"
        >
        </vue-editor>
      </v-col>
      <v-col cols="12" md="4" sm="4">
        <vue-editor
            v-model="dataObj.preface2.km"
        >
        </vue-editor>
      </v-col>
      <v-col cols="12" md="4" sm="4">
        <vue-editor
            v-model="dataObj.preface2.cn"
        >
        </vue-editor>
      </v-col>


      <v-col cols="12" md="12" sm="12">
        {{ $t('preface3') }} (English , Khmer ,Chinese)
      </v-col>
      <v-col cols="12" md="4" sm="4">
        <vue-editor
            v-model="dataObj.preface3.en"
        >
        </vue-editor>
      </v-col>
      <v-col cols="12" md="4" sm="4">
        <vue-editor
            v-model="dataObj.preface3.km"
        >
        </vue-editor>
      </v-col>
      <v-col cols="12" md="4" sm="4">
        <vue-editor
            v-model="dataObj.preface3.cn"
        >
        </vue-editor>
      </v-col>


      <v-col cols="12" md="12" sm="12">
        {{ $t('preface4') }} (English , Khmer ,Chinese)
      </v-col>
      <v-col cols="12" md="4" sm="4">
        <vue-editor
            v-model="dataObj.preface4.en"
        >
        </vue-editor>
      </v-col>
      <v-col cols="12" md="4" sm="4">
        <vue-editor
            v-model="dataObj.preface4.km"
        >
        </vue-editor>
      </v-col>
      <v-col cols="12" md="4" sm="4">
        <vue-editor
            v-model="dataObj.preface4.cn"
        >
        </vue-editor>
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

export default {
  name: "Home",
  components: {SaveButton, VueEditor},
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
        intro: {
          en: "ddd",
          km: "",
          cn: ""
        },
        messageFromChairman: {
          en: "",
          km: "",
          cn: "",
          url: ""
        },
        preface1: {
          en: "",
          km: "",
          cn: "",
        },
        preface2: {
          en: "",
          km: "",
          cn: "",
        },
        preface3: {
          en: "",
          km: "",
          cn: "",
        },
        preface4: {
          en: "",
          km: "",
          cn: "",
        }
      },
      customToolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["image", "code-block"]
      ]
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
          vm.dataObj.messageFromChairman = r.messageFromChairman || vm.dataObj.messageFromChairman;
          vm.dataObj.preface1 = r.preface1 || vm.dataObj.preface1;
          vm.dataObj.preface2 = r.preface2 || vm.dataObj.preface2;
          vm.dataObj.preface3 = r.preface3 || vm.dataObj.preface3;
          vm.dataObj.preface4 = r.preface4 || vm.dataObj.preface4;

          // vm.quillMessageFromChairman.en.root.innerHTML = r.messageFromChairman.en;
          // vm.quillMessageFromChairman.km.root.innerHTML = r.messageFromChairman.km;
          // vm.quillMessageFromChairman.cn.root.innerHTML = r.messageFromChairman.cn;
          vm.dataObj._id = r._id || "";

        }
      })
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
    this.$nextTick((()=>{
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