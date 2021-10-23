<template>
  <v-row justify="center">
    <v-flex
        md12
    >
      <v-card>

        <v-card-title icon="mdi-index">
          <v-toolbar-title v-show="!$vuetify.breakpoint.xsOnly">
            <v-icon style="font-size: 70px !important;" large color="green darken-2">account_box</v-icon>
            {{ $t("user") }}
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
          <add-button @add="dialog=true,titleClick='addUser',handleAdd()" v-shortkey="['+']"
                      @shortkey.native="handleAdd()" v-if="checkRole('Create')"
                      v-show="!$vuetify.breakpoint.xsOnly"></add-button>
          <raise-button @add="dialog=true,titleClick='addUser',handleAdd()" v-if="checkRole('Create')"
                        v-show="$vuetify.breakpoint.xsOnly"></raise-button>

        </v-card-title>
        <v-data-table
            :headers="headers"
            :items="dataLists"
            :search="search"
            :loading="loading"
            loading-text=""
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
          <template v-slot:header.username="{ header }">
            {{ $t(header.text).toUpperCase() }}

          </template>
          <template v-slot:header.profile.fullName="{ header }">
            {{ $t(header.text).toUpperCase() }}
          </template>
          <template v-slot:header.emails[0].address="{ header }">
            {{ $t(header.text).toUpperCase() }}
          </template>
          <template v-slot:header.status="{ header }">
            {{ $t(header.text).toUpperCase() }}
          </template>
          <template v-slot:header.module="{ header }">
            {{ $t(header.text).toUpperCase() }}
          </template>
          <template v-slot:header.roles="{ header }">
            {{ $t(header.text).toUpperCase() }}
          </template>
          <template v-slot:header.action="{ header }">
            {{ $t(header.text).toUpperCase() }}
          </template>

          //Body

          <template v-slot:item.status="{ item }">
            <v-icon v-if="!!item.profile.approved" color="success">check_circle</v-icon>
            <v-icon v-else color="error">remove_circle</v-icon>
          </template>
          <template v-slot:item.module="{ item }">
            <v-chip v-for="it in item.module" color="green" dark>{{ it }}</v-chip>
          </template>

          <template v-slot:item.roles="{ item }">
            <v-chip v-for="it in item.roles" color="teal" dark>{{ it }}</v-chip>
          </template>
          <template v-slot:item.branch="{ item }">
            <v-chip v-for="it in item.branch" color="blue" dark>{{ it }}</v-chip>
          </template>

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

          //Loading
          <!--<template v-slot:progress>
              <v-progress-circular
                      indeterminate
                      color="primary"
              ></v-progress-circular>
          </template>-->


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

    <v-dialog v-model="dialog" persistent max-width="1400px" :fullscreen="$vuetify.breakpoint.xsOnly">
      <v-form
          :model="valid" ref="formData"
          lazy-validation
      >
        <v-card>
          <v-card-title>

            <v-icon v-if="titleClick==='addUser'" large color="green darken-2"
                    style="font-size: 50px !important;">library_add
            </v-icon>
            <v-icon v-if="titleClick==='updateUser'" large color="green darken-2"
                    style="font-size: 50px !important;">autorenew
            </v-icon>
            <span class="headline">{{ $t(titleClick) }}</span>
            <v-spacer></v-spacer>
            <close-button @closeForm="dialog=false" v-shortkey="['esc']"
                          @shortkey.native="dialog=false" valid="false"></close-button>

          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="4" md="4">
                  <v-text-field
                      v-model="user.username"
                      :rules="usernameRules"
                      :label="$t('userName')"
                      persistent-hint
                      required
                      :dense="dense"
                      v-if="dialog" autofocus
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" md="4">
                  <v-text-field
                      v-model="user.profile.fullName"
                      :rules="profileNameRules"
                      :label="$t('profileName')"
                      persistent-hint
                      :dense="dense"

                      required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="4" sm="4">
                  <v-text-field :label="$t('email')" required
                                v-model="user.email"
                                :rules="emailRules"
                                :dense="dense"

                  ></v-text-field>
                </v-col>
                <v-col cols="12" v-if="titleClick==='addUser'" md="4">
                  <v-text-field :label="$t('password')" type="password" required
                                v-model="user.password"
                                :rules="passwordRules"
                                :dense="dense"

                                autocomplete
                  ></v-text-field>
                </v-col>
                <v-col cols="12" v-if="titleClick==='addUser'" md="4">
                  <v-text-field :label="$t('confirmPassword')" type="password" required autocomplete
                                v-model="user.confirmPassword"
                                :rules="confirmPasswordRules.concat(passwordConfirmationRule)"
                                :dense="dense"

                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="8" v-if="isUpdateFormWithSuper">
                  <v-text-field :label="$t('changePassword')" type="password" required
                                v-model="user.changePassword"
                                autocomplete
                                :dense="dense"

                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-checkbox
                      v-model="user.profile.approved"
                      :label="$t('approved')"
                      required
                      :dense="dense"

                  ></v-checkbox>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field :label="$t('userLoginMax')" type="number" required
                                v-model="user.profile.maxUserLogin"
                                autocomplete
                                :dense="dense"

                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6" sm="6" xs="6">

                  <v-autocomplete v-model="user.branch"
                                  :items="branchOptionList"
                                  outlined
                                  :dense="dense"

                                  item-text="label"
                                  item-value="value"
                                  :label="$t('branch')"
                                  search-input
                                  chips
                                  small-chips
                                  clearable
                                  multiple
                                  :search-input.sync="searchBranch"
                                  cache-items
                  >
                  </v-autocomplete>

                </v-col>
                <v-col cols="12" md="6" sm="6" xs="6">
                  <v-autocomplete v-model="user.defaultBranch"
                                  :items="defaultBranchOptionList"
                                  outlined
                                  :dense="dense"

                                  item-text="label"
                                  item-value="value"
                                  :label="$t('defaultBranch')"
                                  cache-items
                  >
                  </v-autocomplete>

                </v-col>
                <v-col cols="12" md="6" sm="6" xs="6">
                  <v-select
                      v-model="user.module"
                      :items="modulesOptionList"
                      :dense="dense"

                      chips
                      :label="$t('modules')"
                      multiple
                      small-chips
                      outlined
                  ></v-select>
                </v-col>

                <v-col cols="12" md="6" sm="6" xs="6">
                  <v-select
                      v-model="user.roles"
                      :items="rolesOptionList"
                      :dense="dense"

                      chips
                      :label="$t('roles')"
                      multiple
                      small-chips
                      outlined
                  ></v-select>
                </v-col>
                <v-col cols="12" md="8" sm="8" xs="8">
                  {{ $t('workDayMorning') }}
                  <v-chip-group
                      v-model="user.profile.workDayMorning"
                      multiple
                      active-class="primary--text"
                      :dense="dense"

                  >
                    <v-chip v-for="(day,ind) in daysInWeek" :key="ind">
                      {{ $t(day) }}
                    </v-chip>
                  </v-chip-group>


                </v-col>
                <v-col cols="12" md="2" sm="2" xs="2">

                  <v-menu
                      ref="menuMorningStart"
                      v-model="menuWorkTimeMorningStart"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      :return-value.sync="user.profile.workTimeMorningStart"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                          v-model="user.profile.workTimeMorningStart"
                          :label="$t('morningIn')"
                          prepend-icon="access_time"
                          readonly
                          hint="00:00"
                          :dense="dense"

                          v-on="on"
                      ></v-text-field>
                    </template>
                    <v-time-picker
                        v-if="menuWorkTimeMorningStart"
                        v-model="user.profile.workTimeMorningStart"
                        full-width
                        format="24hr"
                        :max="user.profile.workTimeMorningEnd"
                        @click:minute="$refs.menuMorningStart.save(user.profile.workTimeMorningStart)"
                    ></v-time-picker>
                  </v-menu>


                </v-col>
                <v-col cols="12" md="2" sm="2" xs="2">

                  <v-menu
                      ref="menuMorningEnd"
                      v-model="menuWorkTimeMorningEnd"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      :return-value.sync="user.profile.workTimeMorningEnd"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                          v-model="user.profile.workTimeMorningEnd"
                          :label="$t('morningOut')"
                          prepend-icon="access_time"
                          readonly
                          hint="12:00"
                          :dense="dense"

                          v-on="on"
                      ></v-text-field>
                    </template>
                    <v-time-picker
                        v-if="menuWorkTimeMorningEnd"
                        v-model="user.profile.workTimeMorningEnd"
                        full-width
                        format="24hr"
                        :min="user.profile.workTimeMorningStart"
                        @click:minute="$refs.menuMorningEnd.save(user.profile.workTimeMorningEnd)"
                    ></v-time-picker>
                  </v-menu>


                </v-col>
                <v-col cols="12" md="8" sm="8" xs="8">
                  {{ $t('workDayAfternoon') }}
                  <v-chip-group
                      v-model="user.profile.workDayAfternoon"
                      multiple
                      :dense="dense"

                      active-class="primary--text"
                  >
                    <v-chip v-for="(day,ind) in daysInWeek" :key="ind">
                      {{ $t(day) }}
                    </v-chip>
                  </v-chip-group>


                </v-col>

                <v-col cols="12" md="2" sm="2" xs="2">

                  <v-menu
                      ref="menuAfternoonStart"
                      v-model="menuWorkTimeAfternoonStart"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      :return-value.sync="user.profile.workTimeAfternoonStart"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                          v-model="user.profile.workTimeAfternoonStart"
                          :label="$t('afternoonIn')"
                          prepend-icon="access_time"
                          readonly
                          :dense="dense"

                          hint="12:00"
                          v-on="on"
                      ></v-text-field>
                    </template>
                    <v-time-picker
                        v-if="menuWorkTimeAfternoonStart"
                        v-model="user.profile.workTimeAfternoonStart"
                        full-width
                        format="24hr"
                        :max="user.profile.workTimeAfternoonEnd"
                        @click:minute="$refs.menuAfternoonStart.save(user.profile.workTimeAfternoonStart)"
                    ></v-time-picker>
                  </v-menu>


                </v-col>
                <v-col cols="12" md="2" sm="2" xs="2">

                  <v-menu
                      ref="menuAfternoonEnd"
                      v-model="menuWorkTimeAfternoonEnd"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      :return-value.sync="user.profile.workTimeAfternoonEnd"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                          v-model="user.profile.workTimeAfternoonEnd"
                          :label="$t('afternoonOut')"
                          prepend-icon="access_time"
                          readonly
                          :dense="dense"

                          hint="23:59"
                          v-on="on"
                      ></v-text-field>
                    </template>
                    <v-time-picker
                        v-if="menuWorkTimeAfternoonEnd"
                        v-model="user.profile.workTimeAfternoonEnd"
                        full-width
                        format="24hr"
                        :min="user.profile.workTimeAfternoonStart"
                        @click:minute="$refs.menuAfternoonEnd.save(user.profile.workTimeAfternoonEnd)"
                    ></v-time-picker>
                  </v-menu>


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
import AddButton from "../../components/addButton"
import RaiseButton from "../../components/raiseAddButton"
import SaveButton from "../../components/saveButton"
import CloseButton from "../../components/closeButton"
import ResetButton from "../../components/resetButton"
import GlobalFn from "../../../libs/globalFn"
import {Constants} from "../../../libs/constant"
import _ from 'lodash'
import {UserReact} from "../../../../imports/collections/user"
import numeral from "numeral";

