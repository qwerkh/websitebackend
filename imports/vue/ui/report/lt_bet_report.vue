<!--suppress ALL -->
<template>
  <div class="bet-report">
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
                <v-card-title>{{ $t('betTitle') }}
                  <v-spacer></v-spacer>
                  <print-button @run="printReport" v-shortkey="['ctrl','p']"
                                @shortkey.native="printReport"></print-button>
                  <run-button @run="handleRun" v-shortkey="['enter']" v-show="!$vuetify.breakpoint.xsOnly"
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
                    <v-col cols="12" md="6" sm="6" xs="6">
                      <span class="subheading">{{ $t('time') }}</span>

                      <v-chip-group
                          v-model="params.time"
                          :rules="requireRules"
                          active-class="deep-purple--text text--accent-4"
                          mandatory
                          :dense="dense"
                      >
                        <v-chip v-for="d in timeOptionList" :key="d.value" :value="d.value">
                          {{ $t(d.label) }}
                        </v-chip>
                      </v-chip-group>

                    </v-col>

                    <v-col cols="12" md="2" sm="2" xs="2">
                      <v-text-field
                          v-model="params.page"
                          :label="$t('page')"
                          type="number"
                          persistent-hint
                          :dense="dense"
                          required
                      ></v-text-field>

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

      <span slot="content" style="margin: 0px !important;" id="section-to-print-page-break">
            <v-row type="flex" class="row-bg" justify="center">
                <v-col cols="12" md="12" sm="12" style="text-align: center !important;">
                        <span style="font-family: 'Khmer OS Muol'; font-size: 15px;">{{ companyDoc.name }}</span><br>
                        <span
                            style="font-family: 'Khmer OS Muol'; font-size: 15px;">អាស័យដ្ឋាន៖ {{
                            branchDoc.address
                          }}</span><br>
                        <span
                            style="font-family: 'Khmer OS Muol'; font-size: 15px;">លេខទូរស័ព្ទ៖ {{
                            branchDoc.phoneNumber
                          }}</span><br>
                </v-col>
                <v-col cols="12" md="12" sm="12" style="text-align: center !important;">
                        <span
                            style="font-family: 'Khmer OS Muol'; font-size: 15px;">{{ $t('betTitle') }} -{{
                            agentName
                          }}</span><br>
                        <span
                            style="font-family: 'Khmer OS Muol'; font-size: 15px;">ប្រចាំថ្ងៃទី៖ {{
                            formatDate(params.date)
                          }}  {{ $t("time") }}-{{ $t(params.time) }}</span>
                </v-col>

                <v-col cols="12" style="overflow-x: auto;display: block;white-space: nowrap;">
                        <div v-html="dataHtml"></div>
                  <!--                        <div class="row" style="width: 100% !important;">
                                               <div style="width: 50%;float: left !important;text-align: center !important;">
                                                  បានឃើញ និង ពិនិត្យត្រឹមត្រូវ<br>..................... ថ្ងៃទី .........    ខែ  ................  ឆ្នាំ ...............<br><span
                                                       style="font-family: 'Khmer OS Muol'">ប្រធាន</span>
                                              </div>

                                              <div style="width: 50%;float: right !important;text-align: center !important;">
                                                  .................... ថ្ងៃទី  ......... ខែ   .................  ឆ្នាំ  ..............<br><br><b>រៀបចំដោយ</b><br><br>
                                              </div>

                                          </div>-->
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
  name: "BetReport",
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
        page: "",
        time: "E"
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
      timeOptionList: Constants.timeList,
      agentOptionList: [],
      searchAgent: "",
      agentName: ""


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
    },
    searchAgent(val) {
      this.queryAgentOption(val);
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
        Meteor.call('base_fetchBetReport', vm.params, Constants.secret, vm.$i18n.locale, (err, result) => {
          if (result) {
            vm.dataHtml = result.dataHtml;
            vm.agentName = result.agentName;
          }
          vm.loading = false;
        });
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
</style>