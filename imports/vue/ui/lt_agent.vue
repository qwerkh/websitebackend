<template>
  <v-row justify="center">
    <v-flex
        md12
    >
      <v-card>

        <v-card-title icon="mdi-index">
          <v-toolbar-title v-show="!$vuetify.breakpoint.xsOnly">
            <v-icon style="font-size: 70px !important;" large color="green darken-2">emoji_people</v-icon>
            {{ $t("agent") }}
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
          <add-button @add="dialog=true,titleClick='addAgent'" v-if="checkRole('Create')"
                      v-shortkey="['+']"
                      @shortkey.native="dialog=true,titleClick='addAgent'"
                      v-show="!$vuetify.breakpoint.xsOnly"></add-button>
          <raise-button @add="dialog=true,titleClick='addAgent'" v-if="checkRole('Create')"
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

          <template v-slot:header.gender="{ header }">
            {{ $t(header.text).toUpperCase() }}

          </template>


          <template v-slot:header.telephone="{ header }">
            {{ $t(header.text).toUpperCase() }}

          </template>
          <template v-slot:header.email="{ header }">
            {{ $t(header.text).toUpperCase() }}

          </template>
          <template v-slot:header.locationVNDoc.name="{ header }">
            {{ $t(header.text).toUpperCase() }}

          </template>

          <template v-slot:header.locationKHDoc.name="{ header }">
            {{ $t(header.text).toUpperCase() }}

          </template>

          <template v-slot:header.locationTHDoc.name="{ header }">
            {{ $t(header.text).toUpperCase() }}

          </template>
          <template v-slot:header.locationVatDoc.name="{ header }">
            {{ $t(header.text).toUpperCase() }}

          </template>
          <template v-slot:header.locationLerDoc.name="{ header }">
            {{ $t(header.text).toUpperCase() }}

          </template>
          <template v-slot:header.locationTotDoc.name="{ header }">
            {{ $t(header.text).toUpperCase() }}

          </template>

          <template v-slot:header.action="{ header }">
            {{ $t(header.text).toUpperCase() }}

          </template>
          //Body
          <template v-slot:item.gender="{ item }">
                        <span v-if="item.gender==='1'">
                           <img src="images/man.png" style="width: 35px;height: 35px" alt="">
                        </span>
            <span v-if="item.gender==='2'">
                            <img src="images/woman.png" style="width: 40px;height: 40px" alt="">
                        </span>

          </template>

          //Action
          <template v-slot:item.action="{ item }">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn color="success" outlined class="table-action-button mr-2" text icon
                       v-if="checkRole('Update')" v-on="on"
                       :to="{ name: 'bet', params: { agentId: item._id }}"
                >
                  <v-icon>transit_enterexit</v-icon>
                </v-btn>
              </template>
              <span>{{ $t('bet') }}</span>
            </v-tooltip>
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

            <v-icon v-if="titleClick==='addAgent'" large color="green darken-2"
                    style="font-size: 50px !important;">library_add
            </v-icon>
            <v-icon v-if="titleClick==='updateAgent'" large color="green darken-2"
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
                      :label="$t('agentCode')"
                      persistent-hint
                      :dense="dense"
                      required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                      v-model="dataObj.name"
                      :rules="nameRules"
                      :label="$t('agentName')"
                      persistent-hint
                      :dense="dense"
                      required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <span class="subheading">{{ $t('gender') }}</span>

                  <v-chip-group
                      v-model="dataObj.gender"
                      :rules="requireRules"
                      active-class="deep-purple--text text--accent-4"
                      mandatory
                      :dense="dense"
                  >
                    <v-chip v-for="d in genderOptionList" :key="d.value" :value="d.value">
                      {{ $t(d.label) }}
                    </v-chip>
                  </v-chip-group>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                      v-model="dataObj.telephone"
                      :rules="requireRules"
                      :label="$t('telephone')"
                      persistent-hint
                      :dense="dense"
                      required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                      v-model="dataObj.email"
                      :label="$t('email')"
                      persistent-hint
                      :dense="dense"
                      required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="6" class="d-flex">
                  <v-autocomplete v-model="dataObj.locationVN"
                                  :items="locationOptionList"
                                  outlined
                                  :dense="dense"

                                  item-text="label"
                                  item-value="value"
                                  :label="$t('locationVN')"
                                  search-input
                                  :rules="selectRules"
                                  required
                  >
                    <template v-slot:append-outer>
                      <v-icon
                          color="success"
                          @click="addNewLocation"
                      >
                        mdi-plus
                      </v-icon>
                    </template>

                  </v-autocomplete>
                </v-col>
                <v-col cols="12" sm="6" md="6" class="d-flex">
                  <v-autocomplete v-model="dataObj.locationKH"
                                  :items="locationOptionList"
                                  outlined
                                  :dense="dense"

                                  item-text="label"
                                  item-value="value"
                                  :label="$t('locationKH')"
                                  search-input
                                  :rules="selectRules"
                                  required
                  >
                    <template v-slot:append-outer>
                      <v-icon
                          color="success"
                          @click="addNewLocation"
                      >
                        mdi-plus
                      </v-icon>
                    </template>

                  </v-autocomplete>
                </v-col>
                <v-col cols="12" sm="6" md="6" class="d-flex">
                  <v-autocomplete v-model="dataObj.locationTH"
                                  :items="locationOptionList"
                                  outlined
                                  :dense="dense"

                                  item-text="label"
                                  item-value="value"
                                  :label="$t('locationTH')"
                                  search-input
                                  :rules="selectRules"
                                  required
                  >
                    <template v-slot:append-outer>
                      <v-icon
                          color="success"
                          @click="addNewLocation"
                      >
                        mdi-plus
                      </v-icon>
                    </template>


                  </v-autocomplete>
                </v-col>
                <v-col cols="12" sm="6" md="6" class="d-flex">
                  <v-autocomplete v-model="dataObj.locationVat"
                                  :items="locationOptionList"
                                  outlined
                                  :dense="dense"

                                  item-text="label"
                                  item-value="value"
                                  :label="$t('locationVat')"
                                  search-input
                                  :rules="selectRules"
                                  required
                  >
                    <template v-slot:append-outer>
                      <v-icon
                          color="success"
                          @click="addNewLocation"
                      >
                        mdi-plus
                      </v-icon>
                    </template>


                  </v-autocomplete>
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

    <v-dialog v-model="dialogLocation" persistent :fullscreen="$vuetify.breakpoint.xsOnly">
      <v-card>
        <v-card-title>
          <v-spacer></v-spacer>
          <close-button @closeForm="dialogLocation=false,handleCloseLocation()" valid="false"></close-button>

        </v-card-title>
        <location></location>

      </v-card>
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
import {LT_AgentReact} from "../../../imports/collections/lt_agent"
import numeral from "numeral";
import {Meteor} from 'meteor/meteor';
import Location from "./lt_location";

