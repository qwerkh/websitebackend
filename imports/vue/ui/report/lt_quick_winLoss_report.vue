<!--suppress ALL -->
<template>
  <div class="quick_winLoss-report">
    <a4>
      <div slot="header" class="no-print">
        <v-form
            :model="valid" ref="formReport"
            lazy-validation
        >
          <v-row type="flex" class="row-bg" justify="center">
            <v-col cols="12">
              <v-card
                  class="mx-auto"
                  max-width="100%"
              >
                <v-card-title>{{ $t('quickWinLossTitle') }}
                  <v-spacer></v-spacer>
                  <print-button @run="printReport" v-shortkey="['ctrl','p']"
                                @shortkey.native="printReport"></print-button>
                  <run-button @run="handleRun" v-shortkey="['enter']"
                              v-show="!$vuetify.breakpoint.xsOnly"
                              @shortkey.native="handleRun" :loading="loading"></run-button>

                </v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col cols="12" md="4" sm="4" xs="4">
                      <v-autocomplete v-model="params.branch"
                                      :items="branchOptionList"
                                      outlined
                                      dense
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
                    <v-col cols="12" md="4" sm="4" xs="4">
                      <v-autocomplete v-model="params.exchangeId"
                                      :items="exchangeOptionList"
                                      outlined
                                      dense
                                      item-text="label"
                                      item-value="value"
                                      :label="$t('exchange')"
                                      search-input
                                      chips
                                      :search-input.sync="searchExchange"
                                      cache-items
                      >
                      </v-autocomplete>

                    </v-col>
                    <v-col cols="12" md="4" sm="4" xs="4">
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
                              @blur="params.date = parseDate(dateFormatted)"
                              readonly
                              v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="params.date"
                                       @input="menuDate = false"></v-date-picker>
                      </v-menu>

                    </v-col>
                    <v-col cols="12" md="3" sm="3" xs="3">
                      <span class="subheading">{{ $t('type') }}</span>

                      <v-chip-group
                          v-model="params.type"
                          :rules="requireRules"
                          active-class="deep-purple--text text--accent-4"
                          mandatory
                          :dense="dense"
                      >
                        <v-chip v-for="d in typeOptionList" :key="d.value" :value="d.value">
                          {{ $t(d.label) }}
                        </v-chip>
                      </v-chip-group>

                    </v-col>

                    <v-col cols="12" md="3" sm="3" xs="3">
                      <span class="subheading">{{ $t('currency') }}</span>

                      <v-chip-group
                          v-model="params.currency"
                          :rules="requireRules"
                          active-class="deep-purple--text text--accent-4"
                          mandatory
                          multiple
                          :dense="dense"
                      >
                        <v-chip v-for="d in currencyOptionList" :key="d" :value="d">
                          {{ d }}
                        </v-chip>
                      </v-chip-group>

                    </v-col>
                    <v-col cols="12" md="4" sm="4" xs="4">
                      <v-autocomplete v-model="params.agentId"
                                      :items="agentOptionList"
                                      outlined
                                      dense
                                      item-text="label"
                                      item-value="value"
                                      :rules="selectRules"
                                      :label="$t('agent')"
                                      search-input
                                      :search-input.sync="searchAgent"
                                      cache-items
                      >
                      </v-autocomplete>
                    </v-col>
                    <v-col cols="12" md="2" sm="2" xs="2">
                      <v-switch v-model="params.isOneColumn" :dense="dense" :label="$t('oneColumn')"></v-switch>
                    </v-col>
                    <v-col cols="12" md="4" sm="4" xs="4">
                      <run-button @run="handleRun" v-shortkey="['enter']"
                                  v-show="!!$vuetify.breakpoint.xsOnly"
                                  @shortkey.native="handleRun" :loading="loading"></run-button>
                    </v-col>
                  </v-row>
                </v-card-text>


              </v-card>
            </v-col>
          </v-row>
        </v-form>
      </div>

      <span slot="content" style="margin: 0px !important;" id="section-to-print">
            <v-row type="flex" class="row-bg" justify="center">
