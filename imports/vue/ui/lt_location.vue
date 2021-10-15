<template>
  <v-row justify="center">
    <v-flex
        md12
    >
      <v-card>

        <v-card-title icon="mdi-index">
          <v-toolbar-title v-show="!$vuetify.breakpoint.xsOnly">
            <v-icon style="font-size: 70px !important;" large color="green darken-2">location_on</v-icon>
            {{ $t("location") }}
          </v-toolbar-title>
          <v-spacer v-show="!$vuetify.breakpoint.xsOnly"></v-spacer>
          <v-text-field
              v-model="search"
              append-icon="search"
              :label="$t('search')"
              single-line
              hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
          <add-button @add="handleAdd()" v-if="checkRole('Create')"
                      v-shortkey="['+']"
                      @shortkey.native="handleAdd()"
                      v-show="!$vuetify.breakpoint.xsOnly"></add-button>
          <raise-button @add="handleAdd()" v-if="checkRole('Create')"
                        v-show="$vuetify.breakpoint.xsOnly"></raise-button>

        </v-card-title>
        <v-data-table
            :headers="headers"
            :items="dataLists"
            :loading="loading"
            loading-text=""
            :search="search"
            hide-default-footer
            class="elevation-1"
            :server-items-length="totalPage"
            :items-per-page="itemsPerPage"
            :page.sync="currentPage"
            :options.sync="options"
            :mobile-breakpoint="0"
        >

          <template v-slot:progress>
            <v-progress-circular indeterminate
                                 color="green"
                                 :value="50"></v-progress-circular>
          </template>

          //Header
          <template v-slot:header.code="{ header }">
            {{ $t(header.text).toUpperCase() }}

          </template>
          <template v-slot:header.name="{ header }">
            {{ $t(header.text).toUpperCase() }}

          </template>

          <template v-slot:header.date="{ header }">
            {{ $t(header.text).toUpperCase() }}

          </template>


          <template v-slot:header.offValue2D="{ header }">
            {{ $t(header.text).toUpperCase() }}

          </template>
          <template v-slot:header.offValue3D="{ header }">
            {{ $t(header.text).toUpperCase() }}

          </template>
          <template v-slot:header.offValueLer="{ header }">
            {{ $t(header.text).toUpperCase() }}

          </template>
          <template v-slot:header.offValueTot="{ header }">
            {{ $t(header.text).toUpperCase() }}

          </template>
          <template v-slot:header.win2D="{ header }">
            {{ $t(header.text).toUpperCase() }}

          </template>
          <template v-slot:header.win3D="{ header }">
            {{ $t(header.text).toUpperCase() }}

          </template>
          <template v-slot:header.winLer="{ header }">
            {{ $t(header.text).toUpperCase() }}

          </template>
          <template v-slot:header.winTot="{ header }">
            {{ $t(header.text).toUpperCase() }}

          </template>
          <template v-slot:header.add="{ header }">
            {{ $t(header.text).toUpperCase() }}

          </template>
          <template v-slot:header.share="{ header }">
            {{ $t(header.text).toUpperCase() }}

          </template>

          <template v-slot:header.action="{ header }">
            {{ $t(header.text).toUpperCase() }}

          </template>

          //Body


          //Action
          <template v-slot:item.action="{ item }">
            <v-btn color="primary" outlined class="table-action-button mr-2" text icon
                   v-if="checkRole('Update')"
                   @click.native="handleUpdate(item)">
              <v-icon>edit</v-icon>
            </v-btn>
            <v-btn color="error" outlined class="table-action-button" text icon v-if="checkRole('Delete')"
                   @click.native="handleRemove(item)">
              <v-icon>delete</v-icon>
            </v-btn>
          </template>

          //No Data
          <template v-slot:no-data>
            {{ $t("noData") }}
          </template>


        </v-data-table>
        <div class="text-center">

          <v-card-actions>
            <v-col v-if="!$vuetify.breakpoint.xsOnly" class="d-flex" cols="12" sm="1">
              {{ $t("total") }} : {{ totalPage }}
            </v-col>
            <v-col class="d-flex" cols="12" sm="1" v-if="!$vuetify.breakpoint.xsOnly">
              <v-select :label="$t('perPage')" v-model="itemsPerPage"
                        :items="pageList"
              ></v-select>
            </v-col>
            <v-pagination v-model="currentPage" :length="pageCount" circle prev-icon="mdi-menu-left"
                          next-icon="mdi-menu-right" :total-visible="7"></v-pagination>
            <v-col class="d-flex" cols="12" sm="1" v-if="!$vuetify.breakpoint.xsOnly">
              <v-text-field v-model="currentPageComputed" :max="pageCount" min=1 type="number"
                            :label="$t('goto')"></v-text-field>
            </v-col>
          </v-card-actions>
        </div>
      </v-card>
    </v-flex>

    <v-dialog v-model="dialog" persistent max-width="800px" :fullscreen="$vuetify.breakpoint.xsOnly">
      <v-form
          :model="valid" ref="formData"
          lazy-validation
      >
        <v-card>
          <v-card-title>

            <v-icon v-if="titleClick==='addLocation'" large color="green darken-2"
                    style="font-size: 50px !important;">library_add
            </v-icon>
            <v-icon v-if="titleClick==='updateLocation'" large color="green darken-2"
                    style="font-size: 50px !important;">autorenew
            </v-icon>
            <span class="headline">{{ $t(titleClick) }}</span>
            <v-spacer></v-spacer>
            <close-button @closeForm="dialog=false" valid="false" v-shortkey="['esc']"
                          @shortkey.native="dialog=false"></close-button>

          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                      v-model="dataObj.code"
                      :rules="codeRules"
                      :label="$t('locationCode')"
                      persistent-hint
                      :dense="dense"
                      required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                      v-model="dataObj.name"
                      :rules="nameRules"
                      :label="$t('locationName')"
                      persistent-hint
                      :dense="dense"
                      required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-menu
                      v-model="menuDate"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                          v-model="dateFormatted"
                          hint="DD/MM/YYYY"
                          :label="$t('date')"
                          prepend-icon="event"
                          @blur="dataObj.date = parseDate(dateFormatted)"
                          readonly
                          :dense="dense"
                          v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="dataObj.date"
                                   @input="menuDate = false"></v-date-picker>
                  </v-menu>

                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                      v-model="dataObj.add"
                      :rules="requireRules"
                      :label="$t('addDigit')"
                      persistent-hint
                      type="number"

                      :dense="dense"
                      required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                      v-model="dataObj.offValue2D"
                      :rules="requireRules"
                      :label="$t('offValue2D')"
                      type="number"

                      persistent-hint
                      :dense="dense"
                      required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                      v-model="dataObj.win2D"
                      :rules="requireRules"
                      :label="$t('win2D')"
                      persistent-hint
                      type="number"

                      :dense="dense"
                      required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                      v-model="dataObj.offValue3D"
                      :rules="requireRules"
                      :label="$t('offValue3D')"
                      type="number"

                      persistent-hint
                      :dense="dense"
                      required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                      v-model="dataObj.win3D"
                      :rules="requireRules"
                      :label="$t('win3D')"
                      persistent-hint
                      type="number"

                      :dense="dense"
                      required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                      v-model="dataObj.offValueLer"
                      :label="$t('offValueLer')"
                      type="number"
                      persistent-hint
                      :dense="dense"
                      required
                  ></v-text-field>
                </v-col>


                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                      v-model="dataObj.winLer"
                      :label="$t('winLer')"
                      persistent-hint
                      type="number"
                      :dense="dense"
                      required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                      v-model="dataObj.offValueTot"
                      :label="$t('offValueTot')"
                      type="number"
                      persistent-hint
                      :dense="dense"
                      required
                  ></v-text-field>
                </v-col>


                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                      v-model="dataObj.winTot"
                      :label="$t('winTot')"
                      persistent-hint
                      type="number"
                      :dense="dense"
                      required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                      v-model="dataObj.share"
                      :rules="requireRules"
                      :label="$t('share')"
                      persistent-hint
                      type="number"
                      :dense="dense"
                      required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>

            <v-spacer></v-spacer>
            <reset-button @resetForm="resetForm" valid="false"></reset-button>
            <save-button @saveForm="handleSubmit" v-shortkey="['enter']"
                         @shortkey.native="handleSubmit" :valid="valid"></save-button>

          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
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
import _ from 'lodash'
import {LT_LocationReact} from "../../../imports/collections/lt_location"
import numeral from "numeral";
import {Meteor} from 'meteor/meteor';

