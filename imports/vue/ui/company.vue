<template>
  <v-row justify="center">
    <v-flex
        md11
        sm11
        xs11
    >
      <v-form
          :model="valid" ref="formData"
          lazy-validation
      >
        <v-card-title>
          <v-layout column align-center justify-center class="mb-2">
            <img src="/images/company.png" style="height: 130px; width: auto;" class="mb-4 mt-2"
                 alt="logo"/>
            <div class="headline font-weight-bold center primary&#45;&#45;text"
                 style="line-height: 46px!important;">
              {{ $t('setupCompany') }}
            </div>
          </v-layout>
        </v-card-title>
        <v-row>
          <v-col cols="12" sm="4" md="4" xs="4">
            <v-text-field
                v-model="dataObj.name"
                :rules="nameRules"
                :label="$t('companyName')"
                persistent-hint
                required
                :dense="dense"

            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4" md="4" xs="4">
            <v-text-field
                v-model="dataObj.latinName"
                :rules="nameRules"
                :label="$t('latinName')"
                persistent-hint
                required
                :dense="dense"

            ></v-text-field>
          </v-col>
          <v-col cols="6" sm="2" md="2" xs="2">
            <v-text-field
                v-model="dataObj.shortName"
                :rules="nameRules"
                :label="$t('shortName')"
                persistent-hint
                required
                :dense="dense"

            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="4" md="4" xs="4">
            <v-text-field
                v-model="dataObj.parentName"
                :label="$t('parentName')"
                persistent-hint
                :dense="dense"

            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4" md="4" xs="4">
            <v-text-field
                v-model="dataObj.latinParentName"
                :label="$t('latinParentName')"
                persistent-hint
                :dense="dense"

            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4" md="4" xs="4">
            <v-text-field
                v-model="dataObj.directorName"
                :label="$t('directorName')"
                persistent-hint
                :dense="dense"

            ></v-text-field>
          </v-col>
        </v-row>

        <v-card-actions>

          <v-spacer></v-spacer>
          <reset-button @resetForm="resetForm" valid="false"></reset-button>
          <save-button @saveForm="handleSubmit" v-shortkey="['enter']"
                       @shortkey.native="handleSubmit" :valid="valid"></save-button>

        </v-card-actions>
      </v-form>
    </v-flex>
  </v-row>
</template>

<script>
import AddButton from "../components/addButton"
import RaiseButton from "../components/raiseAddButton"
import SaveButton from "../components/saveButton"
import CloseButton from "../components/closeButton"
import ResetButton from "../components/resetButton"
import {Constants} from "../../libs/constant"
import GlobalFn from "../../libs/globalFn"
import {Company} from "../../collections/company"
import _ from 'lodash'
import {CompanyReact} from "../../../imports/collections/company"
import numeral from "numeral";

export default {
  name: "Company",
  mounted() {
    this.$jQuery('body').off();
  },
  components: {AddButton, RaiseButton, SaveButton, ResetButton, CloseButton},
  data() {
    return {
      valid: true,
      dense: this.$store.state.isDense,
      dataObj: {
        _id: "",
        name: "",
        latinName: "",
        shortName: "",
        parentName: "",
        latinParentName: "",
        directorName: "",
      },

      nameRules: [
        v => !!v || 'Company Name is required',
      ],

      selectRules: [
        v => !!v || 'Please Choose one',
      ]

    }
  },
  methods: {
    resetForm() {
      this.$refs.formData.reset();
    },
    checkRole(roles) {
      switch (roles) {
        case 'Create':
          return GlobalFn.CheckRoles({roles: Constants.create});
          break;
        case 'Update':
          return GlobalFn.CheckRoles({roles: Constants.update});
          break;
        case 'Delete':
          return GlobalFn.CheckRoles({roles: Constants.delete});
          break;
        default:
          return GlobalFn.CheckRoles({roles});
          break;
      }

    },
    handleSubmit() {
      let vm = this;
      if (vm.$refs.formData.validate()) {
        vm.loading = true;
        if (vm.dataObj._id === "") {
          return new Promise((resolve, reject) => {
            Meteor.call("base_insertCompany", vm.dataObj, Constants.secret, (err, result) => {
              if (!err) {
                this.$message({
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
              vm.loading = false;
            })
            vm.dialog = false;
          });


        } else {
          return new Promise((resolve, reject) => {
            Meteor.call("base_updateCompany", vm.dataObj._id, vm.dataObj, Constants.secret, (err, result) => {
              if (!err) {
                this.$message({
                  message: this.$t('successNotification'),
                  showClose: true,
                  type: 'success'
                });
                vm.loading = false;
                vm.$store.state.companyDoc = vm.dataObj;
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
            vm.dialog = false;
          });
        }
      }
    }
  },
  watch: {},
  computed: {},
  created() {
    let vm = this;
    vm.dataObj = Company.findOne({}) || {};
  }
}
</script>