<!--                <v-col cols="12" md="12" sm="12" style="text-align: center !important;">
                        <span style="font-family: 'Khmer OS Muol'; font-size: 15px;">{{companyDoc.name}}</span><br>
                        <span style="font-family: 'Khmer OS Muol'; font-size: 15px;">អាស័យដ្ឋាន៖ {{branchDoc.address}}</span><br>
                        <span style="font-family: 'Khmer OS Muol'; font-size: 15px;">លេខទូរស័ព្ទ៖ {{branchDoc.phoneNumber}}</span><br>
                </v-col>-->
                <v-col cols="12" md="12" sm="12" style="text-align: center !important;">
                        <span
                            style="font-family: 'Khmer OS Muol'; font-size: 15px;">{{
                            $t('winLossTitle')
                          }} -{{ agentName }}</span><br>
                        <span
                            style="font-family: 'Khmer OS Muol'; font-size: 15px;">ប្រចាំថ្ងៃទី៖ {{
                            formatDate(params.date)
                          }}</span>
                </v-col>

                <v-col cols="12" style="overflow-x: auto;display: block;white-space: nowrap;">
                        <div v-html="dataHtml"></div>
                  <!--                        <div class="row" style="width: 100% !important;">
                                               <div style="width: 50%;float: left !important;text-align: center !important;">
                                                  បានឃើញ និង ពិនិត្យត្រឹមត្រូវ<br>.......................... ថ្ងៃទី ............    ខែ  ....................  ឆ្នាំ ...................<br><span
                                                       style="font-family: 'Khmer OS Muol'">ប្រធាន</span>
                                              </div>

                                              <div style="width: 50%;float: right !important;text-align: center !important;">
                                                  .......................... ថ្ងៃទី  ............ ខែ   ....................  ឆ្នាំ  ...................<br><br><b>រៀបចំដោយ</b><br><br>
                                              </div>

                                          </div>-->
                  <v-btn class="no-print" @click="calculateResult()" rounded style="float: right;width: 50%;"
                         color="primary" large
                         dark>{{ $t('calculate') }}</v-btn>
                    </v-col>
            </v-row>

           </span>
    </a4>
  </div>
</template>

<script>
import PageA4 from '/imports/vue/ui/report/page/PageA4.vue';
import RunButton from "../../components/runButton";
import {Exchange} from "../../../collections/exchange";
import {Constants} from "../../../libs/constant"
import PrintButton from "../../components/printButton";