export default {
  meteor: {
    reactData() {
      let vm = this;
      if (Meteor.userId()) {
        UserReact.find({}).fetch();
        vm.fetchDataTable(vm.search, vm.skip, vm.itemsPerPage + vm.skip);

      }

    }
  },
  mounted() {
    this.$jQuery('body').off();
  },
  name: "User",
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
      user: {
        _id: "",
        username: "",
        profile: {
          fullName: "",
          url: "",
          approved: false,
          workDayMorning: [0, 1, 2, 3, 4, 5, 6],
          workDayAfternoon: [0, 1, 2, 3, 4, 5, 6],
          workTimeMorningStart: "00:00",
          workTimeMorningEnd: "12:00",
          workTimeAfternoonStart: "12:00",
          workTimeAfternoonEnd: "23:59",
          maxUserLogin: 1
        },
        email: '',
        password: "",
        confirmPassword: "",
        changePassword: "",
        roles: [],
        branch: [],
        defaultBranch: "",
        module: [],

      },
      isUpdateFormWithSuper: false,

      usernameRules: [
        v => !!v || 'User Name is required',
        v => (v && v.length <= 10) || 'User Name must be less than 10 characters',
      ],
      selectRules: [
        v => !!v || 'Please Choose one',
      ],
      profileNameRules: [
        v => !!v || 'Profile Name is required',
        v => (v && v.length <= 20) || 'Name must be less than 20 characters',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 6) || 'Password must be more than 6 characters',
      ],

      confirmPasswordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 6) || 'Password must be more than 6 characters',
      ],
      modulesOptionList: Constants.modulesOption,
      rolesOptionList: Constants.rolesOption,
      branchOptionList: [],
      defaultBranchOptionList: [],
      headers: [
        {
          text: 'userName',
          align: 'left',
          sortable: true,
          value: 'username',
        },
        {
          text: 'fullName',
          align: 'left',
          sortable: true,
          value: 'profile.fullName',
        },
        {
          text: 'email',
          align: 'left',
          sortable: true,
          value: 'emails[0].address',
        },
        {
          text: 'module',
          align: 'left',
          sortable: true,
          value: 'module',
        },
        {
          text: 'roles',
          align: 'left',
          sortable: true,
          value: 'roles',
        },
        {
          text: 'status',
          align: 'left',
          sortable: true,
          value: 'status',
          width: "120px"
        },
        {text: 'actions', value: 'action', sortable: false, width: "120px"},
      ],
      dataLists: [],
      searchBranch: null,
      daysInWeek: ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
      menuWorkTimeMorningStart: false,
      menuWorkTimeMorningEnd: false,
      menuWorkTimeAfternoonStart: false,
      menuWorkTimeAfternoonEnd: false,

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

    fetchBranchOptionList(q) {
      let vm = this;
      return new Promise((resolve, reject) => {
        // , vm.user.branch || []
        Meteor.call("base_fetchBranchOptionList", q, Constants.secret, (err, result) => {
          if (!err) {
            vm.branchOptionList = result;
            resolve(result);
          } else {
            reject(err.message);
          }
        })
      })
    },
    fetchDataTable: _.debounce(function (val, skip, limit) {
      let vm = this;
      vm.loading = true;
      return new Promise((resolve, reject) => {
        Meteor.call("base_fetchUser", {
          q: val,
          filter: this.filter,
          sort: {sortBy: vm.sortBy || "", sortDesc: vm.sortDesc || ""},
          options: {skip: skip || 0, limit: limit || 10}
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

    }, 300),
    handleSubmit() {
      let vm = this;

      if (vm.$refs.formData.validate()) {
        vm.loading = true;
        if (vm.user._id === "") {
          return new Promise((resolve, reject) => {
            Meteor.call("base_insertUser", vm.user, (err, result) => {
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
            Meteor.call("base_updateUser", vm.user._id, vm.user, (err, result) => {
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
      this.dialog = true;
      this.titleClick = 'addUser';
      this.user.profile.workDayMorning = [0, 1, 2, 3, 4, 5, 6];
      this.user.profile.workDayAfternoon = [0, 1, 2, 3, 4, 5, 6];
      this.user.profile.workTimeMorningStart = "00:00";
      this.user.profile.workTimeMorningEnd = "12:00";
      this.user.profile.workTimeAfternoonStart = "12:00";
      this.user.profile.workTimeAfternoonEnd = "23:59";
      this.user.profile.maxUserLogin = 1;
    },
    handleUpdate(doc) {
      let vm = this;
      vm.isUpdateFormWithSuper = Meteor.user().username === "super";
      vm.user = {
        _id: doc._id,
        username: doc.username,
        profile: {
          fullName: doc.profile.fullName,
          url: doc.profile.url,
          approved: doc.profile.approved,
          workDayMorning: doc.profile.workDayMorning || [],
          workDayAfternoon: doc.profile.workDayAfternoon || [],

          workTimeMorningStart: doc.profile.workTimeMorningStart || "",
          workTimeMorningEnd: doc.profile.workTimeMorningEnd || "",
          workTimeAfternoonStart: doc.profile.workTimeAfternoonStart || "",
          workTimeAfternoonEnd: doc.profile.workTimeAfternoonEnd || "",
          maxUserLogin: doc.profile.maxUserLogin || 1
        },
        email: doc.emails && doc.emails[0] && doc.emails[0].address,
        roles: doc.roles || [],
        branch: doc.branch || [],
        defaultBranch: doc.defaultBranch || "",
        module: doc.module || [],


      };
      vm.titleClick = "updateUser";
      vm.fetchBranchOptionList();
      vm.dialog = true;

    },
    handleRemove(row) {
      let vm = this;
      vm.$confirm(this.$t('messageWarning'), this.$t('warning'), {
        confirmButtonText: this.$t('ok'),
        cancelButtonText: this.$t('cancel'),
        type: 'warning'
      }).then(() => {
        Meteor.call("base_removeUser", row, (err, result) => {
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
  },
  watch: {
    dialog(val) {
      if (val === false) {
        this.$refs.formData.reset();
        this.user._id = "";
        this.isUpdateFormWithSuper = false;
      }
    },
    /*itemsPerPage(val) {
        this.loading = true;
        this.skip = (this.itemsPerPage - 1) * val;
        this.fetchDataTable(this.search, this.skip, val + this.skip);
    },*/
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
    searchBranch(val) {
      val && val !== this.user.branch && this.fetchBranchOptionList(val)
    },
    "user.branch"(val) {
      let vm = this;
      val.forEach((obj) => {
        let d = vm.branchOptionList.find(o => o.value === obj);
        if (d) {
          vm.defaultBranchOptionList.push(d);
        }
      })
    }

  },
  computed: {
    passwordConfirmationRule() {
      return () =>
          this.user.password === this.user.confirmPassword || "Password must match";
    },
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
    vm.fetchDataTable();
    vm.fetchBranchOptionList();
    Meteor.subscribe('userReact');
  }
}
</script>
