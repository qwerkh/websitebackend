<template>
  <div>
    <v-row>
      <v-col cols="12" sm="4" md="4">
        <v-text-field
            v-model="dataObj.phoneNumberHeader"
            :label="$t('phoneNumberHeader')"
            persistent-hint
            :dense="dense"
            outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="4" md="4">
        <v-text-field
            v-model="dataObj.emailHeader"
            :label="$t('emailHeader')"
            persistent-hint
            :dense="dense"
            outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="4" md="4">
        <v-text-field
            v-model="dataObj.facebookUrl"
            :label="$t('facebookUrl')"
            persistent-hint
            :dense="dense"
            outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="4" md="4">
        <v-text-field
            v-model="dataObj.telegramUrl"
            :label="$t('telegramUrl')"
            persistent-hint
            :dense="dense"
            outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="4" md="4">
        <v-text-field
            v-model="dataObj.linkInUrl"
            :label="$t('linkInUrl')"
            persistent-hint
            :dense="dense"
            outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="4" md="4">
        <v-text-field
            v-model="dataObj.instagramUrl"
            :label="$t('instagramUrl')"
            persistent-hint
            :dense="dense"
            outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="4" md="4">
        <v-text-field
            v-model="dataObj.twitterUrl"
            :label="$t('twitterUrl')"
            persistent-hint
            :dense="dense"
            outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="12" sm="12">

        {{ $t('aboutThisSite') }} (English , Khmer ,Chinese)
      </v-col>
      <v-col cols="12" md="4" sm="4">
        <vue-editor
            v-model="dataObj.aboutThisSite.en"
        >
        </vue-editor>
      </v-col>
      <v-col cols="12" md="4" sm="4">
        <vue-editor
            v-model="dataObj.aboutThisSite.km"
        >
        </vue-editor>
      </v-col>
      <v-col cols="12" md="4" sm="4">
        <vue-editor
            v-model="dataObj.aboutThisSite.cn"
        >
        </vue-editor>
      </v-col>

      <v-col cols="12" md="12" sm="12">

        {{ $t('addressFooter') }} (English , Khmer ,Chinese)
      </v-col>
      <v-col cols="12" md="4" sm="4">
        <vue-editor
            v-model="dataObj.addressFooter.en"
        >
        </vue-editor>
      </v-col>
      <v-col cols="12" md="4" sm="4">
        <vue-editor
            v-model="dataObj.addressFooter.km"
        >
        </vue-editor>
      </v-col>
      <v-col cols="12" md="4" sm="4">
        <vue-editor
            v-model="dataObj.addressFooter.cn"
        >
        </vue-editor>
      </v-col>
      <v-col cols="12" md="4" sm="4">
        {{ $t('phoneNumberFooter') }}
        <vue-editor
            v-model="dataObj.phoneNumberFooter"
        >
        </vue-editor>
      </v-col>
      <v-col cols="12" md="4" sm="4">
        {{ $t('emailFooter') }}

        <vue-editor
            v-model="dataObj.emailFooter"
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
  name: "HeaderFooter",
  components: {SaveButton, VueEditor},
  mounted() {
    this.$jQuery('body').off();
  },
  data() {
    return {
      valid: true,
      dense: this.$store.state.isDense,
      dataObj: {
        _id: "",
        branchId: "",
        aboutThisSite: {
          en: "",
          km: "",
          cn: ""
        },

        addressFooter: {
          en: "",
          km: "",
          cn: ""
        },
        phoneNumberHeader: "",
        emailHeader: "",
        phoneNumberFooter: "",
        emailFooter: "",
        facebookUrl: "",
        telegramUrl: "",
        linkInUrl: "",
        instagramUrl: "",
        twitterUrl: "",

      },
      customToolbar: [
        ["bold", "italic", "underline"],
        [{list: "ordered"}, {list: "bullet"}],
        ["image", "code-block"]
      ]
    }
  },
  methods: {
    getHeaderFooterByBranchId() {
      let vm = this;
      Meteor.call("base_findHeaderFooter", vm.$store.state.branchId, Constants.secret, (err, r) => {
        if (r) {

          vm.dataObj.aboutThisSite = r.aboutThisSite || vm.dataObj.aboutThisSite;
          vm.dataObj.addressFooter = r.addressFooter || vm.dataObj.addressFooter;
          vm.dataObj.phoneNumberHeader = r.phoneNumberHeader || vm.dataObj.phoneNumberHeader;
          vm.dataObj.emailHeader = r.emailHeader || vm.dataObj.emailHeader;
          vm.dataObj.phoneNumberFooter = r.phoneNumberFooter || vm.dataObj.phoneNumberFooter;
          vm.dataObj.emailFooter = r.emailFooter || vm.dataObj.emailFooter;
          vm.dataObj.facebookUrl = r.facebookUrl || vm.dataObj.facebookUrl;
          vm.dataObj.telegramUrl = r.telegramUrl || vm.dataObj.telegramUrl;
          vm.dataObj.linkInUrl = r.linkInUrl || vm.dataObj.linkInUrl;
          vm.dataObj.instagramUrl = r.instagramUrl || vm.dataObj.instagramUrl;
          vm.dataObj.twitterUrl = r.twitterUrl || vm.dataObj.twitterUrl;

          vm.dataObj._id = r._id || "";

        }
      })
    },
    handleSubmit() {
      let vm = this;
      vm.dataObj.branchId = vm.$store.state.branchId;
      if (vm.dataObj._id === "") {
        return new Promise((resolve, reject) => {
          Meteor.call("base_insertHeaderFooter", vm.dataObj, Constants.secret, (err, result) => {
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
          Meteor.call("base_updateHeaderFooter", vm.dataObj._id, vm.dataObj, Constants.secret, (err, result) => {
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
      this.getHeaderFooterByBranchId();
    }))

  }
}
</script>


<style scoped>

</style>