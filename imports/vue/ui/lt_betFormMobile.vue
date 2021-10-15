<template>
  <!--  <v-form
        :model="valid" ref="formData"
        lazy-validation
    >
      <v-row justify="center" style="width: 100%;height: 100%;align-items: baseline">
        <div v-if="overlay"
             style="position: fixed;display: flex;justify-content: center;align-items: center;top:0;left: 0;right: 0;bottom: 0">
          <v-progress-circular style="text-align: center; "
                               :size="70"
                               :width="7"
                               color="purple"
                               indeterminate
          ></v-progress-circular>
        </div>
        <v-col cols="7" md="7" sm="7" style="padding-bottom: 0px !important;padding-top: 0px !important;">
          <v-select
              v-model="dataObj.time"
              :items="timeOptionList"
              :label="$t('time')"
              dense
              item-text="label"
              item-value="value"
          >
            <template v-slot:item="{ item, index }">
              <span style="font-size: 25px;padding: 10px !important;">{{ $t(item.label) }}</span>
            </template>
            <template v-slot:selection="{ item, index }">
              <span style="font-size: 22px">{{ $t(item.label) }}</span>
            </template>
          </v-select>
        </v-col>
        <v-col cols="5" md="5" sm="5" style="padding-bottom: 0px !important;padding-top: 0px !important;">
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
                  :label="$t('betDate')"
                  prepend-icon="event"
                  @blur="dataObj.betDate = parseDate(dateFormatted)"
                  readonly
                  :dense="dense"
                  v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="dataObj.betDate" :readonly="isReadonly"

                           @input="menuDate = false"></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="5" md="5" sm="5" style="padding-right: 0px !important;">
            <span><p
                style="color: #999;font-family: 'khmer os fasthand'; text-align: center;">
              <v-btn
                  color="pink"
                  outlined
                  fab
                  x-small
                  @click="logoutSubmit"
                  dark
              >
                          <v-icon>mdi-logout</v-icon>
                        </v-btn>

              {{
                agentDoc.name
              }}&nbsp; </p></span>
          <v-row style="padding: 0px!important;">
            <v-col cols="6" md="6" sm="6" style="padding: 0px !important;">
              <v-btn
                  class="ma-2px"
                  outlined
                  rounded
                  small
                  color="indigo"
                  to="/winLossReport"
                  style="font-size: 20px"
              >
                ស៊ីសង
              </v-btn>
            </v-col>
            <v-col cols="6" md="6" sm="6" style="padding: 0px !important;">
              <v-btn
                  class="ma-2px"
                  outlined
                  rounded
                  small
                  color="green"
                  to="/betReport"
                  style="font-size: 20px;padding: 0px!important;"
              >
                បញ្ចី
              </v-btn>
            </v-col>
          </v-row>


          <v-virtual-scroll
              :items="betList"
              :item-height="70"
              height="400"
          >
            <template v-slot="{ item }">
              <v-list-item style="padding: 0px !important;">
                <v-list-item-content>
                  <hr v-if="!item.isSamePost">
                  <span style="text-align: center;font-size: 25px;" v-if="!item.isSamePost"> {{
                      getPost(item.post)
                    }}</span>
                  <v-list-item-title style="font-size: 18px">{{ item.number }} : {{
                      item.amount
                    }}{{ getCurrencySymbol(item.currencyId) }}
                    <v-btn
                        color="red"
                        outlined
                        fab
                        x-small
                        @click="popUpRemoveNum(item)"
                        dark
                    >
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-virtual-scroll>
        </v-col>
        <v-col cols="7" md="7" sm="7" style="padding: 0px !important;">


          <v-row style="padding-bottom: 0px !important;padding-top: 0px !important;">
            <v-col cols="7" sm="7" md="7" style="padding: 0px !important;">
              <v-text-field
                  label="ចាក់លេខ"
                  single-line
                  v-model="bet.number"
                  readonly
                  ref="betNumber"
                  outlined
                  @click="handleSelectTextField('1')"
                  style="font-size: 30px"
                  rounded
                  hide-details="auto"
              >
              </v-text-field>
            </v-col>
            <v-col cols="5" sm="5" md="5" style="padding: 0px !important;">
              <v-text-field
                  label="ចំនួន"
                  single-line
                  v-model="bet.amount"
                  readonly
                  outlined
                  hide-details="auto"
                  style="font-size: 25px"
                  @click="handleSelectTextField('2')"
                  rounded
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="12" style="padding-bottom: 0px !important;padding-top: 0px !important;">
              <span style="color: red;font-size: 11px !important;">លេខបិទ</span>
            </v-col>
            <v-col cols="7" sm="7" md="7" style="padding-bottom: 0px !important;padding-top: 0px !important;">

              <v-select
                  v-model="bet.post"
                  :items="postOptionList"
                  :label="$t('post')"
                  dense
                  multiple
                  @click="clickOnClearPOST"
                  item-text="label"
                  item-value="value"
              >
                <template v-slot:item="{ item, index }">
                  <span style="font-size: 25px;padding: 10px !important;">{{ item.label }}</span>
                </template>
                <template v-slot:selection="{ item, index }">
                  <span style="font-size: 22px">{{ item.label }}</span>
                </template>
              </v-select>
            </v-col>
            <v-col cols="5" sm="5" md="5" style="padding-bottom: 0px !important;padding-top: 0px !important;">

              <v-select
                  v-model="bet.currencyId"
                  :items="currencyOptionList"
                  :label="$t('currency')"
                  dense
                  item-text="label"
                  item-value="value"
              >
                <template v-slot:item="{ item, index }">
                <span
                    style="font-size: 25px;padding-bottom: 10px !important;padding-right: 30px !important;padding-left: 30px !important;">{{
                    item.label
                  }}</span>
                </template>
                <template v-slot:selection="{ item, index }">
                  <span style="font-size: 22px">{{ item.label }}</span>
                </template>
              </v-select>
            </v-col>
            <v-col cols="4" sm="4" md="4" style="padding: 0px !important;">
              <v-btn
                  class="ma-2px"
                  outlined
                  large
                  fab
                  @click="clickOnNumber('1')"
                  color="indigo"
                  style="font-size: 30px"
              >
                1
              </v-btn>
            </v-col>
            <v-col cols="4" sm="4" md="4" style="padding: 0px !important;">
              <v-btn
                  class="ma-2px"
                  outlined
                  large
                  fab
                  @click="clickOnNumber('2')"
                  color="indigo"
                  style="font-size: 30px"
              >
                2
              </v-btn>
            </v-col>
            <v-col cols="4" sm="4" md="4" style="padding: 0px !important;">
              <v-btn
                  class="ma-2px"
                  outlined
                  large
                  fab
                  @click="clickOnNumber('3')"
                  color="indigo"
                  style="font-size: 30px"
              >
                3
              </v-btn>
            </v-col>
            <v-col cols="4" sm="4" md="4" style="padding: 0px !important;">
              <v-btn
                  class="ma-2px"
                  outlined
                  large
                  fab
                  @click="clickOnNumber('4')"
                  color="indigo"
                  style="font-size: 30px"
              >
                4
              </v-btn>
            </v-col>
            <v-col cols="4" sm="4" md="4" style="padding: 0px !important;">
              <v-btn
                  class="ma-2px"
                  outlined
                  large
                  fab
                  @click="clickOnNumber('5')"
                  color="indigo"
                  style="font-size: 30px"
              >
                5
              </v-btn>
            </v-col>
            <v-col cols="4" sm="4" md="4" style="padding: 0px !important;">
              <v-btn
                  class="ma-2px"
                  outlined
                  large
                  fab
                  @click="clickOnNumber('6')"
                  color="indigo"
                  style="font-size: 30px"
              >
                6
              </v-btn>
            </v-col>
            <v-col cols="4" sm="4" md="4" style="padding: 0px !important;">
              <v-btn
                  class="ma-2px"
                  outlined
                  large
                  fab
                  @click="clickOnNumber('7')"
                  color="indigo"
                  style="font-size: 30px"
              >
                7
              </v-btn>
            </v-col>
            <v-col cols="4" sm="4" md="4" style="padding: 0px !important;">
              <v-btn
                  class="ma-2px"
                  outlined
                  large
                  fab
                  @click="clickOnNumber('8')"
                  color="indigo"
                  style="font-size: 30px"
              >
                8
              </v-btn>
            </v-col>
            <v-col cols="4" sm="4" md="4" style="padding: 0px !important;">
              <v-btn
                  class="ma-2px"
                  outlined
                  large
                  fab
                  @click="clickOnNumber('9')"

                  color="indigo"
                  style="font-size: 30px"
              >
                9
              </v-btn>
            </v-col>


            <v-col cols="4" sm="4" md="4" style="padding: 0px !important;">
              <v-btn
                  class="ma-2px"
                  outlined
                  large
                  fab
                  :disabled="selectTextField==='2'"
                  color="deep-purple"
                  style="font-size: 30px"
                  @click="clickOnNumber('*')"
              >
                *
              </v-btn>
            </v-col>
            <v-col cols="4" sm="4" md="4" style="padding: 0px !important;">
              <v-btn
                  class="ma-2px"
                  outlined
                  large
                  fab
                  @click="clickOnNumber('0')"
                  color="indigo"
                  style="font-size: 30px"
              >
                0
              </v-btn>
            </v-col>
            <v-col cols="4" sm="4" md="4" style="padding: 0px !important;"
                   v-if="selectTextField==='1' || selectTextField==='3'">
              <v-btn
                  class="ma-2px"
                  outlined
                  large
                  fab
                  :disabled="selectTextField==='2'"
                  color="deep-purple"
                  style="font-size: 30px"
                  @click="clickOnNumber('-')"
              >
                -
              </v-btn>
            </v-col>
            <v-col cols="4" sm="4" md="4" style="padding: 0px !important;" v-if="selectTextField==='2'">
              <v-btn
                  class="ma-2px"
                  outlined
                  large
                  fab
                  :disabled="selectTextField==='1'"
                  color="deep-purple"
                  style="font-size: 30px"
                  @click="clickOnNumber('.')"
              >
                .
              </v-btn>
            </v-col>

            <v-col cols="4" sm="4" md="4" style="padding: 0px !important;">
              <v-btn
                  class="ma-2px"
                  outlined
                  large
                  fab
                  @click="clickOnClear"
                  color="red"
                  style="font-size: 20px"
              >
                លុប
              </v-btn>
            </v-col>
            <v-col cols="4" sm="4" md="4" style="padding: 0px !important;">
              <v-btn
                  class="ma-2px"
                  outlined
                  large
                  fab
                  :disabled="selectTextField==='2'"
                  @click="clickOnNumber('>')"
                  color="deep-purple"
                  style="font-size: 30px"
              >
                >
              </v-btn>
            </v-col>

            <v-col cols="4" sm="4" md="4" style="padding: 0px !important;">
              <v-btn
                  class="ma-2px"
                  outlined
                  large
                  fab
                  color="white"
                  style="font-size: 20px;background-color: green!important;"
                  :disabled="overlay"
                  @click="handleInsertBetList"
              >
                បញ្ចូល
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="4" sm="4" md="4" style="padding-top: 0px !important;padding-bottom: 0px !important;">
          <v-text-field
              label="ស្វែងរក"
              single-line
              v-model="searchBet"
              readonly
              outlined
              dense
              @click="handleSelectTextField('3')"
              style="font-size: 20px"
              rounded
          ></v-text-field>
        </v-col>
        <v-col cols="8" sm="8" md="8" style="padding-top: 0px !important;padding-bottom: 0px !important;">
          <h2><span>សរុប</span> {{ numberFormat(totalRiel) }}៛ ,
            {{ numberFormat(totalDollar) }} $, {{ numberFormat(totalBaht) }}B</h2>
        </v-col>
      </v-row>

      <v-dialog
          v-model="dialog"
          width="500"
      >
        <v-card>
          <v-card-title class="headline grey lighten-2">
            {{ $t('removeBet') }}
          </v-card-title>

          <v-card-text>
            <br>
            <h2>{{ getPost(removeDoc && removeDoc.post || "") }} ==> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {{ removeDoc && removeDoc.number || "" }} :
              {{ removeDoc && removeDoc.amount || "" }}{{
                getCurrencySymbol(removeDoc && removeDoc.currencyId || "")
              }}</h2>
            <br>
            <h2><p>តើអ្នកប្រាកដទេថាចង់លុបលេខនេះ?</p>
            </h2>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="warning"
                text
                rounded
                outlined
                style="font-size: 25px"
                @click="dialog = false"
            >
              មិនលុប
            </v-btn>
            <v-btn
                color="primary"
                text
                rounded
                outlined
                style="font-size: 25px;"
                @click="handleRemoveBet(removeDoc)"
            >
              លុប
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-form>-->

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
import {LT_BetReact} from "../../../imports/collections/lt_bet"
import numeral from "numeral";
import {Meteor} from 'meteor/meteor';