export default {
  name: "WinLossReport",
  meteor: {},
  mounted() {
    this.$jQuery('body').off();
  },
  data() {
    return {
      valid: true,
      params: {
        branch: [Meteor.user().defaultBranch],
        date: moment().format("YYYY-MM-DD"),
        exchangeId: Exchange.findOne({status: true}) && Exchange.findOne({status: true})._id || "",
        agentId: "",
        currency: ["1:KHR"],
        type: "V",
        isOneColumn: false
      },
      loading: false,
      branchDoc: {},
      branchOptionList: [],
      exchangeOptionList: [],
      companyDoc: this.$store.state.companyDoc,
      dataHtml: "",
      requireRules: [
        v => !!v || 'is required',
      ],
      selectRules: [
        v => !!v || 'Please Choose one',
      ],
      searchBranch: "",
      searchExchange: "",
      menuDate: false,
      dateFormatted: moment().format("DD/MM/YYYY"),
      typeOptionList: Constants.typeList,
      currencyOptionList: Constants.currencyList,
      agentOptionList: [],
      searchAgent: "",
      agentName: "",
      reviewAmount: 0


    };
  },
  watch: {
    searchBranch(val) {
      val && val !== this.params.branch && this.fetchBranchOptionList(val)
    },
    searchExchange(val) {
      val && val !== this.params.branch && this.fetchExchangeOptionList(val)
    },
    "params.date"(val) {
      this.dateFormatted = this.formatDate(val);
    }
  },
  created() {
    this.branchDoc = this.$store.state.branchDoc;
    this.fetchBranchOptionList();
    this.fetchExchangeOptionList();
    this.queryAgentOption();

  },
  methods: {
    printReport() {
      window.print();
    },
    calculateResult() {
      let obj = {};
      if (document.getElementById("netProfitRiel") !== null) {
        obj.amountNowKHR = parseFloat(document.getElementById("netProfitRiel").value || 0);
        obj.unpaidBeforeKHR = parseFloat(document.getElementById("oldBalanceRiel").value || 0);
        obj.reviewKHR = parseFloat(document.getElementById("reviewAmountKHR").value || 0);
        obj.paidKHR = parseFloat(document.getElementById("paidAmountKHR").value || 0);
        obj.balanceKHR = obj.amountNowKHR + obj.unpaidBeforeKHR + obj.reviewKHR - obj.paidKHR;
        document.getElementById("balanceEndRiel").value = obj.balanceKHR;
      }
      if (document.getElementById("netProfitDollar") !== null) {
        obj.amountNowUSD = parseFloat(document.getElementById("netProfitDollar").value || 0);
        obj.unpaidBeforeUSD = parseFloat(document.getElementById("oldBalanceDollar").value || 0);
        obj.reviewUSD = parseFloat(document.getElementById("reviewAmountUSD").value || 0);
        obj.paidUSD = parseFloat(document.getElementById("paidAmountUSD").value || 0);
        obj.balanceUSD = obj.amountNowUSD + obj.unpaidBeforeUSD + obj.reviewUSD - obj.paidUSD;
        document.getElementById("balanceEndDollar").value = obj.balanceUSD;
      }
      if (document.getElementById("netProfitBaht") !== null) {
        obj.amountNowTHB = parseFloat(document.getElementById("netProfitBaht").value || 0);
        obj.unpaidBeforeTHB = parseFloat(document.getElementById("oldBalanceBaht").value || 0);
        obj.reviewTHB = parseFloat(document.getElementById("reviewAmountTHB").value || 0);
        obj.paidTHB = parseFloat(document.getElementById("paidAmountTHB").value || 0);
        obj.balanceTHB = obj.amountNowTHB + obj.unpaidBeforeTHB + obj.reviewTHB - obj.paidTHB;
        document.getElementById("balanceEndBaht").value = obj.balanceTHB;
      }
      obj.agentId = this.params.agentId;
      obj.date = this.params.date;
      obj.type = this.params.type;

      if (obj.agentId && obj.date && obj.type) {
        Meteor.call("lt_insertClearMoney", obj, Constants.secret, (e, r) => {
          if (!r) {
            console.log(e.message);
          }
        })
      }
    },
    fetchExchangeOptionList(q) {
      let vm = this;
      return new Promise((resolve, reject) => {
        Meteor.call("base_fetchExchangeOptionList", q, Constants.secret, (err, result) => {
          if (!err) {
            vm.exchangeOptionList = result;
            resolve(result);
          } else {
            reject(err.message);
          }
        })
      })
    },
    fetchBranchOptionList(q) {
      let vm = this;
      return new Promise((resolve, reject) => {
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
    queryAgentOption(q) {
      let vm = this;
      return new Promise((resolve, reject) => {
        Meteor.call("lt_fetchAgentOption", q, Constants.secret, vm.$store.state.branchId, (err, result) => {
          if (result) {
            vm.agentOptionList = result;
            resolve(result);
          } else {
            reject(err.message);
          }
        })
      })
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
    handleRun() {
      let vm = this;
      vm.loading = true;

      if (this.$refs.formReport.validate()) {
        Meteor.call('base_fetchQuickWinLossReport', vm.params, Constants.secret, vm.$i18n.locale, vm.params.isOneColumn, (err, result) => {
              if (result) {
                vm.dataHtml = result.dataHtml;
                vm.agentName = result.agentName;
              }
              vm.loading = false;
            }
        )
        ;
      } else {
        vm.loading = false;

      }
    }
  },
  computed: {},
  components: {
    a4: PageA4,
    RunButton,
    PrintButton
  },
}
</script>
<style>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.box-card {
  width: 100%;
}

.form-control {
  display: block;
  width: 100%;
  height: 34px;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  -webkit-box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%);
  box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%);
  -webkit-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  -webkit-transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;
  transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;
  transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;
}
</style>