export default {
  meteor: {
    reactData() {
      let vm = this;
      if (Meteor.userId()) {
        LT_LocationReact.find({}).fetch();
        vm.fetchDataTable(vm.search, vm.skip, vm.itemsPerPage + vm.skip);
      }
    }
  },
  mounted() {
    this.$jQuery('body').off();
  },
  name: "Location",
  components: {AddButton, RaiseButton, SaveButton, ResetButton, CloseButton},
  data() {
    return {
      dense: this.$store.state.isDense,
      isLoading: false,
      fullPage: false,
      dialog: false,
      search: '',
      currentPage: 1,
      pageCount: 0,
      totalPage: 0,
      itemsPerPage: 10,
      sortBy: "",
      sortDesc: "",
      options: {},
      skip: 0,
      limit: 10,
      filter: "",
      loading: true,
      valid: true,
      titleClick: "",
      pageList: [10, 20, 50, 100, 200],

      dataObj: {
        _id: "",
        name: "",
        code: "",
        date: "",
        offValue2D: "",
        offValue3D: "",
        offValueLer: "",
        offValueTot: "",
        win2D: "",
        win3D: "",
        winLer: "",
        winTot: "",
        add: "",
        share: "",
      },

      nameRules: [
        v => !!v || 'Location Name is required',
      ],
      codeRules: [
        v => !!v || 'Location Code is required',
      ],
      requireRules: [
        v => !!v || 'is required',
      ],
      headers: [
        {
          text: 'locationCode',
          align: 'left',
          sortable: true,
          value: 'code',
        }, {
          text: 'locationName',
          align: 'left',
          sortable: true,
          value: 'name',
        }, {
          text: 'date',
          align: 'left',
          sortable: true,
          value: 'date',
        }, {
          text: 'offValue2D',
          align: 'left',
          sortable: true,
          value: 'offValue2D',
        }, {
          text: 'offValue3D',
          align: 'left',
          sortable: true,
          value: 'offValue3D',
        }, {
          text: 'offValueLer',
          align: 'left',
          sortable: true,
          value: 'offValueLer',
        }, {
          text: 'offValueTot',
          align: 'left',
          sortable: true,
          value: 'offValueTot',
        }, {
          text: 'win2D',
          align: 'left',
          sortable: true,
          value: 'win2D',
        }, {
          text: 'win3D',
          align: 'left',
          sortable: true,
          value: 'win3D',
        }, {
          text: 'winLer',
          align: 'left',
          sortable: true,
          value: 'winLer',
        }, {
          text: 'winTot',
          align: 'left',
          sortable: true,
          value: 'winTot',
        }, {
          text: 'addDigit',
          align: 'left',
          sortable: true,
          value: 'add',
        }, {
          text: 'share',
          align: 'left',
          sortable: true,
          value: 'share',
        },

        {text: 'actions', value: 'action', sortable: false, width: "120px"},
      ],
      dataLists: [],
      dateFormatted: "",
      menuDate: false


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

    fetchDataTable: _.debounce(function (val, skip, limit) {
      let vm = this;
      vm.loading = true;
      return new Promise((resolve, reject) => {
        Meteor.call("lt_fetchLocation", {
          q: val,
          filter: this.filter,
          sort: {sortBy: vm.sortBy || "", sortDesc: vm.sortDesc || ""},
          options: {skip: skip || 0, limit: limit || 10},
          branchId: vm.$store.state.branchId,
          accessToken: Constants.secret
        }, (err, result) => {
          if (result) {
            vm.loading = false;
            vm.dataLists = result.content;
            vm.pageCount = Math.ceil((result.countContent || 1) / vm.itemsPerPage);
            vm.totalPage = result.countContent;
            vm.currentPage = vm.pageCount < vm.currentPage ? vm.pageCount : vm.currentPage;
            resolve(result)
          } else {
            reject(err.message);
          }
        })
      });

    }, 50),
    handleSubmit() {
      let vm = this;

      if (vm.$refs.formData.validate()) {
        vm.loading = true;
        vm.dataObj.branchId = vm.$store.state.branchId;
        if (vm.dataObj._id === "") {
          return new Promise((resolve, reject) => {
            Meteor.call("lt_insertLocation", vm.dataObj, Constants.secret, (err, result) => {
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
            Meteor.call("lt_updateLocation", vm.dataObj._id, vm.dataObj, Constants.secret, (err, result) => {
              if (!err) {
                this.$message({
                  message: this.$t('successNotification'),
                  showClose: true,
                  type: 'success'
                });
                vm.loading = false;
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
    },
    handleAdd() {
      let vm = this;
      vm.dialog = true;
      vm.titleClick = 'addLocation';
      vm.dataObj.date = moment().format("YYYY-MM-DD");


    },
    handleUpdate(doc) {
      let vm = this;
      vm.dataObj = Object.assign({}, doc);
      vm.titleClick = "updateLocation";
      vm.dialog = true;

    },
    handleRemove(row) {
      let vm = this;
      vm.$confirm(this.$t('messageWarning'), this.$t('warning'), {
        confirmButtonText: this.$t('ok'),
        cancelButtonText: this.$t('cancel'),
        type: 'warning'
      }).then(() => {
        Meteor.call("lt_removeLocation", row, Constants.secret, (err, result) => {
          if (!err) {
            vm.$message({
              message: this.$t('removeSuccess'),
              type: 'success'
            });

          } else {
            vm.$message({
              type: 'error',
              message: this.$t('removeFail') + " " + err.message
            });
          }

        })
      }).catch(() => {
        vm.$message({
          type: 'info',
          message: this.$t('removeCancel')
        });
      });
    },
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    parseDate(date) {
      if (!date) return null

      const [day, month, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
  },
  watch: {
    dialog(val) {
      let vm = this;
      if (val === false) {
        this.$refs.formData.reset();
        vm.dataObj._id = "";
        vm.dataObj.date = "";
      }
    },
    currentPage(val) {
      this.loading = true;
      this.skip = (val - 1) * this.itemsPerPage > 0 ? (val - 1) * this.itemsPerPage : 0;
      this.fetchDataTable(this.search, this.skip, this.itemsPerPage + this.skip);
    },

    options: {
      handler() {
        this.sortBy = this.options.sortBy[0] || "";
        this.sortDesc = this.options.sortDesc[0] || "";

        this.fetchDataTable(this.search, this.skip, this.itemsPerPage + this.skip);
      },
      deep: true,
    },
    "dataObj.date"(val) {
      this.dateFormatted = this.formatDate(val);
    },
  },
  computed: {
    currentPageComputed: {
      get() {
        return this.currentPage;
      },
      set(value) {
        this.currentPage = numeral(value).value()
      }
    }
  },
  created() {
    let vm = this;
    vm.dataObj.date = moment().format("YYYY-MM-DD");
    //vm.fetchDataTable();
    Meteor.subscribe('lt_locationReact');

  }
}
</script>