export default {
  meteor: {
    reactData() {
      let vm = this;
      if (Meteor.userId()) {
        LT_AgentReact.find({}).fetch();
        vm.fetchDataTable(vm.search, vm.skip, vm.itemsPerPage + vm.skip);
      }
    }
  },
  mounted() {
    this.$jQuery('body').off();
  },
  name: "Agent",
  components: {Location, AddButton, RaiseButton, SaveButton, ResetButton, CloseButton},
  data() {
    return {
      dialogLocation: false,
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
        gender: "1",
        telephone: "",
        email: "",
        locationVN: "",
        locationKH: "",
        locationTH: "",
        locationVat: ""
      },

      nameRules: [
        v => !!v || 'Agent Name is required',
      ],
      codeRules: [
        v => !!v || 'Agent Code is required',
      ],
      requireRules: [
        v => !!v || 'is required',
      ],
      selectRules: [
        v => !!v || 'Please Choose one',
      ],
      headers: [
        {
          text: 'agentCode',
          align: 'left',
          sortable: true,
          value: 'code',
        }, {
          text: 'agentName',
          align: 'left',
          sortable: true,
          value: 'name',
        }, {
          text: 'gender',
          align: 'left',
          sortable: true,
          value: 'gender',
        }, {
          text: 'telephone',
          align: 'left',
          sortable: true,
          value: 'telephone',
        },
        {
          text: 'email',
          align: 'left',
          sortable: true,
          value: 'email',
        }, {
          text: 'locationVN',
          align: 'left',
          sortable: true,
          value: 'locationVNDoc.name',
        }, {
          text: 'locationKH',
          align: 'left',
          sortable: true,
          value: 'locationKHDoc.name',
        }, {
          text: 'locationTH',
          align: 'left',
          sortable: true,
          value: 'locationTHDoc.name',
        },{
          text: 'locationVat',
          align: 'left',
          sortable: true,
          value: 'locationVatDoc.name',
        },

        {text: 'actions', value: 'action', sortable: false, width: "170px"},
      ],
      dataLists: [],
      genderOptionList: Constants.gender,
      locationOptionList: []


    }
  },
  methods: {
    resetForm() {
      this.$refs.formData.reset();
    },
    addNewLocation() {
      this.dialogLocation = true;
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
        Meteor.call("lt_fetchAgent", {
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

    queryLocationOption() {
      let vm = this;
      return new Promise((resolve, reject) => {
        Meteor.call("lt_fetchLocationOption", Constants.secret, vm.$store.state.branchId, (err, result) => {
          if (result) {
            vm.locationOptionList = result;
            resolve(result);
          } else {
            reject(err.message);
          }
        })
      })
    },
    handleSubmit() {
      let vm = this;

      if (vm.$refs.formData.validate()) {
        vm.loading = true;
        vm.dataObj.branchId = vm.$store.state.branchId;
        if (vm.dataObj._id === "") {
          return new Promise((resolve, reject) => {
            Meteor.call("lt_insertAgent", vm.dataObj, Constants.secret, (err, result) => {
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
            Meteor.call("lt_updateAgent", vm.dataObj._id, vm.dataObj, Constants.secret, (err, result) => {
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
    handleUpdate(doc) {
      let vm = this;
      vm.dataObj = Object.assign({}, doc);
      vm.titleClick = "updateAgent";
      vm.dialog = true;

    },
    handleRemove(row) {
      let vm = this;
      Meteor.call("lt_findBetByAgentId", row._id, Constants.secret, (err, result) => {
        if (!!result) {
          vm.$message({
            message: vm.$t("alreadyHaveBet"),
            showClose: true,
            type: 'error'
          });
          return false;
        } else {
          vm.$confirm(this.$t('messageWarning'), this.$t('warning'), {
            confirmButtonText: this.$t('ok'),
            cancelButtonText: this.$t('cancel'),
            type: 'warning'
          }).then(() => {
            Meteor.call("lt_removeAgent", row, Constants.secret, (err, result) => {
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
        }
      })


    },
    handleCloseLocation() {
      let vm = this;
      vm.queryLocationOption();

    }
  },
  watch: {
    dialog(val) {
      let vm = this;
      if (val === false) {
        this.$refs.formData.reset();
        vm.dataObj._id = "";
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
    }
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
    //vm.fetchDataTable();
    vm.queryLocationOption();
    Meteor.subscribe('lt_agentReact');

  }
}
</script>
