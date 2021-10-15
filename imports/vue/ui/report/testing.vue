<!--suppress ALL -->
<template>
    <div class="testing-report">
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
                                <v-card-title>{{$t('testingTitle')}}
                                    <v-spacer></v-spacer>
                                    <run-button @run="handleRun" v-shortkey="['enter']"
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
                                    </v-row>
                                </v-card-text>


                            </v-card>
                        </v-col>
                    </v-row>
                </v-form>
            </div>
            <span slot="content" style="margin: 0px !important;" id="section-to-print">
            <v-row type="flex" class="row-bg" justify="center">
                <v-col cols="12" md="12" sm="12" style="text-align: center !important;">
                        <span style="font-family: 'Khmer OS Muol'; font-size: 15px;">{{companyDoc.name}}</span><br>
                        <span style="font-family: 'Khmer OS Muol'; font-size: 15px;">អាស័យដ្ឋាន៖ {{branchDoc.address}}</span><br>
                        <span style="font-family: 'Khmer OS Muol'; font-size: 15px;">លេខទូរស័ព្ទ៖ {{branchDoc.phoneNumber}}</span><br>
                </v-col>
                <v-col cols="12" md="12" sm="12" style="text-align: center !important;">
                        <span style="font-family: 'Khmer OS Muol'; font-size: 15px;">{{$t('testingTitle')}}</span><br>
                        <span style="font-family: 'Khmer OS Muol'; font-size: 15px;">ប្រចាំថ្ងៃទី៖ {{$t('testingTitle')}}</span>
                </v-col>

                <v-col cols="12" style="overflow-x: auto;display: block;white-space: nowrap;">
                    <table class="table table-bordered">

                <thead style="margin-top: 5px">
                    <tr>
                        <th>{{$t('no')}}</th>
                        <th>{{$t('name')}}</th>
                        <th>{{$t('phoneNumber')}}</th>
                        <th>{{$t('email')}}</th>
                        <th>{{$t('address')}}</th>
                        <th>{{$t('description')}}</th>

                    </tr>
                </thead>

                <tbody style="margin-bottom: 5px;" v-html="dataHtml">
                </tbody>


            </table>
                        <div class="row" style="width: 100% !important;">
                             <div style="width: 50%;float: left !important;text-align: center !important;">
                                បានឃើញ និង ពិនិត្យត្រឹមត្រូវ<br>.......................... ថ្ងៃទី ............    ខែ  ....................  ឆ្នាំ ...................<br><span
                                     style="font-family: 'Khmer OS Muol'">ប្រធាន</span>
                            </div>

                            <div style="width: 50%;float: right !important;text-align: center !important;">
                                .......................... ថ្ងៃទី  ............ ខែ   ....................  ឆ្នាំ  ...................<br><br><b>រៀបចំដោយ</b><br><br>
                            </div>

                        </div>
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

    export default {
        name: "TestingReport",
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
                    dateRange: [moment().startOf("months").toDate(), moment().endOf("months").toDate()],
                    exchangeId: Exchange.findOne({status: true})._id
                },
                loading: false,
                branchDoc: {},
                branchOptionList: [],
                exchangeOptionList: [],
                companyDoc: this.$store.state.companyDoc,
                dataHtml: "",
                searchBranch: "",
                searchExchange: "",
                menuDate: false,
                dateFormatted: moment().format("DD/MM/YYYY")
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
        },
        created() {
            this.branchDoc = this.$store.state.branchDoc;
            this.fetchBranchOptionList();
            this.fetchExchangeOptionList();

        },
        methods: {
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
                this.loading = true;
                /*if (this.params.date == "" || this.params.date == undefined) {
                    alertify.error("Date can't not empty!!");
                    this.loading = false;
                    return false;
                }*/
                if (this.$refs.formReport.validate()) {
                    /*this.params.date[0] = moment(this.params.date[0]).startOf("day").add(12, "hours").toDate();
                    this.params.date[1] = moment(this.params.date[1]).startOf("day").add(12, "hours").toDate();*/
                    Meteor.call('base_fetchTestingReport', this.params,Constants.secret, (err, result) => {
                        if (result) {
                            this.dataHtml = result.dataHtml;
                        }
                        this.loading = false;
                    });
                }
            }
        },
        computed: {},
        components: {
            a4: PageA4,
            RunButton
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