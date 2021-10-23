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
    </v-row>

    <br><br>
    <save-button :valid="valid" @saveForm="handleSubmit"></save-button>
  </div>
</template>

<script>
import SaveButton from "../components/saveButton";
import {Constants} from "../../libs/constant";
import {VueEditor} from "vue2-editor";
export default{
  name: "About",
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
        body: {
          en: "",
          km: "",
          cn: ""
        },

      },
      customToolbar: [
        ["bold", "italic", "underline"],
        [{list: "ordered"}, {list: "bullet"}],
        ["image", "code-block"]
      ]
    }
  },
  methods: {
    getAboutByBranchId() {
      let vm = this;
      Meteor.call("base_findAbout", vm.$store.state.branchId, Constants.secret, (err, r) => {
        if (r) {
          vm.dataObj.body = r.body || vm.dataObj.body;

          vm.dataObj._id = r._id || "";

        }
      })
    },
    handleSubmit() {
      let vm = this;
      vm.dataObj.branchId = vm.$store.state.branchId;
      if (vm.dataObj._id === "") {
        return new Promise((resolve, reject) => {
          Meteor.call("base_insertAbout", vm.dataObj, Constants.secret, (err, result) => {
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
          Meteor.call("base_updateAbout", vm.dataObj._id, vm.dataObj, Constants.secret, (err, result) => {
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
      this.getAboutByBranchId();
    }))

  }
}
</script>


<style scoped>

</style>