export default {
  meteor: {
    reactData() {
      let vm = this;
      if (Meteor.userId()) {
        LT_BetReact.find({}).fetch();
        // vm.fetchDataTable(vm.search, vm.skip, vm.itemsPerPage + vm.skip);
      }
    }
  },
  mounted() {
    this.$jQuery('body').off();
  },
  name: "Bet",
  components: {AddButton, RaiseButton, SaveButton, ResetButton, CloseButton},
  data() {
    return {
      searchBet: "",
      dense: this.$store.state.isDense,
      overlay: false,
      isLoading: false,
      loadingOverlay: false,
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
      selectTextField: "2",
      dataObj: {
        _id: "",
        betDate: moment().format("YYYY-MM-DD"),
        page: 1,
        line: 1,
        time: "E",
        items: [],
        totalRiel2D: "",
        totalRiel3D: "",
        totalDollar2D: "",
        totalDollar3D: "",
        totalBaht2D: "",
        totalBaht3D: "",
        agentId: "",
      },

      nameRules: [
        v => !!v || 'Bet Name is required',
      ],
      codeRules: [
        v => !!v || 'Bet Code is required',
      ],
      requireRules: [
        v => !!v || 'is required',
      ],
      numberRequireRules: [
        v => (v >= 0 && v !== "" && v !== undefined && v !== null) || 'is required',
      ],
      headers: [
        {
          text: 'betDate',
          align: 'left',
          sortable: true,
          value: 'betDate',
        }, {
          text: 'page',
          align: 'left',
          sortable: true,
          value: 'page',
        }, {
          text: 'line',
          align: 'left',
          sortable: true,
          value: 'line',
        }, {
          text: 'time',
          align: 'left',
          sortable: true,
          value: 'time',
        }, {
          text: 'totalRiel',
          align: 'left',
          sortable: true,
          value: 'totalRiel2D',
        }, {
          text: 'totalDollar',
          align: 'left',
          sortable: true,
          value: 'totalDollar2D',
        }, {
          text: 'totalBaht',
          align: 'left',
          sortable: true,
          value: 'totalBaht2D',
        },

        {text: 'actions', value: 'action', sortable: false, width: "120px"},
      ],
      dataLists: [],
      dateFormatted: moment().format("DD/MM/YYYY"),
      menuDate: false,
      betList: [],
      betListInput: [],
      bet: {
        number: "",
        amount: "",
        currencyId: "1:KHR",
        post: [],
      },
      timeOptionList: Constants.timeList,
      postOptionList: Constants.postListOpt,
      currencyOptionList: Constants.currencyListOpt,
      searchPost: "",
      isReadonly: false,
      menuBetDate: false,
      betDateFormatted: "",
      betDate: "",
      agentDoc: {},
      argsIndex: 0,
      oldPost: "",

      totalRiel: 0,
      totalDollar: 0,
      totalBaht: 0,
      removeDoc: {}

    }
  },
  methods: {
    getPost(arr) {
      if (arr === "") {
        return "";
      }
      let newStr = "";
      arr.forEach((obj) => {
        newStr += obj === "4P" ? obj : obj.replace(/[0-9]/g, '');
      })
      return newStr;
    },
    clickOnNumber(val) {
      let vm = this;
      if (vm.selectTextField === "1") {
        vm.bet.number += val;
      } else if (vm.selectTextField === "2") {
        vm.bet.amount += val;
      } else if (vm.selectTextField === "3") {
        vm.searchBet += val;
      }
    },
    clickOnClear() {
      let vm = this;
      if (vm.selectTextField === "1") {
        vm.bet.number = "";
      } else if (vm.selectTextField === "2") {
        vm.bet.amount = "";
      } else if (vm.selectTextField === "3") {
        vm.searchBet = "";
      }
      // vm.itemBetNumber = vm.itemBetNumber.substr(0, vm.itemBetNumber.length - 1);
    },
    clickOnClearPOST() {
      let vm = this;
      vm.bet.post = [];
    },
    handleSelectTextField(val) {
      let vm = this;
      vm.selectTextField = val;
      if (val === "1") {
        vm.bet.number = "";
      } else if (vm.selectTextField === "2") {
        vm.bet.amount = "";
      } else if (vm.selectTextField === "3") {
        vm.searchBet = "";
      }
    },
    resetForm() {
      this.$refs.formData.reset();
    },
    logoutSubmit() {
      this.$store.dispatch("logoutUser");
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
    getCurrencySymbol(id) {
      return id === "1:KHR" ? "៛" : id === "2:USD" ? "$" : "B";
    },
    addArgument(args) {
      if (args.length > this.bet.number.length) {
        this.argsIndex++;
        args[args.length - 1] = {
          index: this.argsIndex,
          value: args[args.length - 1]
        };
      }
      this.bet.number = args;
    },
    popUpRemoveNum(doc) {
      let vm = this;
      Meteor.call("lt_findEndPerDayByAgentId", doc.agentId, doc.time, doc.betDate, vm.$store.state.branchId, Constants.secret, (e, r) => {
        if (!!r) {
          vm.$message({
            showClose: true,
            message: "<span style='font-size: 25px'>" + vm.$t('alreadyEndPerDay') + "</span>",
            dangerouslyUseHTMLString: true,
            type: 'error'
          });
          return false;
        } else {
          vm.dialog = true;
          vm.removeDoc = doc;
        }
      })

    },
    handleRemoveBet(doc) {
      let vm = this;
      return new Promise((resolve, reject) => {
        Meteor.call("lt_removeBet", doc, Constants.secret, (err, re) => {
          if (re) {
            vm.$message({
              showClose: true,
              type: 'success',
              message: "<span style='font-size: 25px'>" + vm.$t('removeSuccess') + "</span>",
              dangerouslyUseHTMLString: true,
              duration: 3000,
            });
            resolve(re);
            vm.betList = vm.betList.filter((x) => x.betDetailId !== doc.betDetailId);

          } else {
            if (err) {
              vm.$message({
                showClose: true,
                type: 'error',
                message: "<span style='font-size: 25px'>" + err.message + "</span>",
                dangerouslyUseHTMLString: true,
              });
              reject(err.message);
            } else {
              vm.$message({
                showClose: true,
                type: 'error',
                message: "<span style='font-size: 25px'>" + លុបមិនបានជោគជ័យ + "</span>",
                dangerouslyUseHTMLString: true,
              });
            }
          }
          vm.dialog = false;
          vm.removeDoc = {};

        })
      });
    },

    handleUpdateBetList(row) {
      let vm = this;
      vm.betList[row.betDetailId] = row;
      vm.getTotal();
    },
    handleSubmit() {
      let vm = this;

      if (vm.$refs.formData.validate()) {
        vm.loading = true;
        vm.dataObj.branchId = vm.$store.state.branchId;
        vm.dataObj.items = vm.betListInput;

        vm.dataObj.page = Math.ceil(vm.betList.length / 80);
        vm.dataObj.line = Math.ceil(vm.betList.length / 20) - ((vm.dataObj.page - 1) * 4);

        if (vm.dataObj._id === "") {
          return new Promise((resolve, reject) => {
            Meteor.call("lt_insertBet", vm.dataObj, Constants.secret, (err, result) => {
              if (!err) {
                vm.bet.number = "";
                vm.$nextTick(() => vm.$refs.betNumber.focus());
                vm.selectTextField = "1";
                vm.$message({
                  message: vm.$t('successNotification'),
                  showClose: true,
                  type: 'success',
                  duration: 100,
                });
                resolve(result);
                vm.betListInput.forEach((d) => {
                  d._id = result;
                  d.agentId = vm.dataObj.agentId;
                  d.time = vm.dataObj.time;
                  d.betDate = vm.dataObj.betDate;
                  vm.betList.unshift(d);
                })

                vm.betListInput = [];


              } else {
                // vm.betList.shift();
                console.log(err.message);
                this.$message({
                  message: "<span style='font-size: 25px'>" + err.message + "</span>",
                  dangerouslyUseHTMLString: true,
                  showClose: true,
                  type: 'error'
                });
                reject(err.message);
              }
              vm.dataObj._id = "";
              vm.loading = false;
              vm.overlay = false;
              vm.getTotalAllBet();
            })
          });


        } else {
          return new Promise((resolve, reject) => {
            Meteor.call("lt_updateBet", vm.dataObj._id, vm.dataObj, Constants.secret, (err, result) => {
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
              vm.overlay = false;

            })
            vm.dialog = false;

          });
        }
      }
    },

    handleUpdate(doc) {
      let vm = this;
      vm.overlay = true;

      Meteor.call("lt_findBetById", doc._id, Constants.secret, (err, result) => {
        if (result) {
          Meteor.call("lt_findEndPerDayByAgentId", result.agentId, result.time, result.betDate, result.branchId, Constants.secret, (e, r) => {
            if (!!r) {

              vm.$message({
                message: vm.$t("alreadyEndPerDay"),
                showClose: true,
                type: 'error'
              });
              vm.overlay = false;
              return false;
            } else {
              vm.dataObj = Object.assign({}, result);
              vm.dataObj.page = result.page;
              vm.dataObj.line = result.line;
              vm.betList = result.items;

              Meteor.setTimeout(function () {
                vm.overlay = false;
                vm.titleClick = "updateClient";
                vm.dialog = true;
                vm.isReadonly = true;
                vm.titleClick = "updateBet";

              }, 300);
            }
          })


        }

      })

    },
    handleRemove(row) {
      let vm = this;

      Meteor.call("lt_findEndPerDayByAgentId", row.agentId, row.time, row.betDate, row.branchId, Constants.secret, (e, r) => {
        if (!!r) {
          vm.$message({
            message: vm.$t("alreadyEndPerDay"),
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
            Meteor.call("lt_removeBet", row, Constants.secret, (err, result) => {

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
    numberFormat(val) {
      return GlobalFn.formatNumber(val);
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
    handleInsertBetList() {
      let vm = this;
      vm.overlay = true;
      if (vm.bet.number === "" || vm.bet.currencyId === "" || vm.bet.post.length === 0 || vm.bet.amount === "" || vm.bet.amount === "0" || vm.bet.amount === 0) {
        vm.$message({
          type: 'error',
          showClose: true,
          dangerouslyUseHTMLString: true,
          message: "<span style='font-size: 25px'>" + this.$t('fieldCanNotBlank') + "</span>"
        });
        vm.overlay = false;

        return false;
      }
      if (!(vm.bet.number.length > 1 && vm.bet.number.length < 8)) {
        vm.$message({
          type: 'error',
          showClose: true,
          dangerouslyUseHTMLString: true,
          message: "<span style='font-size: 25px'>" + this.$t('entryNumberNotCorrect') + "</span>"
        });
        vm.overlay = false;

        return false;
      }
      if (vm.bet.number.length > 3) {
        const regexp = /[*|>|-]/g;
        const matches_array = vm.bet.number.match(regexp);
        if (matches_array === null) {
          vm.$message({
            type: 'error',
            showClose: true,
            dangerouslyUseHTMLString: true,
            message: "<span style='font-size: 25px'>" + this.$t('entryNumberNotCorrect') + "</span>"
          });
          vm.overlay = false;
          return false;
        }
      }


      vm.loadingOverlay = true;
      let len = vm.betList.length + 1;
      vm.betListInput.unshift({
        number: vm.bet.number,
        amount: vm.bet.amount,
        currencyId: vm.bet.currencyId,
        post: vm.bet.post,
        betDetailId: vm.dataObj.agentId + moment().format("YYYYMMDDHHMMSS") + vm.dataObj.page + vm.dataObj.line + vm.dataObj.time + len,
        isSamePost: false,
      });


      let isAlready = this.getTotal();
      vm.loadingOverlay = false;
      if (isAlready) {
        vm.handleSubmit();
      }

      /*vm.$message({
        message: this.$t('successNotification'),
        showClose: true,
        type: 'success',
        duration: 100
      });*/

    },
    handleRemoveBetList(betDetailId) {
      let vm = this;
      vm.$confirm(this.$t('messageWarning'), this.$t('warning'), {
        confirmButtonText: this.$t('ok'),
        cancelButtonText: this.$t('cancel'),
        type: 'warning'
      }).then(() => {
        vm.betList = vm.betList.filter(item => item.betDetailId !== betDetailId);

        vm.$message({
          message: this.$t('removeSuccess'),
          type: 'success'
        });
        vm.getTotal();


      }).catch(() => {
        vm.$message({
          type: 'info',
          message: this.$t('removeCancel')
        });
      });
    },

    getTotal() {
      let vm = this;
      let totalRiel2D = 0;
      let totalRiel3D = 0;
      let totalDollar2D = 0;
      let totalDollar3D = 0;
      let totalBaht2D = 0;
      let totalBaht3D = 0;

      vm.betListInput.forEach((o) => {
        if (o) {
          // Bet Length
          let isTwoDR = false;
          let betLen = 1;
          if (/-/.test(o.number)) {
            let num = o.number.split("-");
            let dataReang;
            if (parseInt(num[1]) - parseInt(num[0]) >= 10 && num[0].substr(num[0].length - 1, 1) === num[1].substr(num[1].length - 1, 1)) {
              dataReang = GlobalFn.ousKot(o.number);
            } else if (num[0].length === 2 && (parseInt(num[1]) % 11 === 0 && parseInt(num[0]) % 11 === 0) && parseInt(num[1]) >= 10) {
              dataReang = GlobalFn.ousPhe(o.number);
            } else if (num[0].length === 3 && (parseInt(num[1]) % 111 === 0 && parseInt(num[0]) % 111 === 0) && parseInt(num[1]) >= 111) {
              dataReang = GlobalFn.ousPhe(o.number);
            } else {
              dataReang = GlobalFn.reang(o.number);
            }
            if (Array.isArray(dataReang)) {
              betLen = dataReang.length;
            }

            if ((num[0]).length === 2) {
              isTwoDR = true;
            } else if ((num[0]).length === 3) {
              isTwoDR = false;
            }
          } else if (/0>/.test(o.number)) {
            let dataOuskbal = GlobalFn.ouskbal(o.number);
            if (Array.isArray(dataOuskbal)) {
              betLen = dataOuskbal.length;
            }
            isTwoDR = true;

          } else if (/>/.test(o.number) && o.number.search(/0>/) === -1) {
            let dataouskontoy = GlobalFn.ouskontoy(o.number);
            if (Array.isArray(dataouskontoy)) {
              betLen = dataouskontoy.length;
            }
            isTwoDR = true;

          } else if (o.number.substr(o.number.length - 1, o.number.length) === "*") {
            let dataTrolob = GlobalFn.trolob(o.number);
            if (Array.isArray(dataTrolob)) {
              betLen = dataTrolob.length;
            }
            if (o.number.length === 4) {
              isTwoDR = false;
            } else {
              isTwoDR = true;
            }
          } else {
            if (o.number.length === 2) {
              isTwoDR = true
            }
          }
          //=========Bet Length

          //Post Length

          let postLength = 0;
          if (vm.dataObj.time === "N") {
            if (Array.isArray(o.post)) {
              o.post.forEach(function (obj) {
                if (obj === "0A") {
                  postLength = isTwoDR === true ? postLength + 4 : postLength + 3;
                } else if (obj === "4P") {
                  postLength = isTwoDR === true ? postLength + 7 : postLength + 6;
                } else if (obj === "5Lo") {
                  postLength = isTwoDR === true ? postLength + 32 : postLength + 25;
                } else {
                  postLength = postLength + 1;
                }
              })
            } else {
              o.post.split(",").forEach(function (postFin) {
                if (postFin === "0A") {
                  postLength += isTwoDR === true ? 4 : 3;
                } else if (postFin === "4P") {
                  postLength += isTwoDR === true ? 7 : 6;
                } else if (postFin === "5Lo") {
                  postLength = isTwoDR === true ? postLength + 32 : postLength + 25;
                } else {
                  postLength += 1;
                }
              })
            }
          } else {
            if (Array.isArray(o.post)) {
              o.post.forEach(function (obj) {
                if (obj === "4P") {
                  postLength = postLength + 4;
                } else if (obj === "5Lo") {
                  if (vm.dataObj.time === "V13") {
                    postLength = isTwoDR === true ? postLength + 20 : postLength + 16;
                  } else {
                    postLength = isTwoDR === true ? postLength + 23 : postLength + 19;
                  }
                } else {
                  postLength = postLength + 1;
                }
              })
            } else {
              o.post.split(",").forEach(function (postFin) {
                if (postFin === "4P") {
                  postLength += 4;
                } else if (postFin === "5Lo") {
                  if (vm.dataObj.time === "V13") {
                    postLength = isTwoDR === true ? postLength + 20 : postLength + 16;
                  } else {
                    postLength = isTwoDR === true ? postLength + 23 : postLength + 19;
                  }
                } else {
                  postLength += 1;
                }
              })
            }
          }


          //======Post Length


          if (isTwoDR === true) {
            if (o.currencyId === "1:KHR") {
              totalRiel2D = numeral(totalRiel2D).value() + betLen * postLength * o.amount;
            } else if (o.currencyId === "2:USD") {
              totalDollar2D = numeral(totalDollar2D).value() + betLen * postLength * o.amount;
            } else if (o.currencyId === "3:THB") {
              totalBaht2D = numeral(totalBaht2D).value() + betLen * postLength * o.amount;
            }

          } else {
            if (o.currencyId === "1:KHR") {
              totalRiel3D = numeral(totalRiel3D).value() + betLen * postLength * o.amount;
            } else if (o.currencyId === "2:USD") {
              totalDollar3D = numeral(totalDollar3D).value() + betLen * postLength * o.amount;
            } else if (o.currencyId === "3:THB") {
              totalBaht3D = numeral(totalBaht3D).value() + betLen * postLength * o.amount;
            }
          }
        }
      });
      vm.dataObj.totalRiel2D = totalRiel2D;
      vm.dataObj.totalRiel3D = totalRiel3D;
      vm.dataObj.totalDollar2D = totalDollar2D;
      vm.dataObj.totalDollar3D = totalDollar3D;
      vm.dataObj.totalBaht2D = totalBaht2D;
      vm.dataObj.totalBaht3D = totalBaht3D;
      return true;
    },
    getTotalAllBet() {
      let vm = this;
      let totalRiel2D = 0;
      let totalRiel3D = 0;
      let totalDollar2D = 0;
      let totalDollar3D = 0;
      let totalBaht2D = 0;
      let totalBaht3D = 0;

      vm.betList.forEach((o) => {
        if (o) {
          // Bet Length
          let isTwoDR = false;
          let betLen = 1;
          if (/-/.test(o.number)) {
            let num = o.number.split("-");
            let dataReang;
            if (parseInt(num[1]) - parseInt(num[0]) >= 10 && num[0].substr(num[0].length - 1, 1) === num[1].substr(num[1].length - 1, 1)) {
              dataReang = GlobalFn.ousKot(o.number);
            } else if (num[0].length === 2 && (parseInt(num[1]) % 11 === 0 && parseInt(num[0]) % 11 === 0) && parseInt(num[1]) >= 10) {
              dataReang = GlobalFn.ousPhe(o.number);
            } else if (num[0].length === 3 && (parseInt(num[1]) % 111 === 0 && parseInt(num[0]) % 111 === 0) && parseInt(num[1]) >= 111) {
              dataReang = GlobalFn.ousPhe(o.number);
            } else {
              dataReang = GlobalFn.reang(o.number);
            }
            if (Array.isArray(dataReang)) {
              betLen = dataReang.length;
            }

            if ((num[0]).length === 2) {
              isTwoDR = true;
            } else if ((num[0]).length === 3) {
              isTwoDR = false;
            }
          } else if (/0>/.test(o.number)) {
            let dataOuskbal = GlobalFn.ouskbal(o.number);
            if (Array.isArray(dataOuskbal)) {
              betLen = dataOuskbal.length;
            }
            isTwoDR = true;

          } else if (/>/.test(o.number) && o.number.search(/0>/) === -1) {
            let dataouskontoy = GlobalFn.ouskontoy(o.number);
            if (Array.isArray(dataouskontoy)) {
              betLen = dataouskontoy.length;
            }
            isTwoDR = true;

          } else if (o.number.substr(o.number.length - 1, o.number.length) === "*") {
            let dataTrolob = GlobalFn.trolob(o.number);
            if (Array.isArray(dataTrolob)) {
              betLen = dataTrolob.length;
            }
            if (o.number.length === 4) {
              isTwoDR = false;
            } else {
              isTwoDR = true;
            }
          } else {
            if (o.number.length === 2) {
              isTwoDR = true
            }
          }
          //=========Bet Length

          //Post Length

          let postLength = 0;
          if (vm.dataObj.time === "N") {
            if (Array.isArray(o.post)) {
              o.post.forEach(function (obj) {
                if (obj === "0A") {
                  postLength = isTwoDR === true ? postLength + 4 : postLength + 3;
                } else if (obj === "4P") {
                  postLength = isTwoDR === true ? postLength + 7 : postLength + 6;
                } else if (obj === "5Lo") {
                  postLength = isTwoDR === true ? postLength + 32 : postLength + 25;
                } else {
                  postLength = postLength + 1;
                }
              })
            } else {
              o.post.split(",").forEach(function (postFin) {
                if (postFin === "0A") {
                  postLength += isTwoDR === true ? 4 : 3;
                } else if (postFin === "4P") {
                  postLength += isTwoDR === true ? 7 : 6;
                } else if (postFin === "5Lo") {
                  postLength = isTwoDR === true ? postLength + 32 : postLength + 25;
                } else {
                  postLength += 1;
                }
              })
            }
          } else {
            if (Array.isArray(o.post)) {
              o.post.forEach(function (obj) {
                if (obj === "4P") {
                  postLength = postLength + 4;
                } else if (obj === "5Lo") {
                  postLength = isTwoDR === true ? postLength + 23 : postLength + 19;
                } else {
                  postLength = postLength + 1;
                }
              })
            } else {
              o.post.split(",").forEach(function (postFin) {
                if (postFin === "4P") {
                  postLength += 4;
                } else if (postFin === "5Lo") {
                  postLength = isTwoDR === true ? postLength + 23 : postLength + 19;
                } else {
                  postLength += 1;
                }
              })
            }
          }


          //======Post Length


          if (isTwoDR === true) {
            if (o.currencyId === "1:KHR") {
              totalRiel2D = numeral(totalRiel2D).value() + betLen * postLength * o.amount;
            } else if (o.currencyId === "2:USD") {
              totalDollar2D = numeral(totalDollar2D).value() + betLen * postLength * o.amount;
            } else if (o.currencyId === "3:THB") {
              totalBaht2D = numeral(totalBaht2D).value() + betLen * postLength * o.amount;
            }

          } else {
            if (o.currencyId === "1:KHR") {
              totalRiel3D = numeral(totalRiel3D).value() + betLen * postLength * o.amount;
            } else if (o.currencyId === "2:USD") {
              totalDollar3D = numeral(totalDollar3D).value() + betLen * postLength * o.amount;
            } else if (o.currencyId === "3:THB") {
              totalBaht3D = numeral(totalBaht3D).value() + betLen * postLength * o.amount;
            }
          }
        }
      });
      vm.totalRiel = totalRiel2D + totalRiel3D;
      vm.totalDollar = totalDollar2D + totalDollar3D;
      vm.totalBaht = totalBaht2D + totalBaht3D;
    },
    getBetList() {
      let vm = this;
      Meteor.call("lt_findBet", vm.dataObj, vm.dataObj.agentId, Constants.secret, vm.$store.state.branchId, vm.searchBet, (err, result) => {
        if (result) {
          vm.betList = result;
          vm.getTotalAllBet();
        }
      })
    }

  },
  watch: {
    "dataObj.betDate"(val) {
      let vm = this;
      this.dateFormatted = this.formatDate(val);
      vm.getBetList();

    },
    "dataObj.time"(val) {
      let vm = this;
      vm.getBetList();
    },
    betDate(val) {
      let vm = this;
      vm.betDateFormatted = vm.formatDate(val);

      // vm.fetchDataTable(vm.search, vm.skip, vm.itemsPerPage + vm.skip);
    },
    searchBet(val) {
      let vm = this;
      vm.getBetList();
    }
  },
  computed: {},
  created() {
    let vm = this;
    let userDoc = Meteor.user();
    if (userDoc === null) {
      if (vm.$router.history.current.path !== '/login') {
        vm.$router.replace('/login');

      }
    }
    vm.dataObj.agentId = userDoc && userDoc.agentId;
    vm.$store.state.branchId = userDoc && userDoc.defaultBranch;
    vm.dataObj.betDate = moment().format("YYYY-MM-DD");
    vm.dataObj.time = "E";
    Meteor.call("lt_findAgentById", vm.dataObj.agentId, Constants.secret, (err, result) => {
      if (result) {
        vm.agentDoc = result;
      }
    })
    vm.getBetList();

  }
}
</script>
